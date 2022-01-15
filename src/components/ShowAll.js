import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { StyledSearchButton } from "./Search";

export const ShowAll = React.memo(() => {
  const { showAll, state } = useContext(NotesContext);
  return (
    <StyledSearchButton filterNotes={state.filterNotes} onClick={showAll}>
      Show All
    </StyledSearchButton>
  );
});
