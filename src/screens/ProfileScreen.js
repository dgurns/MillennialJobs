import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Button from '../components/Button';

class ProfileScreen extends Component {
  getUsername() {
    const user = firebase.auth().currentUser;
    if (user) {
      return user.email;
    }
    return;
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
        key={this.props.profilePhotoUrl}
      >
        <Image
          style={styles.profilePhoto}
          source={{ uri: this.props.profilePhotoUrl }}
          key={this.props.profilePhotoUrl}
        />
        <Button
          onPress={this.logOut}
          buttonText="Log out"
        />
        <Text>
          This user is {this.getUsername()}
        </Text>
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

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl
  };
}

export default connect(mapStateToProps)(ProfileScreen);
