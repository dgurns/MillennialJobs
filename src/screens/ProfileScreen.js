import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import * as constants from '../constants';
import Button from '../components/Button';
import ProfileIcon from '../icons/ProfileIcon';
import ScreenContainer from '../components/ScreenContainer';

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
          <Image
            style={styles.profilePhoto}
            source={{ uri: this.props.profilePhotoUrl }}
          />
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
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR,
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
