## react-leaflet

## 参考動画

- [React-Leaflet demo](https://www.youtube.com/watch?v=290VgjkLong)

## set up

- map ライブラリ
- [react-leaflet](https://react-leaflet.js.org/)と[leaflet](https://leafletjs.com/)を install

```
$ yarn add react-leaflet
$ yarn add leaflet
```

## basic

- `react-leaflet`から`Map`、`TileLayer`コンポーネントを import
- `Map`コンポーネントの props`center`、`zoom`を設定
  - `center`は map の起点となる位置
  - `zoom`は拡大縮小値
- `leaflet`の css を読み込む

```
import { Map, TileLayer } from 'react-leaflet';

<Map center={[45.4, -75.7]} zoom={12}>
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
</Map>
```

```
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
  crossorigin=""
/>
```

## Marker

- `react-leaflet`から`Marker`コンポーネントを import して地図に Marker をつける
- 複数に Marker をつけることができる。その場合は`key`を設定
- props`position`で経度と緯度を指定

```
import * as parkData from './data/skateboard-parks.json';
import { Map, Marker, TileLayer } from 'react-leaflet';

<Map center={[45.4, -75.7]} zoom={12}>
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {parkData.features.map((park) => (
    <Marker
      key={park.properties.PARK_ID}
      position={[
        park.geometry.coordinates[1],
        park.geometry.coordinates[0],
      ]}
    />
  ))}
</Map>
```

## Popup

- `react-leaflet`から`Popup`コンポーネントを import
- useState で`Marker`を押下したときに Popup が表示、また非表示を制御
- `Popup`コンポーネントの`children`にコンテンツを設定

```
import * as parkData from './data/skateboard-parks.json';

import { Marker, Popup } from 'react-leaflet';
import React, { useState } from 'react';

const [activePark, setActivePark] = useState(null);

{parkData.features.map((park) => (
  <Marker
    key={park.properties.PARK_ID}
    position={[
      park.geometry.coordinates[1],
      park.geometry.coordinates[0],
    ]}
    onclick={() => {
      setActivePark(park);
    }}
  />
))}

{activePark && (
  <Popup
    position={[
      activePark.geometry.coordinates[1],
      activePark.geometry.coordinates[0],
    ]}
    onClose={() => {
      setActivePark(null);
    }}
  >
    <div>
      <h2>{activePark.properties.NAME}</h2>
      <p>{activePark.properties.DESCRIPTIO}</p>
    </div>
  </Popup>
)}
```

## Icon

- `leaflet`から`Icon`Class を import
  - プロパティに`iconUrl`、`iconSize`を指定
- `Marker`コンポーネントの props`icon`に指定

```
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';

const icon = new Icon({
  iconUrl: '/skateboarding.svg',
  iconSize: [25, 25],
});

<Marker icon={icon} />
```

## 完成形

```
import './App.css';

import * as parkData from './data/skateboard-parks.json';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';

import { Icon } from 'leaflet';

const icon = new Icon({
  iconUrl: '/skateboarding.svg',
  iconSize: [25, 25],
});

function App() {
  const [activePark, setActivePark] = useState(null);

  return (
    <Map center={[45.4, -75.7]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parkData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0],
          ]}
          onclick={() => {
            setActivePark(park);
          }}
          icon={icon}
        />
      ))}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0],
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
```

# react-leaflet with swr

## SWR とは

- useSWR は外部 API からのデータ取得、ローディング状態、エラーが発生した時をシンプルに記述できます。
- useSWR は第二引数で与えた fetcher が一度取得したデータをクライアント側でキャッシュしてくれます。これで、API を通じて取得したデータを store に格納せずに済むのです。
- useSWR がキャッシュからデータを取得する流れは以下です。
  - キャッシュからデータを返そうとする（Stale）
  - キャッシュにデータがなければ、データを取得する
  - キャッシュにデータがあれば、再度データを取得してキャッシュを更新する（Revalidate）
- useSWR はデフォルトで Revalidate に関する嬉しい機能を備えています。Revalidate は（データ取得+キャッシュ更新）を意味します。
  - ブラウザをクリックしたり、タブを移動して戻ってきたときに Revalidate する（Focus Revalidation）
  - 指定した時間ごとに Revalidate する（polling ができる）
  - mutate 関数を使ってデータ更新時にキャッシュも更新できる（Local mutation）
  - 無限スクロールの場合、ページ遷移後もスクロール位置を保存する
  - エラー時にリトライしてくれる
  - タイムアウトの設定が簡単
- useSWR は SSR で利用できる
- useSWR は GraphQL に対応している

## set up

- [公式サイト「SWR」](https://swr.vercel.app/)

```
$ yarn add swr
```

## basic

- `swr`から`useSwr`を import
- `useSwr`の第一引数は API の URL、第二引数は fetch 処理を設定
- `useSwr`の返り値として`data`、`error`が返ってくる

```
import useSwr from 'swr';

const url = 'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
const { data, error } = useSwr(url, { fetcher });

const crimes = data && !error ? data.slice(0, 10) : [];

{crimes.map((crime) => (
  <Marker
    key={crime.id}
    position={[crime.location.latitude, crime.location.longitude]}
  />
))}
```

## 完成形

- Icon をデータによって変更できるように設定

```
import './App.css';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';

import L from 'leaflet';
import useSwr from 'swr';

const Icon = new L.Icon({
  iconUrl: '',
  iconSize: [25, 25],
});

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function App() {
  const [activeCrime, setActiveCrime] = useState(null);

  const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
  const { data, error } = useSwr(url, { fetcher });

  const crimes = data && !error ? data.slice(0, 10) : [];

  return (
    <Map center={[52.631438, -1.134658]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {crimes.map((crime) => {
        Icon.options.iconUrl =
          'https://cdn.pixabay.com/photo/2020/06/26/17/16/daisies-5343423_960_720.jpg';

        return (
          <Marker
            key={crime.id}
            position={[crime.location.latitude, crime.location.longitude]}
            onclick={() => {
              setActiveCrime(crime);
            }}
            icon={Icon}
          />
        );
      })}

      {activeCrime && (
        <Popup
          position={[
            activeCrime.location.latitude,
            activeCrime.location.longitude,
          ]}
          onClose={() => {
            setActiveCrime(null);
          }}
        >
          <div>
            <h2>{activeCrime.location.street.name}</h2>
            <p>{activeCrime.category}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
```

## 参考サイト

- [【React】useSWR は API からデータ取得をする快適な React Hooks だと伝えたい](https://panda-program.com/posts/useswr)
