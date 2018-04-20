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

import TaskSetModal from '../Components/TaskSetModal'

class TaskPick extends React.Component {

    constructor(props) {
        super(props);

        this.closeMod = this.closeMod.bind(this);

        this.state = {
            modalVisible: true,
        };
    }

    showMod() {
        this.setState({modalVisible: true});
    }

    closeMod() {
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <TaskSetModal closeModal={this.closeMod}/>
                </Modal>
            </View>
        );
    }
}

export default TaskPick;