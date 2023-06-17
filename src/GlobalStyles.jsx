import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
box-sizing: border-box;
font-family: "Silkscreen", system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
  sans-serif;

--darker: #001524;
--dark: #15616D;
--mid: #78290F;
--light: #FF7D00;
--lighter: #FFECD1;

--xxs: 1px;
--xs: 4px;
--s: 8px;
--md: 16px;
--l: 24px;
--xxl: 48px;
}

body {
  margin: 0
}

#root {
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: var(--lighter);
}
`;

export default GlobalStyles;
