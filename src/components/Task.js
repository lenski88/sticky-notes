import React, { useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";
import { ListColors } from "./ListColors";

export const Task = ({ id, note, time, color, rotate }) => {
  const { deleteNote } = useContext(NotesContext);
  const [isChangeColor, setIsChangeColor] = useState(false);

  const colorChanged = useCallback(() => {
    setIsChangeColor(false);
  }, []);

  return (
    <StyledTask bg={color} rt={rotate}>
      {note}
      <span>
        <i>{time}</i>
      </span>
      <i className="far fa-trash-alt delete" onClick={() => deleteNote(id)}></i>
      <i
        className="far fa-ellipsis-h change"
        onClick={() => setIsChangeColor(!isChangeColor)}
      ></i>
      {isChangeColor && (
        <ListColors color={color} id={id} cbColorChanged={colorChanged} />
      )}
    </StyledTask>
  );
};

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
  transform: rotate(${({ rt }) => rt + "deg"});

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
    bottom: 5px;
    left: 45px;
    font-size: 2.5rem;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      transform: scale(0.9);
    }
  }
`;
