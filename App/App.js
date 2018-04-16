/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View, StatusBar
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import focusingSC from './Screens/Focusing'
import taskSC from './Screens/Tasks'
import test from './Screens/Test'
import Picking from './Screens/PickTime';
import NavigationService from './NavigationService'


const TopLevelNavigator = StackNavigator(
  {
    Tasks: {
      screen: taskSC
    },
      PickTime: {
        screen: Picking
      },
    //for use when testing a new screen or component
    Test: {
      screen: test
    },
    Focus: {
      screen: focusingSC
    }

  },
  {
    initialRouteName: 'Tasks'
  }
);

//for debugging
const testTime = Math.floor(Date.now() / 1000);
const testLength = 5400;

export default class App extends React.Component {
  constructor(){
    super();
    global.isSet = false;
    global.startTime;
    global.endTime;
    global.nextText = ' Until Break' ;
    

  }

  render () {
    return <TopLevelNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  }
}
