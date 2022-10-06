import React, { useContext } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";

export const ShowAll = React.memo(() => {
  const { showAll, state } = useContext(NotesContext);
  return (
    <StyledSearchButton filterNotes={state.filterNotes} onClick={showAll}>
      Show All
    </StyledSearchButton>
  );
});

const StyledSearchButton = styled.button`
  width: 30%;
  padding: 10px;
  margin: 20px 20px;
  background-color: #feff9d;
  border: none;
  box-shadow: 0 0 5px #222;
  transition: all 0.5s;
  color: #444;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;

  animation: ${({ filterNotes }) =>
    filterNotes && filterNotes.length
      ? "showAllAnimate .25s alternate infinite"
      : null};

  @keyframes showAllAnimate {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.98);
    }
  }

  &:hover {
    background-color: #7bfcff;
    transform: scale(0.98);
  }
`;
