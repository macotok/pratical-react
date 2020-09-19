# react-tooltip

## 参考動画

- [Practical React - 5 - Tooltip](https://www.youtube.com/watch?v=8y4Dr9jJtF0)

## set up

- [公式サイト「tippyjs-react」](https://github.com/atomiks/tippyjs-react)

```
$ yarn add @tippyjs/react
```

## basic

- react 用の`tippyjs`を import
- `tippy.js`の css を import
- button タグを`Tippy`コンポーネントで wrap する
- `Tippy`コンポーネントの`content`props に tooltip に表示する contents を設定

```
import 'tippy.js/dist/tippy.css';

import React from 'react';
import Tippy from '@tippyjs/react';

function App() {
  return (
    <div className="App">s
      <Tippy content="Hello tooltip">
        <button>My button</button>
      </Tippy>
    </div>
  );
}

export default App;
```

## content props にコンポーネントをを定義

- `Tippy`コンポーネントの`content`props にコンポーネントを定義

```
const ColoredTooltip = () => <span style={{ color: 'yellow' }}>Colored</span>;

<Tippy content={<ColoredTooltip />}>
```

## Tippy コンポーネントの children にコンポーネントを定義

- React の API`forwardRef`を使って`ref`を取得
- `ref`を children コンポーネントの親タグに設定

```
const CustomChild = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div>First line</div>
      <div>Second line</div>
    </div>
  );
});

<Tippy>
  <CustomChild />
</Tippy>
```

## tooltip をカスタマイズ

- tooltip 表示時の矢印を`arrow={false}`で非表示
- tooltip の表示タイミングを`delay`props で制御
- tooltip の表示位置を`placement`props で制御

```
<Tippy
  placement="right"
  arrow={false}
  delay={1000}
>
```

## 完成形

```
import 'tippy.js/dist/tippy.css';

import React, { forwardRef } from 'react';

import Tippy from '@tippyjs/react';

const ColoredTooltip = () => <span style={{ color: 'yellow' }}>Colored</span>;

const CustomChild = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div>First line</div>
      <div>Second line</div>
    </div>
  );
});

function App() {
  return (
    <div className="App">
      <div style={{ paddingBottom: '20px' }}>
        <Tippy
          placement="right"
          arrow={false}
          delay={1000}
          content="Hello tooltip"
        >
          <button>My button</button>
        </Tippy>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <Tippy content={<ColoredTooltip />}>
          <button>My button</button>
        </Tippy>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <Tippy content={<ColoredTooltip />} placement="top-end">
          <CustomChild />
        </Tippy>
      </div>
    </div>
  );
}

export default App;
```
