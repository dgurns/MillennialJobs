import React, { Component } from 'react';

import FeedIcon from '../icons/FeedIcon';
import ScreenContainer from '../components/ScreenContainer';
import CreatePost from '../components/CreatePost';

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
        <CreatePost />
      </ScreenContainer>
    );
  }
}

export default FeedScreen;
