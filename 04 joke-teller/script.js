const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

// Disable/Enable Btn
function toggleBtn(){
  button.disabled = !button.disabled;
}

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
    // Text-to-speech
    tellMe(joke);
    // Disable Btn
    toggleBtn();
  } catch (error) {
    console.log('OMG, error here:', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleBtn);