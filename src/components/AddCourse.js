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
import * as helpers from '../helpers';
import ModalView from './ModalView';
import Course from './Course';

class AddCourse extends Component {
  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      modalVisible: false,
      searchResults: [],
      searchResultsLoading: false
    };
  }

  addCourseToSavedCourses = (courseId) => {
    this.props.addCourseToSavedCourses(courseId);
    this.hideModal();
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      searchResults: [],
      searchResultsLoading: false
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

  searchForCourses = async (searchTerm) => {
    this.setState({
      searchResultsLoading: true
    });

    try {
      let searchResults = await helpers.searchForCourses(searchTerm);
      const courses = searchResults.results;
      let courseIds = [];
      courses.map(course => courseIds.push(course.id));

      this.setState({
        searchResults: courseIds,
        searchResultsLoading: false
      });
    } catch (error) {
      console.log(error);

      this.setState({
        searchResultsLoading: false
      });
    }
  }

  renderSearchResults() {
    if (this.state.searchResultsLoading) {
      return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.ds.cloneWithRows(this.state.searchResults)}
        renderRow={(rowData) =>
          this.renderRow(rowData)
        }
      />
    );
  }

  renderRow(courseId) {
    return (
      <Course
        id={courseId}
        style={styles.course}
        buttonText="Add"
        onPress={() => this.addCourseToSavedCourses(courseId)}
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
            placeholder="Search course name to add..."
            placeholderTextColor={constants.LIGHT_GRAY_COLOR}
            selectionColor={constants.GREEN_COLOR}
            onEndEditing={event => this.searchForCourses(event.nativeEvent.text)}
            returnKeyType="search"
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
    marginBottom: 50
  },
  course: {
    flex: 1,
    marginBottom: 20
  }
});

export default connect(null, actions)(AddCourse);
