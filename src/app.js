import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import codePush from 'react-native-code-push';

import store from './store';
import { firebaseConfig } from './firebase/firebase_config';
import * as constants from './constants';

import TitleScreen from './screens/TitleScreen';
import InterestsScreen from './screens/InterestsScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import HowToScreen from './screens/HowToScreen';
import FeedScreen from './screens/FeedScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const MainNavigator = TabNavigator({
        title: { screen: TitleScreen },
        logIn: { screen: LogInScreen },
        interests: { screen: InterestsScreen },
        signUp: { screen: SignUpScreen },
        howTo: { screen: HowToScreen },
        main: {
          screen: TabNavigator({
            feed: { screen: FeedScreen },
            courses: { screen: CoursesScreen },
            profile: { screen: ProfileScreen }
          }, {
            tabBarPosition: 'bottom',
            tabBarOptions: {
              showLabel: false,
              showIcon: true,
              activeTintColor: constants.GREEN_COLOR,
              inactiveTintColor: constants.BLACK_COLOR,
              style: styles.tabBar
            },
            lazy: false,
            swipeEnabled: true
          })
        }
      }, {
        navigationOptions: {
          tabBarVisible: false,
        },
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
      });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#D8D8D8',
    borderTopColor: constants.LIGHT_GRAY_COLOR,
    borderTopWidth: 1,
    height: 60
  }
});

App = codePush(App);

export default App;
