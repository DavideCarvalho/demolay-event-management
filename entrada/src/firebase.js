import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  projectId: process.env.PROJECT_ID,
  authDomain: process.env.AUTH_DOMAIN,
  apiKey: process.env.API_KEY,
};
const settings = {
  timestampsInSnapshots: true,
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings(settings);
export default firestore;
