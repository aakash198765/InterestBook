import './App.css';
import './style.scss';

import React from "react";
import { withTranslation } from 'react-i18next';

import Router from './router';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render () {
    return (
      <div className="App">
        <Router />
      </div>
    )
  }
}

export default withTranslation()(App);
