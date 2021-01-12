import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';



try {
    firebase.initializeApp({
    apiKey: "FULL_API_KEY_PUT_HERE",
    authDomain: "FULL_AUTHDOMAIN_PUT_HERE",
    databaseURL: "https://FULL_databaseURL_PUT_HERE.com",
    storageBucket: "FULL_storageBucket_PUT_HEREappspot.com",
    })
    } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
    }}

    const firebaseConfig = {
        apiKey: "AIzaSyDMpZdWrozGL8_7LiMdkCaEEEng4EnWlV0",
        authDomain: "astro-trading-91631.firebaseapp.com",
        projectId: "astro-trading-91631",
        storageBucket: "astro-trading-91631.appspot.com",
        messagingSenderId: "755413928369",
        appId: "1:755413928369:web:70ad967d129e7d6fa61590"
      };
  if (!firebase.apps.length) {
      try {
          if (Platform.OS === 'ios') {
            firebase.initializeApp({
                apiKey: "AIzaSyDKXxQzMRNoQQeahL6EWfvFzzBKjlODFQQ",
                authDomain: "astro-trading-91631.firebaseapp.com",
                projectId: "astro-trading-91631",
                storageBucket: "astro-trading-91631.appspot.com",
                messagingSenderId: "755413928369",
                appId: "1:755413928369:ios:7ae78e9587f444a0a61590"
              });
          } else if (Platform.OS === 'android') {
          firebase.initializeApp({
              apiKey: "AIzaSyDKXxQzMRNoQQeahL6EWfvFzzBKjlODFQQ",
              authDomain: "astro-trading-91631.firebaseapp.com",
              projectId: "astro-trading-91631",
              storageBucket: "astro-trading-91631.appspot.com",
              messagingSenderId: "755413928369",
              appId: "1:755413928369:android:31cca0321951b674a61590"
            });
        } else {
            firebase.initializeApp({
                apiKey: "AIzaSyDKXxQzMRNoQQeahL6EWfvFzzBKjlODFQQ",
                authDomain: "astro-trading-91631.firebaseapp.com",
                projectId: "astro-trading-91631",
                storageBucket: "astro-trading-91631.appspot.com",
                messagingSenderId: "755413928369",
                appId: "1:755413928369:web:70ad967d129e7d6fa61590"
              });
        }
      }catch (err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
        }}
  }

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

//   export default () => {
//       const = (!firebase.apps.length) ? firebase.initializeApp(config) : firebase.app()
//       return { , auth};
//   }