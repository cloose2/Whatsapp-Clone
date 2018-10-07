import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers/index';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

export default class App extends Component {

  componentWillMount(){
    let config = {
      apiKey: "AIzaSyAdkzDhlQeqTB5yIK0Bb4y26mTIq8kcuBM",
      authDomain: "whatsapp-9b124.firebaseapp.com",
      databaseURL: "https://whatsapp-9b124.firebaseio.com",
      projectId: "whatsapp-9b124",
      storageBucket: "whatsapp-9b124.appspot.com",
      messagingSenderId: "283240890370"
    };
    firebase.initializeApp(config);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
        <Routes/>
      </Provider>
    );
  }
}


