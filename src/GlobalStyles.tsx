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
--xl: 36px;
--xxl: 48px;
}

body {
  margin: 0;
  background-color: var(--lighter);
}

`;

export default GlobalStyles;
