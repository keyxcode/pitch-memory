import styled from "styled-components";

const BootstrapContainer = styled.div`
  margin: "auto";
  padding-left: 16px;
  padding-right: 16px;
  min-height: 100%;

  @media (min-width: 0px) {
    width: 100%;
  }
  @media (min-width: 576px) {
    width: 540px;
  }
  @media (min-width: 768px) {
    width: 720px;
  }
`;

export default BootstrapContainer;
