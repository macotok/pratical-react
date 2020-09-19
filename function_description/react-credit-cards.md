# react-credit-cards

## 参考動画

- [Practical React - 9 - Credit Cards](https://www.youtube.com/watch?v=HpmL7dvyRUY)

## set up

- [公式サイト「react-credit-cards」](https://github.com/amarofashion/react-credit-cards)

```
$ yarn add react-credit-cards
```

## basic

- `react-credit-cards`から`Cards`コンポーネントを import
- `react-credit-cards/es/styles-compiled.css`でクレジットカードの style を設定
- `Cards`コンポーネントの props を useSate で制御
  - props`number`はクレジットカード番号
  - props`name`は使用者の名前
  - props`expiry`はクレジットカード有効期限
  - props`cvc`はクレジットカード確認番号
  - props`focused`はどの入力フォームを focus してるかを name 属性の値から取得
- 入力する項目によってクレジットカードの UI が変わる

```
import 'react-credit-cards/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';

function App() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  return (
    <div className="App">
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
    </div>
  );
}

export default App;
```
