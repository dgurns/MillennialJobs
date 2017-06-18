import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform
} from 'react-native';
import SafariView from 'react-native-safari-view';

import * as constants from '../constants';
import * as helpers from '../helpers';
import Button from './Button';

class Course extends Component {
  static defaultProps = {
    id: null,
    style: {},
    buttonText: 'Go',
    onPress: null,
    onRemove: null,
    inModal: false // to account for bug in react-native-safari-view in modals
  }

  state = {
    courseName: '',
    imageUri: 'https://static.swappa.com/static/icons/no_profile_50.png',
    courseUrl: '',
    courseDescription: '',
    courseRating: '',
    loading: false
  }

  componentDidMount() {
    this.loadCourseDetails();
  }

  onPress = () => {
    const affiliateUrl = helpers.createAffiliateUrl(this.state.courseUrl);

    // Since react-native-safari-view doesn't work in modals, use regular Linking
    if (this.props.inModal) {
      Linking.openURL(affiliateUrl);
      return;
    }

    if (Platform.OS === 'ios') {
      SafariView.isAvailable()
        .then(() => SafariView.show({ url: affiliateUrl }))
        .catch(() => Linking.openURL(affiliateUrl));
    } else {
      Linking.openURL(affiliateUrl);
    }
  }

  loadCourseDetails = async () => {
    this.setState({
      loading: true
    });

    try {
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
        courseRating: cleanedRating,
        loading: false
      });
    } catch (error) {
      console.log(error);

      this.setState({
        loading: false
      });
    }
  }

  renderCourse() {
    const {
      imageTitleContainer,
      image,
      title,
      description,
      ratingButtonContainer,
      button
    } = styles;

    const {
      courseName,
      imageUri,
      courseDescription,
    } = this.state;

    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ marginTop: 80, marginBottom: 80 }}
          size="large"
        />
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={this.onPress}
        >
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
        </TouchableOpacity>
        <Text style={description}>
          {courseDescription}
        </Text>
        <View style={ratingButtonContainer}>
          {this.renderRatingOrRemove()}
          <View style={button}>
            <Button
              size="small"
              onPress={this.props.onPress ? this.props.onPress : this.onPress}
              buttonText={this.props.buttonText}
            />
          </View>
        </View>
      </View>
    );
  }

  renderRatingOrRemove() {
    if (this.props.onRemove) {
      return (
        <TouchableOpacity onPress={this.props.onRemove}>
          <Text style={styles.rating}>
            Remove
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <Text style={styles.rating}>
        {this.state.courseRating} stars
      </Text>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderCourse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 7,
  },
  rating: {
    width: 100,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    paddingTop: 8
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  }
});

export default Course;
