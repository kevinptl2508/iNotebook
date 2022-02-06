import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const NotesInitial = [
        {
            "_id": "61ff84d645d76899b1be3d4b",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My firt note title",
            "description": "This is description of first note",
            "tag": "personal",
            "date": "2022-02-06T08:20:38.429Z",
            "__v": 0
        },
        {
            "_id": "61ff84e245d76899b1be3d4d",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My second note title",
            "description": "This is description of second note",
            "tag": "personal",
            "date": "2022-02-06T08:20:50.664Z",
            "__v": 0
        },
        {
            "_id": "61ff84d645d76899b1be3d4b",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My firt note title",
            "description": "This is description of first note",
            "tag": "personal",
            "date": "2022-02-06T08:20:38.429Z",
            "__v": 0
        },
        {
            "_id": "61ff84e245d76899b1be3d4d",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My second note title",
            "description": "This is description of second note",
            "tag": "personal",
            "date": "2022-02-06T08:20:50.664Z",
            "__v": 0
        },
        {
            "_id": "61ff84d645d76899b1be3d4b",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My firt note title",
            "description": "This is description of first note",
            "tag": "personal",
            "date": "2022-02-06T08:20:38.429Z",
            "__v": 0
        },
        {
            "_id": "61ff84e245d76899b1be3d4d",
            "user": "61f1131b3175cc8706a400f9",
            "title": "My second note title",
            "description": "This is description of second note",
            "tag": "personal",
            "date": "2022-02-06T08:20:50.664Z",
            "__v": 0
        }
    ];
    const [Notes, setNotes] = useState(NotesInitial);
    return (
        <NoteContext.Provider value={{ Notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;