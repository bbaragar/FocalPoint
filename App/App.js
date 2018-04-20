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
import TaskPick from './Screens/PickTask';
import NavigationService from './NavigationService'
import comingSoon from './Screens/ComingSoon'



const TopLevelNavigator = StackNavigator(
  {
    Tasks: {
      screen: taskSC
    },
      PickTime: {
        screen: Picking
      },
      PickTask: {
        screen: TaskPick
      },
    //for use when testing a new screen or component
    Test: {
      screen: test
    },
    Focus: {
      screen: focusingSC
    },
    ComingSoon:{
      screen: comingSoon
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

  }


  render () {
    return <TopLevelNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  }
}
