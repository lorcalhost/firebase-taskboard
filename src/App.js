import React from "react";
import "./App.css";
import TaskBoard from "./components/TaskBoard";
import SignIn from "./components/SignIn";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyChQqsuXh-ydFAhyUZvxo9mzkgD7dGI9Vc",
    authDomain: "fire-taskboard.firebaseapp.com",
    projectId: "fire-taskboard",
    storageBucket: "fire-taskboard.appspot.com",
    messagingSenderId: "581639892337",
    appId: "1:581639892337:web:faa8582e5f50a8617f9ad0",
    measurementId: "G-LYPVR325JL",
  });
} else {
  firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? (
            <TaskBoard auth={auth} firestore={firestore} />
          ) : (
            <SignIn auth={auth} />
          )}
        </section>
      </header>
    </div>
  );
}

export default App;
