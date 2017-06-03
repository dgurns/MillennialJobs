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
    this.loadData();
  }

  loadData = async () => {
    try {
      let userInformation = await helpers.fetchUserInformation(this.props.uid);
      let userSavedCourses = await helpers.fetchUserSavedCourses(this.props.uid);

      let courseName = userInformation.interestName;

      if (userSavedCourses.length > 0) {
        const latestCourseId = userSavedCourses[userSavedCourses.length - 1];
        let courseDetails = await helpers.fetchCourseDetails(latestCourseId);
        courseName = courseDetails.title;
      }

      this.setState({
        username: userInformation.username,
        interestName: userInformation.interestName,
        courseName,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  }

  renderContent() {
    const {
      container,
      contentRow,
      photoOrIcon,
      label,
      activityIndicator
    } = styles;

    if (this.state.isLoading) {
      return <ActivityIndicator size="large" style={activityIndicator} />;
    }

    return (
      <View style={container}>
        <View style={contentRow}>
          <View style={photoOrIcon}>
            <ProfilePhoto uid={this.props.uid} size="small" />
          </View>
          <Text style={label}>
            {this.state.username}
          </Text>
        </View>
        <View style={contentRow}>
          <View style={photoOrIcon}>
            <CoursesIcon size="small" />
          </View>
          <Text style={label}>
            {this.state.courseName !== '' ? this.state.courseName : this.state.interestName}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    paddingTop: 9,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 6
  },
  photoOrIcon: {
    width: 50,
    height: 40
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    minWidth: 0,
    paddingTop: 5
  },
  activityIndicator: {
    padding: 40
  }
});

export default PostMeta;
