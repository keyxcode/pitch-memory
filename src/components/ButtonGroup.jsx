import styled from "styled-components";

const StyledButtonGroup = styled.div`
  margin-top: var(--s);
  display: flex;
  width: 100%;
  justify-content: start;
  gap: var(--s);
  align-items: end;
  flex-wrap: wrap;
  border: 2px solid var(--dark);
  border-radius: var(--s);
  padding: var(--s);
`;

const StyledButton = styled.button`
  padding: var(--s);
  background-color: var(--dark);
  color: var(--lighter);
  border-radius: var(--xs);
  cursor: pointer;
  border: none;
  height: var(--xl);

  &:active {
    background-color: var(--darker);
    transition-duration: 0.3s;
  }
`;

const StyledSelect = styled.select`
  background-color: var(--dark);
  color: var(--lighter);
  border-radius: var(--xs);
  height: var(--xl);
`;

const ButtonGroup = ({
  handleRestart,
  handleChangeNumCells,
  numCells,
  message,
  funFact,
}) => (
  <StyledButtonGroup>
    <StyledButton onClick={handleRestart}>Restart</StyledButton>
    <StyledSelect onChange={handleChangeNumCells} value={numCells}>
      <option value={9}>3 x 3</option>
      <option value={16}>4 x 4</option>
      <option value={25}>5 x 5</option>
      <option value={36}>6 x 6</option>
    </StyledSelect>
    <div>{message}</div>
    <div style={{ fontStyle: "italic" }}>{funFact}</div>
  </StyledButtonGroup>
);

export default ButtonGroup;
