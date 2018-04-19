import React, { Component } from 'react';
import {
    View, StatusBar,
    StyleSheet, Text, Dimensions, TouchableHighlight, AsyncStorage,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../Assets/styleConfig";
import {TaskScroll} from "../Components/taskScroll";
import {TaskCard} from "../Components/taskCard";
import { StackNavigator } from 'react-navigation';

let sWidth = Dimensions.get('window').width;
let sLength = Dimensions.get('window').height;

//this variable uses async to remember the picker status.
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
    render() {
        return(
            <LinearGradient colors={[Colors.backgroundGradLow,Colors.backgroundGradHigh]} style = {styles.protoView}>
                <View style={{flex: 3, }}>
                    <TaskScroll>
                    </TaskScroll>
                </View>

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
    }
);
