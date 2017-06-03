import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import * as constants from '../constants';
import * as helpers from '../helpers';
import CoursesIcon from '../icons/CoursesIcon';
import ProfilePhoto from '../components/ProfilePhoto';

class PostMeta extends Component {
  static defaultProps = {
    uid: ''
  }

  state = {
    username: '',
    interestName: '',
    courseName: '',
    isLoading: true
  }

  componentWillMount() {
    // fetchUserInformation
    // fetchUserSavedCourses
    // Stop activityIndicator and render component
  }

  render() {
    const { container, contentRow, photoOrIcon, label } = styles;

    return (
      <View style={container}>
        <View style={contentRow}>
          <View style={photoOrIcon}>
            <ProfilePhoto uid={this.props.uid} size="small" />
          </View>
          <Text style={label}>
            dgurns
          </Text>
        </View>
        <View style={contentRow}>
          <View style={photoOrIcon}>
            <CoursesIcon size="small" />
          </View>
          <Text style={label}>
            Advanced React Native
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60
  },
  photoOrIcon: {
    width: 50,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    minWidth: 0
  }
});

export default PostMeta;
