import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import * as constants from '../constants';

class Header extends Component {
  static defaultProps = {
    mode: 'onboarding', // 'onboarding', 'main'
    onPressLogo: () => {}
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
      counterBox,
      counterText,
      counterLabelText
    } = styles;
    if (this.props.mode === 'onboarding') {
      return;
    }
    return (
      <View style={millennialsSavedContainer}>
        <View style={counterBox}>
          <Text style={counterText}>2</Text>
        </View>
        <View style={counterBox}>
          <Text style={counterText}>1</Text>
        </View>
        <Text style={counterLabelText}>millennials saved</Text>
      </View>
    );
  }

  render() {
    const {
      header,
      contentContainer
    } = styles;

    return (
      <View
        style={header}
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
    paddingTop: 15,
    overflow: 'hidden',
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

export default Header;
