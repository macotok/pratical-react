# react-video-player

## 参考動画

- [Practical React - 12 - Video Player](https://www.youtube.com/watch?v=7sDY4m8KNLc&list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM&index=12)

## set up

- [公式サイト「react-player」](https://github.com/CookPete/react-player)
- YouTube や Twitch などの動画を表示/制御できる

```
$ yarn add react-player
```

## basic

- `react-player`から`ReactPlayer`コンポーネントを import
- `ReactPlayer`コンポーネント
  - props`url`に動画 URL 設定
  - props`controls`で動画コントロールバーが表示
  - props`width`、`height`で動画サイズを設定

```
import React from 'react';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="App">
      <ReactPlayer
        controls
        url="https://www.youtube.com/watch?v=QFaFIcGhPoM"
        width="480px"
        height="240px"
      />
    </div>
  );
}
```

## 各 callback 関数

- props`onReady`は動画が読み込まれたときの callback
- props`onStart`は動画が開始したときの callback
- props`onPause`は動画が停止したときの callback
- props`onEnded`は動画が終了したときの callback
- props`onError`は動画が読み込みエラーのときの callback

```
<ReactPlayer
  onReady={() => console.log('onReady callback')}
  onStart={() => console.log('onStart callback')}
  onPause={() => console.log('onPause callback')}
  onEnded={() => console.log('onEnded callback')}
  onError={() => console.log('onError callback')}
/>
```

## 最終形

```
import React from 'react';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="App">
      <ReactPlayer
        controls
        url="https://www.youtube.com/watch?v=QFaFIcGhPoM"
        width="480px"
        height="240px"
        onReady={() => console.log('onReady callback')}
        onStart={() => console.log('onStart callback')}
        onPause={() => console.log('onPause callback')}
        onEnded={() => console.log('onEnded callback')}
        onError={() => console.log('onError callback')}
      />
    </div>
  );
}

export default App;
```
