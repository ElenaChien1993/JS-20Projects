### DEMO page
https://elenachien1993.github.io/JS-20Projects/08-music-player/

# 目標

製作網頁版的 music player，自製 control 來串接 audio 功能按鈕

# 執行步驟

1. 設定好所需的 HTML 和 CSS
    
    ```html
    <div class="player-container">
    	<!-- Song -->
      <div class="img-container">
    	  <img src="img/jacinto-1.jpg" alt="Album Art" />
      </div>
      <h2 id="title">Electric Chill Machine</h2>
      <h3 id="artist">Jacinto</h3>
      <audio src="music/jacinto-1.mp3"></audio>
      <!-- Progress -->
      <div class="progress-container" id="progress-container">
    	  <div class="progress" id="progress"></div>
        <div class="duration-wrapper">
    	    <span id="current-time">0:00</span>
          <span id="duration">2:06</span>
        </div>
      </div>
      <!-- Controls -->
    	  <div class="player-controls">
    	    <i class="fas fa-backward" id="prev" title="Previous"></i>
          <i class="fas fa-play main-button" id="play" title="Play"></i>
          <i class="fas fa-forward" id="froward" title="Next"></i>
        </div>
    </div>
    ```
    
2. 將播放器的按鈕用 JS 把功能串接起來
    1. 播放 / 暫停按鈕
        
        定義一個變數存放播放狀態的布林值，並初始化為 false，
        再用 event listener 串接 play Btn 並根據播放狀態執行不同 fn，
        同步修改 Btn 的 icon 圖
        
        ```jsx
        const music = document.querySelector('audio');
        const prevBtn = document.getElementById('prev');
        const playBtn = document.getElementById('play');
        const nextBtn = document.getElementById('next');
        
        let isPlaying = false;
        
        const playSong = () => {
          isPlaying = true;
          playBtn.classList.replace('fa-play', 'fa-pause');
          playBtn.setAttribute('title', 'Pause');
          music.play();
        };
        
        const pauseSong = () => {
          isPlaying = false;
          playBtn.classList.replace('fa-pause', 'fa-play');
          playBtn.setAttribute('title', 'Play');
          music.pause();
        };
        
        playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
        ```
        
    2. 「上一首」＆「下一首」按鈕
        
        把歌曲用 array 方式放進 JS，指定當點擊上下一首時 DOM 上面會更改的資訊
        
        ```jsx
        // Update DOM
        const loadSong = (song) => {
          title.textContent = song.displayName;
          artist.textContent = song.artist;
          music.src = `music/${song.name}.mp3`;
          image.src = `img/${song.name}.jpg`;
        };
        
        // On Load - Select First Song
        loadSong(songs[0]);
        ```
        
        定義一個變數名稱代表目前歌曲是 array index 中的第幾個，並預設為 index = 0，
        把前進後退的按鈕加上 event listener 串接相對應的 fn
        
        ```jsx
        // Current Song
        let songIndex = 0;
        
        const prevSong = () => {
          songIndex --;
          loadSong(songIndex);
          playSong();
        };
        
        const nextSong = () => {
          songIndex ++;
          loadSong(songIndex);
          playSong();
        };
        
        // On Load - Select First Song
        loadSong(songs[songIndex]);
        
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        ```
        
        以上最後會發生一個小問題，就是當 index 數字大於陣列本身長度，會出現 error，
        所以必須加上 if 設定條件
        
        ```jsx
        const prevSong = () => {
          if (songIndex < 0) {
            songIndex = songs.length - 1;
          };
          songIndex --;
          loadSong(songIndex);
          playSong();
        };
        
        const nextSong = () => {
          if (songIndex > songs.length - 1) {
            songIndex = 0;
          };
          songIndex ++;
          loadSong(songIndex);
          playSong();
        };
        ```
        
    3. 讓進度條跟著實際歌曲時間變化
        
        監聽 audio 的 `timeupdate` 事件，記得在 fn 中要加上條件式：當音樂正在播的時候，才改變 progress bar 和時間數字
        
        ```jsx
        // Update Progress Bar & Time
        const updateProgressBar = (e) => {
          if (isPlaying) {
            const { duration, currentTime } = e.srcElement; // 解構賦值
            // update progress bar width
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
          };
        };
        
        music.addEventListener('timeupdate', updateProgressBar);
        ```
        
    4. 讓時間數字跟著歌曲作實際變化
        
        用 `Math.floor()` 和 取餘數運算符(`%`) 來分開顯示分鐘數和秒數
        
        ```jsx
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        ```
        
        但因為秒數部分的數字顯示會是兩位數（2:06），所以要額外加一個條件式，
        手動把 0 加上去前面
        
        ```jsx
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
          if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
          };
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        ```
        
        上述的寫法會再發生一件事：loading 的短暫幾秒數字會顯示 NaN，
        這是因為尚未拿到歌曲的秒數資訊，所以再多新增一個條件式
        
        ```jsx
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`
        };
        // Delay switching duration to avoid NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        };
        ```
        
        currentTime 的方式就是一樣複製以上的 code 並改成 currentTime 
        
    5. 點擊 progress bar 可以調整音樂的時間點
        
        利用點擊時的 offsetX 佔整個 width 的比例去算出在整個時間軸的百分比
        
        ```jsx
        function setProgressBar (e) {
          const width = this.clientWidth;
          const clickX = e.offsetX;
          const { duration } = music;
          music.currentTime = (clickX / width) * duration;
        };
        
        progressContainer.addEventListener('click', setProgressBar);
        ```
        
        <aside>
        ⚠️ 一開始我是用 arrow fn 來寫，會出現 error，
        因為 arrow fn 的 this 指的是定義 fn 時的 owner (環境)
        以這邊來說會是 window；
        
        </aside>
        
        <aside>
        💡 In regular functions the `this` keyword represented the object that called the function, which could be the window, the document, a button or whatever.
        以這邊來說會是 `progressContainer`
        
        </aside>
        
    6. 音樂整首播完後自動播放下一首
        
        很簡單～直接監聽 audio 的 `ended` method 即可
        
        ```jsx
        music.addEventListener('ended', nextSong);
        ```
        

# 學習筆記

## 【 CSS 】

### 1. object-fit

[object-fit - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

用來設定 replaced element（`<img>` / `<video>` / `<iframe>` 等等）該怎麼去 fit 在它的 container 裡面

```css
object-fit: contain;
object-fit: cover;
object-fit: fill;
object-fit: none;
object-fit: scale-down;
```

## 【JS】

### 1. Math.floor()

[Math.floor() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

回傳小於等於所給數字的最大整數

在其他專案中也有使用過 >> [點我回顧](https://www.notion.so/JS-projects-01-Quote-Generator-51e0d82c68a8418eb27f1d59c1a46ea2)

```jsx
console.log(Math.floor(5.95));
// expected output: 5

console.log(Math.floor(5.05));
// expected output: 5

console.log(Math.floor(5));
// expected output: 5

console.log(Math.floor(-5.05));
// expected output: -6
```

### 2. remainder operator (`%`)

[Remainder (%) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)

取「餘數」的運算符號

```jsx
12 % 5  //  2
1 % -2  //  1
1 % 2   //  1
2 % 3   //  2
5.5 % 2 // 1.5
```

### 3. `textContent` vs `innerText`

[Node.textContent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext)

[Difference between textContent vs innerText](https://stackoverflow.com/a/50406907)

1. When you are trying to alter the text, `textContent` is usually the property you are looking for.
2. When you are trying to grab text from some element, `innerText` approximates the text the user would get if they highlighted the contents of the element with the cursor and then copied to the clipboard. And `textContent` gives you everything, visible or hidden, including `<script>` and `<style>` elements.
3. Since `innerText` takes CSS styles into account, reading the value of `innerText` triggers a [reflow](https://developer.mozilla.org/en-US/docs/Glossary/Reflow) to ensure up-to-date computed styles. (Reflows can be computationally expensive, and thus should be avoided when possible.)

在此專案中使用的是 textContent，因為若是內容一樣的話，它不會觸發 reflow（但 innerText 會唷）
