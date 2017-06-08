import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as helpers from '../helpers';
import ProfilePhoto from './ProfilePhoto';
import UserProfile from './UserProfile';
import ModalView from './ModalView';

class IsGood extends Component {
  static defaultProps = {
    uid: ''
  }

  state = {
    username: '',
    modalVisible: false
  }

  componentDidMount() {
    helpers.fetchUserInformation(this.props.uid).then((userObject) => {
      this.setState({
        username: userObject.username
      });
    });
  }

  openUserProfile = () => {
    if (this.props.uid === this.props.currentUserUid) {
      this.props.navigation.navigate('profile');
    } else {
      this.showModal();
    }
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  render() {
    const { container, photo, text, boldText, greenText } = styles;

    return (
      <View>
        <TouchableOpacity
          style={container}
          onPress={this.openUserProfile}
        >
          <View style={photo}>
            <ProfilePhoto size="small" uid={this.props.uid} />
          </View>

          <Text style={text}>
            <Text style={boldText}>{this.state.username} </Text>
            is
            <Text style={greenText}> good!</Text>
          </Text>
        </TouchableOpacity>

        <ModalView
          visible={this.state.modalVisible}
          onClose={this.hideModal}
        >
          <UserProfile
            uid={this.props.uid}
            username={this.state.username}
          />
        </ModalView>
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

function mapStateToProps({ currentUser }) {
  return {
    currentUserUid: currentUser.uid
  };
}

export default connect(mapStateToProps)(IsGood);
