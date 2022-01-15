import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import styled from "styled-components";

export const ListColors = React.memo(({ color, id, cbColorChanged }) => {
  const { notesColors, changeColor } = useContext(NotesContext);
  const filterColors = notesColors.filter((i) => i !== color);

  return (
    <StyledListColors>
      {filterColors.map((i) => {
        return (
          <StyledListItem
            key={i}
            bg={i}
            onClick={() => {
              changeColor(id, i);
              cbColorChanged();
            }}
          ></StyledListItem>
        );
      })}
    </StyledListColors>
  );
});

const StyledListColors = styled.ul`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: transparent;
  list-style: none;
`;

const StyledListItem = styled.li`
  background-color: ${({ bg }) => bg};
  width: 30px;
  height: 30px;
  border: 1ps solid black;
  margin: 5px;

  &:hover {
    transform: scale(1.1);
  }
`;
