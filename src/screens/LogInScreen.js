import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as constants from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';

class LogInScreen extends Component {
  state = {
    username: '',
    password: ''
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  onSubmitPressed = () => {
    const { username, password } = this.state;

    if (username === '' || password === '') {
      const errorMessage = 'Please enter a username and password.';

      Alert.alert(
        'Oops',
        errorMessage
      );
      return;
    }

    this.props.logInUser({ username, password });
  }

  renderSubmitButton() {
    if (this.props.authLoading) {
      return (
        <ActivityIndicator size="large" style={{ top: 55 }} />
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
      logInFormContainer,
      inputField
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          mode="onboarding"
          onPressLogo={() => this.props.navigation.navigate('title')}
        />
        <Text style={title}>
          Log in
        </Text>
        <View style={logInFormContainer}>
          <TextInput
            style={inputField}
            placeholder="Username"
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
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
            secureTextEntry
          />
        </View>
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
  logInFormContainer: {
    padding: 50,
    paddingTop: 30,
    paddingBottom: 30
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
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 110
  }
});

function mapStateToProps({ currentUser }) {
  return {
    authLoading: currentUser.authLoading
  };
}

export default connect(mapStateToProps, actions)(LogInScreen);
