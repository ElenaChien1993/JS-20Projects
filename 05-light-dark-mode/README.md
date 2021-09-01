# JS projects 05 Light Dark Mode

## 目標

製作可以切換成 dark mode 的網頁

## 資源

重複幾何圖 SVG 背景生成：[Hero Patterns](https://www.heropatterns.com/)

插圖圖庫：[Illustrations | unDraw](https://undraw.co/illustrations)

Icon 圖庫：[Font Awesome](https://fontawesome.com/)

怎麼做 toggle 切換按鈕：[How To Create a Toggle Switch](https://www.w3schools.com/howto/howto_css_switch.asp)

Document.documentElement 最上層元素：[Document.documentElement - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)

瀏覽器存取資料：[Window.localStorage - Web APIs | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)

## 執行步驟

1. 先在 CSS 中設定好所有顏色的變數，以方便切換 dark mode 使用

    ```css
    :root {
      --primary-color: #8B1338;
      --primary-variant: #E2C1BD;
      --secondary-color: #5ECBD2;
      --on-primary: rgb(250, 250, 250);
      --on-background: rgb(66, 66, 66);
      --on-background-alt: rgba(66, 66, 66, 0.7);
      --background: rgb(255, 255, 255);
      --box-shadow: 0 5px 20px 1px rgba(0, 0, 0, 0.5);
    }

    [data-theme="dark"] {
      --primary-color: #F89099;
      --primary-variant: #EDE5E5;
      --secondary-color: #B4E9EB;
      --on-primary: #000;
      --on-background: rgba(255, 255, 255, 0.9);
      --on-background-alt: rgba(255, 255, 255, 0.7);
      --background: #121212;
    ```

2. 在 Hero Patterns 選好喜歡的樣式，加進背景裡面使用

    ```css
    body {
      margin: 0;
      color: var(--on-background);
      background-color: var(--background);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e2c1bd' fill-opacity='0.41'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    ```

3. 在 HTML 中寫好 section 和 nav bar

    nav bar 常用 CSS 寫法如下

    ```html
    <nav id="nav">
    	<a href="#home">HOME</a>
    	<a href="#about">ABOUT</a>
    	<a href="#projects">PROJECTS</a>
    	<a href="#contact">CONTACT</a>
    </nav>
    ```

    ```css
    nav {
      z-index: 10;      /* 浮在所有元素之上(z 軸) */
      position: fixed;  /* 位置固定在視窗上方 */
      font-size: 24px;
      letter-spacing: 2px;
      padding: 25px;
      width: 100vw;     /* 和視窗同寬 */
      background: rgb(255 255 255 / 50%);
    }
    ```

4. 在 About section 中放入圖片排列

    在 projects scetion 中使用不同樣式按鈕

    在 contact section 中使用 icon 並調整 css 樣式

5. 在 HTML 和 CSS 製作 dark mode 的切換按鈕元素，slider 裡面的圓球是用 `::before` 製作

    切換的 CSS 樣式變換使用 `:checked` 去設定（變換背景顏色和位置）

    ```html
    <div class="theme-switch-wrapper">
    	<span id="toggle-icon">
    		<span class="toggle-text">Light Mode</span>
    		<i class="fas fa-sun"></i>
    	</span>
    	<label class="theme-switch">
    		<input type="checkbox">
    		<div class="slider round"></div>
    	</label>
    </div>
    ```

    ```css
    .slider::before {
      background: #fff;
      bottom: 4px;
      content: "";
      height: 26px;
      left: 4px;
      position: absolute;
      transition: 0.4s;
      width: 26px;
    }

    input:checked + .slider {
      background: var(--primary-color);
    }

    input:checked + .slider::before {
      transform: translateX(26px);
    }
    ```

6. 開始用 JS 設定 event listener 來切換 dark mode

    先把 toggle 按鈕設定開關功能，
    監聽 change 事件，當 `e.target.checked` 是 true，
    在最上層的 element 加上已在 CSS 設定好的 dark mode attribute 

    ```jsx
    const toggleSwitch = document.querySelector('input[type="checkbox"]');

    // Switch Theme Dynamically
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'white');
      }
    }

    //Event Listeners
    toggleSwitch.addEventListener('change', switchTheme);
    ```

7. 將沒有被更換到的地方使用 JS fn 來切換

    用 JS 操控 DOM 的 CSS style 變更

    ```jsx
    // Dark or light image
    function imageMode(color) {
      image1.src = `img/undraw_proud_coder_${color}.svg`;
      image2.src = `img/undraw_pair_programming_${color}.svg`;
      image3.src = `img/undraw_react_${color}.svg`;
    }

    // Dark Mode Style
    function darkMode() {
      nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
      textbox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
      toggleIcon.children[0].textContent = 'Dark Mode';
      toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
      imageMode('dark');
    }

    // Light Mode Style
    function lightMode() {
      nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
      textbox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
      toggleIcon.children[0].textContent = 'Light Mode';
      toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
      imageMode('light');
    }
    ```

8. 不希望每次打開網頁都會重新預設回 light mode

    要讓瀏覽器記得上次用戶的資料設定，需使用 `window.localStorage`

    ```jsx
    // Switch Theme Dynamically
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkMode();
      } else {
        document.documentElement.setAttribute('data-theme', 'white');
        localStorage.setItem('theme', 'light');
        lightMode();
      }
    }

    //Event Listeners
    toggleSwitch.addEventListener('change', switchTheme);

    // Check local storage for theme 
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
      }
    }
    ```

9. Code Review

    將 dark / light mode 的切換結合成一個 fn，因為他其實就是兩種條件切換而已
    可以合在一起用三元運算子

    ```jsx
    function toggleDarkLightMode(theme) {
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'light') {
        isDark = false;
      }
      nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
      textbox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
      toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
      isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
      isDark ? imageMode('dark') : imageMode('light');
    }

    // Switch Theme Dynamically
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'white');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode('light');
      }
    }

    //Event Listeners
    toggleSwitch.addEventListener('change', switchTheme);
    ```

## 學習筆記

### 【 CSS 】

- 讓每個 section 高度都是剛好一個視窗的高度

    ```css
    section {
    	min-height: 100vh;
    }
    ```

- nav bar 點擊後自動跳至指定 section，可以設定跳動方式

    讓他變成是往下滑到該區域，而不是畫面直接變化

    ```css
    html {
      box-sizing: border-box;
      scroll-behavior: smooth;
    }
    ```

### 【 JS 】

- 將使用者資料儲存在瀏覽器中

    [[JS] localStorage 筆記](https://medium.com/%E9%A6%AC%E6%A0%BC%E8%95%BE%E7%89%B9%E7%9A%84%E5%86%92%E9%9A%AA%E8%80%85%E6%97%A5%E8%AA%8C/js-localstorage-%E7%AD%86%E8%A8%98-581d432c2d7f)

    依據資料保存的時間不同，可以分為兩種：

    1. `window.sessionStorage`：放在 sessionStorage 的資料會在頁面關閉時清空，只要該頁面沒被關閉或者有還原 (restore) 該頁面，資料就會保存。
    2. `window.localStorage`： 放在 localStorage 的資料會永久保存，直到被使用者清除。

    **儲存、取出資料的語法 — setItem、getItem**

    在 JS 中使用 `setItem`，可以將資料寫進瀏覽器裡。
    `setItem` 的第一個值是 key 的屬性名，第二個值就是相對應的 value。

    寫入的值皆需為字串

    ```jsx
    // 把字串存進 localStorage
    var str = 'Tom';
    localStorage.setItem('myName',str);
    ```

    把資料存進瀏覽器後，要取出來的話要用 `getItem` 語法。

    ```jsx
    // 把剛剛存進去的字串用 key 名取出來
    localStorage.getItem('myName');
    ```
