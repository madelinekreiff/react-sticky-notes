import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    props.onType(props.note.id, "title", e.target.value);
  };

  const updateDescription = (e) => {
    props.onType(props.note.id, "description", e.target.value);
  };

  const deleteNote = () => {
    props.onDelete(props.note.id);
  };

  return (
    <li className="note">
      <input
        onChange={updateTitle}
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
      />
      <textarea
        onChange={updateDescription}
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
      />
      <span onClick={deleteNote} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
