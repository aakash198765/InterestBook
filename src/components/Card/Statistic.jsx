import "./style.scss";
import React from 'react';
import { withTranslation } from "react-i18next";
import { Col, Row } from 'antd';

import Utils from "../../libs/Utils";

class Statistic extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.t = this.props.t;
    }

    renderStatistic = () => {
        const { data } = this.props;
        let componentData = [];
        let currency = "";
        let colCount =  0;
        data && data.find((obj) => {
            // colCount
            if(obj && obj.index > -1) {
                colCount++
            }
            // currency
            if(obj && obj.key === "Currency") {
                currency =  obj.value;
            }
        }) 
        colCount = 0;
        for(let i in data) {
            if(!data[i] || data[i].index < 0) {
                continue;
            }
            colCount+=1
            let obj = data[i];
            let key = obj.key;
            let title = this.t(obj.title) || "";
            let value = obj.value || "";
            let type = obj.dataType;
            let splitBy = ""
            // TODO: TenurePeriod
            if(key === "TenurePeriod") {
                type = "words";
                splitBy = " ";
            }
            value = Utils.translate(value, this.t, type, splitBy);
            if(obj.dataType === "number") {
                value =  Utils.getCurrency(currency) +  value;
            }
            
            componentData.push(
                <Col xs={24} sm={24} lg={10} xl={10} xxl={10} className="ant-statistic-col">
                    <span className="ant-statistic-title">{title}</span>
                    <span className="ant-statistic-content-value">{value}</span>
                </Col>
            )
        }

        return (
            <Row gutter={[16,24]} className="ant-statistic-row">
                {componentData}
            </Row>
        )
    }

    isValidStatistic = () => {
        const { data } = this.props;
        if(!data || !Array.isArray(data) || !data.length){
            return false;
        }
        return true
    }

    render(){
        if(!this.isValidStatistic){
            return <></>;
        }

        return this.renderStatistic();
    }
}
export default withTranslation()(Statistic);