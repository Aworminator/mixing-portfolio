let songs = [
  {
    albumArt:
      "https://facedownrecords.com/wp-content/uploads/2023/09/FCD195-3000.jpg",
    artist: "American Arson",
    album: "Tide and Timber, Sand and Cider",
    name: "Run - American Arson.wav",
  },
  {
    albumArt:
      "https://i.scdn.co/image/ab67616d00001e02066f1a88ce4c1492f016dc33",
    artist: "Jared Withrow",
    album: "All Is Well (Single)",
    name: "All Is Well - Jared Withrow.wav",
  },
  {
    albumArt:
      "https://scontent-det1-1.xx.fbcdn.net/v/t39.30808-6/345889822_3156030747876824_1292364129699861349_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=1xbJgQa3XRMQ7kNvwFhbezR&_nc_oc=Adl8mTRpmG6VjVoI2stq2JYq4EqxN1oKCJukeDPEMPWEBbqRLhkCZ70RMu06JIaw5oxebLSp7TOxS7CLUmqMevLP&_nc_zt=23&_nc_ht=scontent-det1-1.xx&_nc_gid=lnbaONgW2B3h2Z1fuK2SGw&oh=00_AfTT-ZdSeUe6f2MB7ysozMeoF37FI8lu7MQNpcdnegFhyg&oe=688F4E3A",
    artist: "Camino <br> Kid",
    album: "Fireflies <br> (Cover)",
    name: "Fireflies - Camino Kid.wav",
  },
];

let input = document.querySelector("#input");

function updateProgress(e, songName) {
  let { currentTime, duration } = e.srcElement;
  const progressPercentage = (currentTime / duration) * 100;
  document.getElementById(
    `progress-${songName}`
  ).style.width = `${progressPercentage}%`;

  const playBtn = document.getElementById(`playBtn-${songName}`);
  if (currentTime === duration) {
    playBtn.classList.add("fa-play");
    playBtn.classList.remove("fa-pause");
  } else {
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
}

function setProgress(e, songName) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const audio = document.getElementById(`audio-${songName}`);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function playAudio(songName) {
  const audio = document.getElementById(`audio-${songName}`);
  audio.play();
}

function pauseAudio(songName) {
  const audio = document.getElementById(`audio-${songName}`);
  audio.pause();
}

songs.forEach((song) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img class="album-artwork" src="${song.albumArt}" alt="">
    <div class="mp3">
      <div class="card-info">
        <h4>Artist</h4>
        <h4>Album</h4>
      </div>
      <div class="band-info">
        <p class="band-name">${song.artist}</p>
        <p class="album-title">${song.album}</p>
      </div>
      <div class="player">
        <i class="fa-solid fa-play" id="playBtn-${song.name}" onclick="toggleAudio('${song.name}')"></i>
        <audio preload="metadata" id="audio-${song.name}" src="./audio/${song.name}"></audio>
        <div class="progress-bar" id="progress-bar-${song.name}">
          <div class="progress" id="progress-${song.name}"></div>
        </div>
      </div>
    </div>
  </div>`;
  input.appendChild(card);

  const audio = document.getElementById(`audio-${song.name}`);
  const progressBar = document.getElementById(`progress-bar-${song.name}`);

  audio.addEventListener("timeupdate", (e) => updateProgress(e, song.name));
  progressBar.addEventListener("click", (e) => setProgress(e, song.name));
});

function toggleAudio(songName) {
  const audio = document.getElementById(`audio-${songName}`);
  const playBtn = document.getElementById(`playBtn-${songName}`);

  if (audio.paused || audio.ended) {
    playAudio(songName);
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    pauseAudio(songName);
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }

  audio.onpause = () => {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  };
  audio.onplay = () => {
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  };
}
