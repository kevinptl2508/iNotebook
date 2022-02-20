import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
    const { deleteNote } = useContext(NoteContext);
    const { note, updateNote } = props;
    return <div className="col-md-3">
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
            </div>
        </div>
    </div>;
}

export default NoteItem;
