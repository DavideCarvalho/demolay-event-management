import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
  databaseURL: process.env.DATABASE_URL,
};
firebase.initializeApp(config);
export default firebase.database();