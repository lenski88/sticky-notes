import React from "react";
import { NotesContextProvider } from "./context/NotesContext";
import { GlobalStyles } from "./globalStyles";
import styled from "styled-components";
import { NewNotes } from "./components/NewNotes";

function App() {
  return (
    <NotesContextProvider>
      <GlobalStyles />
      <StyledContainer>
        <NewNotes />
      </StyledContainer>
    </NotesContextProvider>
  );
}

export default App;

const StyledContainer = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
`;
