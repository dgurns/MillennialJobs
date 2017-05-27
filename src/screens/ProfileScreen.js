import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

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

  logOut = () => {
    firebase.auth().signOut();
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
              onPress={() => {}}
            >
              <ProfilePhoto
                size="large"
                photoUid={this.props.uid}
              />
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
    marginTop: 30,
    marginBottom: 20
  }
});

function mapStateToProps({ currentUser }) {
  return {
    profilePhotoUrl: currentUser.profilePhotoUrl,
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps)(ProfileScreen);
