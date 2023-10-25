import "./style.scss";
import React from 'react';

import { Col, Row, Statistic as AntDStatistic } from 'antd';

class Statistic extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    renderStatistic = () => {
        const { data } = this.props;
        let componentData = []; 
        for(let i in data) {
            let obj = data[i];
            componentData.push(
                <Col span={24/data.length}>
                    <AntDStatistic title={obj.title} value={obj.value} />
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
export default Statistic;