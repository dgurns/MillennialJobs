import React, { Component } from 'react';
import { View } from 'react-native';

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
      >
        <View />
      </ScreenContainer>
    );
  }
}

export default CoursesScreen;
