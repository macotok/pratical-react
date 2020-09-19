# react-pagination

## 参考動画

- [Simple Frontend Pagination | React](https://www.youtube.com/watch?v=IYCa1F-OWmk)

## set up

- API の data は [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)を使用
- `axios`を使用して API に request を送る

## 画面に表示する data を取得

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

## pagination を作成

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

## pagination を押下したときに currentPage を更新

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

## 次へと前へのボタンを追加

- currentPage を取得して先頭ページ以外には`前へ`ボタン、最後ページ以外には`次へ`ボタンを表示
- currentPage を更新

```
const PrevPage = () => (
  <li>
    <a href="#" onClick={() => paginate(currentPage - 1)}>
      前へ
    </a>
  </li>
);

const NextPage = () => (
  <li>
    <a href="#" onClick={() => paginate(currentPage + 1)}>
      次へ
    </a>
  </li>
);

{currentPage !== 1 ? <PrevPage /> : null}
{currentPage !== pageNumbers ? <NextPage /> : null}
```

## 完成

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
        currentPage={currentPage}
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
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  const PrevPage = () => (
    <li className="page-item">
      <a
        href="#"
        onClick={() => paginate(currentPage - 1)}
        className="page-link"
      >
        前へ
      </a>
    </li>
  );

  const NextPage = () => (
    <li className="page-item">
      <a
        href="#"
        onClick={() => paginate(currentPage + 1)}
        className="page-link"
      >
        次へ
      </a>
    </li>
  );

  const isCurentPage = (pageNumber) =>
    pageNumber === currentPage ? 'active' : null;

  return (
    <>
      <nav>
        <ul className="pagination">
          {currentPage !== 1 ? <PrevPage /> : null}
          {_.range(1, pageNumbers + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${isCurentPage(pageNumber)}`}
            >
              <a
                href="#"
                onClick={() => paginate(pageNumber)}
                className="page-link"
              >
                {pageNumber}
              </a>
            </li>
          ))}
          {currentPage !== pageNumbers ? <NextPage /> : null}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
```
