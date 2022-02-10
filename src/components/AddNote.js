import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote() {
    const { addNote } = useContext(NoteContext);

    // CREATING THIS STATE ONLY FOR ONCHANGE FUNCTION
    const [note, setNote] = useState({ title: "", description: "", tag: "Default" });

    const addNoteFunc = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
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
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={addNoteFunc}>Add Note</button>
            </form>
        </div>
    </div>;
}

export default AddNote;
