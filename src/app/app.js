import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './app.scss';
import {
  ClassTypes,
  Schedule,
  Home,
  Locations,
  AppNavbar,
  Users,
  Products
} from 'components'

import Amplify from 'aws-amplify'
import aws_exports from '../aws-exports'
import {
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  // SignUp,
  withAuthenticator
} from 'aws-amplify-react';
import SignIn from 'components/auth/signIn'
import SignUp from 'components/auth/signUp'
Amplify.configure(aws_exports)

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <AppNavbar />
            <div className="app-body">
              <Route exact path="/" component={Home} />
              <Route path="/classes" component={ClassTypes} />
              <Route path="/users" component={Users} />
              <Route path="/products" component={Products} />
              <Route path="/locations" component={Locations} />
              <Route path="/schedule" component={Schedule} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const MyTheme = {
  a: { color: '#3C4B58', 'fontWeight': '600'},
  input: { 'backgroundColor': '#F5F8FA', 'color': '#3C4B58' },
  button: { 'backgroundColor': '#3C4B58' }
}

export default withAuthenticator(App, false, [
  <SignIn />,
  <SignUp />,
  <ConfirmSignUp/>,
  <ForgotPassword/>,
  <RequireNewPassword />
], null, MyTheme);
