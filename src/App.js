import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  }; // end state

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  }; // end addNote

  onType = (editedId, updatedKey, updatedValue) => {
    const updateNote = (note) => {
      if (note.id === editedId) {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      } else {
        return note;
      }
    };

    const updatedNotes = this.state.notes.map(updateNote);
    this.setState({ notes: updatedNotes });
  }; // end onType

  onSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const searchNotes = (note) => {
      if (!searchText) {
        note.doesMatchSearch = true;
        return note;
      }
      if (
        note.title.toLowerCase().includes(searchText) ||
        note.description.toLowerCase().includes(searchText)
      ) {
        note.doesMatchSearch = true;
        return note;
      } else {
        note.doesMatchSearch = false;
        return note;
      }
    };
    const searchResultsNotes = this.state.notes.map(searchNotes);
    this.setState({
      notes: searchResultsNotes,
      searchText: searchText
    });
  }; // end onSearch

  onDelete = (deletedId) => {
    const keepNote = (note) => {
      if (note.id !== deletedId) {
        return note;
      }
    };
    const keptNotes = this.state.notes.filter(keepNote);
    this.setState({ notes: keptNotes });
  }; // end deleteNote

  componentDidMount() {
    const stateString = localStorage.getItem("stateString");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState({ notes: savedState });
    }
  }

  componentDidUpdate() {
    const stateString = JSON.stringify(this.state.notes);
    localStorage.setItem("stateString", stateString);
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          onDelete={this.onDelete}
        />
      </div>
    );
  } // end render
} // end class App

export default App;
