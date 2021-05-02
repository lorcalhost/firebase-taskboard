import React, { useState } from "react";
import Task from "./Task";

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

import { useCollectionData } from "react-firebase-hooks/firestore";

function TaskBoard(props) {
  const auth = props.auth;
  const firestore = props.firestore;
  const user = auth.currentUser;

  const tasksRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("tasks");
  const query = tasksRef.orderBy("createdAt");

  const [tasks] = useCollectionData(query, { idField: "id" });

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [editing, setEditing] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();

    if (formTitle !== "" && formDescription !== "") {
      const tasksRef = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("tasks");

      if (editing !== false) {
        const payload = {
          uid: auth.currentUser.uid,
          title: formTitle,
          description: formDescription,
        };

        tasksRef.doc(editing).update(payload);
        setEditing(false);
      } else {
        const payload = {
          uid: auth.currentUser.uid,
          title: formTitle,
          description: formDescription,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        await tasksRef.add(payload);
      }

      setFormTitle("");
      setFormDescription("");
    }
  };
  console.log(tasks);
  return (
    <section>
      <Jumbotron fluid>
        <Container>
          <h1>Hi, {user.displayName}! 👋</h1>
          <p>Stay productive. ☕</p>
        </Container>
      </Jumbotron>
      {tasks && (
        <ul className="list-group task-list">
          {tasks.length !== 0 ? (
            tasks.map((tsk) => (
              <Task
                key={tsk.id}
                task={tsk}
                controllers={[setFormTitle, setFormDescription, setEditing]}
                auth={auth}
                firestore={firestore}
              />
            ))
          ) : (
            <div>
              <p>💭</p>
              <h6>So empty </h6>
            </div>
          )}
        </ul>
      )}
      <br></br>
      <Form onSubmit={addTask} className="task-input">
        <p>Add new task:</p>
        <InputGroup className="mb-3">
          <FormControl
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Title"
            aria-label="Title"
            as="textarea"
          />
          <FormControl
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Description"
            aria-label="Description"
            as="textarea"
          />
          <InputGroup.Append>
            <Button type="submit" variant="dark">
              📜
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </section>
  );
}

export default TaskBoard;
