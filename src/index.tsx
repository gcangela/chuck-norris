import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from 'styled-components';
import ChuckNorrisApp from './ChuckNorrisApp';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    height: 100%;
    font-family: monospace;
    font-size: 16px;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <ChuckNorrisApp />
  </>
);

ReactDOM.render(<App />, document.getElementById('chuck-norris-app'));
