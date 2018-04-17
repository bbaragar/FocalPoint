import React, { Component } from 'react';
import {
    View, StatusBar,
    StyleSheet, Text, Dimensions, TouchableHighlight, AsyncStorage,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../Assets/styleConfig";
import {TaskScroll} from "../Components/taskScroll";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator } from 'react-navigation';

let sWidth = Dimensions.get('window').width;
let sLength = Dimensions.get('window').height;

var rememberSettings = "";
class taskSC extends React.Component {


    static navigationOptions = { header: null };
    constructor(props) {
        rememberSettings = JSON.stringify(AsyncStorage.getItem('AlreadySet'));

        if (rememberSettings.contains('t')) {
            global.pickerClosed = true;
        }

        super(props);
        this.state = {
            finished: false,
            focusPoints: 0,
        }
    }
    render(){
        return(
            <LinearGradient colors={[Colors.backgroundGradLow,Colors.backgroundGradHigh]} style = {styles.protoView}>
                <View style={{flex: 3, }}>
                    <TaskScroll>
                    </TaskScroll>
                </View>

              <Icon name ={'circle'} size={60} color= {'white'}  style = {styles.addButton}></Icon>
              <Icon name ={'plus-circle'} size={60} color= {Colors.iconPrimary} style = {styles.addButton}>
            </Icon>

            </LinearGradient>
        );}
}
export default taskSC

const styles = StyleSheet.create({
        testView:
            {
                flex: 1,
            },
        protoView: {
            flex: 0,
            width: sWidth,
            height: sLength,
            flexDirection: 'column',
            alignItems: 'center',
            //justifyContent: 'center',
        },

        addButton:{
          position: 'absolute',
          bottom: 30,
          right:10,

        }

    }
);
/*

 <View  elevation={18} style = {[styles.addButton,{height:50,width:50,borderRadius:30,backgroundColor:Colors.iconPrimary,elevation:30,}]}>

              </View>

 */