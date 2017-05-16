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
      paddingLeft: large ? 70 : 18
    };
  }

  addButtonTextStyle() {
    return {
      fontSize: (this.props.size === 'large') ? constants.titleFontSize : constants.bodyFontSize,
    };
  }

  render() {
    return (
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity
          style={[styles.buttonStyle, this.addButtonStyle(), this.props.buttonStyle]}
          onPress={this.props.onPress}
        >
          <Text
            style={[styles.buttonTextStyle, this.addButtonTextStyle()]}
          >
            {this.props.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1
  },
  buttonStyle: {
    backgroundColor: constants.greenColor,
    borderColor: constants.darkGrayColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute'
  },
  buttonTextStyle: {
    color: constants.blackColor
  }
});

export default Button;
