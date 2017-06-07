import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import UserProfile from '../components/UserProfile';
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

  render() {
    return (
      <ScreenContainer
        navigation={this.props.navigation}
        key={this.props.currentUserUid}
      >
        <UserProfile
          uid={this.props.currentUserUid}
          username={this.props.currentuserUsername}
        />
      </ScreenContainer>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return {
    currentUserUid: currentUser.uid,
    currentuserUsername: currentUser.username
  };
}

export default connect(mapStateToProps, actions)(ProfileScreen);
