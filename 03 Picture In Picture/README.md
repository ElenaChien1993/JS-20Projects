### DEMO page
https://elenachien1993.github.io/JS-20Projects/03%20Picture%20In%20Picture/

## 目標

用 Picture In Picture API 和 Screen Capture API 製作將自己電腦畫面分享在右下角小視窗

## 資源

Picture-in-Picture Web API

[An Introduction to the Picture-in-Picture Web API](https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/)

Screen Capture API

[Using the Screen Capture API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture)

## 執行步驟

1. 在 HTML 中寫入 video 和 button，video 先 hidden 備用

    ```html
    <!-- Video -->
    <video src="" id="video" controls width="640" height="360" hidden></video>
    <!-- Button -->
    <div class="button-container">
    	<button id="button">START</button>
    </div>
    ```

2. 修改一下按鈕的 CSS style，增加 hover 和 active 的變化
3. 先用 ScreenCapture API 跳出選擇要 display 的視窗，傳給 video 元素後播放

    使用 `async` `await` 確保是等用戶選完（拿到 promise）後再執行

    ```jsx
    async function selectMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStream;
        video.onloadeddata = () => {
          video.play();
        }
      } catch(error) {
        // Catch error here
        console.log('woops, error here：', error);
      }
    }
    ```

4. 把 Picture In Picture 的功能跟按鈕串接起來

    ```jsx
    async function pictureInPicture() {
      // 讓按鈕失效
      btn.disabled = true;
      // 開啟 Picture in picture 功能
      await video.requestPictureInPicture();
      // 讓按鈕重新生效
      btn.disabled = false;
    }

    btn.addEventListener('click', pictureInPicture);
    ```

## 學習筆記

### 【 CSS 】

- 按鈕點擊效果：

    利用背景顏色 linear-gradient 和 box-shadow 陰影變化，做出更好的按鈕體驗

    ```css
    button {
    	background: linear-gradient(to top, #696969, #575757);
    	box-shadow: inset 0 20px 4px -19px rgba(255, 255, 255, 0.4), 0 12px 12px 0px rgba(0, 0, 0, 0.3);
    }

    button:hover {
    	background: linear-gradient(to bottom, #696969, #575757);
    }

    button:active {
    	transform: translateY(3px);
    	box-shadow: 0 6px 6px 0px rgba(0, 0, 0, 0.3)
    }
    ```

    1. 利用顏色線性漸層變化，原本是 to top，當 hover 的時候變成 to bottom
    2. 把陰影的位置縮減一半，製造將按鈕「按進頁面中」的感覺

### 【 其他 】

- `video.srcObject = mediaStream;` 是什麼意思？

    [HTMLMediaElement.srcObject - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)

    我的理解是，把得到的 `mediaStream` 當成 src 來源傳給 video 元素

- `video.onloadeddata` 是什麼用法？

    [HTMLMediaElement: loadeddata event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event)

    其實就是在 video 元素上做 event listener，當影片 data loaded 完，就執行指定 fn
    
    這邊是使用 event handler property 形式去做

    ```jsx
    video.onloadeddata = () => {
    	video.play();
    }
    ```
