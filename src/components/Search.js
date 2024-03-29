import React, { useContext, useState } from "react";
import styled from "styled-components";
import { NotesContext } from "../context/NotesContext";
import { ShowAll } from "./ShowAll";

export const Search = React.memo(() => {
  const [search, setSearch] = useState("");
  const { filterNotes } = useContext(NotesContext);

  const handleSearch = (eo) => {
    eo.preventDefault();
    filterNotes(search);
    setSearch("");
  };

  const handleChangeFilter = (eo) => {
    setSearch(eo.target.value);
  };

  return (
    <StyledSearch onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        placeholder="Type here to search..."
        onChange={handleChangeFilter}
      />
      <br />
      <StyledSearchButton type="submit">Search</StyledSearchButton>
      <ShowAll />
    </StyledSearch>
  );
});

const StyledSearch = styled.form`
  width: 90%;
  margin: 20px auto;

  & input {
    width: 70%;
    font-size: 1.8rem;
    padding: 5px;
    border: none;
    outline: none;
  }

  @media (max-width: 768px) {
    input {
      width: 100%;
    }
    button {
      width: 100%;
      margin: 20px 0;
    }
  }
`;

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
