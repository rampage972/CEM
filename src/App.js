import React from "react";
import "./App.css"
import National from "./National/National";
import Login from "./User/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={National} />
        </Switch>
      </div>


    )
  }
}

export default App;
