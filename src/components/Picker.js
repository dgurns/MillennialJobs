import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as constants from '../constants';
import DownArrowIcon from '../icons/DownArrowIcon';
import CloseIcon from '../icons/CloseIcon';

class Picker extends Component {
  static defaultProps = {
    primaryOptionList: [],
    secondaryOptionList: [],
    selected: ''
  }

  state = {
    selected: '',
    modalVisible: false
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  render() {
    const { picker, label, downArrow, modal, closeIcon } = styles;

    return (
      <TouchableOpacity
        style={picker}
        onPress={this.showModal}
      >
        <Text style={label}>Web Development</Text>
        <View style={downArrow}>
          <DownArrowIcon
            color={constants.LIGHT_GRAY_COLOR}
            size="small"
          />
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          style={modal}
        >
          <TouchableOpacity 
            style={closeIcon}
            onPress={this.hideModal}
          >
            <CloseIcon
              color={constants.LIGHT_GRAY_COLOR}
              size="large"
            />
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F6F6F6'
  },
  label: {
    flex: 1,
    minWidth: 0,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  downArrow: {
    marginRight: 'auto'
  },
  modal: {
    flex: 1
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    right: 5
  }
});

export default Picker;
