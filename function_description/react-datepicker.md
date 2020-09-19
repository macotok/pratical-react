# react-datepicker

## 参考動画

- [Practical React - 10 - Date Picker](https://www.youtube.com/watch?v=tojwQEdI-QI&list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM&index=10)

## set up

- [公式サイト「react-datepicker」](https://reactdatepicker.com/)

```
$ yarn add react-datepicker
```

## basic

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

## DatePicker コンポーネントの props について

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

## 完成形

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
