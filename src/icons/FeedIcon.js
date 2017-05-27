import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as constants from '../constants';

class FeedIcon extends Component {
  static defaultProps = {
    color: constants.BLACK_COLOR,
    size: 'large'
  }

  getSize() {
    if (this.props.size === 'large') {
      return constants.PRIMARY_ICON_SIZE;
    }
    return constants.SECONDARY_ICON_SIZE;
  }

  render() {
    return (
      <View style={this.props.style}>
        <Svg
          height={this.getSize()}
          viewBox="0 0 24 24"
          width={this.getSize()}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
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

export default FeedIcon;
