# JS projects 02 Infinity Scroll

## 目標

用 Unsplash API 製作可無限下滑的圖庫（RWD）

## 資源

客製化 loading 動畫：
https://loading.io/

Google Fonts 挑字體：
[Google Fonts](https://fonts.google.com/?preview.text=Infinity%20Scroll&preview.text_type=custom)

Unsplash API Doc：
[Unsplash API Documentation | Free HD Photo API | Unsplash](https://unsplash.com/documentation)

HTML DOM events 列表：
[HTML DOM Event Object](https://www.w3schools.com/jsref/dom_obj_event.asp)

## 執行步驟

1. 先放上 Title 和 loading SVG 隱藏備用（html tag 直接寫 hidden）
2. 製作 Image Container 放幾張圖片進去先排版用，
先使用 inspect 看看手機模式下怎麼樣的大小會最適合
3. 串接 Unsplash API，先取得 photos 的資料

    ```jsx
    // Unsplash API
    const count = 10;
    const apiKey = '這邊放自己的授權碼';
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    // Get photos from Unsplash API
    async function getPhotos() {
      try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        console.log(data);
      } catch (error) {
        // Catch error here
      }
    }

    //On load
    getPhotos();
    ```

4. 再利用 return 的 photos 資料來 display 在畫面上（add to DOM）

    會使用到「圖片在 Unsplash 的網址」「圖片描述」「圖片本身 Url」

    ```jsx
    const imageContainer = document.getElementById('img-container');
    const loader = document.getElementById('loader');

    let photosArray = [];

    // Create Element for links & photos, add to DOM
    function displayPhotos() {
      // Run fn for each object in photosArray
      photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash website
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank'); // <--開新分頁
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // 把 <img> 放進 <a>，再把兩個放進 imageContainer 
        item.appendChild(img);
        imageContainer.appendChild(item);
      });
    }
    ```

5. 發現一直重複使用 `.setAttribute()`，把這個拉出來做一個 fn 讓程式碼更為簡潔

    [快速複習 for..in loop](https://medium.com/web-design-zone/%E8%BF%B4%E5%9C%88%E6%8E%A7%E5%88%B6%E6%96%B9%E6%B3%95%E4%B9%8B-for-for-in-foreach-4ee9fe83ef7a)

    ```jsx
    // 做 .setAttribute() 的 fn
    function setAttributes(element, attributes) {
      // 因為等等 att 會是物件形式傳入，會使用到 att 和 att 的 value，這邊使用 for..in loop
      for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }

    // Create Element for links & photos, add to DOM
    function displayPhotos() {
	    // Run fn for each object in photosArray
	    photosArray.forEach((photo) => {
		    // Create <a> to link to Unsplash website
		    const item = document.createElement('a');
		    setAttributes(item, {
			    href: photo.links.html,
			    target: '_blank'
		    })
		    // Create <img> for photo
		    const img = document.createElement('img');
		    setAttributes(img, {
			    src: photo.urls.regular,
			    alt: photo.alt_description,
			    title: photo.alt_description
		    })
		    // 把 <img> 放進 <a>，再把兩個放進 imageContainer 
		    item.appendChild(img);
		    imageContainer.appendChild(item);
	    });
    }
    ```

6. 做可以無限下滑，持續載入圖片的功能

    其實就是當 scroll 接近最後一張照片時再讓它觸發 `getPhoto()` 的 fn
    詳細的定義會是：

    > 當視窗高度 + 使用者滑動後跟最開始頂端的距離 ≥ 所有 img 的總高度 - 1000px（不讓它到最底點才觸發）

    - `window.innerHeight`：視窗高度
    - `window.scrollY`：滑動後跟最開始頂端的 y 軸距離
    - `document.body.offsetHeight`：所有 img 的總高度

    但上面的條件做成 scroll 的 event listener 後會觸發非常多次
    （超過那個距離後每次滑動都會觸發），所以必須再把條件設定的更加精確：

    當滑動接近底部，並且畫面 loaded 完此次的所有 img 後，再觸發 `getPhoto()`：

    ```jsx
    let ready = false;
    let imagesLoaded = 0;
    let totalImages = 0;

    // 檢查是否每張圖片都 loading 完的 fn
    function imageLoaded() {
    	imagesLoaded ++;
    	if (imagesLoaded === totalImages) {
    		ready = true;
    		loader.hidden = true;
    	}
    }

    function displayPhotos() {
    	imagesLoaded = 0;
    	totalImages = photosArray.length;
    	...
    }

    // 檢查是不是已滑動接近 bottom，觸發 getPhotos() 事件
    window.addEventListener('scroll', () => {
    	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    		ready = false;
    		getPhotos();
    	}
    });
    ```

7. [ extra ] 加上回到頂端按鈕

    使用 bootstrap：

    [Bootstrap Scroll Back To Top button - examples & tutorial](https://mdbootstrap.com/docs/standard/extended/back-to-top/)

## 學習筆記

### 【 CSS 】

- 有一種白比較不刺眼：whitesmoke
- `letter-spacing`：字跟字之間的空間
- loader 畫面置中：

    ```css
    .loader img {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* 因為圖片是以左上角為原點，所以 x 軸和 y 軸 都要回來半個自己 */
    ```

- 用 media query 做 RWD！

    ```css
    /* Media Query: Large Smartphone  */
    @media screen and (max-width: 600px) {
      h1 {
        font-size: 20px;
      }

      .img-container {
        margin: 10px;
      }
    }
    ```

### 【 JS 】

- 在 dev tool 中的 network 可以檢視 fetch 的成效
