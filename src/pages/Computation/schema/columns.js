import Utils from "../../../libs/Utils"
const columns = (t) => {
  return (
    [
      {
          "title": t("Year"),
          "dataIndex": "Year",
          "key": "Year",
          "align": "center",
          "width": 100,
          "render": (text, record, index) => {
            if(!text) {
              return "--"
            }
            return Utils.translate(text, t);
          }
        },
        {
          "title": t("Month"),
          "dataIndex": "Month",
          "key": "Month",
          "align": "center",
          "width": 100,
          "render": (text, record, index) => {
            if(!text) {
              return "--"
            }
            return t(text)
          }
        },
        {
          "title": t("Principal Amount"),
          "dataIndex": "PrincipalAmount",
          "key": "PrincipalAmount",
          "align": "right",
          "width": 150,
          "render": (text, record, index) => {
            if(!text && text !==0) {
              return "--"
            }
            return Utils.translate(text, t);
          }
        },
        {
          "title": t("Interest"),
          "dataIndex": "Interest",
          "key": "Interest",
          "align": "right",
          "width": 150,
          "render": (text, record, index) => {
            if(!text && text !==0) {
              return "--"
            }
            return Utils.translate(text, t);
          }
        },
        {
          "title": t("Total Amount"),
          "dataIndex": "TotalAmount",
          "key": "TotalAmount",
          "align": "right",
          "width": 150,
          "render": (text, record, index) => {
            if(!text && text !==0) {
              return "--"
            }
            return Utils.translate(text, t);
          }
        }
    ]
  )
}

export default columns;