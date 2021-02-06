import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './LoginPage.css';

// Initialize Firebase

class LoginPage extends Component {


  state = {
    isSignedIn: false // sign in 
  };

  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: 'popup',  //popup 
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container1">
          <p>Welcome</p>
          <h1>เว็บไซต์สำหรับการวางแผนการกายภาพผู้ป่วยติดเตียง</h1>
          <h5>Please sign-in:</h5>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div className="container1">
        <h1>"Welcome"</h1>
        <h1>เว็บไซต์สำหรับการวางแผนการกายภาพผู้ป่วยติดเตียง</h1>
        <p>Hello{firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );

  }
}
export default LoginPage;

