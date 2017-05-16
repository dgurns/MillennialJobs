import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as constants from '../constants';

class Button extends Component {
  static defaultProps = {
    onPress: () => {},
    size: 'large',
    buttonText: '',
    buttonStyle: {}
  }

  addButtonStyle() {
    const large = this.props.size === 'large';

    return {
      padding: large ? 20 : 7,
      paddingRight: large ? 70 : 18,
      paddingLeft: large ? 70 : 18,
    };
  }

  addButtonTextStyle() {
    return {
      fontSize: (this.props.size === 'large') ? constants.TITLE_FONT_SIZE : constants.BODY_FONT_SIZE,
    };
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, this.addButtonStyle(), this.props.buttonStyle]}
          onPress={this.props.onPress}
        >
          <Text
            style={[styles.buttonText, this.addButtonTextStyle()]}
          >
            {this.props.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1
  },
  button: {
    backgroundColor: constants.GREEN_COLOR,
    borderColor: constants.DARK_GRAY_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute'
  },
  buttonText: {
    color: constants.BLACK_COLOR,
    textAlign: 'center'
  }
});

export default Button;
