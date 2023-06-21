import styled from "styled-components";
import StyledButton from "./StyledButton";

interface ButtonGroupProps {
  handleRestart: () => void;
  handleChangeNumCells: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  numCells: number;
}

const StyledButtonGroup = styled.div`
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
}: ButtonGroupProps) => (
  <StyledButtonGroup>
    <StyledButton onClick={handleRestart}>Restart</StyledButton>
    <StyledSelect
      onChange={(e) => {
        handleChangeNumCells(e);
      }}
      value={numCells}
    >
      <option value={9}>3 x 3</option>
      <option value={16}>4 x 4</option>
      <option value={25}>5 x 5</option>
      <option value={36}>6 x 6</option>
    </StyledSelect>
    <div>find all the squares with the same pitch</div>
  </StyledButtonGroup>
);

export default ButtonGroup;
