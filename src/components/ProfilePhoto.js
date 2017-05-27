import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
    photoUrl: ''
  }

  componentWillMount() {
    this.setProfilePhotoUrl();
  }

  setProfilePhotoUrl() {
    if (this.props.photoUid === this.props.uid) {
      this.setState({
        photoUrl: this.props.profilePhotoUrl
      });
    } else {
      const databaseRef = firebase.database().ref(`users/${this.props.photoUid}`);
      databaseRef.once('value').then(snapshot => {
        this.setState({
          photoUrl: snapshot.val().profilePhotoUrl
        });
      });
    }
  }

  customizeDimensions() {
    if (this.props.size === 'large') {
      return {
        height: 150,
        width: 150,
        borderRadius: 75
      };
    }
    return {
      height: 35,
      width: 35,
      borderRadius: 18
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={[styles.profilePhoto, this.customizeDimensions()]}
          source={{ uri: this.state.photoUrl }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps)(ProfilePhoto);
