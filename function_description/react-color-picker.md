# react-color-picker

## 参考動画

- [Practical React - 8 - Color Picker](https://www.youtube.com/watch?v=qX6FFDENac0)

## set up

- [公式サイト「react-color」](https://casesandberg.github.io/react-color/)

```
$ yarn add react-color
```

## basic

- `react-color`から`ChromePicker`コンポーネントを import
- useState で抽出した color を制御
- `ChromePicker`コンポーネント
  - props`color`に抽出した color を設定
  - `onChage属性`で抽出した color を取得(hex を取得)

```
import './App.css';

import React, { useState } from 'react';

import { ChromePicker } from 'react-color';

function App() {
  const [color, setColor] = useState('#fff');
  return (
    <div>
      <ChromePicker
        color={color}
        onChange={(updatedColor) => setColor(updatedColor.hex)}
      />
      <h2>You picked {color}</h2>
    </div>
  );
}

export default App;
```

## advanced

- button を押下して color picker の表示非表示を制御

```
const [showColorPicker, setShowColorPicker] = useState(false);

<button
  onClick={() =>
    setShowColorPicker((showColorPicker) => !showColorPicker)
  }
>
  {showColorPicker ? 'Close color picker' : 'Pick a color'}
</button>
```

## 完成形

```
import React, { useState } from 'react';

import { ChromePicker } from 'react-color';

function App() {
  const [color, setColor] = useState('#fff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div>
      <button
        onClick={() =>
          setShowColorPicker((showColorPicker) => !showColorPicker)
        }
      >
        {showColorPicker ? 'Close color picker' : 'Pick a color'}
      </button>
      {showColorPicker && (
        <ChromePicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
      )}
      <h2>You picked {color}</h2>
    </div>
  );
}

export default App;
```
