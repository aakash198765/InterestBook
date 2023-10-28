import "./style.scss";
import React, { PureComponent } from 'react';
import { withTranslation } from "react-i18next";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Utils from "../../libs/Utils";

class SimpleBarChart extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.t = this.props.t;
  }

  /*
    {
        "Year": 2023,
        "Month": "Oct",
        "PrincipalAmount": 1000,
        "Interest": 4.17,
        "TotalAmount": 1004.17
    }
  */

    formatData = (data) => {
      if(!data || !Array.isArray(data) || !data.length) {
        return [];
      }
      let fData = [];
      for(let i in data) {
        let obj = data[i];
        if(!obj || !Object.keys(obj).length) {
            continue;
        }
        let fObj = {};
        for(let key in obj){
          let value  = obj[key];
          fObj[this.t(key)] = Utils.translate(value, this.t);
        }
        fData.push(fObj)
      }
      return fData;
  }

  render() {
    const { data, xAxisDataKey, yAxisDataKey, BarDataKey1, BarDataKey2 } = this.props;
    const formattedData = this.formatData(data);

    return (
      <ResponsiveContainer className="responsive-chart-container">
        <BarChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.t(xAxisDataKey)} />
          <YAxis dataKey={this.t(yAxisDataKey)} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={this.t(BarDataKey1)} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey={this.t(BarDataKey2)} fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default withTranslation()(SimpleBarChart);
