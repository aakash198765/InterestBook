// User Driven
const PrincipalAmount = 1000;
const InterestRate = 5;
const InterestFrequency = 12;
const InitiationDate = 1697823889000;
const ClosureDate = 1858355089000;

// System Driven Data
let TenurePeriod = 0;
let Interest = 0;
let TotalAmount = 0;

console.log("Principal Amount: ", PrincipalAmount);
console.log("Interest Rate (%): ", InterestRate);

// 1. Calculate Tenure Period
const getTenurePeriod = (InitiationDate, ClosureDate) => {
    
    // Convert timestamps to Date objects
    const initiationDateObj = new Date(InitiationDate);
    const closureDateObj = new Date(ClosureDate);

    // Calculate the difference in milliseconds
    const timeDifference = closureDateObj - initiationDateObj;

    // Convert the time difference to years, months, and days
    const millisecondsInYear = 31536000000; // Average milliseconds in a year (365 days)
    const millisecondsInMonth = 2592000000; // Average milliseconds in a month (30 days)
    const millisecondsInDay = 86400000; // Average milliseconds in a day (1 day)
    
    const years = Math.floor(timeDifference / millisecondsInYear);
    const months = Math.floor((timeDifference % millisecondsInYear) / millisecondsInMonth);
    const days = Math.floor(((timeDifference % millisecondsInYear) % millisecondsInMonth) / millisecondsInDay);
    return years+" years, "+months+" months, "+days+" days";
}
TenurePeriod = getTenurePeriod(InitiationDate, ClosureDate);
console.log("Tenure Period: ", TenurePeriod);

console.log("Interest Frequency: ", InterestFrequency);

// 2. Calculate Compound Interest
TenurePeriod = (ClosureDate - InitiationDate) / (1000 * 60 * 60 * 24 * 365); // Assuming 365 days in a year

const getComputation = (principal, rate, period, frequency) => {
    /* 
        CI Formula : p(1 + (r/n))^(nt)
    */
    const p = principal; // principal
    const r = rate/100;  // interest rate
    const t = period; // no. of years
    const n = frequency; // number of times interest has to be compounder per year
    
    const total = p * Math.pow(1 + (r/n), n*t); // principal with ci interest
    const interest = total - p;
    return {principal: principal.toFixed(2), interest: interest.toFixed(2), total: total.toFixed(2)};
}
const computation = getComputation(PrincipalAmount, InterestRate, TenurePeriod, InterestFrequency)
TotalAmount = computation.total;
Interest = computation.interest;

console.log("Interest: ", Interest);
console.log("Total Amount: ", TotalAmount);


// Function to calculate compound interest and provide a breakdown
const getComputationWithBreakdown = (principal, rate, InitiationDate, ClosureDate, frequency) => {
    const p = principal; // principal
    const r = rate/100;  // interest rate
    const t = (ClosureDate - InitiationDate) / (1000 * 60 * 60 * 24 * 365); // Assuming 365 days in a year; // no. of years
    const n = frequency; // number of times interest has to be compounder per year

    // Initialize an array to store the breakdown
    const breakdown = [];

    // Calculate and store the breakdown for each compounding period
    let currentPrincipal = p;
    for (let i = 0; i < n * t; i++) {
        const interest = currentPrincipal * ((1+(r/n)) - 1);
        const total = currentPrincipal + interest;
        const year = new Date(InitiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).getFullYear(); // Calculate the year based on the start date and time step
        const month = new Date(InitiationDate + i * (365 / n) * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }) // Calculate the year based on the start date and time step
        breakdown.push({ year, month, principal: currentPrincipal, interest, total });
        currentPrincipal = total;
    }
    return breakdown;
}
const computationWithBreakdown = getComputationWithBreakdown(PrincipalAmount, InterestRate, InitiationDate, ClosureDate, InterestFrequency)
console.log(computationWithBreakdown)







