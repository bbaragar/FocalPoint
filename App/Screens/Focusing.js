import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  AsyncStorage,
  Text,
  Dimensions,
    Alert,
  View,
  TouchableHighlight, Modal,
} from 'react-native'
import {Colors} from "../Assets/styleConfig";
import LinearGradient from "react-native-linear-gradient";
import {NavMenu} from "../Components/navMenu";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressBar from 'react-native-progress/Bar';
import  FocusSetModal from '../Components/FocusSetModal'


var hailMary;
var sWidth = Dimensions.get('window').width;
var sLength = Dimensions.get('window').length;

var storageSecondsString = " k";
var storageSecondsInt = 0;

class focusingSC extends React.Component {
  static navigationOptions = { header: null };


  constructor(props) {
    super(props);
    this.timer =null;
    this.closeMod=this.closeMod.bind(this);
    this.state = {
        //finished: true,
        elapsed:0,
        startTime:  global.startTime,
        endTime: global.endTime,
        difference: global.endTime-global.startTime,
        percentFill: 0,
        Remaining: 1,
        seconds:59,
        //'Time': this.grabStorage(),
        nextText:" Until Break",
        modalVisible: !global.isSet,

    };
/*
    storageSecondsString = JSON.stringify(this.grabStorage());

    storageSecondsString = JSON.stringify(this.state.Time);
    storageSecondsInt = 0;

    var decimalPlace = 1;
    for (var i = 0; i < storageSecondsString.length; i++) {
        decimalPlace = 1;
        if (!Number.isNaN(parseInt(storageSecondsString.charAt(i)))) {
            for (var j = i + 1; j < storageSecondsString.length; j++) {
                if (Number.isNaN(parseInt(storageSecondsString.charAt(j)))) {
                    break;
                }
                else {
                    decimalPlace *= 10;
                }
            }
            storageSecondsInt += (parseInt(storageSecondsString.charAt(i))) * decimalPlace;
        }
    }

    //this.state.Time = storageSecondsInt;
    this.state.endTime = this.state.Time + Math.floor(Date.now() / 1000);
    this.state.startTime = Math.floor(Date.now() / 1000);
    this.state.difference = this.state.endTime - this.state.startTime;
*/
        //TODO Switch "global.-----" to using async storage or another global writable variable
  }
/*
  async grabStorage() {
      this.setState({
          'Time': await AsyncStorage.getItem('Time'),
          finished: false,
          elapsed: 0,
          difference: this.state.difference,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          percentFill: 0,
          Remaining: 0,
          seconds: 0,
          nextText: "Until Break",
          modalVisible: !global.pickerClosed,
      });

      hailMary = JSON.stringify(JSON.parse(this.state.Time));
      storageSecondsString = JSON.stringify(hailMary);

      storageSecondsString = JSON.stringify(this.state.Time);
      storageSecondsInt = 0;

      var decimalPlace = 1;
      for (var i = 0; i < storageSecondsString.length; i++) {
          decimalPlace = 1;
          if (!Number.isNaN(parseInt(storageSecondsString.charAt(i)))) {
              for (var j = i + 1; j < storageSecondsString.length; j++) {
                  if (Number.isNaN(parseInt(storageSecondsString.charAt(j)))) {
                      break;
                  }
                  else {
                      decimalPlace *= 10;
                  }
              }
              storageSecondsInt += (parseInt(storageSecondsString.charAt(i))) * decimalPlace;
          }
      }
      this.state.Time = storageSecondsInt;
      this.state.endTime = this.state.Time + Math.floor(Date.now() / 1000);
      this.state.startTime = Math.floor(Date.now() / 1000);
      this.state.difference = this.state.endTime - this.state.startTime;
      hailMary = storageSecondsInt;
      return hailMary;
  }
  */

  componentDidMount() {
    console.log(global.isSet)
    console.log("mount")
    if(global.isSet){
      this.start();
    }


    }
  start(){
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.tick();

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    //console.log('update')
  }

  tick () {

    let timeStamp = Math.floor(Date.now() / 1000);

    let elapsed = timeStamp - global.startTime;

    let percent = Math.floor((elapsed / (this.state.difference+1)) * 100);

    let remaining = global.endTime - Math.floor(Date.now() / 1000)

    let seconds = remaining % 60;

    if (remaining < 1 && global.isSet) {

      this.toggleFinished();
    }

    this.setState({
      percentFill: percent,
      elapsed: elapsed,
      Remaining: remaining,
      seconds: seconds,
    });

    //await AsyncStorage.setItem('Time', JSON.stringify(this.state.Remaining));

  }

  getFormattedTime(inSeconds){
    const totalSeconds = Math.round(inSeconds);

    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? ':0' + seconds : ':'+ seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //hours = hours < 10 ? '0' + hours  : hours;

    return hours + ':' + minutes;
  }

  countDown(){
    if(this.state.Remaining<1){

      return "0:00"
    }else {
      return this.getFormattedTime(this.state.Remaining);
    }
  }


  toggleFinished() {
    clearInterval(this.timer);
    global.isSet = false;
    this.setState({
      percentFill: 0,
      seconds: 59,
      Remaining:0,
    });

   // await AsyncStorage.setItem('AlreadySet', 'false');
  }

  resetTime(){
    this.toggleFinished();
    this.showMod();
  }
  endTime(){

    this.toggleFinished();
  }

  showMod() {
    this.setState({modalVisible: true});
  }

  closeMod() {

    this.setState({modalVisible: false});

    this.setState({
      startTime: global.startTime,
      endTime: global.endTime,
      difference: global.endTime-global.startTime,
    })

    if(global.isSet){

      this.start();
    }
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
              <FocusSetModal closeModal={this.closeMod}/>
          </Modal>
          <View style={styles.topPart}>
              <NavMenu></NavMenu>
              <View style={styles.protoCard}>
                  <View style={styles.nextCard}>
                    {/*"Up Next: \n                 Placeholder"*/}
                      <Text>{global.zwrt}</Text>
                  </View>
              </View>
              <View style={styles.protoCard}>
                  <View style={styles.currentCard}>
                      <Text>placeholder</Text>
                  </View></View>
          </View>
          <View style={styles.bottomShelf }>
              <View style={{height: 20}} />
              <AnimatedCircularProgress
                size={220}
                width={10}
                backgroundWidth={5}
                fill={this.state.percentFill}
                rotation={225}
                arcSweepAngle={ 270}
                tintColor={Colors.iconPrimary}
                linecap={'round'}
                backgroundColor="#ece5ff" >
                {
                  (fill) =>(
                    <View style={styles.timerCenter}>
                        <Text  style = {styles.TimerText}>{this.countDown()}</Text>
                        <ProgressBar
                          progress={this.state.seconds/60}
                          width={150}
                          height={2}
                          borderRadius={1}
                          borderWidth={0}
                          color={'#a8a8a8'}
                        />
                        <Text style={styles.timerSugarText}>{this.state.nextText}</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>
            <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>

              <TouchableHighlight
                style={styles.button}
                onPress={ ()=> {this.resetTime()}}
                underlayColor = {Colors.iconPrimary}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                onPress={ ()=> {this.endTime()}}
                underlayColor = {Colors.iconPrimary}>
                <Text style={styles.buttonText}>End</Text>
              </TouchableHighlight>

            </View>
          </View>
      </LinearGradient>
    )
  }
}
export default focusingSC

const styles = StyleSheet.create({

  protoView: {
    flex: 1,
    width: sWidth,
    height: sLength,
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  topPart: {
    flex: 1,
    height: sLength/2,
    alignItems: 'center',
    flexDirection: 'column',
  },

  protoCard: {
    //flex:1,
    alignItems: 'center',
    //justifyContent: 'center',
    width: sWidth,
    //paddingHorizontal:10,
    //borderWidth: 2,
    //paddingVertical: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },

  nextCard: {
    //flex: 1,
    elevation: 10,
    backgroundColor: Colors.backgroundGradLow,
    //backgroundColor: 'rgba(0,0,255,0.3)',
    borderRadius: 8,
    //borderWidth: 2,
    height: 60,
    padding: 10,
    width: sWidth - 20,
    zIndex: 10,
  },

  currentCard: {
    //flex: 1,
    elevation: 10,
    backgroundColor: Colors.backgroundGradLow,
    //backgroundColor: 'rgba(0,0,255,0.3)',
    borderRadius: 8,
    //borderWidth: 2,
    height: 110,
    padding: 10,
    width: sWidth - 20,
    zIndex: 10,
  },

  bottomShelf:{
    flex: 1,
    //position: 'absolute',
    elevation: 10,
    backgroundColor: Colors.backgroundGradLow,
    //backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    alignItems: 'center',
    //justifyContent: 'center',
    height: sLength/2,
    width: sWidth - 20,
  },

  TimerText: {
    height:80,
    fontSize: 70,
  },

  timerCenter:{
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',

    flexDirection: 'column',
  },

  timerSugarText:{
    paddingTop: 10,
    fontSize: 20,
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
});
