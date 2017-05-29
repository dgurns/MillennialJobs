import React, { Component } from 'react';
import { connect } from 'react-redux';

import Picker from '../components/Picker';
import CoursesIcon from '../icons/CoursesIcon';
import ScreenContainer from '../components/ScreenContainer';

class CoursesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <CoursesIcon
        color={tintColor}
      />
    )
  }

  render() {
    return (
      <ScreenContainer
        navigation={this.props.navigation}
        key={this.props.interestName}
      >
        <Picker
          primaryOptionList={this.props.interests}
          selected={this.props.interestName}
        />
      </ScreenContainer>
    );
  }
}

function mapStateToProps({ interests, currentUser }) {
  return {
    interestName: currentUser.interestName,
    interests
  };
}

export default connect(mapStateToProps)(CoursesScreen);
