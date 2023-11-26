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
      formData: {},
      errorSchema: {},
    };
    this.t = this.props.t;
  }

  getInterestType = (title) => {
    const url = window.location.href;
    let interestType = "SimpleInterest";
    
    if(url && url.includes("compound-interest")) {
      interestType =  "CompoundInterest"
    } else  if(url && url.includes("sekda-interest")) {
      interestType = "SekdaInterest"
    } 

    if(title) {
      switch(interestType) {
        case "SimpleInterest": return "Simple Interest";
        case "CompoundInterest": return "Compound Interest";
        case "SekdaInterest": return "Sekda Interest";
      }
    }

    return interestType;
  }

  componentDidMount() {

    const interestType = this.getInterestType();

    // Code to run after the component has mounted
    const sampleData = {
      "Currency": "INR (₹)",
      "InterestType": interestType,
      "PrincipalAmount": 10000,
      "InterestRate": 2,
      "InterestFrequency": "Yearly",
      "InitiationDate": "2023-10-20",
      "ClosureDate": "2024-10-19",
    }
    this.setState({formData: sampleData}, () => {
      this.onSubmit();
    })
  }

  componentDidUpdate() {
    // Code to run after the component has rendered
  }

  componentWillUnmount() {
    // Code to run before the component unmounts
  }

  // Define your custom methods and event handlers here
  onChange = (e) => {
    let { formData, schema, uiSchema, id } = e;
    let stateFormData  = {};
    if(this.state.formData && Object.keys(this.state.formData).length) {
     stateFormData = JSON.parse(JSON.stringify(this.state.formData));
    }
    stateFormData["Currency"] = Utils.translate(formData["Currency"], this.t);
    stateFormData["InterestType"] = Utils.translate(formData["InterestType"], this.t);
    stateFormData["InterestFrequency"] = Utils.translate(formData["InterestFrequency"], this.t);
    stateFormData["PrincipalAmount"] = Number((Utils.translate(formData["PrincipalAmount"], this.t, "number", "", true)).replace(/[^0-9]/g, '')) || 0;
    stateFormData["InterestRate"] = Number((Utils.translate(formData["InterestRate"], this.t, "number", "", true)).replace(/[^0-9]/g, '')) || 0;
    let initiationDate = Utils.translate(formData["InitiationDate"], this.t, "date", "-", true);
    //if(Utils.validateDate(initiationDate)) {
      stateFormData["InitiationDate"] = initiationDate
    //}
    let closureDate = Utils.translate(formData["ClosureDate"], this.t, "date", "-", true);
    //if(Utils.validateDate(closureDate)) {
      stateFormData["ClosureDate"] = closureDate;
    //}
    this.setState({formData: stateFormData})
  }

  onValidation = (formData) => {
    let log = {
      status: true,
      error: {}
    }
    if(!this.state.formData || !Object.keys(this.state.formData).length) {
      log.status = false;
      log.error["FormData"] = "Form data is missing";
      return log;
    }
    let initiationDate = Utils.translate(formData["InitiationDate"], this.t, "date", "-", true);
    if(!Utils.validateDate(initiationDate)) {
      log.status = false;
      log.error["InitiationDate"] = Utils.translate("Date is invalid");
    }
    let closureDate = Utils.translate(formData["ClosureDate"], this.t, "date", "-", true);
    if(!Utils.validateDate(closureDate)) {
      log.status = false;
      log.error["ClosureDate"] = Utils.translate("Date is invalid");
    }

    return log;
  }

  onSubmit = (e) => {
    if(!this.state.formData || !Object.keys(this.state.formData).length) {
      return;
    }
    if(!this.onValidation(this.state.formData).status) {
      return;
    }
   
    let formData = JSON.parse(JSON.stringify(this.state.formData));
    const tenurePeriod =  Utils.getDuration(formData.InitiationDate, formData.ClosureDate, "period");
    const { interest, total } =  Utils.getComputation(formData.PrincipalAmount, formData.InterestRate, formData.InitiationDate, formData.ClosureDate, formData.InterestFrequency, formData.InterestType);
    const interestBreakdown = Utils.getComputationWithBreakdown(formData.PrincipalAmount, formData.InterestRate, formData.InitiationDate, formData.ClosureDate, formData.InterestFrequency, formData.InterestType);
    formData["TenurePeriod"] = tenurePeriod;
    formData["Interest"] = interest;
    formData["TotalAmount"] = total;
    formData["InterestBreakdown"] = interestBreakdown;
    this.setState({formData})
  }

  parseFormData = (formData) => {
    if(!formData || !Object.keys(formData).length) {
      return formData;
    }
    let parsedFormData = JSON.parse(JSON.stringify(formData));
    for(const key in parsedFormData) {
      let splitBy = "";
      let type = ""
      if(key === "InitiationDate" || key === "ClosureDate") {
        splitBy = "-";
        type = "date";
      }
      let val = parsedFormData[key]
      parsedFormData[key] = Utils.translate(val, this.t, type, splitBy);
    }
    return parsedFormData;
  }

  renderContent = () => {

    const { formData, errorSchema} = this.state;
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
                {this.t(`Our ${this.getInterestType(true)} Calculator puts you in charge.`)}
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
                            schema={jsonSchema(this.t, this.getInterestType(true))}
                            uiSchema={uiSchema(this.t, this.getInterestType(true))}
                            formData={this.parseFormData(formData)}
                            validator={validator}
                            onChange={(e) => this.onChange(e)}
                            onSubmit={(e) => this.onSubmit(e)}
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






