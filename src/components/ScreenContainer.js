import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native';

import * as constants from '../constants';
import Header from './Header';

class ScreenContainer extends Component {
  static defaultProps = {
    header: true,
    navigation: {} // Parent screen (via react-native-navigation) should pass navigation prop
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.statusBarBackground} />
        <ScrollView style={styles.scrollView}>
          <Header mode='main' />
          <View style={styles.mainContainer}>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: constants.WHITE_COLOR
  },
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: constants.WHITE_COLOR,
    zIndex: 200
  },
  mainContainer: {
    padding: 25,
    paddingTop: 20,
    paddingBottom: 100
  }
});

export default ScreenContainer;
