import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
    const { Notes, setNotes } = useContext(NoteContext);
  return <div>
      <div className="row my-5">
      <h1>Your Notes</h1>
      {Notes.map((note) => {
        return <NoteItem note={note}/>
      })}
    </div>
  </div>;
}

export default Notes;
