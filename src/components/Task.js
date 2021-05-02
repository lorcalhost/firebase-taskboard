import React from "react";
import { Button } from "react-bootstrap";

function Task(props) {
  const { title, description, id } = props.task;
  const setFormTitle = props.controllers[0];
  const setFormDescription = props.controllers[1];
  const setEditing = props.controllers[2];
  const firestore = props.firestore;
  const auth = props.auth;

  const editTask = () => {
    setEditing(id);
    setFormTitle(title);
    setFormDescription(description);
  };

  const deleteTask = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(id)
      .delete();
  };

  return (
    <li className="list-group-item task-list-item">
      <b>{title}</b>
      <p>{description}</p>
      <div className="task-btn-div">
        <Button
          type="submit"
          variant="outline-dark"
          onClick={editTask}
          className="task-btn"
        >
          ✏️
        </Button>
        &nbsp;
        <Button
          type="submit"
          variant="outline-dark"
          onClick={deleteTask}
          className="task-btn"
        >
          🗑️
        </Button>
      </div>
    </li>
  );
}

export default Task;
