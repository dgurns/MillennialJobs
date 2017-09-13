import React, { Component } from 'react';
import { ListView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as constants from '../constants';
import Picker from '../components/Picker';
import CoursesIcon from '../icons/CoursesIcon';
import ScreenContainer from '../components/ScreenContainer';
import Course from '../components/Course';

class CoursesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <CoursesIcon
        color={tintColor}
      />
    )
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentDidMount() {
    this.props.clearCourses();
    this.props.fetchCourses(this.props.interestName, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interestName !== this.props.interestName) {
      this.props.clearCourses();
      this.props.fetchCourses(nextProps.interestName, 1);
    }
  }

  renderListView() {
    if (this.props.coursesLoading) {
      return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    } else if (!this.props.coursesLoading && this.props.courses.length === 0) {
      return (
        <Text style={styles.noCoursesText}>
          No courses in that category! Guess nobody is getting saved through
          {' '}{this.props.interestName}.
        </Text>
      );
    }
    return (
      <ListView
        dataSource={this.ds.cloneWithRows(this.props.courses)}
        renderRow={(rowData) => this.renderRow(rowData)}
        contentContainerStyle={styles.listView}
      />
    );
  }

  renderRow(rowData) {
    return <Course id={rowData.id} style={{ marginBottom: 20 }} />;
  }

  render() {
    const {
      navigation,
      interestName,
      coursesLoading,
      primarySubcategories,
      secondarySubcategories
    } = this.props;

    return (
      <ScreenContainer
        navigation={navigation}
        key={coursesLoading}
      >
        <Picker
          primaryOptionList={primarySubcategories}
          secondaryOptionList={secondarySubcategories}
          selected={interestName}
          style={styles.picker}
        />
        {this.renderListView()}
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    marginBottom: 20
  },
  listView: {
    flex: 1
  },
  noCoursesText: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.DARK_GRAY_COLOR,
    padding: 10
  }
});

function mapStateToProps({ data, currentUser }) {
  return {
    interestName: currentUser.interestName,
    primarySubcategories: data.primarySubcategories,
    secondarySubcategories: data.secondarySubcategories,
    courses: data.courses,
    coursesLoading: data.coursesLoading
  };
}

export default connect(mapStateToProps, actions)(CoursesScreen);
