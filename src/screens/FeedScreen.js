import React, { Component } from 'react';
import { View } from 'react-native';
import FeedIcon from '../icons/FeedIcon';

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
      <View />
    );
  }
}

export default FeedScreen;
