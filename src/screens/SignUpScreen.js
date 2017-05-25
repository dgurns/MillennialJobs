import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as constants from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';

class SignUpScreen extends Component {
  state = {
    username: '',
    password: '',
    profilePhotoUri: ''
  };

  onSubmitPressed = () => {
    const { username, password, profilePhotoUri } = this.state;

    if (username === '' || password === '' || profilePhotoUri === '') {
      const errorMessage = 'Please fill out all the fields and add a photo';

      Alert.alert(
        'Oops',
        errorMessage
      );
      return;
    }

    this.props.signUpUser({ username, password, profilePhotoUri });
  }

  showImagePicker = () => {
    const imageOptions = {
      title: 'Choose a photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        this.setState({
          profilePhotoUri: source.uri
        });
      }
    });
  }

  renderProfilePhoto() {
    const photoUri = this.state.profilePhotoUri;
    const { profilePhoto, addPhotoCircle, plusSign } = styles;

    if (photoUri !== '') {
      return (
        <Image
          style={profilePhoto}
          source={{ uri: photoUri }}
          resizeMode='cover'
        />
      );
    }

    return (
      <View style={addPhotoCircle}>
        <Text style={plusSign}>+</Text>
      </View>
    );
  }

  render() {
    const {
      title,
      button,
      signUpFormContainer,
      inputField,
      addPhotoContainer,
      addPhotoText
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          mode="main"
          onPressLogo={() => this.props.navigation.navigate('title')}
        />
        <Text style={title}>
          Let{'\''}s introduce you to the community of F{'\''}ed millennials
        </Text>
        <View style={signUpFormContainer}>
          <TextInput
            style={inputField}
            placeholder="Pick a username"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            autoCapitalize="none"
          />
          <TextInput
            style={inputField}
            placeholder="Password"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            autoCapitalize="none"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={addPhotoContainer}
          onPress={this.showImagePicker}
        >
          <Text style={addPhotoText}>Add a profile pic</Text>
          {this.renderProfilePhoto()}
        </TouchableOpacity>
        <View style={button}>
          <Button
            buttonText="Let's go"
            onPress={this.onSubmitPressed}
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
  profilePhoto: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
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

export default connect(null, actions)(SignUpScreen);
