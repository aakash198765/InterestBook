import "./style.scss";
import React from 'react';
import { Table as AntDTable } from 'antd';


export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    const { title, columns, data} = this.props;

    return (
      <div className='antd-table-container'>
        <AntDTable
            title={() => title}
            columns={columns}
            dataSource={data}
            virtual
            scroll={{
                x: 2000,
                y: 400,
            }}
            pagination={false}
        />
      </div>
    );
  }
}
