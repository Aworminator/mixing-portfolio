let songs = [
  {
    albumArt:
      "https://facedownrecords.com/wp-content/uploads/2023/09/FCD195-3000.jpg",
    artist: "American Arson",
    album: "Tide and Timber, Sand and Cider",
    name: "perry-sound.mp3",
  },
  {
    albumArt:
      "https://i.scdn.co/image/ab67616d00001e02066f1a88ce4c1492f016dc33",
    artist: "Jared Withrow",
    album: "All Is Well (Single)",
    audioTitle: "perry-sound.mp3",
  },
  {
    albumArt:
      "https://facedownrecords.com/wp-content/uploads/2023/09/FCD195-3000.jpg",
    artist: "America Arson",
    album: "Tide and Timber, Sand and Cider",
    audioTitle: "perry-sound.mp3",
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
            <i class="fa-solid fa-play" id="playBtn-${song.name}" onclick="toggleAudio('${song.name}')">
            <audio preload="metadata" id="audio-${song.name}" src="./audio/${song.audioTitle}"></audio></i>
            <div class="progress-bar" id="progress-bar-${song.name}">
                <div class="progress" id="progress-${song.name}"></div>
            </div> 
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
}
