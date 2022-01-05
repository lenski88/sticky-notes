import React, {useContext} from 'react';
import styled from 'styled-components';
import { NotesContext } from '../context/NotesContext';

export const Info = () => {
    const {state} = useContext(NotesContext);
    return (
        <StyledInfo>
        <h1>Quantity of tasks: {state.totalNotes}</h1>
        <p><i>Last note: {state.lastNoteDate}</i></p>
        </StyledInfo>
    )
}

const StyledInfo = styled.div`
text-align: center;
margin: 20px;
padding:20px; 
color: #222;
font-size: 1.6rem;
color: #444;
line-height: 2;
grid-area: header;
background: #feff9d;
box-shadow: 0 0 5px #222;
`
