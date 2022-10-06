import React from "react";
import styled from "styled-components";
import { NotesContextProvider } from "./context/NotesContext";
import { GlobalStyles } from "./globalStyles";
import { NewNote } from "./components/newNote/NewNote";
import { Info } from "./components/Info";
import { ListTask } from "./components/ListTask";

function App() {
  return (
    <NotesContextProvider>
      <GlobalStyles />
      <StyledContainer>
        <StyledHeaderGrid>
          <NewNote />
          <Info />
        </StyledHeaderGrid>
        <ListTask />
      </StyledContainer>
    </NotesContextProvider>
  );
}

export default App;

const StyledContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-template-areas: "newNoteForm header";
  margin: 20px 0 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "newNoteForm"
      "header";
    justify-content: center;
  }
`;
