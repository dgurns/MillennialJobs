import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as constants from '../constants';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

class InterestsScreen extends Component {
  render() {
    const { title, interestsListContainer, button } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Text style={title}>
          What are you interested in?
        </Text>
        <View style={interestsListContainer}>
          <RadioButton
            labelText='Development'
            selected={false}
          />
          <RadioButton
            labelText='Construction'
            selected
          />
          <RadioButton
            labelText='Photography'
            selected={false}
          />
        </View>
        <View style={button}>
          <Button
            buttonText='Yes'
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
    paddingRight: 20
  },
  interestsListContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 50
  },
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 170
  }
});

export default InterestsScreen;
