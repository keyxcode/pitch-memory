import styled from "styled-components";

const StyledHeader = styled.div`
  margin-bottom: var(--l);
  font-weight: bold;
  font-size: var(--xl);
  color: var(--darker);
  width: 100%;
`;

const Header = () => <StyledHeader>Pitch Memory</StyledHeader>;

export default Header;
