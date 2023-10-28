const statistics = (t) => {
    
    return ([ 
        {
            "index": 1,
            "title": t("Principal Amount"),
            "dataIndex": "PrincipalAmount",
            "key": "PrincipalAmount",
            "align": "right",
            "width": 150,
            "type": "number"
        },
        {   
            "index": 2,
            "title": t("Interest"),
            "dataIndex": "Interest",
            "key": "Interest",
            "align": "right",
            "width": 150,
            "type": "number"
        },
        {
            "index": 3,
            "title": t("Total Amount"),
            "dataIndex": "TotalAmount",
            "key": "TotalAmount",
            "align": "right",
            "width": 150,
            "type": "number"
        },
        {
            "index": -1,
            "title": t("Currency"),
            "dataIndex": "Currency",
            "key": "Currency",
            "align": "right",
            "width": 150,
            "type": "string"
        }
    ])
}

export default statistics;