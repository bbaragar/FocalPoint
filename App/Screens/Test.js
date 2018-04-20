import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import AddTaskModal from '../Components/AddTaskModal'


class test extends React.Component {
  constructor(props) {
    super(props)

    this.closeMod=this.closeMod.bind(this);
    this.state = {
      modalVisible: false,

    };
  }

  showMod(visible) {
    this.setState({modalVisible: true});
  }

  closeMod() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <AddTaskModal closeModal={this.closeMod}></AddTaskModal>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.showMod();
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default test;

