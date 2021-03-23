import { Howl } from 'howler';
export const timerCircular = document.querySelector('#timer');

const sound = new Howl({
    src: ['sound/radar.mp3']
});

//circle start
let progressBar = document.querySelector('.e-c-progress');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
    let offset = - length - length * value / (timePercent);
    progressBar.style.strokeDashoffset = offset;
    pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
}

//circle ends
const displayOutput = document.querySelector('.display-remain-time');
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');

let intervalTimer;
let timeLeft;
let wholeTime = 0.5 * 60; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;

update(wholeTime, wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds) {
    if ((wholeTime + seconds) > 0) {
        wholeTime += seconds;
        update(wholeTime, wholeTime);
    }
}

for (let i = 0; i < setterBtns.length; i++) {
    setterBtns[i].addEventListener('click', function (event) {
        event.preventDefault();
        let param = this.dataset.setter;
        switch (param) {
            case 'minutes-plus':
                changeWholeTime(1 * 60);
                break;
            case 'minutes-minus':
                changeWholeTime(-1 * 60);
                break;
            case 'seconds-plus':
                changeWholeTime(1);
                break;
            case 'seconds-minus':
                changeWholeTime(-1);
                break;
        }
        displayTimeLeft(wholeTime);
    });
}

//counts time, takes seconds
function timer(seconds) {
    let remainTime = Date.now() + (seconds * 1000);
    displayTimeLeft(seconds);

    intervalTimer = setInterval(function () {
        timeLeft = Math.round((remainTime - Date.now()) / 1000);
        if (timeLeft < 0) {
            sound.play();
            clearInterval(intervalTimer);
            isStarted = false;
            setterBtns.forEach(function (btn) {
                btn.disabled = false;
                btn.style.opacity = 1;
            });
            displayTimeLeft(wholeTime);
            pauseBtn.classList.remove('pause');
            pauseBtn.classList.add('play');
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function pauseTimer(event) {
    event.preventDefault();
    if (isStarted === false) {
        timer(wholeTime);
        isStarted = true;
        this.classList.remove('play');
        this.classList.add('pause');

        setterBtns.forEach(function (btn) {
            btn.disabled = true;
            btn.style.opacity = 0.5;
        });

    } else if (isPaused) {
        this.classList.remove('play');
        this.classList.add('pause');
        timer(timeLeft);
        isPaused = isPaused ? false : true;
    } else {
        this.classList.remove('pause');
        this.classList.add('play');
        clearInterval(intervalTimer);
        isPaused = isPaused ? false : true;
    }
}

//displays time on the input
function displayTimeLeft(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.textContent = displayString;
    update(timeLeft, wholeTime);
}
pauseBtn.addEventListener('click', pauseTimer);