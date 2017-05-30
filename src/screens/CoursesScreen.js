import React, { Component } from 'react';
import { ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
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

    this.state = {
      coursesDataSource: this.ds.cloneWithRows(this.props.courses)
    };
  }

  componentWillMount() {
    this.props.clearCourses();
    this.props.fetchCourses(this.props.interestName, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.interestName !== this.props.interestName) {
      this.props.clearCourses();
      this.props.fetchCourses(nextProps.interestName, 1);
    }

    this.setState({
      coursesDataSource: this.ds.cloneWithRows(nextProps.courses)
    });
  }

  renderRow(rowData) {
    return <Course id={rowData.id} style={{ marginBottom: 20 }} />;
  }

  render() {
    const {
      navigation,
      interestName,
      primarySubcategories,
      secondarySubcategories
    } = this.props;

    return (
      <ScreenContainer
        navigation={navigation}
        key={interestName}
      >
        <Picker
          primaryOptionList={primarySubcategories}
          secondaryOptionList={secondarySubcategories}
          selected={interestName}
          style={styles.picker}
        />
        <ListView
          dataSource={this.state.coursesDataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          contentContainerStyle={styles.listView}
        />
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
