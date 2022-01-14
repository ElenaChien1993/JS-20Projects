### DEMO page
https://elenachien1993.github.io/JS-20Projects/09-custom-countdown/

# 目標

- 製作網頁倒數計時器，可儲存資料在 local host
- 用影片當作背景

# 資源

[pixabay](https://pixabay.com/videos/search/)

# 執行步驟

1. 將影片放入當成背景
    
    ```html
    <video class="video-background" loop muted autoplay>
    	<source src="video-background.mp4"></source>
    </video>
    <div class="video-overlay"></div>
    ```
    
    ```css
    .video-background {
      position: fixed;
      right: 0;
      bottom: 0;
    	width: 100vw;
    	height: auto;
    }
    
    video {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .video-overlay {
      position: fixed;
      left: 0;
      top: 0;
    	height: 100vh;
      width: 100vw;
      background-color: rgba(255, 255, 255, 0.2);
    }
    ```
    
    記得調整 RWD 樣式
    
    ```css
    /* Media Query: Large Smartphone (Vertical) */
    @media screen and (max-width: 600px) {
      .video-background {
        height: 100vh;
        width: 100vw;
      }
      
      video {
        object-fit: cover;
        object-position: 15%;
        margin-top: -1px;
      }
    }
    ```
    
    用 `object-fit: cover` 填滿整個畫面，用 `object-position: 15%` 讓影片往左方裁切
    
    `.video-overlay` 的 div 區塊是為了讓背景有比較透明的效果，讓要出現在上面的文字更加明顯
    
2. 最外層 container（包住所有 input 等）（會是一個白色無框區塊）
    
    ```css
    .container {
      min-width: 580px;
      min-height: 304px;
      color: black;
      margin: 0 auto;
      padding: 25px 50px;
      border-radius: 5px;
      z-index: 2;
      display: flex;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.85);
    }
    
    /* Media Query: Large Smartphone (Vertical) */
    @media screen and (max-width: 600px) {
      .container {
        min-width: unset;
        width: 95%;
        min-height: 245px;
        padding: 20px;
        margin: 10px;
    }
    ```
    
    在 media query 要先將 `min-width` 設定成 unset，再去指定 width
    
3. 製作第一種顯示內容：讓使用者輸入的倒數設定 form
    
    ```html
    <div class="input-container" id="input-container">
    	<h1>Create a Custom Countdown!</h1>
    	<form class="form" id="countdownForm">
    		<label for="title">Title</label>
    		<input type="text" id="title" placeholder="What are you counting down to?">
    		<label for="date-picker">Select a Date</label>
    		<input type="date" id="date-picker">
    		<button type="submit">Submit</button>
    	</form>
    </div>
    ```
    
    將 button 加上一點 hover 樣式
    
    ```css
    button:hover {
      filter: brightness(125%);
    }
    ```
    
4. 第二種顯示內容：倒數計時器設定好後，畫面轉換為倒數中
    
    ```html
    <div class="countdown" id="countdown">
    	<h1 id="countdown-title">Countdown Title Here</h1>
    	<ul>
    		<li><span>2</span>Days</li>
    		<li><span>5</span>Hours</li>
    		<li><span>34</span>Minutes</li>
    		<li><span>14</span>Seconds</li>
    	</ul>
    	<button id="countdown-button">Reset</button>
    </div>
    ```
    
    ```css
    ul {
      margin-left: -45px;
    }
    
    li {
      display: inline-block;
      font-size: 30px;
      list-style-type: none;
      padding: 10px;
      text-transform: uppercase;
    }
    
    li span {
      display: block;
      font-size: 80px;
      text-align: center;
    }
    ```
    
5. 製作第三種內容：倒數完的畫面
    
    ```html
    <div class="complete" id="complete">
    	<h1 class="complete-title">Countdown Complete!</h1>
    	<h1 id="complete-info">Countdown Finished on 05-05-2021</h1>
    	<button id="complete-button">New Countdown</button>
    </div>
    ```
    
    幫大標題加上 CSS 動畫讓他更醒目
    
    ```css
    .complete-title {
      animation: complete 4s infinite;
    }
    
    @keyframes complete {
      0% {
        color: #e06767;
      }
    
      25% {
        color: #e0cc67;
      }
    
      50% {
        color: #67e07b;
        transform: scale(1.5);
      }
    
      75% {
        color: #3540e2;
      }
    
      100% {
        color: #e4559a;
      }
    }
    ```
    
6. 開始用 JS 串接功能：讓日曆只能選取「未來」的日期
    
    在 date input tag 的 min att. 中加上「當下」的日期，要根據使用者的環境有所不同，
    先用 `new Date()` 取得當時當地時間，用 `.toISOString()` 轉換成標準年-月-日形式，
    但因為不需要日期後的幾點幾分幾秒，所以再用 `.split()` 分割出想要的前半部日期資料
    
    ```jsx
    // 限制日曆只能選取「未來」的日期
    const today = new Date().toISOString().split('T')[0];
    dateEl.setAttribute('min', today);
    ```
    
7. 處理表單的 submit 功能：取得使用者的 input value
    
    submit 事件是 form 觸發的，所以不是設定在 button 上唷
    
    ```jsx
    // Take Values from Form Input
    function updateCountdown(e) {
      console.log(e);
    };
    
    // Event Listeners
    countdownForm.addEventListener('submit', updateCountdown);
    ```
    
    發現 console.log 閃一下就消失，這是因為 form submit 的 default 是會透過發送 network request 把資料傳給他應該去的地方，但因為現在沒有要他傳送到遠方去，所以變成它會直接 refresh 頁面，所以這邊先用 `preventDefault()` 把預設行為取消掉
    
    一開始我以為我們需要的資料存放在 `e.srcElement[2].value` 之類的，但都失敗拿不到東西
    後來看其他同學留言才知道 srcElement 已棄用，這邊要改成 `e.target[2].value` 
    
    ```jsx
    let countdownTitle = '';
    let countdownDate = '';
    
    // Take Values from Form Input
    function updateCountdown(e) {
      e.preventDefault();
      countdownTitle = e.target[0].value;
      countdownDate = e.target[1].value;
    };
    
    // Event Listeners
    countdownForm.addEventListener('submit', updateCountdown);
    ```
    
8. 處理表單的 submit 功能：切換顯示 countdown 畫面
    1. input container hidden / countdown container !hidden
        
        ```jsx
        // 隱藏 Input 畫面
        inputContainer.hidden = true;
        
        // 打開 Countdown 畫面
        countdownContainer.hidden = false;
        ```
        
    2. 根據 countdownTitle 更換 title 內容
        
        ```jsx
        countdownTitleEl.textContent = `${countdownTitle}`;
        ```
        
    3. 根據 現在 - countdownDate 更換 span 裡面的倒數數字
        
        因為要計算兩者相減，所以將現在和 countdownDate 都轉換成 timestamp 毫秒數字，
        相減之後再透過數學運算，把毫秒數轉換成差距的 天 / 小時 / 分鐘 / 秒
        
        ```jsx
        const second = 1000;
        const minute = second * 60;
        const hour = minute *60;
        const day = hour * 24;
        
        // 產生 Countdown / complete 畫面的 UI
        function updateDOM() {
          const now = new Date().getTime();
          const distance = (countdownValue - now);
          const days = Math.floor(distance / day);
          const hours = Math.floor((distance % day) / hour);
          const minutes = Math.floor((distance % hour) / minute);
          const seconds = Math.floor((distance % minute) / second);
          console.log(days, hours, minutes, seconds);
        };
        
        // Take Values from Form Input
        function updateCountdown(e) {
          e.preventDefault();
          countdownTitle = e.target[0].value;
          countdownDate = e.target[1].value;
          // 取得現在時間的 timestamp 值並更新 DOM
          countdownValue = new Date(countdownDate).getTime();
          updateDOM();
        };
        ```
        
        更新 Countdown 畫面中的倒數數字們
        
        使用 `document.querySelectorAll('span')` 所以他會是一個陣列形式
        
        ```jsx
        const timeElements = document.querySelectorAll('span');
        
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        ```
        
    4. 讓倒數畫面每秒更新 >> 用 `setInterval()` 
        
        先在全域宣告這個倒數 fn 的變數（因為在其他 fn 中也會用到此變數要把它取消掉），再把更新畫面的 fn 內容都放進 `setInterval()` 中
        
        ```jsx
        let countdownActive;
        
        function updateDOM() {
          countdownActive = setInterval(() => {
            const now = new Date().getTime();
            const distance = (countdownValue - now);
            const days = Math.floor(distance / day);
            const hours = Math.floor((distance % day) / hour);
            const minutes = Math.floor((distance % hour) / minute);
            const seconds = Math.floor((distance % minute) / second);
          
            countdownTitleEl.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            
            // 隱藏 Input 畫面
            inputContainer.hidden = true;
          
            // 打開 Countdown 畫面
            countdownContainer.hidden = false;
          }, second);
        };
        ```
        
9. 用 Countdown 畫面的 reset 按鈕將一切重置，並切換顯示 input 畫面
    
    ```jsx
    // 重置所有 value 並暫停 setInteval，切換回 Input 畫面
    function reset() {
      countdownContainer.hidden = true;
      inputContainer.hidden = false;
      clearInterval(countdownActive);
      countdownTitle = '';
      countdownDate = '';
    };
    
    // Event Listeners
    countdownBtn.addEventListener('click', reset);
    ```
    
10. 若 user 沒選日期就按 submit，會讓畫面顯示 NaN
    
    防止 user 沒選日期還可以 loading countdown page
    
    ```jsx
    function updateCountdown(e) {
      e.preventDefault();
      countdownTitle = e.target[0].value;
      countdownDate = e.target[1].value;
      // 檢查 user 有沒有選日期
      if (countdownDate === '') {
        alert('Please select a date!')
      } else {
        // 取得現在時間的 timestamp 值並更新 DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
      };
    };
    ```
    
11. 製作倒數完成的畫面
    
    我原本是想說要放在 setInterval 之外，但因為是要計算過後才判斷是否符合條件，所以還是要放在計算兩個日期的差距後，再執行判斷
    
    ```jsx
    function updateDOM() {
      countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = (countdownValue - now);
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
      
        // 隱藏 Input 畫面
        inputContainer.hidden = true;
    
        // 如果 Countdown 已完成，顯示 complete 畫面
        if (distance < 0) {
          countdownContainer.hidden = true;
          completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
          clearInterval(countdownActive);
          completeContainer.hidden = false;
        } else {
          // 否則執行 Countdown
          countdownTitleEl.textContent = `${countdownTitle}`;
          timeElements[0].textContent = `${days}`;
          timeElements[1].textContent = `${hours}`;
          timeElements[2].textContent = `${minutes}`;
          timeElements[3].textContent = `${seconds}`;
          
          completeContainer.hidden = true;
          // 打開 Countdown 畫面
          countdownContainer.hidden = false;
        };
      }, second);
    };
    ```
    
    一樣把倒數完成的畫面 new countdown 按鈕加上監聽事件，返回 input 畫面
    
    ```jsx
    function newCountdown() {
      complete.hidden = true;
      inputContainer.hidden = false;
      countdownTitle = '';
      countdownDate = '';
    };
    
    completeBtn.addEventListener('click', newCountdown);
    ```
    
    <aside>
    ⚠️ 我直覺是想說再寫一個新 fn，但其實這個 fn 內容幾乎跟 reset fn 內容一樣，
    可以直接用 reset fn 再加上把 complete.container 隱藏即可
    
    </aside>
    
    ```jsx
    // 重置所有 value 並暫停 setInteval，切換回 Input 畫面
    function reset() {
      countdownContainer.hidden = true;
      completeContainer.hidden = true;
      inputContainer.hidden = false;
      clearInterval(countdownActive);
      countdownTitle = '';
      countdownDate = '';
    };
    
    // Event Listeners
    countdownForm.addEventListener('submit', updateCountdown);
    countdownBtn.addEventListener('click', reset);
    completeBtn.addEventListener('click', reset);
    ```
    
12. 將 input 資料存放在 localStorage，user 下次再打開頁面就會一樣回到原先紀錄的 countdown 資料
    
    💡 有關 localStorage 更多介紹往下看[學習筆記](https://www.notion.so/JS-projects-09-Countdown-3a4ae44c404e400cb0e75fc1d2833561)
    
    先全域宣告 savedCountdown 這個變數，要拿來存放要放在 localStorage 的物件資料，
    在取得 user input 資料後，用 `localStorage.setItem()` 方式把資料放進 localStorage
    要記得用 `JSON.stringify()` 將物件轉換成 JSON 字串
    
    ```jsx
    let savedCountdown; // localStorage obj.
    
    function updateCountdown(e) {
      e.preventDefault();
      countdownTitle = e.target[0].value;
      countdownDate = e.target[1].value;
      savedCountdown = {
        title: countdownTitle,
        date: countdownDate
      };
      localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    
      // 後略
    };
    ```
    
    在網頁 loading 時就先檢查是否有 localStorage 資料，有的話直接取用並顯示 Countdown 畫面
    用 `localStorage.getItem()` 取得資料，並用 `JSON.parse()` 將 JSON 字串轉換回物件格式
    
    ```jsx
    function restorePreviosCountdown() {
      if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
      };
    };
    
    // on Load, 檢查有沒有本地儲存資料
    restorePreviosCountdown();
    ```
    
    最後在 reset fn 中加上把 localStorage 資料清除即可
    
    ```jsx
    function reset() {
      countdownContainer.hidden = true;
      completeContainer.hidden = true;
      inputContainer.hidden = false;
      clearInterval(countdownActive);
      countdownTitle = '';
      countdownDate = '';
      localStorage.removeItem('countdown');
    };
    ```
    
13. Code Review
    
    原本把 countdownValue 宣告成型別是 Date （它回傳的是 fn.）
    
    ```jsx
    let countdownValue = Date;
    ```
    
    但其實後面我們所使用的 countdownValue 都是 timestamp 的數字型態，
    所以才能算出兩個日期的時間差
    
    ```jsx
    countdownValue = new Date(countdownDate).getTime();
    ```
    
    老師提到在 JS 中，最好的做法是讓變數的型態始終如一，不要變來變去，
    所以這邊可以把一開始的宣告改成：
    
    ```jsx
    let countdownValue = new Date();
    ```
    

# 學習筆記

## 【HTML】

### 1. form tag

[Basic form hints - Accessibility | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints)

It is important to provide `labels` for controls, and explicitly associate a label with its control. When a screen reader user navigates a page, the screen reader will describe form controls.

### 2. <input type="date">

[- HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)

- value att.：可設定 default 顯示的日期
- max & min att.：可限制用戶選擇的日期區間（2021-12-27 年月日格式）

## 【JS】

### 1. date object

[JavaScript Date Reference](https://www.w3schools.com/jsref/jsref_obj_date.asp)

- 要怎麼取得現在的時間？
    
    答：使用 `new Date()` ，會產生當下的本地時間
    
    - 延伸閱讀：[日期/時間物件](https://javascript.info/date) / [JavaScript Date 時間和日期](https://www.fooish.com/javascript/date/)
    
    【產生時間物件】
    
    `new Date()` ：無參數會產生當下的**本地時間**物件
    
    `new Date(milliseconds)`：參數為特定 Timestamp 的毫秒數，可產生該時間的 date 物件
    
    【取得時間物件】
    
    `getFullYear()`：拿到年份（四位數）
    
    `getMonth()`：拿到月份，0-11 的數字（0 = 1月；11 = 12月）
    
    `getDate()`：拿到日期，1-31 的數字
    
    `getDay()`：拿到星期，0-6 的數字（0 = 星期天：6 = 星期六）
    
    `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`
    
    `getTime()`：拿到 timestamp 
    
    ```jsx
    // current date
    let date = new Date();
    
    // the hour in your current time zone
    alert( date.getHours() );
    
    // the hour in UTC+0 time zone (London time without daylight savings)
    alert( date.getUTCHours() );
    ```
    

### 2. 瀏覽器的本地儲存空間 localStorage

[認識瀏覽器的神秘儲存空間 - localStorage](https://5xruby.tw/posts/localstorage)

[[JavaScript] localStorage 的使用](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/javascript-localstorage-%E7%9A%84%E4%BD%BF%E7%94%A8-e0da6f402453)

l**ocalStorage 優缺點**

**優點:**

1. 增加本地儲存空間。
2. 儲存資料方式，為 `key` 和 `value`。

P.S. `key` 和 `value` 資料儲存型態為 `String`。

**缺點:**

1. `value` 儲存型態只接受 `String`。
    
    所以需**將資料轉換成 JOSN 格式的字串**
    
    透過 **[JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)** 方法，將要儲存的資料轉換為 JSON 格式的字串；
    要取出資料時，再透過 **[JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)** 方法，將資料轉換回原本的格式
    
2. 無痕或隱私模式下無法讀取。
3. 資料量太多，存取時，容易照成畫面卡頓。
4. 有些比較較舊的瀏覽器版本(IE 8 以下)沒有支援。

**localStorage 與 sessionStorage 的差異：**

1. localStorage 的資料是永久存在，唯有清除它才會消失。
2. sessionStorage 的資料則是當網頁關閉時，就會清除。

**如何使用**

- 存入資料：setItem()

```jsx
localStorage.setItem(key, value)
sessionStorage.setItem(key, value)
```

- 取出資料：getItem()

```jsx
localStorage.getItem(key)
sessionStorage.getItem(key)
```

- 移除資料：removeItem()

```jsx
localStorage.removeItem(key)
sessionStorage.removeItem(key)
```
