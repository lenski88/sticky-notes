import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";

export const NewNotes = () => {
  const { addNote } = useContext(NotesContext);
  const [note, setNote] = useState("");

  const handleSubmit = (eo) => {
    eo.preventDefault();

    if (!note) return;

    addNote(note);
    setNote("");
  };
  return (
    <StyledNewNotesFrom onSubmit={handleSubmit}>
      <textarea
        value={note}
        onChange={(eo) => setNote(eo.target.value)}
        placeholder="Type here your note..."
        maxLength={140}
      ></textarea>
      <button type="submit">Create note</button>
    </StyledNewNotesFrom>
  );
};

const StyledNewNotesFrom = styled.form`
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: #ff7fba;
  box-shadow: 0 0 5px #222;
  grid-area: newNoteForm;
  transition: all .5s;

  @media (max-width: 768px) {
    width:100%
  }

  & textarea {
    border: 1px solid lightgrey;
    min-width: 100%;
    max-width: 100%;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    padding: 10px;
    outline: none;
    font-size: 2rem;
  }

  & button {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    background-color: #feff9d;
    border: none;
    box-shadow: 0 0 5px #222;
    transition: all 0.5s;
    color: #444;
    text-transform: uppercase;
    font-weight: 700;
    cursor:pointer;
    &:hover {
      background-color: #7bfcff;
      transform: scale(0.98);
    }
  }
`;
