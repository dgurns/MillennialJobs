import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import FeedIcon from '../icons/FeedIcon';
import ScreenContainer from '../components/ScreenContainer';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

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

  renderFeed() {
    if (this.props.feedItemsLoading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    return (
      <Post text="hi" uid="Sy8gMw261HXOYvn2wVUKJvUgoao1" />
    );
  }

  render() {
    return (
      <ScreenContainer
        navigation={this.props.navigation}
      >
        <CreatePost />
        {this.renderFeed()}
      </ScreenContainer>
    );
  }
}

function mapStateToProps({ data }) {
  return {
    feedItems: data.feedItems,
    feedItemsLoading: data.feedItemsLoading
  };
}

export default connect(mapStateToProps, actions)(FeedScreen);
