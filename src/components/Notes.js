import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
    const { Notes, getNotes } = useContext(NoteContext);
    useEffect(() => {
        getNotes();
    }, []);

    return <div>
        <div className="row my-5">
            <h1>Your Notes</h1>
            {Notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}
        </div>
    </div>;
}

export default Notes;
