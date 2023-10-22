class Utils {

    static getTimestamp = (date) => {
        if(!date) {
            return;
        }
        if(typeof date === "string") {
            date = new Date(date).getTime();
        }
        return date;
    }

    static getTenurePeriod = (initiationDate, closureDate) => {
        /*
            1. Date format: dd/mm/yyyy or timestamp in milliseconds
        */

        // Convert timestamps to Date objects
        initiationDate = new Date(this.getTimestamp(initiationDate));
        closureDate = new Date(this.getTimestamp(closureDate));
    
        // Calculate the difference in milliseconds
        const timestampDifference = closureDate - initiationDate;
    
        // Convert the time difference to years, months, and days
        const millisecondsInYear = 31536000000; // Average milliseconds in a year (365 days)
        const millisecondsInMonth = 2592000000; // Average milliseconds in a month (30 days)
        const millisecondsInDay = 86400000; // Average milliseconds in a day (1 day)
        
        const years = Math.floor(timestampDifference / millisecondsInYear);
        const months = Math.floor((timestampDifference % millisecondsInYear) / millisecondsInMonth);
        const days = Math.floor(((timestampDifference % millisecondsInYear) % millisecondsInMonth) / millisecondsInDay);

        return years+" years, "+months+" months, "+days+" days";
    }

    static getComputation = (principal, rate, initiationDate, closureDate, frequency) => {
       /* 
            1. Date format: dd/mm/yyyy or timestamp in milliseconds
            2. CI Formula: p(1 + (r/n))^(nt)
        */
        initiationDate = this.getTimestamp(initiationDate); // validate date
        closureDate = this.getTimestamp(closureDate); // validate date
        const p = principal; // principal
        const r = rate/100;  // interest rate
        const t = (this.getTimestamp(closureDate) - this.getTimestamp(initiationDate)) / (1000 * 60 * 60 * 24 * 365); // Assuming 365 days in a year; // no. of years
        const n = frequency === "Monthly" ? 12 : frequency === "Quarterly" ? 3 : frequency === "Half-Yearly" ? 6 : frequency === "Yearly" ? 12 : frequency; // number of times interest has to be compounder per year
        
        const total = p * Math.pow(1 + (r/n), n*t); // principal with ci interest
        const interest = total - p;
        return { 
            principal: Number(principal.toFixed(2)),
            interest: Number(interest.toFixed(2)), 
            total: Number(total.toFixed(2))
        };
    }

    static getComputationWithBreakdown = (principal, rate, initiationDate, closureDate, frequency) => {
        /* 
            1. Date format: dd/mm/yyyy
            2. CI Formula: p(1 + (r/n))^(nt)
        */
        initiationDate = this.getTimestamp(initiationDate); // validate date
        closureDate = this.getTimestamp(closureDate); // validate date
        const p = principal; // principal
        const r = rate/100;  // interest rate
        const t = (closureDate - initiationDate) / (1000 * 60 * 60 * 24 * 365); // Assuming 365 days in a year; // no. of years
        const n = frequency === "Monthly" ? 12 : frequency === "Quarterly" ? 3 : frequency === "Half-Yearly" ? 6 : frequency === "Yearly" ? 12 : frequency; // number of times interest has to be compounder per year
    
        // Initialize an array to store the breakdown
        const breakdown = [];
    
        // Calculate and store the breakdown for each compounding period
        let currentPrincipal = p;
        for (let i = 0; i < n * t; i++) {
            const interest = currentPrincipal * ((1+(r/n)) - 1);
            const total = currentPrincipal + interest;
            const year = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).getFullYear(); // Calculate the year based on the start date and time step
            const month = new Date(initiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }) // Calculate the year based on the start date and time step
            breakdown.push({ Year: year, Month: month, PrincipalAmount:  Number(currentPrincipal.toFixed(2)), Interest:  Number(interest.toFixed(2)), TotalAmount:  Number(total.toFixed(2)) });
            currentPrincipal = total;
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
    

}

export default Utils;