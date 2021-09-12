import React from "react";
import Note from "./Note.js";

const keepSearchMatches = (note) => note.doesMatchSearch;

const NotesList = (props) => {
  const renderNote = (note) => (
    <Note
      key={note.id}
      note={note}
      onType={props.onType}
      onDelete={props.onDelete}
    />
  );

  const searchElements = props.notes.filter(keepSearchMatches);
  const noteElements = searchElements.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
