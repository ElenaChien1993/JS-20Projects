# JS projects 04 Joke Teller

## 目標

用 joke API 和 text speech API 製作一個說笑話的網頁

## 資源

Text-to-speech (TTS) API Documentation：[Voice RSS - API documentation](http://www.voicerss.org/api/)

隨機產生笑話的 API：[JokeAPI](https://sv443.net/jokeapi/v2/)

GIPHY：[eyedesyn GIFs on GIPHY - Be Animated](https://giphy.com/eyedesyn)

## 執行步驟

1. 在 HTML 中寫入說笑話的 button 和 audio 元素

    ```html
    <div class="container">
    	<button id="button">說個笑話來聽聽</button>
    	<audio id="audio" controls></audio>
    </div>
    ```

2. 將 gif 檔案以背景圖形式加進去並調整背景樣式

    ```css
    .container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: url('./earth_day.gif');
      background-size: contain;
      background-position: left center; /* 垂直置左 水平置中 */
      background-repeat: no-repeat;
    }
    ```

3. 將網頁做響應式調整並修改按鈕的 CSS style，增加 hover / active / disable 的變化

    ```css
    /* Media Query: Tablet or smaller */
    @media screen and (max-width: 1000px) {
      .container {
        background-size: cover;
        background-position: center center;
        justify-content: flex-end;
      }

      button {
        box-shadow: 5px 5px 30px 20px rgba(0, 0, 0, 0.5);
      }
    }
    ```

    ```css
    button:hover {
      filter: brightness(95%);
    }

    button:active {
      transform: scale(0.98);
    }

    button:disabled {
      cursor: default;
      filter: brightness(30%);
    }
    ```

4. 放入 Speech API 

    它需要在腳本中放入 ref 的 voicerss-tts.min.js 檔案，用 SDK 提供的測試腳本測試

    ```jsx
    function test() {
      VoiceRSS.speech({
        key: '5c7a2240975a444084b74278b2fd172b',
        src: '安安各位好',
        hl: 'zh-tw',
        v: 'Akemi',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
      });
    }

    test();
    ```

5. 串入 Joke API，做產生隨機 joke 的 function

    ```jsx
    async function getJokes() {
      let joke = '';
      try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.type === 'single') {
          joke = data.joke;
        } else if (data.type === 'twopart') {
          joke = `${data.setup} ... ${data.delivery}`;
        }
        console.log(joke);
      } catch (error) {
        console.log('OMG, error here:', error);
      }
    }

    getJokes();
    ```

6. 將兩個獨立運作的 API 連接起來

    用 fn 把 joke API 隨機產生的 joke 字串當成參，
    傳給 `speech()` 當成 src value 傳給 VoiceRSS API

    ```jsx
    // Passing Joke to VoiceRSS API
    function tellMe(joke) {
      VoiceRSS.speech({
        key: '5c7a2240975a444084b74278b2fd172b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
      });
    }

    // Get Jokes from Joke API
    async function getJokes() {
      let joke = '';
      try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.type === 'single') {
          joke = data.joke;
        } else if (data.type === 'twopart') {
          joke = `${data.setup} ... ${data.delivery}`;
        }
        tellMe(joke);
      } catch (error) {
        console.log('OMG, error here:', error);
      }
    }

    getJokes();
    ```

7. 把按鈕 event 加進去，並記得也要加入按鈕失效的 event

## 學習筆記

### 【 JS 】

- 與其只有一個很龐雜的 JS 檔案，不如把不同功能分寫在不同的 JS 檔案

    例如本次專案有個 SDK 的 js code，就可以把他拉出來獨立在另一個 js 檔案中
    然後在 html 中多 import 一個 script 檔案即可

- 把 API key 隱藏起來

    在很多情況下都不會希望在前端 code 裡面直接暴露 API key，
    因為這樣誰都看得到都可以複製去用

    [Hiding and Securing Your API Keys | Nordic APIs |](https://nordicapis.com/hiding-and-securing-your-api-keys/)

    解法：將比較敏感的資料寫在 .env 檔案中，然後在 .gitignore 中忽略，不讓他們上 git

    [gitignore 大小事](https://medium.com/@ji3g4kami/gitignore-%E5%A4%A7%E5%B0%8F%E4%BA%8B-9016584660f6)

    找資料遇到一個瓶頸，大部分的教學都是以 React App 為前提，
    沒有提到我要如何從 vanila JS 去讀取 .env 檔案裡的變數
    看起來是無法嘗試在 client side 的 JS 去隱藏你的 API key

    [](https://morioh.com/p/e04c6246d1d3)

    [Loading environment variables in JS apps](https://dev.to/deammer/loading-environment-variables-in-js-apps-1p7p)

    有另一人使用 Netlify 來上傳到 github

    [How to Use Environment Variables in VanillaJS](https://www.freecodecamp.org/news/how-to-use-environment-variables-in-vanillajs/)

    課程中的討論區是使用另寫一個 .js 檔案存放 API key 然後放進 .gitignore 中，
    但 live demo 需上傳至 heroku，因為它可以使用 Evironment variables

    有人的建議：

    The longer answer is yes, but it takes too much effort to be worth it. 
    You will need to create a server, store your API key there, instead of calling the API directly, you will call your server which in turn calls the API. 
    The easiest way to create a server is by using Cloud Function.

    My solution: this is just a fun demo project + the API key is free so I don't mind exposing it (no one's gonna steal it anyway)

    所以目前此專案的 API Key 是未隱藏，待之後寫 React App 時再來嘗試看看
