
import React, { Component } from 'react';
import {
  View, StatusBar,
  StyleSheet, Text, Dimensions, TouchableHighlight, AsyncStorage,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../Assets/styleConfig";

import { NavMenu } from '../Components/navMenu'

let sWidth = Dimensions.get('window').width;
let sLength = Dimensions.get('window').height;




class comingSoon extends React.Component {
  static navigationOptions = { header: null };


  componentDidMount(){
    console.log(global.isSet)
}
  render(){
    return(
      <LinearGradient colors={[Colors.backgroundGradLow,Colors.backgroundGradHigh]} style = {styles.protoView}>
        <NavMenu ></NavMenu>
        <View style={{height:sLength/4}}></View>
        <Text style={styles.headingText}>Coming Soon</Text>
      </LinearGradient>
    );}
}
export default comingSoon

const styles = StyleSheet.create({

    protoView: {
      flex: 0,
      width: sWidth,
      height: sLength,
      flexDirection: 'column',
      alignItems: 'center',
      //justifyContent: 'center',
    },

    headingText:{
      color: 'black',
      fontSize: 40,
    }

  }
);