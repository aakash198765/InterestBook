const jsonSchema = (t, interestType) => {

  return ({
      "title": t(`${interestType} Calculator`),
      "description": "",
      "type": "object",
      "properties": {
        "Currency": {
          "type": "string",
          "title": t("Currency"),
          "enum": [
            // "USD ($)",
            // "EUR (€)",
            // "JPY (¥)",
            // "GBP (£)",
            // "AUD ($)",
            // "CAD ($)",
            // "CHF (Fr)",
            // "CNY (¥)",
            // "SEK (kr)",
            // "NZD ($)",
            // "KRW (₩)",
            // "SGD ($)",
            // "HKD ($)",
            // "NOK (kr)",
            // "MXN ($)",
            t("INR (₹)"),
            t("NPR (रु)"),
            // "BRL (R$)",
            // "ZAR (R)",
            // "RUB (₽)",
            // "TRY (₺)",
            // "AED (د.إ)",
            // "SAR (﷼)",
            // "QAR (﷼)",
            // "THB (฿)",
            // "IDR (Rp)",
            // "MYR (RM)",
            // "PHP (₱)",
            // "HUF (Ft)",
            // "CZK (Kč)",
            // "PLN (zł)",
            // "DKK (kr)",
            // "ISK (kr)",
            // "CLP ($)",
            // "ARS ($)",
            // "EGP (ج.م)",
            // "KWD (د.ك)",
            // "PKR (₨)",
            // "BDT (৳)",
            // "LKR (රු)",
            // "VND (₫)"
          ]
        },
        "InterestType": {
          "type": "string",
          "title": t("Interest Type"),
          "enum": [
            t("SimpleInterest"),
            t("CompoundInterest"),
            t("SekdaInterest")
          ]
        },
        "PrincipalAmount": {
          "type": "string",
          "title": t("Principal Amount")
        },
        "InterestRate": {
          "type": "string",
          "title": t("Interest Rate")
        },
        "InterestFrequency": {
          "type": "string",
          "title": t("Interest Frequency Cycle"),
          "enum": [
            t("Monthly"),
            t("Quarterly"),
            t("Half-Yearly"),
            t("Yearly")
          ]
        },
        "InitiationDate": {
          "type": "string",
          "format": "custom-date",
          "title": t("Initiation Date (YYYY-MM-DD)")
        },
        "ClosureDate": {
          "type": "string",
          "format": "custom-date",
          "title": t("Closure Date (YYYY-MM-DD)")
        },
        "TenurePeriod": {
          "type": "string",
          "title": t("Tenure Period")
        },
        "Interest": {
          "type": "string",
          "title": t("Interest")
        },
        "TotalAmount": {
          "type": "string",
          "title": t("Total Amount")
        }
      },
      "required": [
          "PrincipalAmount",
          "InterestRate",
          "InitiationDate",
          "ClosureDate"
      ]
  })
} 

export default jsonSchema;