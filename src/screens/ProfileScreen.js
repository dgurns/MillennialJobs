import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Button from '../components/Button';
import ProfileIcon from '../icons/ProfileIcon';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <ProfileIcon
        color={tintColor}
      />
    )
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
        key={this.props.uid}
      >
        <Image
          style={styles.profilePhoto}
          source={{ uri: this.props.profilePhotoUrl }}
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

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps)(ProfileScreen);
