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
