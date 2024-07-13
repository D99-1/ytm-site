function secondsToTime(seconds){
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function getData(){
    console.log('Getting data from server');
    fetch('http://192.168.0.162:13091')
    .then(response => response.json())
    .then(data => {
        console.log("playing: " + data.playing);
        document.getElementById('play-pause-btn').src = data.playing ? './assets/Pause square.png' : './assets/Play alt.png';
        document.getElementById('thumbnail').src = data.image;
        document.getElementById('title').innerText = data.title;
        document.getElementById('artist').innerText = data.artist;
        document.getElementById('progress').innerText = secondsToTime(data.progress)
        document.getElementById('length').innerText = secondsToTime(data.length)
        document.getElementById('progress-bar').style.width = (data.progress / data.length) * 100 + '%';
        document.getElementById('progress-bar').style.backgroundColor = `rgb(${data.accentr}, ${data.accentg}, ${data.accentb})`;
        document.getElementById('thumbnail-background').style.backgroundImage = `url('${data.image}')`;
    });
}
getData()
setInterval(getData, 30000);

document.getElementById('play-pause-btn').addEventListener('click', () => {
    fetch('http://192.168.0.162:13091/volume/togglePausePlay')
    .then(() => getDataAfterTimeout());
}
);

function getDataAfterTimeout(){
    setTimeout(getData, 100);
}


