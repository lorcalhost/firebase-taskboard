import React from "react";

import { Button } from "react-bootstrap";

function SignOut(props) {
  const auth = props.auth;

  return (
    auth.currentUser && (
      <Button variant="dark" onClick={() => auth.signOut()}>
        {"Sign out"}
      </Button>
    )
  );
}

export default SignOut;
