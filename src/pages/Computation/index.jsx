import "./style.scss";
import React, { Component } from 'react';

import appLogo from "../../assests/images/appLogo.png";
import dashboardImage from "../../assests/animations/dashboardImage.gif";

// external components
import Form from "@rjsf/core";
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8'
import { Col, Row } from 'antd';

// internal components
import SimpleBarChart from "../../components/Chart/SimpleBarChart";
import Statistic from "../../components/Card/Statistic";
import Table from "../../components/Table/AntD";

// data import
import jsonSchema from "./schema/jsonSchema.json";
import uiSchema  from "./schema/uiSchema.json";
import columns from "./schema/columns.json";
import statistics from "./schema/statistics.json";

import Utils from "../../libs/Utils";
import Parser from "./parser";
import Page from "../../components/Page";
import NavBar from "../../components/NavBar";



class Computation extends Component {
  constructor(props) {
    super(props);

    // Initialize your component's state if needed
    this.state = {
      // Your state variables go here
      formData: {
       
      }
    };
  }

  componentDidMount() {
    // Code to run after the component has mounted
    const sampleData = {
      "Currency": "INR (₹)",
      "PrincipalAmount": 1000,
      "InterestRate": 5,
      "InterestFrequency": "Yearly",
      "InitiationDate": "2023-10-20",
      "ClosureDate": "2028-10-20",
    }
    this.onSubmit({formData: sampleData})
  }

  componentDidUpdate() {
    // Code to run after the component has rendered
  }

  componentWillUnmount() {
    // Code to run before the component unmounts
  }

  // Define your custom methods and event handlers here
  onChange = (e) => {
    console.log("onChange", e)

  }

  onSubmit = (e) => {
    if(!e || !e.formData || !Object.keys(e.formData).length) {
        return;
    }
    let formData = JSON.parse(JSON.stringify(e.formData));
    const tenurePeriod =  Utils.getTenurePeriod(formData.InitiationDate, formData.ClosureDate);
    const { interest, total } =  Utils.getComputation(formData.PrincipalAmount, formData.InterestRate, formData.InitiationDate, formData.ClosureDate, formData.InterestFrequency);
    const interestBreakdown = Utils.getComputationWithBreakdown(formData.PrincipalAmount, formData.InterestRate, formData.InitiationDate, formData.ClosureDate, formData.InterestFrequency);
    formData["TenurePeriod"] = tenurePeriod;
    formData["Interest"] = interest;
    formData["TotalAmount"] = total;
    formData["InterestBreakdown"] = interestBreakdown;
    this.setState({formData})
  }

  // Define you render components
  renderHeader = () => {

    return(
       <div className="dashboard-header">
            <div className="dashboard-header-left">
                <div className="logo">
                    <img src={appLogo} alt="Company Logo" />
                </div>
                <div className="app-name">
                    Lenden
                </div>
            </div>
            <div className="dashboard-header-right">
                <div className="login-register">
                    <span className="login-header-text" onClick={()=>this.props.navigation.push("/compound-interest-calculator")}>Login/Register</span>
                </div>
            </div>
       </div>
    )
  }

  renderContent = () => {

    const { formData} = this.state;
    const data = formData && formData.InterestBreakdown && Array.isArray(formData.InterestBreakdown) && formData.InterestBreakdown.length  ? [...formData.InterestBreakdown] : [];

    return(
        <div className="computation-body">
            {/* Page Title */}
            <div className="page-title">
                <span>
                    Take Control of Your Finances
                    {/* <br />
                    one platform. */}
                </span>
            </div>
              {/* Page Subtitle */}
            <span className="page-subtitle">
                Our Compound Interest Calculator puts you in charge.
                See how your money grows over time with this easy-to-use tool. 
                <br />
                Enter your data below and get started today.
            </span>
            {/* Page Content */}
            <div className="page-content">
                {/* Page Content Top  */}
                <Row className="computation-row-1" gutter={[16,18]}>
                    {/* Left Content */}
                    <Col xs={24} sm={24} md={7} lg={7} className="computation-content-left" >
                        <Form
                            schema={jsonSchema}
                            uiSchema={uiSchema}
                            formData={this.state.formData}
                            validator={validator}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            onError={console.log('errors')}
                        />
                    </Col>
                    
                     {/* Right Content */}
                    <Col xs={24} sm={24} md={17} lg={17} className="computation-content-right">
                        <div className="chart-container">
                            <Statistic
                                data={Parser.formatStatisticData(statistics, formData)}
                            />
                            <SimpleBarChart 
                                data={data} 
                                xAxisDataKey="Year" 
                                BarDataKey1="Interest" 
                                BarDataKey2="TotalAmount"
                            />
                        </div>
                    </Col>
                </Row>
                 {/* Page Content Bottom  */}
                <Row className="computation-row-2">
                    <Table
                        columns={columns} 
                        data={data}
                    />
                </Row>

            </div>
            
        </div>
     )
  }

  render() {
    return (
      <Page>
        <NavBar />
        {this.renderContent()}
     </Page>
    );
  }
}

export default Computation;






