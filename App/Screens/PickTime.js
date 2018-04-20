import React, { Component } from 'react';
import {

    View,
 Modal,
} from 'react-native'

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

        global.pickerClosed = true;
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