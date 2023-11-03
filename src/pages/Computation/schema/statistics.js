const statistics = () => {
    
    return ([ 
        {
            "index": 1,
            "title": "Tenure Period",
            "dataIndex": "TenurePeriod",
            "key": "TenurePeriod",
            "align": "right",
            "width": 150,
            "dataType": "string"
        },
        {
            "index": 1,
            "title": "Principal Amount",
            "dataIndex": "PrincipalAmount",
            "key": "PrincipalAmount",
            "align": "right",
            "width": 150,
            "dataType": "number"
        },
        {   
            "index": 2,
            "title": "Interest",
            "dataIndex": "Interest",
            "key": "Interest",
            "align": "right",
            "width": 150,
            "dataType": "number"
        },
        {
            "index": 3,
            "title": "Total Amount",
            "dataIndex": "TotalAmount",
            "key": "TotalAmount",
            "align": "right",
            "width": 150,
            "dataType": "number"
        },
        {
            "index": -1,
            "title": "Currency",
            "dataIndex": "Currency",
            "key": "Currency",
            "align": "right",
            "width": 150,
            "dataType": "string"
        }
    ])
}

export default statistics;