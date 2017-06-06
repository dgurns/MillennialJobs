import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import FeedIcon from '../icons/FeedIcon';
import ScreenContainer from '../components/ScreenContainer';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';

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
        <Feed
          key={this.props.currentUserUid}
          navigation={this.props.navigation}
        />
      </ScreenContainer>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return {
    currentUserUid: currentUser.uid
  };
}

export default connect(mapStateToProps, actions)(FeedScreen);
