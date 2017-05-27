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
    const {
      title,
      howToContainer,
      howToBlock,
      howToIcon,
      howToLabel,
      greenText,
      button
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          mode='onboarding'
        />
        <Text style={title}>
          Here{'\'s'} how it works:
        </Text>

        <View style={howToContainer}>
          <View style={howToBlock}>
            <View style={howToIcon}>
              <CoursesIcon />
            </View>
            <Text style={[howToLabel, { marginTop: 11 }]}>
              Take a course
            </Text>
          </View>

          <View style={howToBlock}>
            <View style={howToIcon}>
              <FeedIcon />
            </View>
            <Text style={howToLabel}>
              Share your progress with other F{'\''}ed millennials
            </Text>
          </View>

          <View style={howToBlock}>
            <View style={howToIcon}>
              <CheckmarkIcon />
            </View>
            <Text style={howToLabel}>
              When you get a job, check <Text style={greenText}>"I'm good"</Text>
            </Text>
          </View>

          <View style={howToBlock}>
            <View style={howToIcon}>
              <ThumbsUpIcon />
            </View>
            <Text style={howToLabel}>
              Another millennial saved.
            </Text>
          </View>
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
    padding: 40,
    paddingTop: 30
  },
  howToBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30
  },
  howToIcon: {
    width: 50,
    marginRight: 10
  },
  howToLabel: {
    flex: 1,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    textAlign: 'left',
    marginTop: 7
  },
  greenText: {
    color: constants.GREEN_COLOR
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
