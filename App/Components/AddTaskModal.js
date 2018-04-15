import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Platform,
  ViewPropTypes,
  TouchableHighlight, ScrollView, Touchable
} from 'react-native'
import {Colors} from '../Assets/styleConfig'
import {Task} from '../dataStructs/Task'
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android';
import FadeInView from './FadeInView'

var sWidth = Dimensions.get('window').width
var sLength = Dimensions.get('window').height


export default class AddTaskModal extends React.Component {

  modHandler(){
    this.props.closeModal()
  }

  render () {

    return (
      <View style={styles.protoModal}>

        <TouchableHighlight
          style={styles.clickAround}
          onPress={ ()=> {this.modHandler()}}
          underlayColor = 'transparent'>
          <Text>o</Text>
        </TouchableHighlight>

        <View style={styles.modalCard}>




          <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableHighlight
              style={styles.sButton}
              onPress={ ()=> {this.modHandler()}}
              underlayColor = {Colors.iconPrimary}>
              <Text  style={styles.buttonText}>Add</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.sButton}
              onPress={ ()=> {this.modHandler()}}
              underlayColor = {Colors.iconPrimary}>
              <Text  style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </View>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  protoModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: sWidth,
    // paddingHorizontal:10,
    // borderWidth: 2,
    // paddingVertical: 15,
    paddingBottom: 15,
    marginBottom: 15,
    //backgroundColor: '#696969'
  },

  clickAround:{
    position:'absolute',
    width: sWidth,
    height:sLength,
    alignItems: 'center',
    justifyContent: 'center',
    //flex:0,

    alignSelf:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  modalCard: {
    position:'absolute',
    flexDirection:'column',
    elevation: 16,
    alignItems: 'center',
    backgroundColor: Colors.backgroundGradLow,
    borderRadius: 12,
    // borderWidth: 2,
    height: 400,
    padding: 10,
    width: sWidth - 60,
    zIndex: 10
  },

  sButton:{
    borderColor: Colors.iconPrimary,
    borderWidth: 2,
    marginHorizontal:20,
    height: 40,
    width: 90,
    borderRadius:8,
    backgroundColor: Colors.iconPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText:{
    //fontWeight: 'bold',
    fontSize: 16,
    color:'black',
  },


});