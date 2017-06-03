import * as types from '../actions/types';

const INITIAL_STATE = {
  interestName: '',
  uid: '',
  username: '',
  profilePhotoUrl: '',
  hasOnboarded: false,
  isGood: {
    isGood: false,
    timesToggled: 0,
    mostRecentTimestamp: null
  },
  authLoading: false,
  photoUploading: false,
  postUploading: false,
  savedCourses: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INTEREST_SELECTED:
      return {
        ...state,
        interestName: action.payload
      };
    case types.SIGN_UP_ATTEMPTED:
      return {
        ...state,
        authLoading: true
      };
    case types.SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        authLoading: false
      };
    case types.SIGN_UP_FAILED:
      return {
        ...state,
        authLoading: false
      };
    case types.LOG_IN_ATTEMPTED:
      return {
        ...state,
        authLoading: true
      };
    case types.LOG_IN_SUCCESSFUL:
      return {
        ...state,
        authLoading: false
      };
    case types.LOG_IN_FAILED:
      return {
        ...state,
        authLoading: false
      };
    case types.PHOTO_UPLOAD_ATTEMPTED:
      return {
        ...state,
        photoUploading: true
      };
    case types.PHOTO_UPLOAD_SUCCESSFUL:
      return {
        ...state,
        photoUploading: false,
        profilePhotoUrl: action.payload
      };
    case types.PHOTO_UPLOAD_FAILED:
      return {
        ...state,
        photoUploading: false
      };
    case types.ONBOARDING_STATUS_RETRIEVED:
      return {
        ...state,
        hasOnboarded: action.payload
      };
    case types.USER_STATE_REFRESHED:
      return {
        ...state,
        uid: action.payload.uid,
        username: action.payload.username,
        profilePhotoUrl: action.payload.profilePhotoUrl,
        interestName: action.payload.interestName,
        isGood: action.payload.isGood,
        savedCourses: action.payload.savedCourses
      };
    case types.IS_GOOD_STATUS_UPDATED:
      return {
        ...state,
        isGood: action.payload
      };
    case types.COURSE_ADDED_TO_SAVED_COURSES:
      return {
        ...state,
        savedCourses: action.payload
      };
    case types.CREATE_POST_ATTEMPTED:
      return {
        ...state,
        postUploading: true
      };
    case types.CREATE_POST_FAILED:
      return {
        ...state,
        postUploading: false
      };
    case types.CREATE_POST_SUCCESSFUL:
      return {
        ...state,
        postUploading: false
      };
    case types.LOG_OUT_SUCCESSFUL:
      return state;
    default:
      return state;
  }
}
