import "./style.scss";
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class SimpleBarChart extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    const { data, xAxisDataKey, BarDataKey1, BarDataKey2 } = this.props;

    return (
      <ResponsiveContainer className="responsive-chart-container">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={BarDataKey1} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey={BarDataKey2} fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
