import { css } from 'styled-components';

const base = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  body {
    margin: 0;
    padding: 0;
    background-color: #dfdfdf;
    font-family: 'Roboto', sans-serif;
  }
  body,
  html,
  #root {
    height: 100%;
    width: 100%;
  }

  *:focus,
  *:active {
    outline: none;
  }
`;

export default base;
