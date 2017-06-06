import React, { Component } from 'react';
import { View, ListView, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import * as actions from '../actions';
import Post from '../components/Post';
import IsGood from '../components/IsGood';

class Feed extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentDidMount() {
    this.props.fetchFeed();

    const postsDatabaseRef = firebase.database().ref('posts');
    postsDatabaseRef.on('child_added', () => {
      this.props.fetchFeed();
    });

    const isGoodDatabaseRef = firebase.database().ref('isGood');
    isGoodDatabaseRef.on('child_changed', snapshot => {
      const isGoodObject = snapshot.val();
      if (isGoodObject.isGood && isGoodObject.timesToggled === 1) {
        this.props.fetchFeed();
      }
    });
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
        <Post
          text={rowData.text}
          uid={rowData.userId}
          style={styles.post}
          navigation={this.props.navigation ? this.props.navigation : null}
        />
      );
    }
  }

  render() {
    return (
      <View>
        {this.renderFeed()}
      </View>
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

function mapStateToProps({ data, currentUser }) {
  return {
    feedItems: data.feedItems,
    feedItemsLoading: data.feedItemsLoading,
    currentUserUid: currentUser.uid
  };
}

export default connect(mapStateToProps, actions)(Feed);
