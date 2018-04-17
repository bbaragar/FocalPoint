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

class Picking extends React.Component {

    constructor(props) {
        super(props);

        this.closeMod = this.closeMod.bind(this);

        this.state = {
            modalVisible: !global.pickerClosed,
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
                <FocusSetModal closeModal={this.closeMod}/>
            </Modal>
            </View>
        );
    }
}

export default Picking;