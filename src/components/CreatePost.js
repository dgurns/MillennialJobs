import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation,
  TextInput,
  StyleSheet
} from 'react-native';

import * as constants from '../constants';
import ModalView from '../components/ModalView';

class CreatePost extends Component {
  state = {
    modalVisible: false,
    createPostContainerHeight: 56
  }

  animate = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      createPostContainerHeight: 'auto'
    });
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      createPostContainerHeight: 56
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  render() {
    const {
      createPostTouchable,
      createPostContainer,
      createPostTextInput
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={this.showModal}
        >
          <View>
            <Text style={createPostTouchable}>
              Post an update...
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <ModalView
          visible={this.state.modalVisible}
          onClose={this.hideModal}
          backgroundColor={constants.LIGHT_GRAY_COLOR_TRANSPARENT}
          closeIconColor={constants.BLACK_COLOR}
          animationType="fade"
        >
          <View
            style={[createPostContainer, { height: this.state.createPostContainerHeight }]}
          >
            <TextInput
              style={createPostTextInput}
              placeholder="Post an update..."
              placeholderTextColor={constants.LIGHT_GRAY_COLOR}
              selectionColor={constants.GREEN_COLOR}
              onLayout={this.animate}
              autoCapitalize="none"
              autoFocus
              multiline
              returnKeyType="done"
            />
          </View>
        </ModalView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  createPostTouchable: {
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.LIGHT_GRAY_COLOR
  },
  createPostContainer: {
    backgroundColor: constants.WHITE_COLOR,
    marginTop: 10,
    paddingTop: 9,
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    overflow: 'hidden'
  },
  createPostTextInput: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.GREEN_COLOR,
    padding: 14,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  }
});

export default CreatePost;
