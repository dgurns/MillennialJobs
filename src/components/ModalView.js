import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import * as constants from '../constants';
import CloseIcon from '../icons/CloseIcon';

class ModalView extends Component {
  static defaultProps = {
    visible: false,
    onClose: () => {}
  }

  render() {
    const { modal, closeIcon, modalScrollView } = styles;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        style={modal}
      >
        <TouchableOpacity
          style={closeIcon}
          onPress={this.props.onClose}
        >
          <CloseIcon
            color={constants.LIGHT_GRAY_COLOR}
            size="large"
          />
        </TouchableOpacity>
        <ScrollView style={modalScrollView}>
          {this.props.children}
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    right: 5
  },
  modalScrollView: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 25,
    paddingRight: 25
  }
});

export default ModalView;
