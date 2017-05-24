import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import * as constants from '../constants';

class Header extends Component {
  static defaultProps = {
    mode: 'onboarding' // 'onboarding' 'main'
  }

  render() {
    const { header, contentContainer, title, backgroundImage } = styles;
    const { BLACK_COLOR, WHITE_COLOR } = constants;
    const { mode } = this.props;

    return (
      <View
        style={[header, mode === 'onboarding' ? { backgroundColor: BLACK_COLOR } : { backgroundColor: 'transparent' }]}
      >
        <StatusBar
          barStyle={mode === 'onboarding' ? 'light-content' : 'dark-content'}
        />
        <Image
          source={mode === 'onboarding' ? require('../images/money.jpg') : ''}
          style={backgroundImage}
          resizeMode='cover'
        />
        <View style={contentContainer}>
          <Text
            style={[title, mode === 'onboarding' ? { color: WHITE_COLOR } : { color: BLACK_COLOR }]}
          >
            F{'\''}ed
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 15,
    overflow: 'hidden',
    backgroundColor: constants.BLACK_COLOR
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    opacity: 0.41
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 50,
    backgroundColor: 'transparent'
  },
  title: {
    fontFamily: constants.TITLE_FONT_FAMILY,
    fontSize: 37,
    color: constants.WHITE_COLOR,
    flex: 1,
    padding: 10,
    paddingLeft: 5
  }
});

export default Header;
