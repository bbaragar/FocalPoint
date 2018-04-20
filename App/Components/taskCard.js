/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Platform,
  ViewPropTypes,
  TouchableHighlight, ScrollView
} from 'react-native'
import {Colors} from '../Assets/styleConfig'
import {Task} from '../dataStructs/Task'
import Icon  from 'react-native-vector-icons/FontAwesome';
import MatIcon  from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
var sWidth = Dimensions.get('window').width

export class CardButton extends React.Component {
  static props = {
    OnPress: PropTypes.func.isRequired,
    IconName: PropTypes.string,
    Big: PropTypes.bool,
    Selected: PropTypes.bool,
  }
  render() {
    const  {IconName,OnPress} = this.props;
    const size = 22
    return(
      <TouchableHighlight onPress={OnPress.bind(this)}  underlayColor={Colors.buttonHighlight}  style = {styles.Button}>
        <MatIcon name ={IconName} size={size} color= {Colors.iconPrimary} style = {styles.Icons}/>
      </TouchableHighlight>
    );
  }
}

export class CardMenu extends React.Component {

  //edit task
  //add notes
  //focus
  _buttonPress1(){
    console.log('Pressed!');}
  _buttonPress2(){
    console.log('Pressed!');}
  _buttonPress3(){
    console.log('Focus');}

  render() {
    return (
      <View style = {styles.navBar}>
        <CardButton OnPress={this._buttonPress1} IconName= 'border-color'/>
        <CardButton OnPress={this._buttonPress2} IconName= 'timer-sand'/>
        <CardButton OnPress={this._buttonPress3} IconName= 'note-outline'/>
      </View>
    );
  }
}


export class TaskCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      task: new Task(2, 'Personal', 1527638400, 1527206400, 'Finish App', 'Important\npurple and teal are dope', 'so much to do', false, 0),
      expanded: true,
      animation: new Animated.Value(100)

    }
  }

  _setMaxHeight (event) {
    this.setState({'maxHeight': 155})
  }

  _setMinHeight (event) {
    this.setState({'minHeight': 100})
  }

  expand () {
    let initialValue = this.state.maxHeight + this.state.minHeight,
      finalValue = this.state.minHeight;

    this.setState({'expanded': true // Step 2
    });

    this.state.animation.setValue(initialValue) // Step 3
    Animated.spring( // Step 4
      this.state.animation,
      {'toValue': finalValue}
    ).start() // Step 5
  }

  collapse () {
    let initialValue = this.state.minHeight
    let finalValue = this.state.maxHeight + this.state.minHeight

    this.setState({'expanded': false // Step 2
    });

    this.state.animation.setValue(initialValue) // Step 3
    Animated.spring( // Step 4
      this.state.animation,
      {'toValue': finalValue}
    ).start() // Step 5
  }

  toggle () {
    if (this.state.expanded) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  priorityColor(){


    switch (this.props.task.priority){
      case 3:
        return {color: '#e60000', icon: 'exclamation-circle'};

      case 2:
        return  {color: '#ff8000', icon: 'chevron-circle-up'};

      case 1:
        return  {color: '#00cc00', icon: 'minus-circle'};

      case 0:
        return  {color: '#0066ff', icon: 'chevron-circle-down'};
    }
  }

  getDueDate(){
    let dueIn = this.props.task.dueDate- Math.floor(Date.now()/1000);
    let minutes = parseInt(dueIn / 60) % 60;
    let hours =  parseInt(dueIn / 3600) % 24;
    let days = parseInt(dueIn / 86400) % 7;
    let weeks = parseInt(dueIn / 604800)% 365;

    var rtrn = 'Due in: '

    if(dueIn >=604800){
      rtrn = rtrn + weeks + 'w ';
      if(weeks < 3){
        rtrn = rtrn + days + 'd ';
      }
    }else if(dueIn >=86400){
      rtrn = rtrn + days + 'd ';
      if(days < 3){
        rtrn = rtrn + hours + 'h ';
      }
    }else if(dueIn >=3600){
      rtrn = rtrn + hours + 'h ';
      if(hours <6){
        rtrn = rtrn + minutes + 'm ';
      }

    }else{
      rtrn = rtrn + minutes + 'm ';

    }

    return rtrn;

  }


/*
chevron-circle-up
exclamation-circle
minus-circle
chevron-circle-down
 */
  render () {
        const priority = this.priorityColor();
        const category = this.props.task.category;
        const dueDate = this.getDueDate();
        const name = this.props.task.name;
        const notes = this.props.task.notes;
        const description = this.props.task.description;
        const percentComplete = this.props.task.percentComplete;
        return (
      <Animated.View style={[
        styles.protoCard,
        {'height': this.state.animation}
      ]}>
        <TouchableHighlight onPress={this.toggle.bind(this)} style={styles.card} underlayColor={Colors.buttonHighlight} onLayout={this._setMinHeight.bind(this)}>
          <View style = {{'flex': 1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'column', flex:1}}>
                <Text style={styles.titleText}>{name}</Text>
                <Text style={styles.subtitleText}>{description}</Text>
                <Text style={styles.catText}>{category}</Text>
            </View>
            <View style={{flexDirection:'column'}}>
              <Icon name={priority.icon} color={priority.color} size={30} style={{alignSelf: 'flex-end'}}/>

              <Text style={styles.subtitleText}>{dueDate}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.protoCollapse} >
          <Animated.View style={styles.subCard} onLayout={this._setMaxHeight.bind(this)}>
            <View style={{'flex': 1, 'marginTop': 45, flexDirection:'column',}}>

              <Text style={styles.noteText}>{notes}</Text>
              <View style={{alignSelf:'center', width:sWidth - 50
                ,bottom:0,position:'absolute'}}>
                <CardMenu ></CardMenu>
              </View>

            </View>
          </Animated.View>
        </View>
      </Animated.View>

      )
    }
}

const styles = StyleSheet.create({

  protoCard: {
    // Flex:1,
        alignItems: 'center',
    // JustifyContent: 'center',
        width: sWidth,

    /*
     * PaddingHorizontal:10,
     * borderWidth: 2,
     * paddingVertical: 15,
     */
    paddingBottom: 15,
    marginBottom: 15
    },

  // TODO add shadows for ios
  card: {
    position: 'absolute',
    flex: 1,
    elevation: 10,
    backgroundColor: Colors.backgroundGradLow,
    // BackgroundColor: 'rgba(0,0,255,0.3)',
    borderRadius: 8,
    // BorderWidth: 2,
    height: 90,
    padding: 10,
    width: sWidth - 20,
    zIndex: 10
  },

  protoCollapse: {
    flex: 1,
    alignItems: 'center',
    // BorderWidth: 2,
    paddingTop: 45,
    //paddingBottom: 0,
    width: sWidth

    /*
     * BackgroundColor: 'rgba(0,0,0,0.5)',
     * zIndex: 2,
     */

  },
  subCard: {
    flex: 1,
    elevation: 8,
    backgroundColor: Colors.backgroundGradLow,
    borderRadius: 8,
    /*
     * BorderWidth: 2,
     * height: 50,
     */
    padding: 10,
    paddingBottom:0,
    width: sWidth - 50
    // ZIndex: 2,
  },

  titleText:{
    color: 'black',
    fontSize: 20,
  },

  subtitleText:{
    color: 'grey',
    fontSize: 15,
  },

  catText:{
    color: Colors.iconPrimary,
    fontSize: 15,
  },

  noteText:{
    color: 'black',
    fontSize: 15,
  },

  navBar:{
    alignItems: 'center',
    justifyContent: 'space-around',
    //height:75,
    flexDirection:'row',
   // backgroundColor:'grey',
  },
  Button: {
    flex: 0,
    //width: 70,
    height: 50,
    width:50,
    // borderColor: 'black',
    //borderWidth:1,
    //borderBottomLeftRadius:40,
    //borderBottomRightRadius:40,
    borderRadius:20,
    alignItems: 'center',
    //paddingTop:10,
    justifyContent: 'center',

  },
})
/*
TaskCard.propTypes={
  task: PropTypes.object(Task)

}*/