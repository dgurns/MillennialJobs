import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as constants from '../constants';
import * as helpers from '../helpers';
import ProfilePhoto from '../components/ProfilePhoto';

class IsGood extends Component {
  static defaultProps = {
    uid: ''
  }

  state = {
    username: ''
  }

  componentDidMount() {
    helpers.fetchUserInformation(this.props.uid).then((userObject) => {
      this.setState({
        username: userObject.username
      });
    });
  }

  render() {
    const { container, photo, text, boldText, greenText } = styles;

    return (
      <View style={container}>
        <View style={photo}>
          <ProfilePhoto size="small" uid={this.props.uid} />
        </View>
        <Text style={text}>
          <Text style={boldText}>{this.state.username} </Text>
          is
          <Text style={greenText}> good!</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    paddingTop: 5,
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  photo: {
    width: 50
  },
  text: {
    flex: 1,
    minWidth: 0,
    paddingTop: 4,
    color: constants.BLACK_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  boldText: {
    fontWeight: 'bold'
  },
  greenText: {
    color: constants.GREEN_COLOR,
    fontWeight: 'bold'
  }
});

export default IsGood;
