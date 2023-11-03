const uiSchema = (t) => {

  return {
      "TenurePeriod": {
        "ui:widget": "hidden"
      },
      "Interest": {
        "ui:widget": "hidden"
      },
      "TotalAmount": {
        "ui:widget": "hidden"
      },
      "submit": {
        "type": "submit",
        "ui:options": {
          "inputType": "submit",
          "label": t("Submit") 
        }
      }
  }
}

export default uiSchema;