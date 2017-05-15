import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';

import store from './store';
import TitleScreen from './screens/TitleScreen';
import InterestsScreen from './screens/InterestsScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import HowToScreen from './screens/HowToScreen';
import FeedScreen from './screens/FeedScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    );
  }
}

export default App;
