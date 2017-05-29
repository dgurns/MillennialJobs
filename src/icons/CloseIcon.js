import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as constants from '../constants';

class CheckmarkIcon extends Component {
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
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill={this.props.color}
          />
          <Path
            d="M0 0h24v24H0z"
            fill="none"
          />
        </Svg>
      </View>
    );
  }
}

export default CheckmarkIcon;
