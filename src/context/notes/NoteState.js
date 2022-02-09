import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const NotesInitial = [];
    const [Notes, setNotes] = useState(NotesInitial);

    // GET ALL NOTES FROM DATABASE
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMTEzMWIzMTc1Y2M4NzA2YTQwMGY5In0sImlhdCI6MTY0MzE5NTMxNn0.zC3_X8GtyL4qdJOzXEqwYki1a4xVjk6EzevC0IkVggg'
            }
        });
        const res = await response.json();
        console.log(res);
        setNotes(res);
    }

    // ADD A NOTE
    const addNote = (title, description, tag) => {
        console.log("Adding a new note");
        const note = {
            "_id": "61ff5d76899b1be3d4d",
            "user": "61f1131b3175cc8706a400f9",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-06T08:20:50.664Z",
            "__v": 0
        };
        setNotes(Notes.concat(note));
    }
    // DELETE A NOTE
    const deleteNote = (id) => {
        console.log("Deleting a note");
        // MOST USED SYNTAX TO DELETE AN ITEM IN REACT
        const newNotes = Notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // EDIT A NOTE
    const editNote = (id, title, description, tag) => {
    }
    return (
        <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;