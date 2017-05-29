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
            d="M0 0h24v24H0z"
            fill="none"
          />
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill={this.props.color}
          />
        </Svg>
      </View>
    );
  }
}

export default CheckmarkIcon;
