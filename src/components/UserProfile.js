import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import * as helpers from '../helpers';
import * as actions from '../actions';
import * as constants from '../constants';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import ProfilePhoto from '../components/ProfilePhoto';
import Course from '../components/Course';
import AddCourse from '../components/AddCourse';

class UserProfile extends Component {
  static defaultProps = {
    uid: '',
    username: ''
  }

  state = {
    photoLoading: false,
    isGood: null,
    savedCourses: []
  }

  componentDidMount() {
    this.fetchIsGoodStatus();
    this.fetchSavedCourses();
  }

  fetchIsGoodStatus = async () => {
    let isGood = await helpers.fetchIsGoodStatus(this.props.uid);
    this.setState({
      isGood
    });
  }

  fetchSavedCourses = async () => {
    let savedCourses = await helpers.fetchUserSavedCourses(this.props.uid);
    this.setState({
      savedCourses
    });
  }

  logOut = () => {
    this.props.logOutUser();
  }

  showImagePicker = () => {
    const imageOptions = {
      title: 'Choose a photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      allowsEditing: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8
    };

    this.setState({
      photoLoading: true
    });

    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
        this.setState({
          photoLoading: false
        });
      } else if (response.error) {
        this.setState({
          photoLoading: false
        });
      } else {
        helpers.uploadImage(response.uri, this.props.uid)
          .then(() => {
            this.props.refreshUserState();
            this.setState({
              photoLoading: false
            });
          })
          .catch(() => {
            Alert.alert(
              'Oops',
              'There was an error uploading your photo. Please try again.'
            );
          });
      }
    });
  }

  toggleGoodStatus = () => {
    let alertMessage = 'Crap... out of a job and ready to learn something new?';
    if (!this.props.currentUserIsGood) {
      alertMessage = 'If you\'ve got a job and are ready to be a success story, click Yes.';
    }
    // Alert will have to be customized for Android
    Alert.alert(
      'You sure?',
      alertMessage,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.toggleGoodStatus() },
      ],
    );
  }

  renderProfilePhoto() {
    if (this.state.photoLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />
      );
    }

    if (this.props.uid === this.props.currentUserUid) {
      return (
        <TouchableOpacity
          onPress={this.showImagePicker}
          key={this.props.profilePhotoUrl}
        >
          <ProfilePhoto
            size="large"
            uid={this.props.uid}
          />
        </TouchableOpacity>
      );
    }

    return (
      <ProfilePhoto
        size="large"
        uid={this.props.uid}
      />
    );
  }

  renderSavedCourses() {
    if (this.props.uid === this.props.currentUserUid) {
      const reversedCoursesArray = _.reverse(this.props.currentUserSavedCourses);

      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.coursesLabel}>
            Your courses:
          </Text>
          <AddCourse />
          {reversedCoursesArray.map(courseId => {
            return (
              <Course
                id={courseId}
                style={{ marginBottom: 20 }}
                key={courseId}
                onRemove={() => this.props.removeCourseFromSavedCourses(courseId)}
              />
            );
          })}
        </View>
      );
    }

    // If not current user, use the savedCourses array on this.state.
    const reversedCoursesArray = _.reverse(this.state.savedCourses);

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        {reversedCoursesArray.map(courseId => {
          return (
            <Course
              id={courseId}
              style={{ marginBottom: 20 }}
              key={courseId}
              inModal
            />
          );
        })}
      </View>
    );
  }

  renderIsGood() {
    const {
      goodContainer,
      goodLabel,
      greenLabel,
      goodRadioButton,
    } = styles;

    if (this.props.uid === this.props.currentUserUid) {
      return (
        <View style={goodContainer}>
          <Text style={goodLabel}>
            Got a job?
          </Text>
          <RadioButton
            labelText="I'm good!"
            selected={this.props.currentUserIsGood ? this.props.currentUserIsGood : false}
            onPress={this.toggleGoodStatus}
            style={goodRadioButton}
          />
        </View>
      );
    }

    if (this.props.uid !== this.props.currentUserUid && this.state.isGood) {
      return (
        <View style={goodContainer}>
          <Text style={greenLabel}>
            ...is good!
          </Text>
        </View>
      );
    } else if (this.props.uid !== this.props.currentUserUid && !this.state.isGood) {
      return (
        <View style={goodContainer}>
          <Text style={goodLabel}>
            ...is not good (yet)
          </Text>
        </View>
      );
    }
  }

  renderLogOut() {
    if (this.props.uid === this.props.currentUserUid) {
      return (
        <Button
          onPress={this.logOut}
          buttonText="Log out"
        />
      );
    }
  }

  render() {
    const {
      profilePhoto,
      username,
      coursesContainer,
    } = styles;

    return (
      <View
        style={{ flex: 1 }}
        key={this.props.uid}
      >
        <View
          style={profilePhoto}
        >
          {this.renderProfilePhoto()}
        </View>

        <Text style={username}>
          {this.props.username !== '' ? this.props.username : this.props.current}
        </Text>

        {this.renderIsGood(this.state.isGood)}

        <View style={coursesContainer}>
          {this.renderSavedCourses(this.state.savedCourses)}
        </View>

        {this.renderLogOut()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 150
  },
  activityIndicator: {
    marginTop: 60,
    marginBottom: 54
  },
  username: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15,
    paddingBottom: 20
  },
  goodContainer: {
    flexDirection: 'row',
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  goodLabel: {
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  greenLabel: {
    color: constants.GREEN_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  goodRadioButton: {
    marginLeft: 20,
    paddingTop: 20
  },
  coursesContainer: {
    flex: 1,
    paddingBottom: 30
  },
  coursesLabel: {
    flex: 1,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    marginBottom: 20,
    textAlign: 'center'
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    currentUserUid: currentUser.uid,
    currentUserIsGood: currentUser.isGood,
    currentUserSavedCourses: currentUser.savedCourses
  };
}

export default connect(mapStateToProps, actions)(UserProfile);
