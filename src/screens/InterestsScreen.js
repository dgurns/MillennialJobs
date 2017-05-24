import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import Header from '../components/Header';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

class InterestsScreen extends Component {
  renderInterests() {
    const { interests, currentUser } = this.props;

    const interestsJsx = interests.map(interest =>
      <RadioButton
        labelText={interest.interestName}
        selected={(interest.udemySubcategory === currentUser.interestName)}
        onPress={() => this.props.selectInterest(interest.udemySubcategory)}
        key={interest.udemySubcategory}
      />
    );
    return interestsJsx;
  }

  render() {
    const { title, interestsListContainer, button } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header mode='onboarding' />
        <Text style={title}>
          What are you interested in?
        </Text>
        <View style={interestsListContainer}>
          {this.renderInterests()}
        </View>
        <View style={button}>
          <Button
            buttonText='Yes'
            onPress={() => this.props.navigation.navigate('signUp')}
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
    marginTop: 50
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
    bottom: 120
  }
});

function mapStateToProps({ interests, currentUser }) {
  return { interests, currentUser };
}

export default connect(mapStateToProps, actions)(InterestsScreen);
