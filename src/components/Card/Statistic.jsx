import "./style.scss";
import React from 'react';
import { withTranslation } from "react-i18next";
import { Col, Row, Statistic as AntDStatistic } from 'antd';

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
        for(let i in data) {
            if(!data[i] || data[i].index < 0) {
                continue;
            }
            let obj = data[i];
            let title = this.t(obj.title) || "";
            let value = Utils.translate(obj.value, this.t, obj.dataType);
            if(obj.dataType === "number") {
                value =  Utils.getCurrency(currency) +  value;
            }
            
            componentData.push(
                <Col span={24/colCount}>
                    <AntDStatistic title={title} value={value} />
                </Col>
            )
        }

        return (
            <Row gutter={[16,18]}>
                {componentData}
            </Row>
        )
    }

    isValidStatistic = () => {
        const { data } = this.props;
        if(!data || !Array.isArray(data) || !data.lengt){
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