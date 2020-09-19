# react-idle-timer

## 参考動画

- [Practical React - 7 - Idle Timer](https://www.youtube.com/watch?v=_wgCPufTAYI)

## set up

- [公式サイト「react-idle-time」](https://github.com/SupremeTechnopriest/react-idle-timer)
- 設定した timeout 後に行う処理を記述。例 ログインして 5 分後に強制ログアウトなど

```
$ yarn add react-idle-timer
```

## basic

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

## react-modal を使用してログイン/ログアウト UI を実装

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

## setTimeout で sessionTimeout を制御

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

## 完成形

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
