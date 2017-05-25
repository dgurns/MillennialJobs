import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import store from './store';
import { firebaseConfig } from './firebase/firebase_config';

import TitleScreen from './screens/TitleScreen';
import InterestsScreen from './screens/InterestsScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import HowToScreen from './screens/HowToScreen';
import FeedScreen from './screens/FeedScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends Component {
  async componentWillMount() {
    await firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user is signed in');
        //console.log(user);
      } else {
        console.log('no user signed in');
      }
    });
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
              labelStyle: { fontSize: 12 }
            }
          })
        }
      }, {
        navigationOptions: {
          tabBarVisible: false,
        },
        //animationEnabled: true,
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
});

export default App;
