let progressInterval;

function autoIncrementTime(){
    let time = document.getElementById('progress').innerText;
    let timeArray = time.split(':');
    let minutes = parseInt(timeArray[0]);
    let seconds = parseInt(timeArray[1]);
    seconds++;
    if(seconds >= 60){
        seconds = 0;
        minutes++;
    }

    document.getElementById('progress').innerText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    document.getElementById('progress-bar').style.width = (minutes * 60 + seconds) / (parseInt(document.getElementById('length').innerText.split(':')[0]) * 60 + parseInt(document.getElementById('length').innerText.split(':')[1])) * 100 + '%';

    if(minutes = parseInt(document.getElementById('length').innerText.split(':')[0]) && seconds >= parseInt(document.getElementById('length').innerText.split(':')[1])){
        getData();
    }
}

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
        clearInterval(progressInterval);
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
        if(data.playing){
        progressInterval = setInterval(autoIncrementTime, 1000);
        }
    });
}
getData()
setInterval(getData, 30000);

document.getElementById('play-pause-btn').addEventListener('click', () => {
    fetch('http://192.168.0.162:13091/volume/togglePausePlay')
    .then(() => getDataAfterTimeout(100));
}
);

document.getElementById('prev-btn').addEventListener('click', () => {
    fetch('http://192.168.0.162:13091/prev')
    .then(() => getDataAfterTimeout(500));
}
);

document.getElementById('next-btn').addEventListener('click', () => {
    fetch('http://192.168.0.162:13091/next')
    .then(() => getDataAfterTimeout(500));
}
);

document.getElementById('title').addEventListener('click', () => {
    getData();
});

function getDataAfterTimeout(ms){
    setTimeout(getData, ms);
}