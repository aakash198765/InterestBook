import "./style.scss";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';


import InterestTypes from "./schema/interestTypes";

// Internal Components
import Page from "../../components/Page";
import NavBar from "../../components/NavBar";
import Link from "../../components/Link/Link";

import appLogo from "../../assests/images/appLogo.png";
import dashboardImage from "../../assests/animations/dashboardImage.gif";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // Initialize your component's state if needed
    this.state = {
      // Your state variables go here

    };
    this.t = this.props.t;
  }

  componentDidMount() {
    // Code to run after the component has mounted
    
  }

  componentDidUpdate() {
    // Code to run after the component has rendered
  }

  componentWillUnmount() {
    // Code to run before the component unmounts
  }

  // Define your custom methods and event handlers here
  navigateTo = (id) => {
    switch(id) {
      case "SimpleInterest": 
        return this.navigate('/simple-interest');
      case "CompoundInterest": 
        return this.navigate('/compound-interest');
      case "SekdaInterest": 
        return this.navigate('/sekda-interest');
    }
  }

  navigate = (url) => {
    this.props.history.push(url)
  }

  callback = (type, value) => {
    switch(type){
      case "InterestTypes": 
        this.navigateTo(value.value);
        return;
      default:
        return;
    }

  }

  // Define you render components

  renderContent = () => {

    return(
        <div className="dashboard">
            <div className="dashboard-title">
                <span>
                    {this.t("Empowering financial dreams,")}
                    <br />
                    {this.t("one platform.")}
                </span>
            </div>
            <span className="dashboard-subtitle">{this.t("Secure Lend, Smart Borrow.")}</span>
            <div className="">
                {/* <span className="login-header-text" onClick={()=>this.navigateTo("computation")}>{this.t("Get started")}</span> */}
                <Link 
                  data={InterestTypes} 
                  callback={(value)=>this.callback("InterestTypes", value)}
                />
            </div>
            <div className="dashboardImage">
                    <img src={dashboardImage} alt="Dashboard Image" />
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

export default withTranslation()(withRouter(Dashboard));






