import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
box-sizing: border-box;
font-family: "Silkscreen", system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
  sans-serif;

/* --red: #d3242b;
--dark-red: #ac2933;
--light-red: #ee1825;
--green: #00a851;
--yellow: #fec803;
--blue: #01aeec;
--black: #1a1619;
--dark-gray: #58585a;
--light-gray: #f2f3f3; */

--xxs: 1px;
--xs: 4px;
--s: 8px;
--md: 16px;
--l: 24px;
--xxl: 48px;
}

#root {
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
}
`;

export default GlobalStyles;
