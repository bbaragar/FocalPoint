import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableHighlight, Modal,
} from 'react-native'
import {Colors} from "../Assets/styleConfig";
import LinearGradient from "react-native-linear-gradient";
import {NavMenu} from "../Components/navMenu";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressBar from 'react-native-progress/Bar';
import  FocusSetModal from '../Components/FocusSetModal'

var sWidth = Dimensions.get('window').width;
var sLength = Dimensions.get('window').length;

class focusingSC extends React.Component {
  static navigationOptions = { header: null };
  timer=null;


  constructor(props) {
    super(props);
    this.closeMod=this.closeMod.bind(this);

    //TODO Switch "global.-----" to using async storage or another global writable variable
    this.state = {
      finished: false,
      startTime: global.startTime,
      endTime: global.endTime,
      difference: global.endTime-global.startTime,
      elapsed:0,
      percentFill: 0,
      Remaining: 0,
      seconds:0,

      nextText:" Until Break",
      modalVisible: false,

    }
  }

  componentDidMount() {
    timer = setInterval(this.tick.bind(this), 1000)




    this.tick();
  }

  componentWillUnmount() {
    this.clearInterval(this.timer);
  }

  componentDidUpdate() {
    //console.log('update')
  }

  tick() {


    let timeStamp = Math.floor(Date.now()/1000);

    let elapsed = timeStamp - this.state.startTime;

    let percent = Math.floor((elapsed/this.state.difference)*100 );

    let remaining = this.state.endTime-Math.floor(Date.now()/1000)

    let seconds = remaining % 60;

    if(remaining < 1){

      this.toggleFinished();
    }



    this.setState({
      percentFill: percent,
      elapsed: elapsed,
      Remaining:remaining,
      seconds: seconds,
    })

  }

  getFormattedTime(inSeconds){

    const totalSeconds = Math.round(inSeconds);

    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? ':0' + seconds : ':'+ seconds; ;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //hours = hours < 10 ? '0' + hours  : hours;



    return hours + ':' + minutes;
  }

  countDown(){

    if(this.state.finished){
      return "0:00"
    }else {
      return this.getFormattedTime(this.state.Remaining);
    }
  }


  toggleFinished() {
    clearInterval(timer);
    this.setState({
      finished: true,
    });
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
            }}>
              <FocusSetModal closeModal={this.closeMod}></FocusSetModal>
          </Modal>
          <View style={styles.topPart}>
              <NavMenu></NavMenu>
              <View style={styles.protoCard}>
                  <View style={styles.nextCard}>
                      <Text>{"Up Next: \n                 Placeholder"}</Text>
                  </View>
              </View>
              <View style={styles.protoCard}>
                  <View style={styles.currentCard}>
                      <Text>placeholder</Text>
                  </View></View>
          </View>
          <View style={styles.bottomShelf }>
              <View style={{height:20}} ></View>
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
  }

});
