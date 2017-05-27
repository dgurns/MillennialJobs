import React, { Component } from 'react';
import { View } from 'react-native';

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
        <View />
      </ScreenContainer>
    );
  }
}

export default FeedScreen;
