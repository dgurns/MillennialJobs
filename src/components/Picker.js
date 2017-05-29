import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as constants from '../constants';
import DownArrowIcon from '../icons/DownArrowIcon';

class Picker extends Component {
  static defaultProps = {
    primaryOptionList: [],
    secondaryOptionList: [],
    selected: ''
  }

  state = {
    selected: ''
  }

  render() {
    const { picker, label, downArrow } = styles;

    return (
      <TouchableOpacity style={picker}>
        <Text style={label}>Web Development</Text>
        <View style={downArrow}>
          <DownArrowIcon color={constants.LIGHT_GRAY_COLOR} size="small" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F6F6F6'
  },
  label: {
    flex: 1,
    minWidth: 0,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  downArrow: {
    marginRight: 'auto'
  }
});

export default Picker;
