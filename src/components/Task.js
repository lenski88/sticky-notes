import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";
import { ListColors } from "./ListColors";
import { ChangeNote } from "./ChangeNote";

export const Task = React.memo(({ id, note, time, color, rotate }) => {
  const { deleteNote } = useContext(NotesContext);
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [isChangeNote, setIsChangeNote] = useState(false);

  const colorChanged = () => {
    setIsChangeColor(false);
  };

  const cancelChangeNote = () => {
    setIsChangeNote(false);
  };

  const handleDeleteNote = () => {
    deleteNote(id);
  };

  const handleKeyboardDeleteNote = (eo) => {
    if (eo.keyCode === 68) deleteNote(id);
  };

  const handleChangeColor = () => {
    setIsChangeColor(!isChangeColor);
  };

  const handleKeyboardChangeColor = (eo) => {
    if (eo.keyCode === 67) setIsChangeColor(!isChangeColor);
  };

  const handleChangeNote = () => {
    setIsChangeNote(!isChangeNote);
  };

  const handleKeyboardChangeNote = (eo) => {
    if (eo.keyCode === 87) setIsChangeNote(!isChangeNote);
  };

  return (
    <StyledTask bg={color} rt={rotate} data-testid="task-card">
      {note}
      <span>
        <i>{time}</i>
      </span>
      <i
        aria-label="delete note"
        className="far fa-trash-alt delete"
        onClick={handleDeleteNote}
        onKeyDown={handleKeyboardDeleteNote}
        role="button"
        tabIndex={0}
      />
      <i
        aria-label="change color"
        className="far fa-ellipsis-h change"
        onClick={handleChangeColor}
        onKeyDown={handleKeyboardChangeColor}
        role="button"
        tabIndex={0}
      />
      {isChangeColor && (
        <ListColors color={color} id={id} cbColorChanged={colorChanged} />
      )}
      <i
        aria-label="change note"
        className="fas fa-pencil-alt changeNote"
        onClick={handleChangeNote}
        onKeyDown={handleKeyboardChangeNote}
        role="button"
        tabIndex={0}
      />
      {isChangeNote && (
        <ChangeNote
          id={id}
          note={note}
          bg={color}
          cbCancelChangeNote={cancelChangeNote}
        />
      )}
    </StyledTask>
  );
});

const StyledTask = styled.li`
  position: relative;
  height: 300px;
  background-color: ${({ bg }) => bg};
  color: #444;
  font-size: 2.4rem;
  line-height: 1.4;
  text-align: left;
  padding: 10px;
  box-shadow: 0 0 5px #222;
  overflow: hidden auto;
  transform: rotate(${({ rt }) => `${rt}deg`});

  & span {
    position: absolute;
    bottom: 2px;
    right: 5px;
    font-size: 1.5rem;
  }
  & .delete {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 2.5rem;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      color: red;
      opacity: 0.9;
      transform: scale(0.9);
    }
  }

  & .change {
    position: absolute;
    bottom: 0px;
    left: 85px;
    font-size: 2.5rem;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      transform: scale(0.9);
    }
  }

  & .changeNote {
    position: absolute;
    bottom: 5px;
    left: 45px;
    font-size: 2.2rem;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      transform: scale(0.9);
    }
  }
`;
