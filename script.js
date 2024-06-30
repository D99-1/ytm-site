const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const coverArt = document.querySelector('.cover-art');
const musicPlayer = document.querySelector('.music-player');
const songTitle = document.querySelector('.title');
const artistName = document.querySelector('.artist');




// fetch video data from API and update UI with song details and cover art
fetch('http://localhost:13090/track')
	.then(response => response.json())
	.then(data => {
		songTitle.textContent = data.video.title;
		artistName.textContent = data.author;
		coverArt.style.backgroundImage = `url(${data.thumbnail.thumbnails[0].url})`;
	})
	.catch(error => console.log(error));


// get video information from API and update UI
fetch('http://localhost:13090/track')
	.then(response => response.json())
	.then(data => {
		songTitle.textContent = data.video.title;
		artistName.textContent = data.author;
		coverArt.style.backgroundImage = `url(${data.thumbnail.thumbnails[0].url})`;
	});

