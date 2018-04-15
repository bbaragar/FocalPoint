/* eslint-disable no-unused-vars */
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
import {vMemory} from '../App'
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android';
import FadeInView from './FadeInView'

var sWidth = Dimensions.get('window').width
var sLength = Dimensions.get('window').height


const hourList= ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const  minuteList= ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59', ];
const  morningOrNight= ['AM', 'PM'];
const  forHours= ['0','1','2','3','4','5','6','7','8','9','10','11','12',];
const  forMinutes= ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59',];



export class FocusSetModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      until:true,
      selectedItem1: 0,
      selectedItem2: 0,
      selectedItem3: 0,
      itemIndex: 0,
      itemValue: 0,
    }
  };

  setUntil(){
    this.setState({
      until: true
    })
  }
  setFor(){
    this.setState({
      until: false
    })
  }

  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  currentPickerTime(hmt){
    if(hmt === 0){
      let offset = new Date().getTimezoneOffset()/60;
      let time = (Math.floor(Date.now()/3600000)- offset)%12;
      return time;
    }else if(hmt ===1){
      let offset = new Date().getTimezoneOffset();
      let time = Math.floor(Date.now()/60000)%60;

      return time;
    }else if(hmt ===2){
      let offset = new Date().getTimezoneOffset()/60;
      let time = Math.floor(Date.now()/3600000 - offset)%24;

      //probably doesn't work correctly when current time is noon
      if(time>12){
        return 1;
      }else{
        return 0;
      }
    }else{
      return 0;
    }
  }


  setFinalTime() {
    /*
      if user selected the UNTIL functionality, use arithmetic to transform option into seconds.
    */
    if (this.state.until) {
      var secondsRequested = 0;
      var hours;

      if (hourList[this.state.selectedItem1] == '12') {
        hours = 0;
      } else {
        hours =
          Number.parseInt(hourList[this.state.selectedItem1], 10) *
          3600;
      }

      var minutes =
        Number.parseInt(minuteList[this.state.selectedItem2], 10) *
        60;
      var am_or_pm = morningOrNight[this.state.selectedItem3];

      if (am_or_pm == 'PM') {
        secondsRequested += 12 * 3600; //this accounts for the first 12 hours of the day
      }

      //adds on requested hours and minutes
      secondsRequested += hours + minutes;

      /* if user requests time within the next day, do additional arithmetic */
      if (secondsRequested - this.getCurrentTime() < 0) {
        return secondsRequested + (24 * 3600 - this.getCurrentTime());
      } else {
        return secondsRequested - this.getCurrentTime();
      }
    } else {
      //end conditions for until option

      // if user selects the "FOR" option, return (hours * 3600) + (minutes * 60) to get second count.
      return (
        Number.parseInt(forMinutes[this.state.selectedItem2], 10) *
        60 +
        Number.parseInt(forHours[this.state.selectedItem1], 10) *
        3600
      );
    }
  }

  /*
   method to convert phone's current time to seconds, to be used for the UNTIL functionality
 */
  getCurrentTime() {
    // Creating variables to hold time.
    var totalSeconds, date, hour, minutes, seconds;

    // Creating Date() function object.
    date = new Date();

    // Getting current hour from Date object.
    hour = date.getHours();
    totalSeconds = hour * 3600;

    // Getting the current minutes from date object.
    minutes = date.getMinutes();
    totalSeconds += minutes * 60;

    //Getting current seconds from date object.
    seconds = date.getSeconds();
    totalSeconds += seconds;

    //gives us total seconds to perform arithmetic
    return totalSeconds;
  }

  modHandler(){
    this.props.closeModal()
  }

  setTime(toSet){




    this.modHandler();
  }

  enterTime(){

    //TODO need usable persistent global storage before this can be implemented
    /*




    */
    this.modHandler();
  }

  render () {
    let pickerProps ={style: styles.pickerStyle, isCurved: false,isCyclic:true, isAtmospheric:true, visibleItemCount:3, renderIndicator:true, indicatorColor: 'grey',
      itemTextColor: 'black',
    };
    let uColor = this.state.until ? Colors.iconPrimary : 'transparent' ;
    let fColor = this.state.until ? 'transparent' : Colors.iconPrimary;

    var transeTime = this.setFinalTime();
    return (
      <View style={styles.protoModal}>

        <TouchableHighlight
          style={styles.clickAround}
          onPress={ ()=> {this.modHandler()}}
          underlayColor = 'transparent'>
         <Text>o</Text>
        </TouchableHighlight>

        <View style={styles.modalCard}>
          <View style={styles.segmentButtonView}>
            <TouchableHighlight
              style={{flex:1,alignItems: 'center',backgroundColor: uColor}}
              onPress={ ()=> {this.setUntil()}}
              underlayColor = {Colors.iconPrimary}>
              <Text style={styles.buttonText}>Until</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{flex:1,alignItems: 'center',backgroundColor: fColor}}
              onPress={ ()=> {this.setFor()}}
              underlayColor = {Colors.iconPrimary}>
              <Text style={styles.buttonText}>For</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.centerView}>

            {this.renderIf(
              this.state.until,
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
              <View
                style={{

                  paddingTop:20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <WheelPicker
                  {...pickerProps}
                  data={hourList}
                  selectedItemPosition={this.currentPickerTime(0)}
                  onItemSelected={(event)=>{this.setState({selectedItem1: event.position})}}>
                </WheelPicker>
                <Text style={{fontSize: 25}}>:</Text>
                <WheelPicker
                  {...pickerProps}
                  data={minuteList}
                  selectedItemPosition={this.currentPickerTime(1)}
                  onItemSelected={(event)=>{this.setState({selectedItem2: event.position})}}>
                </WheelPicker>
                <Text style={{fontSize: 25}}> </Text>
                <WheelPicker
                  {...pickerProps}
                  data={morningOrNight}
                  selectedItemPosition={this.currentPickerTime(2)}
                  isCyclic={false}
                  onItemSelected={(event)=>{this.setState({selectedItem3: event.position})}}>
                </WheelPicker>
              </View>

                <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>

                  <TouchableHighlight
                    style={styles.button}
                    onPress={ ()=> {this.setFor()}}
                    underlayColor = {Colors.iconPrimary}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableHighlight>


                    <Text style={styles.buttonText}> Next event or sleep</Text>



                </View>
              </View>
            )}

            {this.renderIf(
              !this.state.until,
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
              <View
                style={{
                  paddingTop:20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>

                  <WheelPicker
                    {...pickerProps}
                    data={forHours}
                    onItemSelected={(event)=>{this.setState({selectedItem1: event.position})}}>

                  </WheelPicker>

                </View>
                <Text style={{fontWeight: 'bold', height: 20 }}>Hrs</Text>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>

                  <WheelPicker
                    {...pickerProps}
                    data={forMinutes}
                    onItemSelected={(event)=>{this.setState({selectedItem12: event.position})}}>
                  </WheelPicker>

                </View>
                <Text style={{fontWeight: 'bold', height: 20 }}>Mins</Text>
              </View>
              <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>

              <TouchableHighlight
              style={styles.button}
              onPress={ ()=> {this.setFor()}}
              underlayColor = {Colors.iconPrimary}>
              <Text style={styles.buttonText}>90 min</Text>
              </TouchableHighlight>

              <TouchableHighlight
              style={styles.button}
              onPress={ ()=> {this.setFor()}}
              underlayColor = {Colors.iconPrimary}>
              <Text style={styles.buttonText}>30 min</Text>
              </TouchableHighlight>


              </View>
              </View>
            )}
          </View>

          <TouchableHighlight
            style={styles.sButton}
            onPress={ ()=> {this.enterTime()}}
            underlayColor = {Colors.iconPrimary}>
            <Text  style={styles.buttonText}>Select</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }
}

FocusSetModal.propTypes = {
  closeModal: PropTypes.func,
};

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
    height: 320,
    padding: 10,
    width: sWidth - 60,
    zIndex: 10
  },

  centerView:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
  },

  segmentButtonView:{

    height: 30,
    width: 150,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.iconPrimary,
    flexDirection: 'row',
  },

  button:{
    borderColor: Colors.iconPrimary,
    borderWidth: 2,
    marginHorizontal:20,
    height: 35,
    width: 80,
    borderRadius:8,
    alignItems: 'center',
    backgroundColor: Colors.iconPrimary,
    justifyContent: 'center',
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

  pickerStyle: {
    width: 50,
    height: 120,
    marginHorizontal: 10,
  },

  buttonText:{
    //fontWeight: 'bold',
    fontSize: 16,
    color:'black',
  }


})
