function getDuration(initiationDate, closureDate, type = "") {
    initiationDate = new Date(initiationDate);
    closureDate = new Date(closureDate);

    const timeDiff = closureDate - initiationDate;

    // milliseconds in one day, one month, one year
    let oneDay = 24 * 60 * 60 * 1000;
    let oneMonth = 30.44 * oneDay; // approximate no. of days in one month
    let oneYear = 365.25 * oneDay; // approximate no. of days in one year

    // Calculate the duration in years, months, and days
    let years = Math.floor(timeDiff / oneYear);
    let months = Math.floor((timeDiff % oneYear) / oneMonth);
    let days = Math.floor((timeDiff % oneMonth) / oneDay);

    let result = null;

    switch(type) {
        case "year": 
            result = timeDiff / (365.25 * 24 * 60 * 60 * 1000);
            break;
        case "period":
            result = years+" Year "+months+" Month "+days+" Day"
            break;
        default: 
            result = {}
            result = { years: years, months: months, days: days }
            break;
    }
    return result;
}

function calculateSekdaByaj(principal, ratePerHundred, initiationDate, closureDate) {
// Parse the initial and closure dates
const { years, months, days }  = getDuration(initiationDate, closureDate)
console.log("duration", years, months, days)

let totalAmount = principal;
let totalInterest = 0;

// calculate for years
if(years) {
  for(let year = 1; year<=years;year++) {
      let monthlyInterest = (totalAmount/100)*ratePerHundred;
      let annualInterest = monthlyInterest * 12;
      // totals
      totalInterest = totalInterest + annualInterest;
      totalAmount = totalAmount + annualInterest;
  }   
}

// calculate for months
if(months) {
  let monthlyInterest = (totalAmount/100)*ratePerHundred;
  let monthsInterest = monthlyInterest * months;
  // totals
  totalInterest = totalInterest + monthsInterest;
  totalAmount = totalAmount + monthsInterest;
}

if(days) {
  let monthlyInterest = (totalAmount/100)*ratePerHundred;
  let perDayInterest = monthlyInterest/30.44;
  let daysInterest = perDayInterest * days
  // totals
  totalInterest = totalInterest + daysInterest;
  totalAmount = totalAmount + daysInterest;
}

// precesion
if(totalInterest) {
  totalInterest = Math.ceil(totalInterest);
}
if(totalAmount) {
  totalAmount = Math.ceil(totalAmount);
}

return { principal, totalInterest, totalAmount };
}

// Example usage:
const principal = 8000;
const ratePerHundred = 2;
const initiationDate = '2023-06-01';
const closureDate = '2025-07-05';

const { totalInterest, totalAmount } = calculateSekdaByaj(
principal,
ratePerHundred,
initiationDate,
closureDate
);

console.log('Total Interest:', totalInterest);
console.log('Total Amount:', totalAmount);





