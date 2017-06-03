import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import * as constants from '../constants';
import CloseIcon from '../icons/CloseIcon';

class ModalView extends Component {
  static defaultProps = {
    visible: false,
    onClose: () => {},
    backgroundColor: constants.WHITE_COLOR,
    closeIconColor: constants.LIGHT_GRAY_COLOR,
    animationType: 'slide'
  }

  render() {
    const { modalBackground, closeIcon, modalScrollView } = styles;

    return (
      <Modal
        animationType={this.props.animationType}
        transparent
        visible={this.props.visible}
      >
        <View
          style={[modalBackground, { backgroundColor: this.props.backgroundColor }]}
        />
        <TouchableOpacity
          style={closeIcon}
          onPress={this.props.onClose}
        >
          <CloseIcon
            color={this.props.closeIconColor}
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
  modalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    right: 5,
    zIndex: 100
  },
  modalScrollView: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 25,
    paddingRight: 25,
    zIndex: 100
  }
});

export default ModalView;
