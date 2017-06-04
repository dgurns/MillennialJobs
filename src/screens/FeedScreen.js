import React, { Component } from 'react';
import { ListView, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import FeedIcon from '../icons/FeedIcon';
import ScreenContainer from '../components/ScreenContainer';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import IsGood from '../components/IsGood';

class FeedScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <FeedIcon
        color={tintColor}
      />
    )
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentDidMount() {
    this.props.fetchFeed();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  renderFeed() {
    if (this.props.feedItemsLoading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.ds.cloneWithRows(this.props.feedItems)}
        renderRow={(rowData) =>
          this.renderRow(rowData)
        }
      />
    );
  }

  renderRow(rowData) {
    if ('isGood' in rowData) {
      return <IsGood uid={rowData.userId} />;
    } else if ('text' in rowData) {
      return (
        <Post text={rowData.text} uid={rowData.userId} style={styles.post} />
      );
    }
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

const styles = StyleSheet.create({
  listView: {
    height: 'auto'
  },
  post: {
    marginBottom: 20
  }
});

function mapStateToProps({ data }) {
  return {
    feedItems: data.feedItems,
    feedItemsLoading: data.feedItemsLoading
  };
}

export default connect(mapStateToProps, actions)(FeedScreen);
