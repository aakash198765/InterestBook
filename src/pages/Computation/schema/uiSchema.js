const uiSchema = (t) => {

  return {
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