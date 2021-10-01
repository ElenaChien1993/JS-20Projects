# JS projects 06 Animated Theme

## 目標

利用第三方函式庫和 template 製作有動畫的網頁

## 資源

[Tailwind Starter Kit by Creative Tim | Free & Open Source Design System](https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/download)

[Random User Generator](https://randomuser.me/)

[AOS](https://michalsnik.github.io/aos/)

[Loading Third-Party JavaScript | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript#how_do_you_load_third-party_script_efficiently)

## 執行步驟

1. 課程中的 starter 資料夾已將大部分 html 撰寫完畢，只剩動畫 & 圖片尚未加入
    1. 可修改 nav bar 右上角的 social media icon（用 font awesome） 
    2. 放上背景圖片（inline style）
    3. 放上兩張卡片上的圖片
    4. 用 Random User Generator 裡面已經有的 user 照片放進 team section 裡
2. 直接使用 library 來做滑動的動畫（Animate On Scroll Library）
    
    在網頁上找到 CDN 導入方式，將 script 放進 html 中
    
    💡 當使用第三方函式庫時，記得要先把 script 的網址放在最前面才會順利使用其中的東西
    
    ```jsx
    <!-- AOS.js -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init();
    </script>
    ```
    
3. 使用 AOS 在 html tag 中
    
    參考官網的使用說明，只需要在想新增動畫的 html tag 中新增 `data-aos="xxxx"`
    就可以新增該動畫在指定區塊中
    
    若要修改像是 delay、duration 等等細節，則是在 script 中呼叫 fn 的時候傳入參數
    
    [GitHub - michalsnik/aos: Animate on scroll library](https://github.com/michalsnik/aos)
    
    ```jsx
    <script>
      AOS.init({
        delay: 200, // values from 0 to 3000, with step 50ms
        duration: 1500, // values from 0 to 3000, with step 50ms
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them);
      })
    </script>
    ```
    
    也可以在個別的 html tag 中指定個別的設定，例如：想讓段落動畫延遲一秒再出現
    
    ```html
    <p class="mt-4 text-lg text-gray-300" data-aos="fade-right" data-aos-delay="1000">
    	///
    </p>
    ```
    

## 學習筆記

### 【 JS 】

- How do you load third-party script efficiently?
    
    小提一下之後可能會遇到？的 performance impact：
    
    開啟 devtool 的 network 會發現，第三方函式庫 js script 會先 load，然後頁面上圖片才會被 load
    這是因為 html 的 parsing 被暫停去下載那個 js 檔案了
    
    通常最好先讓頁面上的圖片先 load 完，再去處理背後使用者看不到的事情會讓體驗比較好，
    所以這邊有介紹兩種解法：ascny 和 defer 
    
    [Loading Third-Party JavaScript | Web Fundamentals | Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript#use_async_or_defer)
    
    但在這次專案中，不適用上述情況，因為這邊使用的函式庫會直接影響 rendering，
    所以如果使用 ascny 或 defer 的話，會出現 error 喔（反正這次使用的函示庫 load 很快）
    
    defer 使用時機建議
    
    1. 放在 HTML head，先同步把 script 下載好，等所有 html 渲染完畢才執行 script 的內容
    2. 針對一些比較不重要的 script，可以等全部 HTML 渲染完才執行的功能
    
    async 使用時機建議
    
    1. 當功能需要早點被執行，不能等 HTML 全部渲染完的時候（例如：GA 分析等）
    2. 這個 script 不是依賴其他 script 來源時（例如：使用第三方函式庫）
    因為 async 不保證執行的順序會依照你想要的狀態
