import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDx0VB4N8IwAws-jTJ-juEpqxhrG6cSitk",
  authDomain: "kodotrading-9c662.firebaseapp.com",
  projectId: "kodotrading-9c662",
  storageBucket: "kodotrading-9c662.firebasestorage.app",
  messagingSenderId: "874790492069",
  appId: "1:874790492069:web:45d5d9bb838cf311ecfa4c",
  measurementId: "G-2533Z793LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const xProvider = new OAuthProvider('twitter.com'); // X uses Twitter's OAuth provider

export { auth, googleProvider, xProvider };
