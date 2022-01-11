import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";

export const ChangeNote = ({ id, note, bg, cbCancelChangeNote }) => {
  const [changedNote, setChangedNote] = useState(note);
  const { changeNote } = useContext(NotesContext);

  const handleChangeNote = (eo) => {
    eo.preventDefault();

    if (!changedNote) return;
    if (changedNote === note) {
      cbCancelChangeNote();
      return;
    }

    changeNote(id, changedNote);
    cbCancelChangeNote();
  };

  const handleChangeNoteInput = (eo) => {
    setChangedNote(eo.target.value);
  };

  const handleCancelChangeNote = () => {
    cbCancelChangeNote();
  };
  return (
    <StyledChangeNote bg={bg} onSubmit={handleChangeNote}>
      <textarea
        value={changedNote}
        onChange={handleChangeNoteInput}
        placeholder="Type here your note..."
        maxLength={140}
      ></textarea>
      <button type="submit">Change</button>
      <button type="reset" onClick={handleCancelChangeNote}>
        Cancel
      </button>
    </StyledChangeNote>
  );
};

const StyledChangeNote = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: ${({ bg }) => bg};
  box-shadow: 0 0 5px #222;
  grid-area: newNoteForm;
  transition: all 0.5s;

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
    width: 40%;
    padding: 10px;
    margin: 20px 10px;
    background-color: #feff9d;
    border: none;
    box-shadow: 0 0 5px #222;
    transition: all 0.5s;
    color: #444;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      background-color: #7bfcff;
      transform: scale(0.98);
    }
  }
`;
