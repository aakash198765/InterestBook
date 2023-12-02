import "./style.scss";
import React from 'react';
import { withTranslation } from "react-i18next";
import { Col, Row, Statistic as AntDStatistic } from 'antd';

import Utils from "../../libs/Utils";

class Link extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.t = this.props.t;
    }

    renderLinks = () => {
        const { data, callback } = this.props;
        let componentData = [];
        let currency = "";
        let colCount =  0;
        
        for(let i in data) {
            if(!data[i] || data[i].index < 0) {
                continue;
            }
            let obj = data[i];
            let key = obj.key;
            let title = this.t(obj.title) || "";
            let value = obj.value || "";
            let type = "string";
            let splitBy = ""
            
            value = Utils.translate(value, this.t, type, splitBy);
            
            componentData.push(
                <Col span={24/colCount}>
                    <div className="link-layout-1" onClick={() => {
                        if(callback && typeof callback === "function") {
                            callback(obj);
                            return;
                        }
                    }}> 
                        <span className="link-title-1">{title}</span>
                    </div>
                </Col>
            )
        }

        return (
            <Row gutter={[8,8]}>
                {componentData}
            </Row>
        )
    }

    isValidLinks = () => {
        const { data } = this.props;
        if(!data || !Array.isArray(data) || !data.length){
            return false;
        }
        return true
    }

    render(){
        if(!this.isValidLinks()){
            return <></>;
        }

        return this.renderLinks();
    }
}
export default withTranslation()(Link);