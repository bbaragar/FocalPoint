import React from 'react'
import {
    Animated,
    StyleSheet,
    Text,
    AsyncStorage,
    Dimensions,
    View,
    Alert,
    Platform,
    TextInput,
    ViewPropTypes,
    TouchableHighlight, ScrollView, Touchable
} from 'react-native'
import {Colors} from '../Assets/styleConfig'
import {Task} from '../dataStructs/Task'
import PropTypes from 'prop-types';
import {WheelPicker} from 'react-native-wheel-picker-android';
import FadeInView from './FadeInView'
import NavigationService from "../NavigationService";

var sWidth = Dimensions.get('window').width;
var sLength = Dimensions.get('window').height;

// declare variables which will then be stored as part of task component in async
var taskName = "";
var taskDescription = "";
var taskPriority = 0;

var allTasks = [];
/*
    This class will set your task for you.
 */
export default class TaskSetModal extends React.Component {
    constructor (props) {

        super(props);
        this.state = {
            taskName: '',
            taskDescript: '',
            'Tasks': this.grabTasks(),
            selectedItem1: 0,
        };

    };

    renderIf(condition, content) {
        if (condition) {
            return content;
        } else {
            return null;
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
        this.props.closeModal();
    }

    /*
        Grabs current list of tasks in order to add this new task to the list.
     */
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

    //this task takes user-inputted info and uses it to create a Task object
    async createTask() {

        //find numerical priority inputted by user
        var priority = this.state.selectedItem1;

        taskName = this.state.taskName;

        taskDescription = this.state.taskDescript;

        //grab current task list to push new task onto it
        //var taskList = this.grabTasks();

        var newTask = [
            new Task(priority, 'New Task', 0, 'Placeholder', taskName, taskDescription, false, 0)
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

    //this method handles storage of the task
    enterTask(){
        this.createTask();
        this.modHandler();
        NavigationService.navigate('Tasks');
    }
    render () {
        let pickerProps ={style: styles.pickerStyle, isCurved: false,isCyclic:true, isAtmospheric:true, visibleItemCount:3, renderIndicator:true, indicatorColor: 'grey',
            itemTextColor: 'black',
        };
        let uColor = this.state.until ? Colors.iconPrimary : 'transparent' ;
        let fColor = this.state.until ? 'transparent' : Colors.iconPrimary;

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

                    </View>

                    <View style={styles.centerView}>

                            <View
                                style={{
                                    flexDirection: 'row',
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

                                        <Text>Task Name</Text>
                                        <TextInput
                                            placeholder="Task Name"
                                            style={{height: 75, width: 75, color: 'black', borderColor: 'gray', borderWidth: 1}}
                                            onChange={(event) => this.setState({taskName: event.nativeEvent.text})}
                                            value={this.state.taskName} />

                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}>

                                        <Text>Task Description</Text>
                                        <TextInput
                                            placeholder="Notes"
                                            style={{height: 75, width: 75, color: 'black', borderColor: 'gray', borderWidth: 1}}
                                            onChange={(event) => this.setState({taskDescript: event.nativeEvent.text})}
                                            value={this.state.taskDescript} />

                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}>
                                        <Text>Priority</Text>
                                        <WheelPicker
                                            {...pickerProps}
                                            data={['Low', 'Normal', 'High', 'Urgent']}
                                            onItemSelected={(event)=>{this.setState({selectedItem1: event.position})}}>
                                        </WheelPicker>

                                    </View>
                                </View>
                                <View style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>
                                </View>
                            </View>
                    </View>

                    <TouchableHighlight
                        style={styles.sButton}
                        onPress={ ()=> {this.enterTask()}}
                        underlayColor = {Colors.iconPrimary}>
                        <Text  style={styles.buttonText}>Add Task</Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}

TaskSetModal.propTypes = {
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

    formInput: {
        flex: 1,
        height: 26,
        fontSize: 13,
        borderWidth: 1,
        borderColor: "#555555",
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


});
