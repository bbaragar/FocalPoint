import React, { Component } from 'react';
import {
    View, StatusBar,
    StyleSheet, Text, Dimensions, TouchableHighlight, AsyncStorage,Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../Assets/styleConfig";
import {TaskScroll} from "../Components/taskScroll";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator } from 'react-navigation';
import AddTaskModal from '../Components/AddTaskModal'

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
      this.closeMod=this.closeMod.bind(this);
        this.state = {
            finished: false,
            focusPoints: 0,
          modalVisible: false,
        }
    }

  showMod() {
    this.setState({modalVisible: true});
  }

  closeMod() {

    this.setState({modalVisible: false});

  }

    render(){
        return(
            <LinearGradient colors={[Colors.backgroundGradLow,Colors.backgroundGradHigh]} style = {styles.protoView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  alert('Modal has been closed.');
                }}
              >
                <AddTaskModal closeModal={this.closeMod}/>
              </Modal>
                <View style={{flex: 3, }}>
                    <TaskScroll>
                    </TaskScroll>
                </View>


              <TouchableHighlight
                style = {{backgroundColor: 'lavender', bottom:20, height:40, width: sWidth/2}}
                onPress = { () => this.showMod()}
              >
                <Text style = {{fontFamily: 'Courier', textAlign: 'center', paddingBottom: 4, fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  Add Task</Text>
              </TouchableHighlight>




              {/*
              <Icon name ={'circle'} size={60} color= {'white'}  style = {styles.addButton}/>
                <Icon.Button name ={'plus-circle'}  size={60} color= {Colors.iconPrimary} style = {styles.addButton}  onPress={this.showMod}/
                */}


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