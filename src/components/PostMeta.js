import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import SafariView from 'react-native-safari-view';

import * as constants from '../constants';
import * as actions from '../actions';
import * as helpers from '../helpers';
import CoursesIcon from '../icons/CoursesIcon';
import ProfilePhoto from './ProfilePhoto';
import ModalView from './ModalView';
import UserProfile from './UserProfile';

class PostMeta extends Component {
  static defaultProps = {
    uid: '',
    isInteractive: true
  }

  state = {
    username: '',
    interestName: '',
    courseName: '',
    isLoading: true,
    courseUrl: '',
    modalVisible: false
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      let userInformation = await helpers.fetchUserInformation(this.props.uid);

      let userSavedCourses = [];
      if (this.props.uid !== this.props.currentUserUid) {
        userSavedCourses = await helpers.fetchUserSavedCourses(this.props.uid);
      } else {
        userSavedCourses = this.props.currentUserSavedCourses;
      }

      let courseName = '';
      let courseUrl = '';

      if (userSavedCourses.length > 0) {
        const latestCourseId = userSavedCourses[0];
        let courseDetails = await helpers.fetchCourseDetails(latestCourseId);
        courseName = courseDetails.title;
        courseUrl = `${constants.UDEMY_ROOT_URL}${courseDetails.url}`;
      }

      this.setState({
        username: userInformation.username,
        interestName: userInformation.interestName,
        courseName,
        isLoading: false,
        courseUrl
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  }

  openCourseOrInterest = () => {
    if (this.state.courseName !== '') {
      SafariView.isAvailable()
        .then(SafariView.show({ url: this.state.courseUrl }))
        .catch(() => Linking.openURL(this.state.courseUrl));
    }
    if (this.state.courseName === '' && this.props.navigation) {
      this.props.selectInterest(this.state.interestName);
      this.props.navigation.navigate('courses');
    }
  }

  openUserProfile = () => {
    if (this.props.uid === this.props.currentUserUid) {
      this.props.navigation.navigate('profile');
    } else {
      this.showModal();
    }
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
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
        <TouchableOpacity
          style={contentRow}
          onPress={this.props.isInteractive ? this.openUserProfile : null}
        >
          <View style={photoOrIcon}>
            <ProfilePhoto uid={this.props.uid} size="small" />
          </View>
          <Text style={label}>
            {this.state.username}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={contentRow}
          onPress={this.props.isInteractive ? this.openCourseOrInterest : null}
        >
          <View style={photoOrIcon}>
            <CoursesIcon size="small" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={label}>
              {this.state.courseName !== '' ? this.state.courseName : this.state.interestName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}

        <ModalView
          visible={this.state.modalVisible}
          onClose={this.hideModal}
        >
          <UserProfile
            uid={this.props.uid}
            username={this.state.username}
          />
        </ModalView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    paddingTop: 11,
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

function mapStateToProps({ currentUser }) {
  return {
    currentUserSavedCourses: currentUser.savedCourses,
    currentUserUid: currentUser.uid
  };
}

export default connect(mapStateToProps, actions)(PostMeta);
