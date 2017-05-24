import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

class InterestsScreen extends Component {
  renderInterests() {
    const interests = this.props.interests.map(interest =>
        <RadioButton
          labelText={interest.interestName}
          selected={false}
        />
    );
    return interests;
  }

  render() {
    const { title, interestsListContainer, button } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Text style={title}>
          What are you interested in?
        </Text>
        <View style={interestsListContainer}>
          {this.renderInterests()}
        </View>
        <View style={button}>
          <Button
            buttonText='Yes'
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
    paddingRight: 20
  },
  interestsListContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 50
  },
  button: {
    zIndex: 50,
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 170
  }
});

function mapStateToProps({ interests }) {
  return { interests };
}

export default connect(mapStateToProps)(InterestsScreen);
