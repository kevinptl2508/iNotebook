import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
    const { addNote } = useContext(NoteContext);

    // CREATING THIS STATE ONLY FOR ONCHANGE FUNCTION
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const addNoteFunc = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added","success");
    }

    // SMART WAY TO DO THIS FOR OBJECT!
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return <div>
        <div className="container my-5">
            <h1>Add A Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" disabled={note.title.length < 5 || note.description.length < 5} onClick={addNoteFunc}>Add Note</button>
            </form>
        </div>
    </div>;
}

export default AddNote;
