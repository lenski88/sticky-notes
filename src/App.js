import React from "react";
import { NotesContextProvider } from "./context/NotesContext";
import { GlobalStyles } from "./globalStyles";
import styled from "styled-components";
import { NewNotes } from "./components/NewNotes";
import { Info } from "./components/Info";

function App() {
  return (
    <NotesContextProvider>
      <GlobalStyles />
      <StyledContainer>
        <StyledHeaderGrid>
          <NewNotes />
          <Info />
        </StyledHeaderGrid>
      </StyledContainer>
    </NotesContextProvider>
  );
}

export default App;

const StyledContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const StyledHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap:20px;
  grid-template-areas: "newNoteForm header";
`;
