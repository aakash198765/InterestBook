import "./style.scss";
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

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
import jsonSchema from "./schema/jsonSchema";
import uiSchema  from "./schema/uiSchema";
import columns from "./schema/columns";
import statistics from "./schema/statistics";

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
    this.t = this.props.t;
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

  renderContent = () => {

    const { formData} = this.state;
    const data = formData && formData.InterestBreakdown && Array.isArray(formData.InterestBreakdown) && formData.InterestBreakdown.length  ? [...formData.InterestBreakdown] : [];

    return(
        <div className="computation-body">
            {/* Page Title */}
            <div className="page-title">
                <span>
                    {this.t("Take Control of Your Finances")}
                    {/* <br />
                    one platform. */}
                </span>
            </div>
              {/* Page Subtitle */}
            <span className="page-subtitle">
                {this.t("Our Compound Interest Calculator puts you in charge.")}
                {this.t("See how your money grows over time with this easy-to-use tool.")} 
                <br />
                {this.t("Enter your data below and get started today.")}
            </span>
            {/* Page Content */}
            <div className="page-content">
                {/* Page Content Top  */}
                <Row className="computation-row-1" gutter={[16,18]}>
                    {/* Left Content */}
                    <Col xs={24} sm={24} md={7} lg={7} className="computation-content-left" >
                        <Form
                            schema={jsonSchema(this.t)}
                            uiSchema={uiSchema(this.t)}
                            formData={formData}
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
                                data={Parser.formatStatisticData(statistics(this.t), formData)}
                            />
                            <SimpleBarChart 
                                data={data} 
                                xAxisDataKey="Month-Year" 
                                yAxisDataKey="TotalAmount"
                                BarDataKey1="PrincipalAmount" 
                                BarDataKey2="Interest" 
                                BarDataKey3="TotalAmount"
                            />
                        </div>
                    </Col>
                </Row>
                 {/* Page Content Bottom  */}
                <Row className="computation-row-2">
                    <Table
                        title={this.t("Interest Breakdown")}
                        columns={columns(this.t)} 
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

export default withTranslation()(Computation);






