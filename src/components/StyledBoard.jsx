import styled from "styled-components";

const StyledBoard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  align-items: center;
  gap: var(--s);
`;

export default StyledBoard;
