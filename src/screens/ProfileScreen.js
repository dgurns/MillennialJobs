import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

import * as helpers from '../helpers';
import * as actions from '../actions';
import Button from '../components/Button';
import ProfileIcon from '../icons/ProfileIcon';
import ScreenContainer from '../components/ScreenContainer';
import ProfilePhoto from '../components/ProfilePhoto';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <ProfileIcon
        color={tintColor}
      />
    )
  }

  state = {
    photoLoading: false
  }

  logOut = () => {
    firebase.auth().signOut();
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

  renderProfilePhoto() {
    if (this.state.photoLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicator}
        />
      );
    }
    return (
      <ProfilePhoto
        size="large"
        photoUid={this.props.uid}
      />
    );
  }

  render() {
    return (
      <ScreenContainer
        navigation={this.props.navigation}
      >
        <View
          style={{ flex: 1 }}
          key={this.props.uid}
        >
          <View
            style={styles.profilePhoto}
          >
            <TouchableOpacity
              onPress={this.showImagePicker}
              key={this.props.profilePhotoUrl}
            >
              {this.renderProfilePhoto()}
            </TouchableOpacity>
          </View>
          <Button
            onPress={this.logOut}
            buttonText="Log out"
          />
        </View>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  activityIndicator: {
    marginTop: 60,
    marginBottom: 54
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps, actions)(ProfileScreen);
