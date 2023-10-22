import "./style.scss";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Page extends Component {
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

  // Define you render components

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Page);






