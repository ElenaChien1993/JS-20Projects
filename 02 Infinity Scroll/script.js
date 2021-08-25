const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
let bttButton = document.getElementById('btn-back-to-top');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 10;
const apiKey = 'KThhkohsW9em76Nkl4yNxw712VajDHkM2CouS9W_s3Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// 當滑動超過 20px 才顯示回到頂端按鈕
function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    bttButton.style.display = 'block';
  } else {
    bttButton.style.display = 'none';
  }
}

window.onscroll = function () {
  scrollFunction();
};

// 點擊按鈕回到頂端
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

bttButton.addEventListener('click', backToTop);

// 檢查是否每張圖片都 loading 完的 fn
function imageLoaded() {
	imagesLoaded ++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// 做 .setAttribute() 的 fn
function setAttributes(element, attributes) {
	// 因為等等 att 會是物件形式傳入，會使用到 att 和 att 的 value，這邊使用 for..in loop
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Element for links & photos, add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
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
		// 檢查每張圖片是否都 loading 完
		img.addEventListener('load', imageLoaded);
		// 把 <img> 放進 <a>，再把兩個放進 imageContainer 
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
		const resp = await fetch(apiUrl);
		photosArray = await resp.json();
		displayPhotos();
  } catch (error) {
		// Catch error here
  }
}

// 檢查是不是已滑動接近 bottom，觸發 getPhotos() 事件
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

//On load
getPhotos();