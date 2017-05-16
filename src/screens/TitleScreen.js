import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';

import * as constants from '../constants';
import Button from '../components/Button';

class TitleScreen extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require('../images/money.jpg')}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {}}
            size='large'
            buttonText='Ok'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: constants.blackColor
  },
  backgroundImageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.41
  },
  button: {
    zIndex: 50
  }
});

export default TitleScreen;
