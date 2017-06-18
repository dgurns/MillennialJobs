import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import * as constants from '../constants';
import * as actions from '../actions';

class Header extends Component {
  static defaultProps = {
    mode: 'onboarding', // 'onboarding', 'main'
    onPressLogo: () => {},
    style: {}
  }

  componentDidMount() {
    this.props.fetchMillennialsSaved();

    const isGoodDatabaseRef = firebase.database().ref('isGood');
    isGoodDatabaseRef.on('child_changed', () => {
      this.props.fetchMillennialsSaved();
    });
  }

  renderLogo() {
    const { title } = styles;
    const { BLACK_COLOR } = constants;

    return (
      <TouchableOpacity
        onPress={this.props.onPressLogo}
      >
        <Text
          style={[title, { color: BLACK_COLOR }]}
        >
          F{'\''}ed
        </Text>
      </TouchableOpacity>
    );
  }

  renderMillennialsSaved() {
    const {
      millennialsSavedContainer,
      counterLabelText
    } = styles;
    if (this.props.mode === 'onboarding') {
      return;
    }
    return (
      <View style={millennialsSavedContainer}>
        {this.renderMillennialsSavedCounter(this.props.millennialsSaved)}
        <Text style={counterLabelText}>millennials saved</Text>
      </View>
    );
  }

  renderMillennialsSavedCounter(millennialsSaved) {
    const {
      counterBox,
      counterText
    } = styles;

    const millennialsString = millennialsSaved.toString();
    const jsxToAdd = [];

    for (let i = 0; i < millennialsString.length; i++) {
      const digit = millennialsString[i];
      jsxToAdd.push(
        <View style={counterBox} key={i}>
          <Text style={counterText}>{digit}</Text>
        </View>
      );
    }

    return jsxToAdd;
  }

  render() {
    const {
      header,
      contentContainer
    } = styles;

    return (
      <View
        style={[header, this.props.style]}
      >
        <StatusBar
          barStyle={'dark-content'}
        />
        <View style={contentContainer}>
          {this.renderLogo()}
          {this.renderMillennialsSaved()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    opacity: 0.41
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 50,
    backgroundColor: 'transparent'
  },
  title: {
    fontFamily: constants.TITLE_FONT_FAMILY,
    fontSize: 37,
    flex: 1,
    padding: 5,
    marginLeft: 2,
    marginTop: Platform.OS === 'ios' ? 0 : -11,
    width: 90
  },
  millennialsSavedContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 6
  },
  counterBox: {
    height: 33,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR,
    marginRight: -1
  },
  counterText: {
    fontSize: constants.TITLE_FONT_SIZE,
    color: constants.BLACK_COLOR
  },
  counterLabelText: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    marginLeft: 10,
    marginRight: 7
  }
});

function mapStateToProps({ data }) {
  return {
    millennialsSaved: data.millennialsSaved
  };
}

export default connect(mapStateToProps, actions)(Header);
