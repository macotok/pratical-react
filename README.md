# pratical-react

## react-icons

### set up

- [公式「react-icons」](https://react-icons.github.io/react-icons/)

```
 $ yarn add react-icons
```

### use react-icon

- [公式「react-icons」](https://react-icons.github.io/react-icons/)から適当なアイコンを選択
- `color`、`size`props で値を入力
- `IconContext.Provider`の`value`props で全ての icon の色、サイズを共通化できる。ただし個別で指定した場合は上書きされる

```
import { FaReact } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { MdAlarm } from 'react-icons/md';

function App() {
  return (
    <IconContext.Provider value={{ color: 'blue', size: '5rem' }}>
      <div className="App">
        <FaReact />
        <MdAlarm color="purple" size="10rem" />
      </div>
    </IconContext.Provider>
  );
}
```

### 完成形

```
import { FaReact } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { MdAlarm } from 'react-icons/md';
import React from 'react';

function App() {
  return (
    <IconContext.Provider value={{ color: 'blue', size: '5rem' }}>
      <div className="App">
        <FaReact />
        <MdAlarm color="purple" size="10rem" />
      </div>
    </IconContext.Provider>
  );
}

export default App;
```

## react-toast-notifications

### set up

- [公式「React-toastify」](https://fkhadra.github.io/react-toastify/introduction)

```
$ yarn add react-toastify
```

### basic

- `react-toastify`から`toast`を import
- react-toastify の css を読み込む
- configure を設定
- `toast関数`の第一引数にメッセージを設定
- default の toast の position は`top right`

```
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

function App() {
  const notify = () => {
    toast('Basic Notification!');
  };

  return (
    <div className="App">
      <button onClick={notify}>Notify !</button>
    </div>
  );
}

export default App;
```

### position の位置を指定

- 6 つの位置を指定できる
- position は`toast関数`の第二引数に object で指定

```
toast('Basic Notification!', { position: toast.POSITION.TOP_LEFT });
toast('Basic Notification!', { position: toast.POSITION.TOP_CENTER });
toast('Basic Notification!', { position: toast.POSITION.TOP_RIGHT });
toast('Basic Notification!', { position: toast.POSITION.BOTTOM_LEFT });
toast('Basic Notification!', { position: toast.POSITION.BOTTOM_CENTER });
toast('Basic Notification!', { position: toast.POSITION.BOTTOM_RIGHT });
```

### toast の種類を設定

- `default`、`success`、`info`、`warn`、`error`の種類がある

```
const notify = () => {
  toast('Basic notification!', { position: toast.POSITION.TOP_LEFT });
  toast.success('Success! notification!', {
    position: toast.POSITION.TOP_CENTER,
  });
  toast.info('Info! notification!', {
    position: toast.POSITION.TOP_RIGHT,
  });
  toast.warn('Warn notification!', {
    position: toast.POSITION.BOTTOM_LEFT,
  });
  toast.error('Error! notification!', {
    position: toast.POSITION.BOTTOM_CENTER,
  });
  toast('Basic notification!', { position: toast.POSITION.BOTTOM_RIGHT });
};
```

### toast を制御

- default では toast が表示されて 5 秒後に閉じる
- `autoClose`プロパティで`milliseconds`を指定で toast が閉じる時間を制御
- `autoClose`プロパティで`false`指定で toast を閉じなくさせる

```
toast.success('Success! notification!', {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 8000,
});

toast.info('Info! notification!', {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: false,
});
```

### toast の component を作成

- `toast関数`の第一引数に component を指定できる
- component の引数には toast を閉じる`closeToast`が設定されている

```
const CustomToast = ({ closeToast }) => {
  return (
    <div>
      Something went wrong! <button onClick={closeToast}>Close</button>
    </div>
  );
};

toast.warn(<CustomToast />, {
  position: toast.POSITION.BOTTOM_LEFT,
});
```

### 完成形

```
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      Something went wrong! <button onClick={closeToast}>Close</button>
    </div>
  );
};

function App() {
  const notify = () => {
    toast('Basic notification!', { position: toast.POSITION.TOP_LEFT });
    toast.success('Success! notification!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
    });
    toast.info('Info! notification!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
    });
    toast.warn(<CustomToast />, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    toast.error('Error! notification!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    toast('Basic notification!', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  return (
    <div className="App">
      <button onClick={notify}>Notify !</button>
    </div>
  );
}

export default App;
```

## react-modal

### set up

- [公式「react-modal」](http://reactcommunity.org/react-modal/)

```
$ yarn add react-modal
```

### basic

- `react-modal`から`Modal`コンポーネントを import
- `Modal`コンポーネントの chidlren に modal の contents を設定
- `Modal`コンポーネントの`isOpen`props で`true`にすると modal が表示される

```
import Modal from 'react-modal';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Modal isOpen={true}>
        <h2>Modal title</h2>
        <div>Modal Body</div>
      </Modal>
    </div>
  );
}

export default App;
```

### button を押下して modal を表示/非表示を制御

- `useState`で`isOpen`を制御

```
import React, { useState } from 'react';

const [modalIsOpen, setModalIsOpen] = useState(false);

<button onClick={() => setModalIsOpen(true)}>Open modal</button>
<Modal isOpen={modalIsOpen}>
```

### modal の背景(オーバーレイ)を押下時の制御

- `Modal`コンポーネントの`onRequestClose`props で制御
- キーボードの`esc`キー押下で modal が非表示になる
- `Modal`コンポーネントの`shouldCloseOnOverlayClick`props を false にすると背景(オーバーレイ)を押下しても modal が非表示にならない

```
const [modalIsOpen, setModalIsOpen] = useState(false);

<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  shouldCloseOnOverlayClick={false}
>
```

### console エラー回避

- modal を表示させると`Warning: react-modal: App element is not defined. Please use Modal.setAppElement(el) or set appElement={el}. This is needed so screen readers don't see main content when modal is opened. It is not recommended, but you can opt-out by setting ariaHideApp={false}.`と console エラーが表示される
- modal の root コンポーネントの id を`setAppElement`に指定

```
Modal.setAppElement('#root');
```

### style 指定

- `Modal`コンポーネントの`style`props で指定
- 公式の[Styles について説明ページ](http://reactcommunity.org/react-modal/styles/)

```
<Modal
  style={{
    overlay: {
      backgroundColor: 'grey',
    },
    content: {
      color: 'orange',
    },
  }}
>
```

### 完成形

```
import React, { useState } from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setModalIsOpen(true)}>Open modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: {
            backgroundColor: 'grey',
          },
          content: {
            color: 'orange',
          },
        }}
      >
        <h2>Modal title</h2>
        <div>Modal Body</div>
        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
```

## react-tooltip

### set up

- [公式サイト「tippyjs-react」](https://github.com/atomiks/tippyjs-react)

```
$ yarn add @tippyjs/react
```

### basic

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

### content props にコンポーネントをを定義

- `Tippy`コンポーネントの`content`props にコンポーネントを定義

```
const ColoredTooltip = () => <span style={{ color: 'yellow' }}>Colored</span>;

<Tippy content={<ColoredTooltip />}>
```

### Tippy コンポーネントの children にコンポーネントを定義

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

### tooltip をカスタマイズ

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

### 完成形

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

## react-countup

### set up

- [公式サイト「react-countup」](https://github.com/glennreyes/react-countup)
- 「countup」とは Google Analytics のリアルタイム画面でビュー数がアニメーションするような機能

```
$ yarn add react-countup
```

### basic

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

### カスタマイズ

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

### useCountUp で countup を操作

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

### 完成形

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

## react-idle-timer

### set up

- [公式サイト「react-idle-time」](https://github.com/SupremeTechnopriest/react-idle-timer)
- 設定した timeout 後に行う処理を記述。例 ログインして 5 分後に強制ログアウトなど

```
$ yarn add react-idle-timer
```

### basic

- `react-idle-timer`から`IdleTimer`コンポーネントを import
- `IdleTimer`コンポーネント
  - `ref`props に react の hook`useRef`を設定
  - `timeout`props に timer の`milliseconds`を設定
  - `onIdle`props に timer 後の処理を設定

```
import React, { useRef } from 'react';

import IdleTimer from 'react-idle-timer';

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);

  const onIdle = () => {
    console.log('User is idle');
  };

  return (
    <div>
      <IdleTimer ref={idleTimerRef} timeout={1000 * 5} onIdle={onIdle} />
    </div>
  );
}

export default IdleTimerContainer;
```

### react-modal を使用してログイン/ログアウト UI を実装

- `react-modal`で modal 実装
- `useState`で modal 表示/非表示とログイン有無を制御
- logout と stayActive ボタンで modal 表示/非表示とログイン有無を制御

```
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const [isLoggedIn, setIsLoggedIn] = useState(true);
const [modalIsOpen, setModalIsOpen] = useState(false);

const onIdle = () => {
  console.log('User is idle');
  setModalIsOpen(true);
};

const logOut = () => {
  setModalIsOpen(false);
  setIsLoggedIn(false);
  console.log('User has been logged out');
};

const stayActive = () => {
  setModalIsOpen(false);
  console.log('User is active');
};

return (
  <div>
    {isLoggedIn ? <h2>Hello Vishwas</h2> : <h2>Hello Guest</h2>}
    <IdleTimer onIdle={onIdle} />
    <Modal isOpen={modalIsOpen}>
      <h2>You've been idle for a while!</h2>
      <p>You will be logged out soon</p>
      <div>
        <button onClick={logOut}>Log me out</button>
        <button onClick={stayActive}>Keep me signed in</button>
      </div>
    </Modal>
  </div>
);
```

### setTimeout で sessionTimeout を制御

- setTimeout を`useRef`で制御
- clearTimeout で sessionTimeout を clear

```
import React, { useRef } from 'react';

const sessionTimeoutRef = useRef(null);

const onIdle = () => {
  sessionTimeoutRef.current = setTimeout(logOut, 5000);
};

const logOut = () => {
  clearTimeout(sessionTimeoutRef.current);
};

const stayActive = () => {
  clearTimeout(sessionTimeoutRef.current);
};
```

### 完成形

```
import React, { useRef, useState } from 'react';

import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function IdleTimerContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const onIdle = () => {
    console.log('User is idle');
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(logOut, 5000);
  };

  const logOut = () => {
    setModalIsOpen(false);
    setIsLoggedIn(false);
    clearTimeout(sessionTimeoutRef.current);
    console.log('User has been logged out');
  };

  const stayActive = () => {
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current);
    console.log('User is active');
  };

  return (
    <div>
      {isLoggedIn ? <h2>Hello Vishwas</h2> : <h2>Hello Guest</h2>}
      <IdleTimer ref={idleTimerRef} timeout={1000 * 5} onIdle={onIdle} />
      <Modal isOpen={modalIsOpen}>
        <h2>You've been idle for a while!</h2>
        <p>You will be logged out soon</p>
        <div>
          <button onClick={logOut}>Log me out</button>
          <button onClick={stayActive}>Keep me signed in</button>
        </div>
      </Modal>
    </div>
  );
}

export default IdleTimerContainer;
```

## color-picker

### set up

- [公式サイト「react-color」](https://casesandberg.github.io/react-color/)

```
$ yarn add react-color
```

### basic

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

### advanced

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

### 完成形

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

### credit-cards

### set up

- [公式サイト「react-credit-cards」](https://github.com/amarofashion/react-credit-cards)

```
$ yarn add react-credit-cards
```

### basic

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

## datepicker

### set up

- [公式サイト「react-datepicker」](https://reactdatepicker.com/)

```
$ yarn add react-datepicker
```

### basic

- `react-datepicker`から`DatePicker`コンポーネントを import
- `'react-datepicker/dist/react-datepicker.css'`で datepicker の style を設定
- `DatePicker`コンポーネントの props の値を useState で制御
  - props`selected`に選択した日付を設定
  - `onChange属性`で選択した日付を取得

```
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="App">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}

export default App;
```

### DatePicker コンポーネントの props について

- `placeholderText`で placeholder 表示
- `dateFormat`で日付 format を制御
- `minDate`、`maxDate`で表示する期間を制御
- `isClearable`で日付を clear するボタンを表示
- `filterDate`で表示する日付を filtering(曜日など)
- `showYearDropdown`、`scrollableYearDropdown`で日付の年数を選択できる

```
<DatePicker
  dateFormat="yyyy/MM/dd"
  placeholderText={'dd/mm/yyyy'}
  minDate={new Date()}
  maxDate={new Date()}
  isClearable
  filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
  showYearDropdown
  scrollableYearDropdown
/>
```

### 完成形

```
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="App">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText={'dd/mm/yyyy'}
        // minDate={new Date()}
        // maxDate={new Date()}
        isClearable
        filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}

export default App;
```

## presentation mdx-deck

### set up

- [公式サイト「mdx-deck」](https://github.com/jxnblk/mdx-deck)

```
$ yarn add -D mdx-deck
```

### basic

- markdown でスライドを作成
- `---`でスライドを区切る
- `package.json`で mdx-deck の起動コマンドを記述

```
# Hello World

---

# Welcome to MDX Deck

---

# The new way to present your ideas!
```

```
"scripts": {
  "start-deck": "mdx-deck src/deck/deck.mdx"
},
```

### コンポーネントを読み込む

- コンポーネントを作成
- mdx ファイルでコンポーネントを import
- スライドにコンポーネントを設定

```
import Counter from '../components/Counter.js'

# This is a counter component

<Counter/>
```

### theme を変更

- `mdx-deck`から`themes`を読み込む
- 該当の themes を設定

```
import { themes } from 'mdx-deck'

export const theme = themes.book
```

### 共通のヘッダーとフッターを定義

- `<Header>`と`<Footer>`で囲む

```
<Header>

# Codevolution

</Header>

<Footer>

# Vishwas

</Footer>
```

### 画面内でリストを順々に表示させる

- `<Steps>`で囲む
- `-`でリスト作成
- keypress で順々に表示される

```
# Items load on keypress

<Steps>

- One
- Two
- Three
- Four

</Steps>
```

### 完成形

```
import Counter from '../components/Counter.js'
import { themes } from 'mdx-deck'

export const theme = themes.book

<Header>

# Codevolution

</Header>

<Footer>

# Vishwas

</Footer>

# Hello World

---

# Welcome to MDX Deck

---

# The new way to present your ideas!

---

# This is a counter component

<Counter/>

---

# Items load on keypress

<Steps>

- One
- Two
- Three
- Four

</Steps>
```

## video-player

### set up

- [公式サイト「react-player」](https://github.com/CookPete/react-player)
- YouTube や Twitch などの動画を表示/制御できる

```
$ yarn add react-player
```

### basic

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

### 各 callback 関数

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

### 最終形

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

## spinners

### set up

- [公式サイト「react-spinners」](https://github.com/davidhu2000/react-spinners)
- loading indicator と使用

```
$ yarn add react-spinners
```

### basic

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

### react-spinners の各 コンポーネントの props について

- props`size`で spinner のサイズ変更
- props`color`で spinner の色調整
- props`css`で spinner の style 設定

```
<BounceLoader css={loaderCSS} size={48} color="red" loading />
<BarLoader css={loaderCSS} size={48} color="blue" loading />
<BeatLoader css={loaderCSS} size={48} color="orange" loading />
```

### 最終形

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

## charts

### set up

- [公式サイト「react-chartjs-2」](https://github.com/jerairrest/react-chartjs-2)

```
$ yarn add react-chartjs-2 chart.js
```

### basic(Line chart)

- `react-chartjs-2`から`Line`コンポーネントを import
- `Line`コンポーネントの props`data`に`labels`と`datasets`を設定
  - `labels`は横軸の各項目名
  - `datasets`
    - `label`は data の名前
    - `data`は各項目の値

```
import { Line } from 'react-chartjs-2';
import React from 'react';

function LineChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [
      {
        label: 'Sales 2020 (M)',
        data: [3, 2, 2, 1, 5],
      }
    ],
  };

  return <Line data={data} />;
}

export default LineChart;
```

### チャートの色を調整

- key`datasets`の value プロパティにチャートの色を設定
- 色は`rgba`で指定可能

```
datasets: [
  {
    borderColor: ['rgba(54, 162, 235, 0.2)'],
    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
    pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
    pointBorderColor: 'rgba(54, 162, 235, 0.2)'
  }
]
```

### options props について

- `title`プロパティで chart の名前を設定
- `scales`プロパティの`yAxes`プロパティの`ticks`で縦軸をカスタマイズ
  - `min`で最小値を設定
  - `max`で最大値を設定
  - `stepSize`で step 値を設定

```
const options = {
  title: {
    display: true,
    text: 'Line Chart',
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 6,
          stepSize: 1,
        },
      },
    ],
  },
};

<Line options={options} />;
```

### 完成形

```
import { Line } from 'react-chartjs-2';
import React from 'react';

function LineChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [
      {
        label: 'Sales 2020 (M)',
        data: [3, 2, 2, 1, 5],
        borderColor: ['rgba(255, 206, 86, 0.2)'],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
        pointBorderColor: 'rgba(255, 206, 86, 0.2)',
      },
      {
        label: 'Sales 2019 (M)',
        data: [1, 3, 2, 2, 3],
        borderColor: ['rgba(54, 162, 235, 0.2)'],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBorderColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Line Chart',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
```

### basic(bar chart)

- 上記で作成した Line Chart を元に作成
- `datasets`の`borderColor`と`backgroundColor`を bar 数分を設定
- `datasets`の`pointBackgroundColor`と`pointBorderColor`は不要

```
datasets: [
  {
    borderColor: [
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
    ],
    backgroundColor: [
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(255, 206, 86, 0.2)',
    ],
  },
]
```

### 完成形

```
import { Bar } from 'react-chartjs-2';
import React from 'react';

function BarChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [
      {
        label: 'Sales 2020 (M)',
        data: [3, 2, 2, 1, 5],
        borderColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
      },
      {
        label: 'Sales 2019 (M)',
        data: [1, 3, 2, 2, 3],
        borderColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Bar Chart',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
```

### basic(Doughnut chart)

- 上記で作成した Bar Chart を元に作成
- 縦軸がないので`options`の`scales`プロパティを削除
- `datasets`は 1 つのみ設定
- `datasest`プロパティの`backgroundColor`で各項目の色を設定

```
import { Doughnut } from 'react-chartjs-2';
import React from 'react';

function DoughnutChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [
      {
        label: 'Sales 2020 (M)',
        data: [3, 2, 2, 1, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Doughnut Chart',
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
```

## pagination

- API の data は [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)を使用
- `axios`を使用して API に request を送る

### 画面に表示する data を取得

- useState で`posts`、`currentPage`を制御
  - `posts`は API で取得した全データ
  - `currentPage`は現在の pagination の number
- `postsPerPage`は表示する post 数
- 上記を元に画面に表示する data を取得(currentPosts)
- `currentPosts`を`Posts`コンポーネントに渡して map させる

```
const [posts, setPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 10;

// get currentPosts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
```

### pagination を作成

- posts の total 数と`postsPerPage`(表示する post 数)で pagination の数を取得
- lodash を使って`要素を map

```
const pageNumbers = Math.ceil(totalPosts / postsPerPage);

<ul className="pagination">
  {_.range(1, pageNumbers + 1).map((pageNumber) => (
    <li key={pageNumber}>
      <a href="#">
        {pageNumber}
      </a>
    </li>
  ))}
</ul>
```

### pagination を押下したときに currentPage を更新

- 押下した pageNumber を取得、それを useState の`setCurrentPage`で currentPage を更新

```
<a href="#" onClick={() => paginate(pageNumber)}>
  {pageNumber}
</a>
```

```
const paginate = (pageNumber) => setCurrentPage(pageNumber);
<Pagination paginate={paginate} />
```

### 完成

app.js

```
import React, { useEffect, useState } from 'react';

import Pagination from './components/Pagination';
import Posts from './components/Posts';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // get currentPosts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // currentPageを設定
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Posts loading={loading} posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
```

components/Posts.js

```
import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
```

components/Pagination.js

```
import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate } = props;
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  return (
    <nav>
      <ul>
        {_.range(1, pageNumbers + 1).map((pageNumber) => (
          <li key={pageNumber}>
            <a
              href="#"
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
```
