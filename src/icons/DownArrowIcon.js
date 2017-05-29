import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as constants from '../constants';

class DownArrowIcon extends Component {
  static defaultProps = {
    color: constants.BLACK_COLOR,
    size: 'large'
  }

  getSize() {
    if (!isNaN(this.props.size)) {
      return `${this.props.size}`;
    } else if (this.props.size === 'small') {
      return constants.SECONDARY_ICON_SIZE;
    }
    return constants.PRIMARY_ICON_SIZE;
  }

  render() {
    return (
      <View style={this.props.style}>
        <Svg
          fill={this.props.color}
          height={this.getSize()}
          viewBox="0 0 24 24"
          width={this.getSize()}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
            fill={this.props.color}
          />
          <Path
            d="M0-.75h24v24H0z"
            fill="none"
          />
        </Svg>
      </View>
    );
  }
}

export default DownArrowIcon;
