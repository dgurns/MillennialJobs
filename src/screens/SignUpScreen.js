import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import * as constants from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';

class SignUpScreen extends Component {
  render() {
    const {
      title,
      button,
      signUpFormContainer,
      inputField,
      addPhotoContainer,
      addPhotoText,
      addPhotoCircle,
      plusSign
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header mode="onboarding" />
        <Text style={title}>
          Let{'\''}s introduce you to the community of F{'\''}ed millennials
        </Text>
        <View style={signUpFormContainer}>
          <TextInput
            style={inputField}
            placeholder="Pick a username"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
          />
          <TextInput
            style={inputField}
            placeholder="Password"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={addPhotoContainer}>
          <Text style={addPhotoText}>Add a profile pic</Text>
          <View style={addPhotoCircle}>
            <Text style={plusSign}>+</Text>
          </View>
        </TouchableOpacity>
        <View style={button}>
          <Button
            buttonText="Let's go"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: constants.TITLE_FONT_SIZE,
    color: constants.BLACK_COLOR,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30
  },
  signUpFormContainer: {
    padding: 50,
    paddingTop: 30,
    paddingBottom: 30
  },
  inputField: {
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.GREEN_COLOR
  },
  addPhotoContainer: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'center',
    alignContent: 'center'
  },
  addPhotoText: {
    width: 105,
    marginTop: 7,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.LIGHT_GRAY_COLOR
  },
  addPhotoCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    backgroundColor: '#D8D8D8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusSign: {
    fontSize: 76,
    color: constants.LIGHT_GRAY_COLOR,
    backgroundColor: 'transparent',
    lineHeight: 80
  },
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 110
  }
});

export default SignUpScreen;
