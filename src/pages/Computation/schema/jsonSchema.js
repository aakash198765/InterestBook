const jsonSchema = (t) => {

  return ({
      "title": t("Compound Interest Calculator"),
      "description": "",
      "type": "object",
      "properties": {
        "Currency": {
          "type": "string",
          "title": t("Currency"),
          "default": "INR (₹)",
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
            "INR (₹)",
            "NPR (रु)",
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
        "PrincipalAmount": {
          "type": "number",
          "title": t("Principal Amount")
        },
        "InterestRate": {
          "type": "number",
          "title": t("Interest Rate (%)")
        },
        "InterestFrequency": {
          "type": "string",
          "title": t("Interest Frequency Cycle"),
          "enum": [
            "Monthly",
            "Quarterly",
            "Half-Yearly",
            "Yearly"
          ],
          "default": "Yearly"
        },
        "InitiationDate": {
          "type": "string",
          "format": "date",
          "title": t("Initiation Date")
        },
        "ClosureDate": {
          "type": "string",
          "format": "date",
          "title": t("Closure Date")
        },
        "TenurePeriod": {
          "type": "string",
          "title": t("Tenure Period"),
          "minLength": 2
        },
        "Interest": {
          "type": "number",
          "title": t("Interest")
        },
        "TotalAmount": {
          "type": "number",
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