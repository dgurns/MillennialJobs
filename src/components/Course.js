import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import * as constants from '../constants';
import * as helpers from '../helpers';
import Button from './Button';

class Course extends Component {
  static defaultProps = {
    id: null,
    style: {}
  }

  state = {
    courseName: '',
    imageUri: '',
    courseUrl: '',
    courseDescription: '',
    courseRating: ''
  }

  componentWillMount() {
    this.loadCourseDetails();
  }

  loadCourseDetails = async () => {
    let courseDetails = await helpers.fetchCourseDetails(this.props.id);
    const { title, url, headline, avg_rating, image_50x50 } = courseDetails;

    const fullUrl = `${constants.UDEMY_ROOT_URL}${url}`;
    const cleanedRating = avg_rating.toFixed(1);
    const cleanedImageUri = image_50x50.replace('https', 'http');

    this.setState({
      courseName: title,
      imageUri: cleanedImageUri,
      courseUrl: fullUrl,
      courseDescription: headline,
      courseRating: cleanedRating
    });
  }

  render() {
    const {
      container,
      imageTitleContainer,
      image,
      title,
      description,
      ratingButtonContainer,
      rating,
      button
    } = styles;

    const {
      courseName,
      imageUri,
      courseUrl,
      courseDescription,
      courseRating
    } = this.state;

    return (
      <View style={[container, this.props.style]}>
        <View style={imageTitleContainer}>
          <Image
            style={image}
            source={{ uri: imageUri }}
            resizeMode="contain"
          />
          <Text style={title}>
            {courseName}
          </Text>
        </View>
        <Text style={description}>
          {courseDescription}
        </Text>
        <View style={ratingButtonContainer}>
          <Text style={rating}>
            {courseRating} stars
          </Text>
          <View style={button}>
            <Button
              size="small"
              onPress={() => {}}
              buttonText="Go"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    padding: 15,
    paddingTop: 18,
    flexDirection: 'column'
  },
  imageTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 13
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 15,
    borderWidth: 1,
    borderColor: constants.DARK_GRAY_COLOR,
  },
  title: {
    flex: 1,
    minWidth: 0,
    marginTop: -5,
    color: constants.BLACK_COLOR,
    fontWeight: 'bold',
    fontSize: constants.BODY_FONT_SIZE
  },
  description: {
    fontSize: constants.BODY_FONT_SIZE,
    color: constants.BLACK_COLOR,
    marginBottom: 12
  },
  ratingButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 7
  },
  rating: {
    flex: 1,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    paddingTop: 8
  },
  button: {
    width: 65,
  }
});

export default Course;
