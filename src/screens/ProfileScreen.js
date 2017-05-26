import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Button from '../components/Button';

class ProfileScreen extends Component {
  state = {
    profilePhotoUrl: ''
  }

  componentWillMount() {
    this.getProfilePhotoUrl();
  }

  async getProfilePhotoUrl() {
    let currentUserUid = await firebase.auth().currentUser.uid;
    console.log(currentUserUid);
    const databaseRef = firebase.database().ref(`users/${currentUserUid}`);
    await databaseRef.once('value').then(snapshot => {
      const profilePhotoUrl = snapshot.val().profilePhotoUrl;
      this.setState({
        profilePhotoUrl
      });
    });
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: this.state.profilePhotoUrl }}
        />
        <Button
          onPress={this.logOut}
          buttonText="Log out"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
});

export default ProfileScreen;
