import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Picker from '../components/Picker';
import CoursesIcon from '../icons/CoursesIcon';
import ScreenContainer from '../components/ScreenContainer';

class CoursesScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <CoursesIcon
        color={tintColor}
      />
    )
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
        />
      </ScreenContainer>
    );
  }
}

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
