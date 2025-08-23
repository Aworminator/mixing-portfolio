let songs = [
  {
    albumArt:
      "https://facedownrecords.com/wp-content/uploads/2023/09/FCD195-3000.jpg",
    artist: "American Arson",
    song: "The Heat |: Run",
    name: "Run - American Arson.wav",
    artistLink:
      "https://open.spotify.com/artist/7cl9j0U54gBxbcGO7zXXs2?si=Y8YFn_WdRy2WaXkD7kTK9A",
    songLink:
      "https://open.spotify.com/track/4LscxvJWC9iHOBJmns7oVh?si=cf5a5d8cefe242de",
  },
  {
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b27369a57afe6b668fe34d4e9914",
    artist: "Philip Bowen",
    song: "Better Way",
    name: "Fireflies - Camino Kid.wav",
    artistLink:
      "https://open.spotify.com/artist/3Mm4P393IFVqIQDmL691G9?si=A1uk_0hjSPOLajqtXdFjjQ",
    songLink:
      "https://open.spotify.com/track/2iAruT7aaz0of7HgP6AXJ5?si=48f3d1c8590f4527",
  },
  {
    albumArt:
      "https://i.scdn.co/image/ab67616d00001e02c0d49229ee1521c01ba40c3e",
    artist: "Chery Blossom Club",
    song: "Astray",
    name: "All Is Well - Jared Withrow.wav",
    artistLink:
      "https://open.spotify.com/artist/7LDoytlH8MNe9zu2VIu5uB?si=W9AvoN22T46V6yPUWuvBdA",
    songLink:
      "https://open.spotify.com/track/77lonoP2aKYjy99jGNJf3r?si=8c8acfcdc6ff47a3",
  },
  {
    albumArt:
      "https://i.scdn.co/image/ab67616d00001e02066f1a88ce4c1492f016dc33",
    artist: "Jared Withrow",
    song: "All Is Well",
    name: "All Is Well - Jared Withrow.wav",
    artistLink:
      "https://open.spotify.com/artist/5HWM1z6NnHcvOnUeLcCAKn?si=47omOcpARfSCEVpzm1sS9w",
    songLink:
      "https://open.spotify.com/track/60aH38LMrZZam1xIewtDBR?si=670e49b3f44149bb",
  },
  {
    albumArt:
      "./images/albums",
    artist: "Camino Kid",
    song: "Fireflies(Cover)",
    name: "Fireflies - Camino Kid.wav",
    artistLink:
      "https://open.spotify.com/artist/5Dm6l5ypjnBRX4r3o2vzkZ?si=yQY43V2TQ06EWhuZaBigIg",
    songLink:
      "https://open.spotify.com/track/2ckxbqWp45dph2w9lZHEuz?si=ac1ee9025897455e",
  },
  {
    albumArt:
      "https://www.shazam.com/mkimage/image/thumb/Music122/v4/09/7e/41/097e41aa-4970-2849-a3a6-7e0279f900af/artwork.jpg/375x375bb.webp",
    artist: "The Scally Brothers",
    song: "Lion and the Lamb",
    name: "Fireflies - Camino Kid.wav",
    artistLink:
      "https://open.spotify.com/artist/1zxZJBr1JIL8X4zDvpkFos?si=ZAqeO_ZFRFWOyXo424s7Ng",
    songLink:
      "https://open.spotify.com/track/74FoVUSj3mCoDl6XZTojDW?si=b75b83345caf4865",
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
      <div class="band-info">
        <a href="${song.songLink}" class="link"><h1 class="band-name">${song.song}</h1></a>
        <a href="${song.artistLink}" class="link"><h3 class="album-title">${song.artist}</h3></a>
      </div>
      <div class="player">
        <i class="fa-solid fa-play" id="playBtn-${song.name}" onclick="toggleAudio('${song.name}')"></i>
        <audio preload="metadata" id="audio-${song.name}" src="./audio/${song.name}"></audio>
        <div class="progress-bar" id="progress-bar-${song.name}">
          <div class="progress" id="progress-${song.name}"></div>
        </div>
      </div>
    </div>
  `;
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
