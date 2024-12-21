import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { initializeFirestore } from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBoKSuqGZqnLl9FGIHj4_HM7E5SqOkCv28",
    authDomain: "digitalnomap.firebaseapp.com",
    projectId: "digitalnomap",
    storageBucket: "digitalnomap.firebasestorage.app",
    messagingSenderId: "1099180769157",
    appId: "1:1099180769157:web:c70a69eef68953e0298eec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authInstance = auth();

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export { app, authInstance as auth, db };
