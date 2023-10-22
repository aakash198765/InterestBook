import React from "react";

// External components
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// Internal Components
import Dashboard from "./pages/Dashboard";
import Computation from "./pages/Computation";



class Router extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {}
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/dashboard" > <Dashboard /> </Route>
                    <Route exact path="/computation"> <Computation /> </Route>
                    <Route path="*" > <Dashboard /> </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;