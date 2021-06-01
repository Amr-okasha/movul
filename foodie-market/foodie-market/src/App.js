import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Header from "./component/Header";
import SignIn from "./component/signin";
import HomeScreen from "./screen/HomeScreen";


class App extends Component {
  state = {}
  render() {
    return (<div >
      <Header />
      {/* <Switch></Switch> */}
      <Route path="/sign-in" component={SignIn} />
      <Route path="/" exact component={HomeScreen} />
      <Redirect to="/" />

    </div >)
  }
}

export default App;

