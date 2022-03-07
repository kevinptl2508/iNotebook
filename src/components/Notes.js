import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes(props) {
    const { Notes, getNotes, editNote } = useContext(NoteContext);
    const ref = useRef(null);
    const refClose = useRef(null);

    // FETCHING ALL NOTES
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    // CREATING THIS STATE ONLY FOR ONCHANGE FUNCTION
    // THIS note DOESN'T HAVE TO DO ANYTHING WITH THE ONE WRITTEN IN Notes.map((note)=>{})
    const [note, setNote] = useState({ id: "", edittitle: "", editdescription: "", edittag: "" });

    // SMART WAY TO DO THIS FOR OBJECT(here note object)!
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNoteFunc = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            edittitle: currentNote.title,
            editdescription: currentNote.description,
            edittag: currentNote.tag
        });
    }
    
    const updateNote = (e) => {
        editNote(note.id, note.edittitle, note.editdescription, note.edittag);
        ref.current.click();
        props.showAlert("Updated successfully","success");
    }

    return <div>
        <div className="row my-5">
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" name="edittitle" value={note.edittitle} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="editdescription" name="editdescription" value={note.editdescription} onChange={onChange} required minLength={5}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="edittag" name="edittag" value={note.edittag} onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.edittitle.length < 5 || note.editdescription.length < 5} className="btn btn-primary" onClick={updateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Notes</h1>
            <div className="container">
                {Notes.length === 0 && "No Notes To Display"}
            </div>
            {Notes.map((note) => {
                return <NoteItem key={note._id} updateNote={updateNoteFunc} note={note} showAlert={props.showAlert} />
            })}
        </div>
    </div>;
}

export default Notes;
