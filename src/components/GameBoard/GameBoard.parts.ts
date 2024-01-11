import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
  height: 700px;
  background-color: black;
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 2.4px;
  min-width: 350px;
  height: 700px;
  background-color: #622;
`;

export const Square = styled.div`
  width: 100%;
  height: 100%;
  background-color: #a42;
  border-radius: 1px;
`;
