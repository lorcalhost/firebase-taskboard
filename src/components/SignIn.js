import React from "react";

import { Jumbotron, Button } from "react-bootstrap";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function SignIn(props) {
  const auth = props.auth;

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

export default SignIn;
