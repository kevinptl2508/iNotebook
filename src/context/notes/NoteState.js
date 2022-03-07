import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const NotesInitial = [];
    const [Notes, setNotes] = useState(NotesInitial);

    // GET ALL NOTES FROM DATABASE USING API CALL
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        const res = await response.json();
        setNotes(res);
    }

    // ADD A NOTE
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(Notes.concat(note));
    }

    // DELETE A NOTE
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        const res = await response.json();
        // MOST USED SYNTAX TO DELETE AN ITEM IN REACT
        const newNotes = Notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // EDIT A NOTE
    // MOST USED SYNTAX TO DUPLICATE AN EXISTING JSON OBJECT(Because we can't update state in react directly)
    let newNotes = JSON.parse(JSON.stringify(Notes));

    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const res = await response.json();
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;