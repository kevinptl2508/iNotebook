import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const s1 = {
        "name": "Kevin",
        "age": "21"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Neha",
                "age": "24"
            })
        }, 5000);
    }
    return (
        <NoteContext.Provider value={{ state: state, update: update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;