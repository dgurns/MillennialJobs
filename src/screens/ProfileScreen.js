import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import Button from '../components/Button';

class ProfileScreen extends Component {
  logOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={this.logOut}
          buttonText="Log out"
        />
      </View>
    );
  }
}

export default ProfileScreen;
