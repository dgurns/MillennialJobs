import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  LayoutAnimation,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import ModalView from '../components/ModalView';
import PostMeta from '../components/PostMeta';
import Button from '../components/Button';

class CreatePost extends Component {
  state = {
    modalVisible: false,
    containerHeight: 56,
    postText: ''
  }

  onLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      containerHeight: 'auto'
    });
  }

  onSubmit = () => {
    if (this.state.postText !== '') {
      this.props.createPost(this.props.uid, this.state.postText);
      this.setState({ modalVisible: false });
    } else {
      Alert.alert(
        'Oops',
        'You can\'t do an empty post!'
      );
    }
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      containerHeight: 56
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  renderSubmitButton() {
    if (this.props.postUploading) {
      return (
        <ActivityIndicator
          size="large"
          color={constants.WHITE_COLOR}
          style={{ marginTop: 20 }}
        />
      );
    }

    return (
      <Button
        buttonText="Post"
        onPress={this.onSubmit}
      />
    );
  }

  render() {
    const {
      createPostTouchable,
      createPostContainer,
      createPostTextInput,
      submitButton
    } = styles;

    return (
      <View>
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
          backgroundColor={constants.DARK_GRAY_COLOR_TRANSPARENT}
          closeIconColor={constants.WHITE_COLOR}
          animationType="fade"
        >
          <View
            style={[createPostContainer, { height: this.state.containerHeight }]}
          >
            <TextInput
              style={createPostTextInput}
              placeholder="Post an update..."
              placeholderTextColor={constants.LIGHT_GRAY_COLOR}
              selectionColor={constants.GREEN_COLOR}
              onLayout={this.onLayout}
              onChangeText={text => this.setState({ postText: text })}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              multiline
              returnKeyType="next"
              underlineColorAndroid="transparent"
              textAlignVertical="top" //Android only
            />
            <PostMeta
              uid={this.props.uid}
              isInteractive={false}
            />
          </View>
          <View style={submitButton}>
            {this.renderSubmitButton()}
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
    overflow: 'hidden',
  },
  createPostTextInput: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.GREEN_COLOR,
    padding: 14,
    paddingTop: 5,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  },
  submitButton: {
    flex: 1,
    marginTop: 20,
    height: 80
  }
});

function mapStateToProps({ currentUser }) {
  return {
    uid: currentUser.uid,
    postUploading: currentUser.postUploading
  };
}

export default connect(mapStateToProps, actions)(CreatePost);
