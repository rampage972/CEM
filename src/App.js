import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NetWork from "./NetWork";
import Login from "./User/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Route exact path={["", "/"]}>
            <Redirect to="/login" />
          </Route>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <NetWork />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
