import styled from "styled-components";

const ResponsiveContainer = styled.div`
  margin: "auto";
  padding: var(--md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;

  @media (min-width: 0px) {
    width: 100%;
  }
  @media (min-width: 576px) {
    width: 540px;
  }
  @media (min-width: 768px) {
    width: 650px;
  }
`;

export default ResponsiveContainer;
