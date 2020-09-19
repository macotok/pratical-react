# react-countup

## 参考動画

- [Practical React - 6 - CountUp](https://www.youtube.com/watch?v=zttrshYjHHQ)

## set up

- [公式サイト「react-countup」](https://github.com/glennreyes/react-countup)
- 「countup」とは Google Analytics のリアルタイム画面でビュー数がアニメーションするような機能

```
$ yarn add react-countup
```

## basic

- `react-countup`から`CountUp`コンポーネントを import
- `CountUp`コンポーネントの`end`props にアニメーションが stop する数字を設定

```
import CountUp from 'react-countup';
import React from 'react';

function App() {
  return (
    <div className="App">
      <CountUp end={200} />
    </div>
  );
}
```

## カスタマイズ

- アニメーションが終わる秒数を`duration`props で設定。default は 2 秒
- アニメーションが始まる数字を`start`props で設定
- 数字の先頭に文字列を追加したい場合は`prefix`props で設定
- 小数点を含めたい場合は`decimals`props で設定
- 数字の末尾に文字列を追加したい場合は`suffix`props で設定

```
<CountUp end={200} duration={5} />

<CountUp start={500} end={1000} />

<CountUp end={1000} duration={5} prefix='$' decimals={2} />

<CountUp end={1000} duration={5} suffix="USD" decimals={2} />
```

## useCountUp で countup を操作

- `react-countup`から`useCountUp`hook を import
- `useCountUp`関数の引数 object に`duration`、`end`を設定
- `useCountUp`の変数の分割代入で`countUp`, `start`, `pauseResume`, `reset`, `update`を取得。それらで countup を操作
  - `countUp`はカウント数
  - `start`でカウント開始
  - `pauseResume`でカウント停止と再開
  - `reset`でカウントが最初に戻る
  - `update`で引数に指定した数値にカウントされる
- `useCountUp`関数の引数 object に`startOnMount: false`を設定でカウントが停止された状態で開始

```
import CountUp, { useCountUp } from 'react-countup';

const { countUp, start, pauseResume, reset, update } = useCountUp({
  duration: 5,
  end: 10000,
  startOnMount: false,
});

<div>
  <h1>{countUp}</h1>
  <button onClick={start}>Start</button>
  <button onClick={reset}>Reset</button>
  <button onClick={pauseResume}>Pause/Resume</button>
  <button onClick={() => update(2000)}>Update to 2000</button>
</div>
```

## 完成形

```
import CountUp, { useCountUp } from 'react-countup';

import React from 'react';

function App() {
  const { countUp, start, pauseResume, reset, update } = useCountUp({
    duration: 5,
    end: 10000,
    startOnMount: false,
  });
  return (
    <div className="App">
      <div>
        <h1>{countUp}</h1>
        <button onClick={start}>Start</button>
        <button onClick={reset}>Reset</button>
        <button onClick={pauseResume}>Pause/Resume</button>
        <button onClick={() => update(2000)}>Update to 2000</button>
      </div>
      <CountUp end={200} />
      <br />
      <CountUp end={200} duration={5} />
      <br />
      <CountUp start={500} end={1000} duration={5} />
      <br />
      <CountUp end={1000} duration={5} prefix="$" decimals={2} />
      <br />
      <CountUp end={1000} duration={5} suffix="USD" decimals={2} />
    </div>
  );
}

export default App;
```
