import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import styled from "styled-components";
import { Task } from "./Task";

export const ListTask = () => {
  const { state } = useContext(NotesContext);
  console.log(state);
  return (
    <StyledListTasksGrid>
      {state.notes.map((i) => {
        return <Task key={i.id} id={i.id} note={i.note} time={i.time} color={i.color} rotate={i.rotate} />;
      })}
    </StyledListTasksGrid>
  );
};

const StyledListTasksGrid = styled.ul`
  width: 100%;
  display: grid;
  gap: 5rem;
  grid-template-columns: repeat(auto-fit,  300px);
  justify-content: center;
  list-style: none;
  word-wrap: break-word;
`;
