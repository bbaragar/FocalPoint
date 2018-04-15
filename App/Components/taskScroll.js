import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Platform,
    ViewPropTypes,
    TouchableHighlight, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {Colors} from "../Assets/styleConfig";
import {NavMenu} from "./navMenu";
import {TaskCard} from "./taskCard";
import { Task } from '../dataStructs/Task'
var sWidth = Dimensions.get('window').width;


//testing variables
const currTime = Math.floor(Date.now()/1000);
const Days = 86400;
const hour = 3600;

//(2, 'Personal', 1527638400, 1527206400, 'Finish App', 'Important\npurple and teal are dope', 'so much to do', false, 0)
const currenttasks = [
  new Task(2, 'App dev', currTime + 2*hour, -1, 'Look at App', 'Purple and teal are dope\nBut not sold on this shade of purple for buttons\nthinking of switching to a blue', 'so shiny', false, 0),
  new Task(1,'Personal',currTime + 4*hour, -1,'Do laundry','Use the organic detergent',' ',false,0),
  new Task(3,'School',currTime + 2*Days, -1,'Create FSE 301 videos','some notes','Need camera',false,0),
  new Task(1,'School',currTime + 5*Days, -1,'Class 101 Quiz','Topics:\n   Essays\n   Essay-like assignments\n   How to avoid drowning in fountains','Sections 4.2 6.8',false,0),
  new Task(0,'Personal',currTime + 50*Days, -1,'Invade Quebec','Need weapons that can handle maple syrup exposure\nEh?','The one in Canada',false,0),
]



export class TaskScroll extends React.Component{


    render(){

        return(
        <ScrollView>
            <NavMenu ></NavMenu>

          {
            currenttasks.map((Task, index) => (
              <TaskCard key={index} task={Task}></TaskCard>
            ))
          }
        </ScrollView>
        );
    }
}
