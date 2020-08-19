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

### positoin の位置を指定

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

完成形

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
