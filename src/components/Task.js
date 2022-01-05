import React, {useContext} from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";

export const Task = ({ id, note, time, color, rotate }) => {
    const {deleteNote} = useContext(NotesContext)
  return (
    <StyledTask bg={color} rt={rotate}>
      {note}
      <span>
        <i>{time}</i>
      </span>
      <i className="far fa-trash-alt" onClick={()=> deleteNote(id)}></i>
    </StyledTask>
  );
};

const StyledTask = styled.li`
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
  & > i {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 2.5rem;
    transition: all .5s;

    &:hover {
        color: red;
        opacity:.9;
        transform: scale(.9);
    }
  }
`;
