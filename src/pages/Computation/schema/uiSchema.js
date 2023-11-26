const uiSchema = (t, interestType) => {
  let schema = {
      "InterestType": {
        "ui:widget": "hidden"
      },
      "InterestFrequency": {
        "ui:widget": "hidden"
      },
      "TenurePeriod": {
        "ui:widget": "hidden"
      },
      "Interest": {
        "ui:widget": "hidden"
      },
      "TotalAmount": {
        "ui:widget": "hidden"
      },
      "ui:submitButtonOptions": {
        "props": {
          "disabled": false,
          "className": 'btn btn-info',
        },
        "norender": false,
        "submitText": t('Submit'),
      },
  }

  if(interestType && interestType.includes("Compound")){
      delete schema.InterestFrequency;
  } 
  return schema;
}

export default uiSchema;