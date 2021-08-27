const video = document.getElementById('video');
const btn = document.getElementById('button');

// 利用 ScreenCapture API 跳出選擇要 display 的視窗，傳給 video 元素後播放
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

async function pictureInPicture() {
  // 讓按鈕失效
  btn.disabled = true;
  // 開啟 Picture in picture 功能
  await video.requestPictureInPicture();
  // 讓按鈕重新生效
  btn.disabled = false;
}

btn.addEventListener('click', pictureInPicture);

// on load
selectMediaStream();