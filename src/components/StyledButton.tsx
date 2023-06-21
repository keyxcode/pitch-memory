import styled from "styled-components";

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

export default StyledButton;
