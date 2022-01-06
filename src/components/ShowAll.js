import React, {useContext} from 'react';
import { NotesContext } from '../context/NotesContext';

export const ShowAll = () => {
    const { showAll } = useContext(NotesContext);
    return (
        <button onClick={showAll}>
            Show All
        </button>
    )
}

