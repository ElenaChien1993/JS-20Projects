const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownContainer = document.getElementById('countdown');
const countdownTitleEl = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeContainer = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive; // setInterval fn.
let savedCountdown; // localStorage obj.

const second = 1000;
const minute = second * 60;
const hour = minute *60;
const day = hour * 24;

// 限制日曆只能選取「未來」的日期
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// 產生 Countdown / complete 畫面的 UI
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

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  // 檢查 user 有沒有選日期
  if (countdownDate === '') {
    alert('Please select a date!')
  } else {
    // 取得現在時間的 timestamp 值並更新 DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  };
};

// 重置所有 value 並暫停 setInteval，切換回 Input 畫面
function reset() {
  countdownContainer.hidden = true;
  completeContainer.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};

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

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on Load, 檢查有沒有本地儲存資料
restorePreviosCountdown();