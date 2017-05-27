import React, { Component } from 'react';
import { View } from 'react-native';
import CoursesIcon from '../icons/CoursesIcon';

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
      <View />
    );
  }
}

export default CoursesScreen;
