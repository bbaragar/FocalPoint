import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  AsyncStorage,
  View,
  Platform,
  ViewPropTypes,
  TouchableHighlight, ScrollView, Touchable, TextInput
} from 'react-native'
import {Colors} from '../Assets/styleConfig'
import {Task} from '../dataStructs/Task'
import PropTypes from 'prop-types';
import { DatePicker, WheelPicker } from 'react-native-wheel-picker-android'
import FadeInView from './FadeInView'

var sWidth = Dimensions.get('window').width
var sLength = Dimensions.get('window').height


const hourList= ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const minuteList= ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59', ];
const morningOrNight= ['AM', 'PM'];

export default class AddTaskModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nameIn:'',
      descriptIn:'',
      'Tasks': this.grabTasks(),
      dateShow: false,
      hourSelect: 11,
      minuteSelect:59,
      ampmSelect:'PM',
      daySelect:0,
      priority:false,

      dateText: " Due Date",
    }
  };

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

  setNormal(){
    this.setState({
      priority:false
    })
  }
  setPriority(){
    this.setState({
      priority:true
    })
  }


  modHandler(){
    this.props.closeModal()
  }

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
  getTime(){
    var secondsRequested = 0;
    var hours;

    if (hourList[this.state.hourSelect] == '12') {
      hours = 0;
    } else {
      hours =
        (Number.parseInt(hourList[this.state.hourSelect], 10)) *
        3600;
    }

    var minutes =
      Number.parseInt(minuteList[this.state.minuteSelect], 10) *
      60;
    var am_or_pm = morningOrNight[this.state.ampmSelect];

    if (am_or_pm == 'PM') {
      secondsRequested += 12 * 3600; //this accounts for the first 12 hours of the day
    }

    var days = minuteList[this.state.daySelect]*24*3600;


    //adds on requested hours and minutes
    secondsRequested += hours + minutes+days;

    /* if user requests time within the next day, do additional arithmetic */
    if (secondsRequested - this.getCurrentTime() < 0) {
      return secondsRequested + (24 * 3600 - this.getCurrentTime());
    } else {
      return secondsRequested - this.getCurrentTime();
    }
  }

  addNote(){
    this.createTask();
    this.modHandler();
  }
  async grabTasks() {
    try {
      const test = await AsyncStorage.getItem('TaskList');
      allTasks = JSON.parse(test);
    } catch (error) {
      //add first task if they don't have any tasks
      const test = await AsyncStorage.setItem('TaskList', JSON.stringify(allTasks));
      allTasks = JSON.parse(test);
    }

    return allTasks;
  }

  async createTask() {

    //find numerical priority inputted by user
    var priority = this.state.selectedItem1;

    taskName = this.state.nameIn;

    taskDescription = this.state.descriptIn;

    dueDate = this.getTime();

    tpriority = this.state.priority ? 3 : 1;

    //grab current task list to push new task onto it
    //var taskList = this.grabTasks();

    var newTask = [
      new Task(tpriority, 'New Task', dueDate, 'Placeholder', taskName, taskDescription, false, 0)
    ];

    //add new task onto list of all tasks
    allTasks = allTasks.concat(newTask);

    this.storeTask(newTask);
  }

  //stores a provided Task object with the other tasks.
  async storeTask(task) {
    await AsyncStorage.setItem('TaskList', JSON.stringify(allTasks));

    //test alert
    //Alert.alert(JSON.stringify(allTasks));

  }

  render () {
    let pickerProps ={style: styles.pickerStyle, isCurved: false,isCyclic:true, isAtmospheric:true, visibleItemCount:3, renderIndicator:true, indicatorColor: 'grey',
      itemTextColor: 'black',
    };
    let uColor = this.state.priority ? Colors.iconPrimary : 'transparent' ;
    let fColor = this.state.priority ? 'transparent' : Colors.iconPrimary;
    return (
      <View style={styles.protoModal}>

        <TouchableHighlight
          style={styles.clickAround}
          onPress={ ()=> {this.modHandler()}}
          underlayColor = 'transparent'>
          <Text>o</Text>
        </TouchableHighlight>

        <View style={styles.modalCard}>
          <ScrollView style={{ width: sWidth - 70, borderBottomWidth:2}}
                      keyboardShouldPersistTaps={'handled'}>
            <View style={{flex:1, marginHorizontal:6,}}>
              <TextInput
                style={{height: 40, backgroundColor: '#e6e6e6',borderRadius:5}}
                underlineColorAndroid={'transparent'}
                autoFocus={true}
                placeholder={"Name"}
                onChangeText={(nameIn) => this.setState({nameIn})}
                onSubmitEditing={() => { this.descInput.focus(); }}
                value={this.state.nameIn}>
              </TextInput>
              <Text> </Text>
              <TextInput
                ref={(input) => { this.descInput = input; }}
                style={{ height: 40, backgroundColor: '#e6e6e6',borderRadius:5}}
                underlineColorAndroid={'transparent'}
                placeholder={"Description"}
                onChangeText={(descriptIn) => this.setState({descriptIn})}
                value={this.state.descriptIn}>
              </TextInput>
              <Text> </Text>

              {/*
                date picker
                time picker

                make expanding from single line
                <DatePicker></DatePicker>

                 */}


              {/*
                 <TouchableHighlight style={{ flex:1}}>
                   <Text style={{color:'grey'}}>{this.state.dateText}</Text>
                 </TouchableHighlight>
              */}

              <View
                style={{
                  flex:1,
                  paddingTop:20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e6e6e6',
                  borderRadius:5,
                }}>
                <WheelPicker
                  {...pickerProps}
                  data={hourList}
                  selectedItemPosition={this.currentPickerTime(0)}
                  onItemSelected={(event)=>{this.setState({hourSelect: event.position})}}>
                </WheelPicker>
                <Text style={{fontSize: 25}}>:</Text>
                <WheelPicker
                  {...pickerProps}
                  data={minuteList}
                  selectedItemPosition={this.currentPickerTime(1)}
                  onItemSelected={(event)=>{this.setState({minuteSelect: event.position})}}>
                </WheelPicker>
                <Text style={{fontSize: 25}}> </Text>
                <WheelPicker
                  {...pickerProps}
                  data={morningOrNight}
                  selectedItemPosition={this.currentPickerTime(2)}
                  isCyclic={false}
                  onItemSelected={(event)=>{this.setState({ampmSelect: event.position})}}>
                </WheelPicker>
                {/*
                <View style={[styles.pickerStyle,{justifyContent: 'space-around'}]}>
                  <TouchableHighlight
                    style={styles.shortButton}
                    onPress={ ()=> {this.modHandler()}}
                    underlayColor = {Colors.iconPrimary}>
                    <Text  style={styles.buttonText}>EOD</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.shortButton}
                    onPress={ ()=> {this.modHandler()}}
                    underlayColor = {Colors.iconPrimary}>
                    <Text  style={styles.buttonText}>OK</Text>
                  </TouchableHighlight>

                </View>
*/}
              </View>
              <Text> </Text>
              <View
                style={{
                  flex:1,
                  paddingTop:20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#e6e6e6',
                  borderRadius:5,
                }}>
                <WheelPicker
                  {...pickerProps}
                  data={minuteList}
                  onItemSelected={(event)=>{this.setState({daySelect: event.position})}}>
                </WheelPicker>
                <Text>Days away  </Text>




              </View>
              <Text> </Text>
              <View style={styles.segmentButtonView}>
                <TouchableHighlight
                  style={{flex:1,alignItems: 'center',backgroundColor: fColor}}
                  onPress={ ()=> {this.setNormal()}}
                  underlayColor = {Colors.iconPrimary}>
                  <Text style={styles.buttonText}>Normal</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{flex:1,alignItems: 'center',backgroundColor: uColor}}
                  onPress={ ()=> {this.setPriority()}}
                  underlayColor = {Colors.iconPrimary}>
                  <Text style={styles.buttonText}>Priority</Text>
                </TouchableHighlight>
              </View>



              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>



            </View>
          </ScrollView>
          <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'space-around', marginTop:10}}>
            <TouchableHighlight
              style={styles.sButton}
              onPress={ ()=> {this.addNote()}}
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


AddTaskModal.propTypes = {
  closeModal: PropTypes.func,
};


const styles = StyleSheet.create({
  protoModal: {
    flex: 1,
    top:0,
    bottom:0,
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

    //position:'absolute',

    width: sWidth,
    height:sLength,
    alignItems: 'center',
    justifyContent: 'center',
    //flex:0,

    alignSelf:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  modalCard: {
    top:50,
   paddingTop:30,
    height:sLength-150,
    position:'absolute',
    flexDirection:'column',
    elevation: 16,
    alignItems: 'center',
    backgroundColor: Colors.backgroundGradLow,
    borderRadius: 12,
    // borderWidth: 2,
   // height: 300,
    padding: 10,
    width: sWidth - 60,
    zIndex: 10
  },

  sButton:{

    //bottom:10,
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

  shortButton:{

    //bottom:10,

    borderColor: Colors.iconPrimary,
    borderWidth: 2,
    //marginHorizontal:20,
    height: 40,
    //width: 90,
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

  pickerStyle: {
    width: 50,
    height: 120,
    marginHorizontal: 10,
  },
  segmentButtonView:{

    height: 30,
    width: 150,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.iconPrimary,
    flexDirection: 'row',
    alignSelf:'center',
  },
});