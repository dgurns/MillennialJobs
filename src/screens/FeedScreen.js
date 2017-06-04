import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
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

  componentDidMount() {
    this.props.fetchFeed();
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

export default connect(null, actions)(FeedScreen);
