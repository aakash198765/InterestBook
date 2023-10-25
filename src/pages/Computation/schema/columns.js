const columns = (t) => {
  return (
    [
      {
          "title": t("Year"),
          "dataIndex": "Year",
          "key": "Year",
          "align": "center",
          "width": 100
        },
        {
          "title": t("Month"),
          "dataIndex": "Month",
          "key": "Month",
          "align": "center",
          "width": 100
        },
        {
          "title": t("Principal Amount"),
          "dataIndex": "PrincipalAmount",
          "key": "PrincipalAmount",
          "align": "right",
          "width": 150
        },
        {
          "title": t("Interest"),
          "dataIndex": "Interest",
          "key": "Interest",
          "align": "right",
          "width": 150
        },
        {
          "title": t("Total Amount"),
          "dataIndex": "TotalAmount",
          "key": "TotalAmount",
          "align": "right",
          "width": 150
        }
    ]
  )
}

export default columns;