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
      "ui:submitButtonOptions": {
        "props": {
          "disabled": false,
          "className": 'btn btn-info',
        },
        "norender": false,
        "submitText": t('Submit'),
      },
  }
}

export default uiSchema;