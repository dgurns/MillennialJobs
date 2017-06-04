import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as constants from '../constants';
import PostMeta from '../components/PostMeta';

class Post extends Component {
  static defaultProps = {
    text: '',
    uid: '',
    style: {}
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.postText}>{this.props.text}</Text>
        <PostMeta uid={this.props.uid} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.WHITE_COLOR,
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1
  },
  postText: {
    flex: 1,
    minWidth: 0,
    padding: 15,
    color: constants.BLACK_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  }
});

export default Post;
