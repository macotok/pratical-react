# pratical-react

## react-icons

### set upo

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
