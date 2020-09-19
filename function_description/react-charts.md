# react-charts

## 参考動画

- [Practical React - 14 - Charts](https://www.youtube.com/watch?v=28ZbeLWmfiQ&list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM&index=14)

## set up

- [公式サイト「react-chartjs-2」](https://github.com/jerairrest/react-chartjs-2)

```
$ yarn add react-chartjs-2 chart.js
```

## basic(Line chart)

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

## チャートの色を調整

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

## options props について

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

## 完成形

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

## basic(bar chart)

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

## 完成形

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

## basic(Doughnut chart)

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
