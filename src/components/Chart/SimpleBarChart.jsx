import "./style.scss";
import React, { PureComponent } from 'react';
import { withTranslation } from "react-i18next";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Utils from "../../libs/Utils";

const rightArrow = (
  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 L5 5 L0 10" fill="none" stroke="#000" />
  </svg>
);

const upArrow = (
  <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10 L5 0 L10 10" fill="none" stroke="#000" />
  </svg>
);

class SimpleBarChart extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.t = this.props.t;
  }

  formatData = (data, ignore, xAxisDataKey) => {
    
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
          if(!ignore || !Array.isArray(ignore) || !ignore.includes(key)) {
            value = Utils.translate(value, this.t);
          }
          fObj[this.t(key)] = value;
        }
        /*
         check for xAxisDataKey (if it's with (.), that means it's combination of two keys like Month.Year (Month and Year))
         so check in obj that this key exists, if not then add this key
        */ 
       if(!Object.keys(obj).includes(xAxisDataKey) && xAxisDataKey && typeof xAxisDataKey === "string" && xAxisDataKey.includes("-")){
        fObj[`${this.t(xAxisDataKey.split("-")[0])}-${this.t(xAxisDataKey.split("-")[1])}`] = fObj[this.t(xAxisDataKey.split("-")[0])] + "-" + fObj[this.t(xAxisDataKey.split("-")[1])];
       }
        fData.push(fObj)
      }
      return fData;
  }


  customYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {Utils.translate(payload.value, this.t)}
        </text>
      </g>
    );
  };

  render() {
    const { data, xAxisDataKey, yAxisDataKey, BarDataKey1, BarDataKey2, BarDataKey3 } = this.props;
    const formattedData = this.formatData(data, [yAxisDataKey], xAxisDataKey);

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
          <XAxis dataKey={this.t(xAxisDataKey)} label={{ value: this.t(xAxisDataKey), position: 'insideBottom', offset: -2, style: { fontWeight: 600, fontSize: '14px' } }} />
          <YAxis tick={this.customYAxisTick} label={{ value: this.t(yAxisDataKey), angle: -90, position: 'insideLeft', style: { fontWeight: 600, fontSize: '14px' }  }} />
          <Tooltip />
          <Legend />
          <Bar dataKey={this.t(BarDataKey1)} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey={this.t(BarDataKey2)} fill="#ea5545" activeBar={<Rectangle fill="orange" stroke="#ea5545" />}  />
          <Bar dataKey={this.t(BarDataKey3)} fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default withTranslation()(SimpleBarChart);
