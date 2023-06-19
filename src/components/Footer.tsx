import styled from "styled-components";

const StyledFooter = styled.div`
  text-align: center;
  background-color: var(--darker);
  color: var(--lighter);
  width: 100%;
  padding: var(--l);
`;

const Footer = () => <StyledFooter>Copyright © keyxcode</StyledFooter>;

export default Footer;
