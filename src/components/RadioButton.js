import React, { Component } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import * as constants from '../constants';

class RadioButton extends Component {
  static defaultProps = {
    onPress: () => {},
    labelText: '',
    selected: false,
    style: {}
  }

  render() {
    const { radioButtonContainer, radioButton, labelText } = styles;

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[radioButtonContainer, this.props.style]}>
          <View
            style={[radioButton, this.props.selected ? { backgroundColor: constants.GREEN_COLOR } : '']}
          />
          <Text
            style={[labelText, this.props.selected ? { color: constants.GREEN_COLOR } : '']}
          >
            {this.props.labelText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  radioButton: {
    height: 35,
    width: 35,
    borderRadius: 18,
    borderColor: constants.DARK_GRAY_COLOR,
    borderWidth: 1,
    marginRight: 10
  },
  labelText: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR
  }
});

export default RadioButton;
