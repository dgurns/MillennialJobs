import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as constants from '../constants';

class CoursesIcon extends Component {
  static defaultProps = {
    color: constants.BLACK_COLOR,
    size: 'large'
  }

  getPadding() {
    if (this.props.size === 'large') {
      return { paddingBottom: 2 };
    }
  }

  getSize() {
    if (this.props.size === 'large') {
      return constants.PRIMARY_ICON_SIZE;
    }
    return constants.SECONDARY_ICON_SIZE;
  }

  render() {
    return (
      <View style={[this.props.style, this.getPadding()]}>
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
            d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"
            fill={this.props.color}
          />
        </Svg>
      </View>
    );
  }
}

export default CoursesIcon;
