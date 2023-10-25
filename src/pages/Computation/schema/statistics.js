const statistics = (t) => {
    
    return ([ 
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
    ])
}

export default statistics;