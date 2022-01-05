import React from "react";
import styled from "styled-components";

export const Task = ({ id, note, time, color, rotate }) => {
  console.log(color);
  return (
    <StyledTask bg={color} rt={rotate}>
      {note}
      <i>{time}</i>
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

  & i {
    position: absolute;
    bottom: 2px;
    right: 5px;
    font-size: 1.5rem;
  }
`;
