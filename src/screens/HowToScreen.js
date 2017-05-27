import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import Header from '../components/Header';
import Button from '../components/Button';
import CoursesIcon from '../icons/CoursesIcon';
import FeedIcon from '../icons/FeedIcon';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';

class HowToScreen extends Component {
  onSubmitPressed = () => {
    this.props.updateOnboardingStatus(this.props.uid, true);
    this.props.navigation.navigate('main');
  }

  render() {
    const { title, howToContainer, button } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          mode='onboarding'
        />
        <Text style={title}>
          Here{'\'s'} how it works:
        </Text>
        <View style={howToContainer}>

        </View>
        <View style={button}>
          <Button
            buttonText='Begin'
            onPress={this.onSubmitPressed}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: constants.TITLE_FONT_SIZE,
    color: constants.BLACK_COLOR,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30
  },
  howToContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 50,
    paddingTop: 30
  },
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 110
  }
});

function mapStateToProps({ currentUser }) {
  return {
    uid: currentUser.uid
  };
}

export default connect(mapStateToProps, actions)(HowToScreen);
