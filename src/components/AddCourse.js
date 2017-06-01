import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import ModalView from './ModalView';
import Course from './Course';

class AddCourse extends Component {
  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      searchResults: [],
    };

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.state.searchResults);
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

  selectRow = (rowId) => {
    this.setState({
      modalVisible: false
    });

    this.props.selectInterest(rowId);
  }

  renderRow(courseId) {
    return (
      <Course id={courseId} />
    );
  }

  renderSearchResults() {
    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.dataSource}
        renderRow={(rowData) =>
          this.renderRow(rowData.courseId)
        }
      />
    );
  }

  render() {
    const {
      addCourse,
      addContents,
      addIcon,
      addText,
      inputField
    } = styles;

    return (
      <TouchableOpacity
        style={[addCourse, this.props.style]}
        onPress={this.showModal}
      >
        <View style={addContents}>
          <Text style={addIcon}>+</Text>
          <Text style={addText}>Add</Text>
        </View>

        <ModalView
          visible={this.state.modalVisible}
          onClose={this.hideModal}
        >
          <TextInput
            style={inputField}
            placeholder="Search for course name..."
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            returnKeyType="done"
            autoCapitalize="none"
          />
          {this.renderSearchResults()}
        </ModalView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  addCourse: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    backgroundColor: constants.VERY_LIGHT_GRAY_COLOR,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  addContents: {
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  addIcon: {
    fontSize: 76,
    color: constants.LIGHT_GRAY_COLOR,
    backgroundColor: 'transparent',
    marginRight: 10
  },
  addText: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.LIGHT_GRAY_COLOR,
    backgroundColor: 'transparent',
    paddingTop: 40
  },
  inputField: {
    borderColor: constants.LIGHT_GRAY_COLOR,
    borderWidth: 1,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginBottom: 20,
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.GREEN_COLOR
  },
  listView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 50
  }
});

export default connect(null, actions)(AddCourse);
