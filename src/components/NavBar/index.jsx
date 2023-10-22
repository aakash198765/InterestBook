import "./style.scss";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import appLogo from "../../assests/images/appLogo.png";
import dashboardImage from "../../assests/animations/dashboardImage.gif";

class NavBar extends Component {
  constructor(props) {
    super(props);

    // Initialize your component's state if needed
    this.state = {
      // Your state variables go here
    };
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

  // Define you render components
  renderNavbar = () => {

    return(
       <div className="navbar">
            <div className="navbar-left" onClick={() => this.navigateTo("dashboard")}>
                <div className="app-logo">
                  <img src={appLogo} alt="Company Logo" />
                </div>
                <div className="app-name">
                  InterestBook
                </div>
            </div>
            <div className="navbar-right">
                <div className="login-register">
                    <span className="login-header-text" onClick={()=>{}}>Login/Register</span>
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

export default withRouter(NavBar);






