var localStorage = require('localStorage');


class Utils {

    static setToLocalStorage = (key, value) => {
        if(!key) {
            return;
        }
        localStorage.setItem(key, value)
    }

    static getFromLocalStorage = (key, value) => {
        if(!key) {
            return;
        }
        return  localStorage.getItem(key)
    }

    static getPrecisedValue (value) {
        if(!value) {
            return 0;
        } 
        if(typeof value !== "number") {
            return value;
        }
        // value = Math.ceil(value)
        value = value.toFixed(2)
        return value;
    }

    static getTimestamp = (date) => {
        if(!date) {
            return;
        }
        if(typeof date === "string") {
            date = new Date(date).getTime();
        }
        return date;
    }

    static getDuration = (initiationDate, closureDate, type = "") => {
        initiationDate = new Date(initiationDate);
        closureDate = new Date(closureDate);
    
        const timeDiff = closureDate - initiationDate;
    
        // Calculate the duration in years, months, and days
        let years = closureDate.getFullYear() - initiationDate.getFullYear();
        let months = closureDate.getMonth() - initiationDate.getMonth();
        let days = closureDate.getDate() - initiationDate.getDate();
    
        // Adjust for negative values in months or days
        if (days < 0) {
            months--;
            days += new Date(closureDate.getFullYear(), closureDate.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
    
        let result = null;
    
        switch(type) {
            case "years": 
                result = timeDiff / (365.25 * 24 * 60 * 60 * 1000);
                break;
            case "period":
                result = years + " Year " + months + " Month " + days + " Day";
                break;
            default: 
                result = { years: years, months: months, days: days };
                break;
        }
        return result;
    }

    static getSimpleInterest(principal, rate, initiationDate, closureDate){
        // Parse the initial and closure dates
        const time  = this.getDuration(initiationDate, closureDate, "years");

        let total = 0;
        let interest = 0;

        interest = (principal*rate*time)/100;
        total = principal +  interest;

        interest = this.getPrecisedValue(interest);
        total = this.getPrecisedValue(total);
        return { principal, interest, total };
    }

    static getCompundInterest(principal, rate, initiationDate, closureDate, frequency){
        // Parse the initial and closure dates
        rate = rate/100;
        const time  = this.getDuration(initiationDate, closureDate, "years");
        const compoundingFrequency = frequency === "Monthly" ? 12 : frequency === "Quarterly" ? 4 : frequency === "Half-Yearly" ? 2 : frequency === "Yearly" ? 1 : frequency; // number of times interest has to be compounder per year

        let total = 0;
        let interest = 0;

        total = principal * Math.pow(1 + (rate/compoundingFrequency), compoundingFrequency*time); // principal with ci interest
        interest = total - principal;

        interest = this.getPrecisedValue(interest);
        total = this.getPrecisedValue(total);
        return { principal, interest, total };
    }

    static getSekdaInterest(principal, ratePerHundred, initiationDate, closureDate) {
        // Parse the initial and closure dates
        const { years, months, days }  = this.getDuration(initiationDate, closureDate)
        
        let total = principal;
        let interest = 0;
        
        // calculate for years
        let monthlyInterest = 0;
        if(years) {
          for(let year = 1; year<=years;year++) {
            monthlyInterest = (total/100)*ratePerHundred;
            // totals
            interest = (interest + monthlyInterest * 12);
            total = total + (monthlyInterest * 12);
          }   
        }
        
        // calculate for months
        if(months) {
          monthlyInterest = (total/100)*ratePerHundred;
          // totals
          interest = interest + (monthlyInterest * months);
          total = total + (monthlyInterest * months);
        }
        
        if(days) {
          let perDayInterest = monthlyInterest/30;
          // totals
          interest = interest + (perDayInterest* days);
          total = total + (perDayInterest* days);
        }
        
        interest = this.getPrecisedValue(interest);
        total = this.getPrecisedValue(total);
        return { principal, interest, total };
    }

    static getComputation = (principal, rate, initiationDate, closureDate, frequency, interestType) => {
       /* 
            1. Date format: dd/mm/yyyy or timestamp in milliseconds
            2. CI Formula: p(1 + (r/n))^(nt)
        */
        initiationDate = this.getTimestamp(initiationDate); // validate date
        closureDate = this.getTimestamp(closureDate); // validate date
        const p = principal; // principal
        let r = rate/100;  // interest rate
        const t = this.getDuration(initiationDate, closureDate, "year");
       
        
        let result = {};
        switch(interestType) {
            case "SimpleInterest": 
                result = this.getSimpleInterest(principal, rate, initiationDate, closureDate)
                break;
            case "CompoundInterest": 
                result  = this.getCompundInterest(principal, rate, initiationDate, closureDate, frequency);
                break;
            case "SekdaInterest": 
                result  = this.getSekdaInterest(principal, rate, initiationDate, closureDate);
                break;
        }
        return { 
            principal: principal,
            interest: result.interest, 
            total: result.total
        };
    }

    static getComputationWithBreakdown = (principal, rate, initiationDate, closureDate, frequency, type) => {
        return []
        /* 
            1. Date format: dd/mm/yyyy
            2. CI Formula: p(1 + (r/n))^(nt)
        */
        initiationDate = this.getTimestamp(initiationDate); // validate date
        closureDate = this.getTimestamp(closureDate); // validate date
        const p = principal; // principal
        let r = rate/100; //  interest rate
        const t = this.getDuration(initiationDate, closureDate, "year");
        const n = frequency === "Monthly" ? 12 : 1; // number of times interest has to be compounder per year
        
        // Initialize an array to store the breakdown
        let breakdown = [];

        // Calculate and store the breakdown for each compounding period
        let currentPrincipal = p;
        switch(type) {
            case "Sekda Interest": 
                r = r*12; 
                for (let i = 0; i < n * t; i++) {
                    const interest = currentPrincipal * ((1+(r/n)) - 1);
                    const total = currentPrincipal + interest;
                    const year = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).getFullYear(); // Calculate the year based on the start date and time step
                    const month = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }) // Calculate the year based on the start date and time step
                    breakdown.push({ Year: year, Month: month, PrincipalAmount:  Number(currentPrincipal.toFixed(2)), Interest:  Number(interest.toFixed(2)), TotalAmount:  Number(total.toFixed(2)) });
                    currentPrincipal = total;
                }
            break;
            default: 
                for (let i = 0; i < n * t; i++) {
                    const interest = currentPrincipal * ((1+(r/n)) - 1);
                    const total = currentPrincipal + interest;
                    const year = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).getFullYear(); // Calculate the year based on the start date and time step
                    const month = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }) // Calculate the year based on the start date and time step
                    breakdown.push({ Year: year, Month: month, PrincipalAmount:  Number(currentPrincipal.toFixed(2)), Interest:  Number(interest.toFixed(2)), TotalAmount:  Number(total.toFixed(2)) });
                    currentPrincipal = total;
                }
            break;
        }
        return breakdown;
    }

    static getCurrency = (string) => {
        if(!string || typeof string !== "string") {
            return ""
        }
        const match = string.match(/[^A-Za-z]+/);
        let symbol = "";
        if (match) {
           symbol = match[0];
        }
        if(symbol) {
            symbol = symbol.replace(/[()]/g, '')
        }
       return symbol;
    }

    static translate = (value, t, type, splitBy = "", revert) => {
        if(!t || typeof t !== "function") {
            return value;
        }
        if(value === null || value === undefined) {
            return "";
        }
        if(!type) {
            type = typeof value;
        }
        value = value.toString();
        switch(type) {
            case "number":
            case "integer":
            case "float":
                value = value.split(splitBy).map((digit) => {
                    if(revert) {
                        if(/^\d+$/.test(digit)) {
                            return digit;
                        } else {
                            return t(digit)
                        }
                    }
                    return t(digit)
                })
                value = value.join(splitBy)
                break;
            case "string":
                value = t(value)
                break;
            case "words": 
                value = value.split(splitBy).map((word) => {
                    if(/^\d+$/.test(word)) {
                        word = word.split("").map((digit) => {
                            return t(digit)
                        })
                        word = word.join('')
                        return word;
                    } else {
                        return t(word);
                    }
                })
                value = value.join(splitBy)
                break;
            case "date":
                value = value.split(splitBy).map((word) => {
                    word = word.split("").map((digit) => {
                        if(revert) {
                            if(/^\d+$/.test(digit)) {
                                return digit;
                            } else {
                                return t(digit)
                            }
                        }
                        return t(digit)
                    })
                    word = word.join('')
                    return word;
                })
                value = value.join(splitBy)

            default:
                value = t(value);
                break;
        }
        return value;
    }

    static validateDate = (date) => {
        //let pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        let pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return pattern.test(date);
    }

}

export default Utils;