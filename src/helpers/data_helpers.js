import * as firebase from 'firebase';

export const checkIfOnboarded = async (uid) => {
  return new Promise((resolve, reject) => {
    const databaseRef = firebase.database().ref(`users/${uid}`);

    databaseRef.once('value').then(snapshot => {
      const hasOnboarded = snapshot.val().hasOnboarded;
      resolve(hasOnboarded);
    }).catch(error => {
      reject(error);
    });
  });
};

export const fetchUserInformation = (uid) => {
  return new Promise(async (resolve, reject) => {
    // Then get rest of user information
    const databaseRef = firebase.database().ref(`users/${uid}`);
    databaseRef.once('value').then(snapshot => {
      const userObject = snapshot.val();

      resolve(userObject);
    }).catch(error => {
      reject(error);
    });
  });
};

export const fetchUserSavedCourses = (uid) => {
  return new Promise(async (resolve, reject) => {
    const savedCoursesDatabaseRef = firebase.database().ref(`savedCourses/${uid}`);
    await savedCoursesDatabaseRef.once('value').then(snapshot => {
      const savedCoursesArray = [];

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          const childCourseId = childData.courseId;
          savedCoursesArray.push(childCourseId);
        });
      }
      resolve(savedCoursesArray);
    }).catch(error => {
      reject(error);
    });
  });
};
