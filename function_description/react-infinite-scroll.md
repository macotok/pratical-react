# react-infinite-scroll

## 参考動画

- [Infinite Scrolling With React - Tutorial](https://www.youtube.com/watch?v=NZKUirTtxcg&list=WL&index=3&t=1154s)

## set up

- http client の axios を install
- 検索 API を使用して実装(http://openlibrary.org/search.json)
- API から data を取得する処理を custom hook で行う

```
$ yarn add axios
```

```
useEffect(() => {
  axios({
    method: 'GET',
    url: 'http://openlibrary.org/search.json',
    params: { q: query, page: pageNumber },
  }).then((res) => {
    console.log(res.data);
  });
}, [query, pageNumber]);
```

## axios の cancelToken

- cancelToken を使用して入力中に HTTP 通信を行わない
- unMount したときは HTTP 通信を行わない
- cancelToken を使用して、検索の値を 1 つだけ送信することができる

```
import { useEffect } from 'react';

import axios from 'axios';

useEffect(() => {
  let cancel;
  axios({
    method: 'GET',
    url: 'http://openlibrary.org/search.json',
    params: { q: query, page: pageNumber },
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      if (axios.isCancel(e)) return;
    });

  return () => cancel();
}, [query, pageNumber]);
```

## useState で管理する値

- loading
  - useEffect が呼ばれたときは`true`、axios で data 取得後は`false`
- error
  - useEffect が呼ばれたときは`false`、axios で data 取得エラー時に`true`
- books(一覧に表示させる data)
  - query が変更になったとき初期値の空配列になる
  - axios で data 取得したときは前回までの data と取得 data を結合
- hesMore
  - axios で取得した data の数が 1 以上で`true`、0 の場合は`false`

```
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [books, setBooks] = useState([]);
const [hasMore, setHasMore] = useState(false);
```

## custom hook の最終形

```
import { useEffect, useState } from 'react';

import axios from 'axios';

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => [
          ...new Set([
            ...prevBooks,
            ...res.data.docs.map((book) => book.title),
          ]),
        ]);
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, pageNumber]);

  return {
    loading,
    error,
    books,
    hasMore,
  };
};

export default useBookSearch;
```

## new IntersectionObserver を使って infinite scroll を実装

- 一覧の最後の node に ref 属性を付与
- `IntersectionObserver`でその`node`が交差したかを監視
- 交差した場合、`pageNumber`が増えて axios でデータ取得を行う
- 交差した場合、監視を終わりにする

## 最終形

```
import React, { useCallback, useRef, useState } from 'react';

import useBookSearch from './useBookSearch';

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
};

export default App;
```
