import "./style.scss";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from "react-i18next";

import appLogo from "../../assests/images/appLogo.png";

import Dropdown from "../Dropdown";
import resources from "../../i18n/resources";
import Utils from "../../libs/Utils";


class NavBar extends Component {
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
        case "dashboard": 
            return this.navigate('/dashboard');
        case "computation": 
            return this.navigate('/computation');
        default: 
        return;
    }
  }

  navigate = (url) => {
    this.props.history.push(url)
  }

  changeLanguage = (language) => {
    let lng = language.key;
    let { i18n } = this.props;
    i18n.changeLanguage(lng);
    Utils.setToLocalStorage("lng", lng);
  }

  // Define you render components
  renderNavbar = () => {

    return(
       <div className="navbar">
            <div className="navbar-left" onClick={() => this.navigateTo("dashboard")}>
                <div className="app-logo">
                  <img src={appLogo} alt="Company Logo" />
                </div>
                <div className="app-name">
                  {this.t("Lahana Bahee")}
                </div>
            </div>
            <div className="navbar-right">
                <div className="login-register">
                    <span className="login-header-text" onClick={()=>{}}>{this.t("Login/Register")}</span>
                </div>
                <div className="language-selector">
                    <Dropdown data={resources("languages")} selected={Utils.getFromLocalStorage("lng")} callback={this.changeLanguage} />
                </div>
            </div>
       </div>
    )
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
      </>
    );
  }
}

export default withTranslation()(withRouter(NavBar));






