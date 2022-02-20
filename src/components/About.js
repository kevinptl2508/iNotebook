import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const a = useContext(NoteContext);
    return <div>
        This is About Page.
    </div>;
};

export default About;