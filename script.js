let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        running = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        resetBtn.disabled = true;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let milliseconds = Math.floor((difference % 1000) / 100);
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    timeDisplay.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function recordLap() {
    if (running) {
        lapNumber++;
        const lapTime = timeDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    timeDisplay.textContent = '00:00:00.0';
    startTime = null;
    lapNumber = 0;
    lapsList.innerHTML = '';
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);

stopBtn.disabled = true;
lapBtn.disabled = true;
resetBtn.disabled = true;
