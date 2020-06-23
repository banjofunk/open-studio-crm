import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Home extends Component {
  componentDidMount(){
    Auth.currentAuthenticatedUser()
  }
  render() {
    return (
      <div className="Home">
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default Home;
