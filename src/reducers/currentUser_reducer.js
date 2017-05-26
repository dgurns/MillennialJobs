import * as types from '../actions/types';

const INITIAL_STATE = {
  interestName: '',
  uid: '',
  profilePhotoUrl: '',
  authLoading: false,
  photoUploading: false
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
    case types.USER_STATE_REFRESHED:
      return {
        ...state,
        uid: action.payload.uid,
        profilePhotoUrl: action.payload.profilePhotoUrl,
        interestName: action.payload.interestName
      };
    default:
      return state;
  }
}
