import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import * as constants from '../constants';
import FeedIcon from '../icons/FeedIcon';
import ScreenContainer from '../components/ScreenContainer';

class FeedScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FeedIcon
        color={tintColor}
      />
    )
  }

  render() {
    return (
      <ScreenContainer
        navigation={this.props.navigation}
      >
        <TextInput
          style={styles.createPostTextInput}
          placeholder="Post an update..."
          placeholderTextColor={constants.LIGHT_GRAY_COLOR}
          selectionColor={constants.GREEN_COLOR}
          autoCapitalize="none"
          onFocus={() => {}}
          returnKeyType="done"
          secureTextEntry
        />
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  createPostTextInput: {
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    height: 56,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.GREEN_COLOR
  },
});

export default FeedScreen;
