import React from 'react';
import ReactDOM from 'react-dom';

import ChuckNorris from './components/ChuckNorris';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
  }
`;
const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <ChuckNorris />
    </AppContainer>
  </>
);

ReactDOM.render(<App />, document.getElementById('chuck-norris-app'));
