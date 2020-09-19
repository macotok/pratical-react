# react-spinners

## 参考動画

- [Practical React - 13 - Loading Indicators](https://www.youtube.com/watch?v=T0i0zHyryrs&list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM&index=13)

## set up

- [公式サイト「react-spinners」](https://github.com/davidhu2000/react-spinners)
- loading indicator と使用

```
$ yarn add react-spinners
```

## basic

- `react-spinners`から所定の spinner コンポーネントを import
- props`loading`を設定

```
import { BarLoader, BeatLoader, BounceLoader } from 'react-spinners';
import React from 'react';

function App() {
  return (
    <div className="App">
      <BounceLoader loading />
      <BarLoader loading />
      <BeatLoader loading />
    </div>
  );
}

export default App;
```

## react-spinners の各 コンポーネントの props について

- props`size`で spinner のサイズ変更
- props`color`で spinner の色調整
- props`css`で spinner の style 設定

```
<BounceLoader css={loaderCSS} size={48} color="red" loading />
<BarLoader css={loaderCSS} size={48} color="blue" loading />
<BeatLoader css={loaderCSS} size={48} color="orange" loading />
```

## 最終形

```
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
```
