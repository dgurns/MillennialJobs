import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Svg, { Path } from 'react-native-svg';
import * as firebase from 'firebase';

import * as constants from '../constants';

class ProfilePhoto extends Component {
  static defaultProps = {
    size: 'large', // 'large', 'small'
    uid: ''
  }

  state = {
    photoUrl: '',
    photoLoading: false
  }

  componentWillMount() {
    this.setProfilePhotoUrl();
  }

  setProfilePhotoUrl() {
    if (this.props.photoUid === this.props.uid) {
      this.setState({
        photoUrl: this.props.profilePhotoUrl,
        photoLoading: true
      });
    } else {
      const databaseRef = firebase.database().ref(`users/${this.props.photoUid}`);
      databaseRef.once('value').then(snapshot => {
        this.setState({
          photoUrl: snapshot.val().profilePhotoUrl,
          photoLoading: true
        });
      });
    }
  }

  customizePhotoDimensions() {
    const large = constants.LARGE_PROFILE_PHOTO_SIZE;
    const small = constants.SMALL_PROFILE_PHOTO_SIZE;

    if (this.props.size === 'large') {
      return {
        height: large,
        width: large,
        borderRadius: large / 2
      };
    }
    return {
      height: small,
      width: small,
      borderRadius: small / 2
    };
  }

  customizeActivityIndicatorOffset() {
    if (this.props.size === 'large') {
      return {
        top: 73,
        left: 73
      };
    }
    return {
      top: 11,
      left: 11
    };
  }

  customizeDefaultOffset() {
    const large = -constants.LARGE_PROFILE_PHOTO_SIZE / 10;
    const small = -constants.SMALL_PROFILE_PHOTO_SIZE / 10;

    if (this.props.size === 'large') {
      return {
        top: large,
        left: large
      };
    }
    return {
      top: small,
      left: small
    };
  }

  renderDefaultProfilePhoto() {
    const large = constants.LARGE_PROFILE_PHOTO_SIZE * 1.2;
    const small = constants.SMALL_PROFILE_PHOTO_SIZE * 1.2;

    return (
      <Svg
        style={[styles.defaultProfilePhoto, this.customizeDefaultOffset()]}
        fill={constants.VERYLIGHT_GRAY_COLOR}
        height={this.props.size === 'large' ? large : small}
        viewBox="0 0 24 24"
        width={this.props.size === 'large' ? large : small}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
          fill={constants.VERY_LIGHT_GRAY_COLOR}
        />
        <Path
          d="M0 0h24v24H0z"
          fill="none"
        />
        <ActivityIndicator
          size={this.props.size === 'large' ? 'large' : 'small'}
          style={[styles.activityIndicator, this.customizeActivityIndicatorOffset()]}
          animating={this.state.photoLoading}
        />
      </Svg>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={[styles.profilePhoto, this.customizePhotoDimensions()]}
          source={{ uri: this.state.photoUrl }}
          onLoadEnd={() => this.setState({ photoLoading: false })}
          key={this.state.photoUrl}
        />
        {this.renderDefaultProfilePhoto()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultProfilePhoto: {
    position: 'absolute',
    zIndex: 50
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 60
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps)(ProfilePhoto);
