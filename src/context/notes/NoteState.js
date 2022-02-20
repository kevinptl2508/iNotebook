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
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMTEzMWIzMTc1Y2M4NzA2YTQwMGY5In0sImlhdCI6MTY0MzE5NTMxNn0.zC3_X8GtyL4qdJOzXEqwYki1a4xVjk6EzevC0IkVggg'
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
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMTEzMWIzMTc1Y2M4NzA2YTQwMGY5In0sImlhdCI6MTY0MzE5NTMxNn0.zC3_X8GtyL4qdJOzXEqwYki1a4xVjk6EzevC0IkVggg'
            },
            body: JSON.stringify({title,description,tag})
        });
        const res = await response.json();
        console.log(res);

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
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMTEzMWIzMTc1Y2M4NzA2YTQwMGY5In0sImlhdCI6MTY0MzE5NTMxNn0.zC3_X8GtyL4qdJOzXEqwYki1a4xVjk6EzevC0IkVggg'
            }
        });
        const res = await response.json();
        console.log(res);

        console.log("Deleting a note with id=" + id);
        // MOST USED SYNTAX TO DELETE AN ITEM IN REACT
        const newNotes = Notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // EDIT A NOTE
    // MOST USED SYNTAX TO DUPLICATE AN EXISTING JSON OBJECT(Because we can't update state in react directly)
    let newNotes = JSON.parse(JSON.stringify(Notes));

    const editNote = (id, title, description, tag) => {
        console.log("Editing Note id " + id);
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;