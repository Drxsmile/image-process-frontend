import React, { Component } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./App.css";
import Framework from "./components/Framework";
import { appRoutes } from "./routes/RouteIndex";

class App extends Component<any, any> {
  public render() {
    return (
      <Router>
        <Framework>
          <Switch>
            {appRoutes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
            <Redirect to="/home" from="/" />
            {/*<Redirect to="/404" />*/}
          </Switch>
        </Framework>
      </Router>
    );
  }
}

export default App;
