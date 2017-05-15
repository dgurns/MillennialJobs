import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import admin from 'firebase-admin';

import store from './store';
import firebaseConfig from './firebase/firebase_config';
import serviceAccount from './firebase/service_account.json';

import TitleScreen from './screens/TitleScreen';
import InterestsScreen from './screens/InterestsScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import FeedScreen from './screens/FeedScreen';
import CoursesScreen from './screens/CoursesScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://one-time-password-27281.firebaseio.com'
    });
  }

  render() {
    const MainNavigator = TabNavigator({
        title: { screen: TitleScreen },
        interests: { screen: InterestsScreen },
        signUp: { screen: SignUpScreen },
        logIn: { screen: LogInScreen },
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
          //tabBarVisible: false
        },
        lazy: true
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
