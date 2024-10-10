import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  #root {
    min-height: 800px;
  }

  main {
    min-height: calc(100% - 140px);
  }

  body {
    min-height: 100%;
    font-family: "Andika", sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: ${({ theme }) => theme.background};
    background-image: url('src/assets/images/bg-tinted.webp');
    color: ${({ theme }) => theme.textColor};
    line-height: 1.6;
  }

  main {
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }
`;

export default GlobalStyles;
