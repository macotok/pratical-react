# react-modal

## 参考動画

- [Practical React - 4 - Modal](https://www.youtube.com/watch?v=10FNqoPpNbE)

## set up

- [公式「react-modal」](http://reactcommunity.org/react-modal/)

```
$ yarn add react-modal
```

## basic

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

## button を押下して modal を表示/非表示を制御

- `useState`で`isOpen`を制御

```
import React, { useState } from 'react';

const [modalIsOpen, setModalIsOpen] = useState(false);

<button onClick={() => setModalIsOpen(true)}>Open modal</button>
<Modal isOpen={modalIsOpen}>
```

## modal の背景(オーバーレイ)を押下時の制御

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

## console エラー回避

- modal を表示させると`Warning: react-modal: App element is not defined. Please use Modal.setAppElement(el) or set appElement={el}. This is needed so screen readers don't see main content when modal is opened. It is not recommended, but you can opt-out by setting ariaHideApp={false}.`と console エラーが表示される
- modal の root コンポーネントの id を`setAppElement`に指定

```
Modal.setAppElement('#root');
```

## style 指定

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

## 完成形

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
