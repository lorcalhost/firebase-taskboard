import React, { useState } from "react";
import "./App.css";

import {
  Jumbotron,
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>{user ? <TaskBoard /> : <SignIn />}</section>
      </header>
    </div>
  );
}

function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <section>
      <Jumbotron>
        <h1>Welcome to Firebase TaskBoard 🔥</h1>
        <p>
          This is a simple taskboard app created using React and Firebase by{" "}
          <a
            href="https://github.com/lorcalhost/"
            target="_blank"
            rel="noreferrer"
          >
            lorcalhost
          </a>
          .
        </p>
        <p>
          <Button variant="dark" onClick={useSignInWithGoogle}>
            Sign in with Google
          </Button>
        </p>
      </Jumbotron>
    </section>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <Button variant="dark" onClick={() => auth.signOut()}>
        {"Sign out"}
      </Button>
    )
  );
}

function TaskBoard() {
  const user = auth.currentUser;

  const tasksRef = firestore.collection("tasks");
  const query = tasksRef.orderBy("createdAt");

  const [tasks] = useCollectionData(query, { idField: "id" });

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const addTask = async (e) => {
    e.preventDefault();

    const tasksRef = firestore.collection("tasks");

    await tasksRef.add({
      uid: auth.currentUser.uid,
      title: formTitle,
      description: formDescription,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormTitle("");
    setFormDescription("");
  };

  return (
    <section>
      <Jumbotron fluid>
        <Container>
          <h1>Hi, {user.displayName}! 👋</h1>
          <p>Stay productive. ☕</p>
        </Container>
      </Jumbotron>
      <ul className="list-group task-list">
        {tasks && tasks.map((tsk) => <Task key={tsk.id} task={tsk} />)}
      </ul>
      <br></br>
      <Form onSubmit={addTask} className="task-input">
        <p>Add new task:</p>
        <InputGroup className="mb-3">
          <FormControl
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Title"
            aria-label="Title"
          />
          <FormControl
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Description"
            aria-label="Description"
          />
          <InputGroup.Append>
            <Button type="submit" variant="dark">
              📜
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <SignOut />
    </section>
  );
}

function Task(props) {
  const { title, description, id } = props.task;

  const deleteTask = async () => {
    firestore.collection("tasks").doc(id).delete();
  };

  console.log(props.task);

  return (
    <li className="list-group-item task-list-item">
      <b>{title}</b>
      <p>{description}</p>
      <Button
        type="submit"
        variant="outline-dark"
        className="delete-btn"
        onClick={deleteTask}
      >
        🗑️
      </Button>
    </li>
  );
}

export default App;
