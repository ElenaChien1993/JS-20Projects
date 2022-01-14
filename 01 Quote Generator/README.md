### DEMO page
https://elenachien1993.github.io/JS-20Projects/01%20Quote%20Generator/

## CSS Media Query

[CSS @media Rule](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)

RWD 的基礎，在這次使用到的是限定螢幕寬度小於 1000px 

```css
/* Media Query: Tablet or Smaller */
@media screen and (max-width: 1000px) {
  .quote-container {
    margin: auto 10px;
  }

  .quote-text {
    font-size: 2.5rem;
  }
}
```

## 串 API

什麼是 API？

就是連接兩個軟體服務的溝通橋樑，
如果你想使用某應用程式的資料或服務，就必須去串接他們提供的 API

[API 是什麼 ? 最適合前端初學者的 API 概念解釋 - Jimmy 的架站筆記](https://jimmyswebnote.com/what-is-api/)

## 搭配 async、await

### Twitter 發文 Api

[Web Intent](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)

```jsx
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}
```

## 使用 Math. 隨機產生數值

為了隨機回傳單個 quote，這邊會使用到 `Math.floor()` 和 `Math.random()` 

- `Math.floor()` ：回傳小於等於所給數字的最大整數
- `Math.random()` ：回傳一個偽隨機小數 (pseudo-random) 介於 0 到 1 之間 (包含 0，不包含 1)

[Math.floor() - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

[Math.random() - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

將兩個搭配使用就可以指定 max 的值，去產生小於等於該 max 的隨機整數

```jsx
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2
```

## 放 loading 動畫

[How To Make a Loader](https://www.w3schools.com/howto/howto_css_loader.asp)

把 html 和 css 都建立好後，在 JS 寫顯示 / 隱藏 loader 的 fn，再放進有可能會需要等待的 fn 之中

```jsx
const loader = document.getElementById("loader");

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
```
