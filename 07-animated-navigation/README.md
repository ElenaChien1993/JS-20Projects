# JS projects 07 Animated Navigation

## 目標

針對 navigation bar 的互動動畫更深入了解&製作

## 資源

CSS custom properties (variables)

[Using CSS custom properties (variables) - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

paletton

[Paletton - The Color Scheme Designer](https://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF)

How To Create a Menu Icon

[How To Create a Menu Icon](https://www.w3schools.com/howto/howto_css_menu_icon.asp)

CSS animation

[animation - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

之前的學習筆記：[CSS 動畫和影格](https://www.notion.so/Udemy-Hahow-CSS-Exercise-dd6f0bc547194b96ab4eae001a06670e)

## 執行步驟

1. 先針對課程中的 template 修改自己喜歡的顏色組合、背景圖、字型
2. 製作滿版 menu
    1. 先在 HTML 中插入 menu 區塊（尚未細分 menu 項目）
        
        ```css
        .overlay {
          position: fixed;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
        }
        ```
        
    2. 在 menu 區塊中把細項放進去，並連結至相對應的區塊
        
        ```html
        <div class="overlay" id="overlay">
          <!-- Nav Menu Items -->
          <nav>
            <ul>
              <li id="nav-1"><a href="#home">首頁</a></li>
              <li id="nav-2"><a href="#about">關於我</a></li>
              <li id="nav-3"><a href="#skills">技能</a></li>
              <li id="nav-4"><a href="#projects">作品集</a></li>
              <li id="nav-5"><a href="#contact">聯絡資訊</a></li>
            </ul>
          </nav>
        </div>
        ```
        
        先把每個項目的背景色放入
        
        ```css
        nav,
        nav ul {
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        nav li:nth-of-type(1) {
          background-color: var(--navColor1);
        }
        
        nav li:nth-of-type(2) {
          background-color: var(--navColor2);
        }
        
        nav li:nth-of-type(3) {
          background-color: var(--navColor3);
        }
        
        nav li:nth-of-type(4) {
          background-color: var(--navColor4);
        }
        
        nav li:nth-of-type(5) {
          background-color: var(--navColor5);
        }
        ```
        
    3. 設定 items 的 css 樣式：均分滿版 & 文字置中
        
        ```css
        nav ul {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          list-style: none;
        }
        
        nav ul li {
          height: 20%;
          overflow: hidden;
        }
        
        nav li a {
          position: relative;
          top: 45%;
          color: #fff;
          letter-spacing: 3px;
          text-decoration: none;
          display: block;
          text-align: center;
        }
        
        ```
        
    4. 新增一點小的 hover 動畫
        
        ```css
        nav li a:hover {
          transform: scale(1.2);
        }
        
        nav li a::before {
          content: "";
          width: 25vw;
          height: 3px;
          background-color: #fff;
          position: absolute;
          top: 47.5%;
          left: 0;
          opacity: 0;
        }
        
        nav li a:hover::before {
          opacity: 1;
        }
        ```
        
    5. 
    
3. 製作右上角的 menu 槓槓 & 動畫，製作滿版 menu 的開關
    1. 在 HTML 中加上 Menu Bars 的 div 區塊
        
        ```html
        <div class="menu-bars" id="menu-bars">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
        ```
        
    2. CSS 部分直接使用 W3C 提供的 code 
        
        ```css
        .menu-bars {
          position: fixed;
          top: 1rem;
          right: 2rem;
          z-index: 10;
          display: inline;
          cursor: pointer;
        }
        
        .bar1,
        .bar2,
        .bar3 {
          width: 35px;
          height: 2px;
          background-color: #fff;
          margin: 8px 0;
          transition: 0.4s;
        }
        
        /* Rotate first bar */
        .change .bar1 {
          transform: rotate(-45deg) translate(-7px, 8px);
        }
        
        /* Fade out the second bar */
        .change .bar2 {
          opacity: 0;
        }
        
        /* Rotate last bar */
        .change .bar3 {
          transform: rotate(45deg) translate(-6px, -8px);
        }
        ```
        
    3. 在 JS 中做 event listener 去 toggle 設定好的 change CSS 樣式，和 overlay 樣式
        
        先把 CSS 中 overlay 的樣式藏起來，再設定兩種不同狀態
        
        ```css
        .overlay {
        	(...略)
          transform: translateX(-100vw);
        }
        
        .overlay-slide-right {
          transition: all 0.4s ease-in-out;
          transform: translateX(0);
        }
        
        .overlay-slide-left {
          transition: all 0.8s ease-in-out;
          transform: translateX(-100vw);
        }
        ```
        
        ```jsx
        function toggleNav() {
          // Toggle: Menu Bars Open/Closed
          menuBars.classList.toggle('change');
          // Toggle: Menu Active
          overlay.classList.toggle('overlay-active');
          if (overlay.classList.contains('overlay-active')) {
            overlay.classList.remove('overlay-slide-left');
            overlay.classList.add('overlay-slide-right');
          } else {
            overlay.classList.remove('overlay-slide-right');
            overlay.classList.add('overlay-slide-left');
          }
        }
        
        // Event Listeners
        menuBars.addEventListener('click', toggleNav);
        nav1.addEventListener('click', toggleNav);
        nav2.addEventListener('click', toggleNav);
        nav3.addEventListener('click', toggleNav);
        nav4.addEventListener('click', toggleNav);
        nav5.addEventListener('click', toggleNav);
        ```
        
    4. 用 CSS Animation 來更加優化動畫
        
        讓每個 nav item 有不同飛進來的時間
        
        ```css
        /* Slide In Animation with delay For Each Nav Item */
        .slide-in-1 {
          animation: slide-in 0.4s linear 0.2s both;
        }
        
        .slide-in-2 {
          animation: slide-in 0.4s linear 0.4s both;
        }
        
        .slide-in-3 {
          animation: slide-in 0.4s linear 0.6s both;
        }
        
        .slide-in-4 {
          animation: slide-in 0.4s linear 0.8s both;
        }
        
        .slide-in-5 {
          animation: slide-in 0.4s linear 1s both;
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        ```
        
4. 簡化 JS code
    1. 可以把 remove & add 變成 replace 用法
        
        ```jsx
        overlay.classList.toggle('overlay-active');
        if (overlay.classList.contains('overlay-active')) {
          overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        } else {
          overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        }
        ```
        
        ⚠️ 但要注意 replace 的那個 class 必須先存在，所以我們在 HTML 中要 default 有 `overlay-slide-left` 這個 class
        
    2. 每一個 nav items 的動畫開關和 addEventListener，使用 forEach
        
        ```jsx
        function navAnimation(direction1, direction2) {
          navItems.forEach((item, i) => {
            item.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`)
          })
        }
        
        function toggleNav() {
          // Toggle: Menu Bars Open/Closed
          menuBars.classList.toggle('change');
          // Toggle: Menu Active
          overlay.classList.toggle('overlay-active');
          if (overlay.classList.contains('overlay-active')) {
            // Animate In - Overlay
            overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
            // Animate In - Nav Items
            navAnimation('out', 'in');
          } else {
            // Animate Out - Overlay
            overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
            // Animate Out - Nav Items
            navAnimation('in', 'out');
          }
        }
        
        menuBars.addEventListener('click', toggleNav);
        navItems.forEach((item) => {
          item.addEventListener('click', toggleNav);
        })
        ```
        

## 學習筆記

### 【CSS】

- CSS3 選擇器 `:nth-of-type()`
    
    [CSS3的:nth-of-type(n)](https://www.webdesigns.com.tw/CSS3-nth-of-type.asp)
    
    `:nth-of-type()` 可以確實選到同類型元素的指定第 x 項，
    比起 `:nth-child()` 它是**同層級**的所有種類元素一起算
    

### 【git】

- 本地端和 github 的 branch 分歧（因為我 commit 新的資料夾前忘記先 pull github 的修改）
    
    但其實我後來再 pull，git 只是要我輸入 merger 的訊息
    所以輸入 merge 訊息之後就成功 update 了
    
    [簡明 Vim 文字編輯器操作入門教學](https://blog.techbridge.cc/2020/04/06/how-to-use-vim-as-an-editor-tutorial/)
