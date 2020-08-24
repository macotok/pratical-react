import './App.css';

import { BarLoader, BeatLoader, BounceLoader } from 'react-spinners';

import React from 'react';
import { css } from '@emotion/core';

const loaderCSS = css`
  margin-top: 25px;
  margin-bottom: 25px;
`;

function App() {
  return (
    <div className="App">
      <BounceLoader css={loaderCSS} size={48} color="red" loading />
      <BarLoader css={loaderCSS} size={48} color="blue" loading />
      <BeatLoader css={loaderCSS} size={48} color="orange" loading />
    </div>
  );
}

export default App;
