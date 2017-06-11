import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform
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
    profilePhotoUri: '',
    photoLoading: false
  };

  onSubmitPressed = () => {
    const { username, password, profilePhotoUri } = this.state;
    const { interestName } = this.props;

    if (username === '' || password === '' || profilePhotoUri === '') {
      const errorMessage = 'Please fill out all the fields and add a photo';

      Alert.alert(
        'Oops',
        errorMessage
      );
      return;
    }

    this.props.signUpUser({ username, password, profilePhotoUri, interestName });
  }

  showImagePicker = () => {
    const imageOptions = {
      title: 'Choose a photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      allowsEditing: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8
    };

    this.setState({
      photoLoading: true
    });

    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
        this.setState({
          photoLoading: false
        });
      } else if (response.error) {
        this.setState({
          photoLoading: false
        });
      } else {
        const source = { uri: response.uri };

        this.setState({
          profilePhotoUri: source.uri,
          photoLoading: false
        });
      }
    });
  }

  renderProfilePhoto() {
    const photoUri = this.state.profilePhotoUri;
    const { profilePhoto, addPhotoCircle, plusSign, photoLoading } = styles;

    if (photoUri === '' && !this.state.photoLoading) {
      return (
        <View style={addPhotoCircle}>
          <Text style={plusSign}>+</Text>
        </View>
      );
    } else if (this.state.photoLoading) {
      return (
        <ActivityIndicator size="large" style={photoLoading} />
      );
    }
    return (
      <Image
        style={profilePhoto}
        source={{ uri: photoUri }}
        resizeMode='cover'
      />
    );
  }

  renderSubmitButton() {
    if (this.props.authLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{ top: Platform.OS === 'ios' ? 55 : 20 }} 
        />
      );
    }
    return (
      <Button
        buttonText="Let's go"
        onPress={this.onSubmitPressed}
      />
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
          mode="onboarding"
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
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={inputField}
            placeholder="Password"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            autoCapitalize="none"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            returnKeyType="done"
            autoCorrect={false}
            underlineColorAndroid="transparent"
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
          {this.renderSubmitButton()}
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
    paddingBottom: Platform.OS === 'ios' ? 30 : 5
  },
  inputField: {
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
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
    lineHeight: Platform.OS === 'ios' ? 80 : 90
  },
  profilePhoto: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
  },
  photoLoading: {
    marginLeft: 16,
    marginRight: 13
  },
  button: {
    zIndex: 50,
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 30,
    marginTop: Platform.OS === 'ios' ? 0 : 60,
    height: 80
  }
});

function mapStateToProps({ currentUser }) {
  return {
    interestName: currentUser.interestName,
    authLoading: currentUser.authLoading
  };
}

export default connect(mapStateToProps, actions)(SignUpScreen);
