import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
