# react-presentation-mdx-deck

## 参考動画

- [Practical React - 11 - Presentation (MDX) Deck](https://www.youtube.com/watch?v=nwTm1I1Q4cQ&list=PLC3y8-rFHvwhAh1ypBvcZLDO6I7QTY5CM&index=11)

## set up

- [公式サイト「mdx-deck」](https://github.com/jxnblk/mdx-deck)

```
$ yarn add -D mdx-deck
```

## basic

- markdown でスライドを作成
- `---`でスライドを区切る
- `package.json`で mdx-deck の起動コマンドを記述

```
# Hello World

---

# Welcome to MDX Deck

---

# The new way to present your ideas!
```

```
"scripts": {
  "start-deck": "mdx-deck src/deck/deck.mdx"
},
```

## コンポーネントを読み込む

- コンポーネントを作成
- mdx ファイルでコンポーネントを import
- スライドにコンポーネントを設定

```
import Counter from '../components/Counter.js'

# This is a counter component

<Counter/>
```

## theme を変更

- `mdx-deck`から`themes`を読み込む
- 該当の themes を設定

```
import { themes } from 'mdx-deck'

export const theme = themes.book
```

## 共通のヘッダーとフッターを定義

- `<Header>`と`<Footer>`で囲む

```
<Header>

# Codevolution

</Header>

<Footer>

# Vishwas

</Footer>
```

## 画面内でリストを順々に表示させる

- `<Steps>`で囲む
- `-`でリスト作成
- keypress で順々に表示される

```
# Items load on keypress

<Steps>

- One
- Two
- Three
- Four

</Steps>
```

## 完成形

```
import Counter from '../components/Counter.js'
import { themes } from 'mdx-deck'

export const theme = themes.book

<Header>

# Codevolution

</Header>

<Footer>

# Vishwas

</Footer>

# Hello World

---

# Welcome to MDX Deck

---

# The new way to present your ideas!

---

# This is a counter component

<Counter/>

---

# Items load on keypress

<Steps>

- One
- Two
- Three
- Four

</Steps>
```
