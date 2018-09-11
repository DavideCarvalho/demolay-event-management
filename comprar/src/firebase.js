import firebase from 'firebase';

const config = {
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
  databaseURL: process.env.DATABASE_URL,
};
firebase.initializeApp(config);
export default firebase.database();