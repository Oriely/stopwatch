let _app = document.querySelectorAll('.app')[0];

let _pastTimesCookie = eatCookie('times1');
let _pastTimesParse = (_pastTimesCookie != '' ? JSON.parse(_pastTimesCookie) : '');
let _pastTimes = (_pastTimesParse === '' ? [] : _pastTimesParse);
let _pastTimesHTML = '';


let _currentLang = 'en'

let _timerRunning = false;
let _timerStartTime;
let _timerElapsedTime = 0;
let _timerInterval;


function updateView() {
    _pastTimesHTML = '';
    if(_pastTimes.length !=  0) {
        for(time of _pastTimes) {
            _pastTimesHTML += pastTime(time);
        }
    } else {_pastTimesHTML = 'Past times will be stored here.'}

    _app.innerHTML = `
                        <h1>Stopwatch</h1>
                        <div id="time-display" class="time-display">${timeToString(_timerElapsedTime)}</div>
                        <div class="controls">
                            ${_timerRunning === false ? '<button onclick="startTimer()"><i class="fas fa-play-circle"></i></button>' : '<button onclick="pauseTimer()"><i class="fas fa-pause-circle"></i></button>'}
                            <button onclick="stopTimer()"><i class="fas fa-stop-circle"></i></button>
                        </div>

                        <div class="past-times">
                            ${_pastTimesHTML}
                        </div>
    `;
}

function pastTime(a){
    return `<span class="time"><i class="far fa-clock"></i><p>${a}</p></span>`;
}

function printtime(a) {
    document.getElementById('time-display').innerHTML = a;
}

updateView();





function bakeCookie(n, v, d) {
    if(d){
        let date = new Date();
        date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toGMTString();
    } else { expires = ''; }

    document.cookie = n + "=" + v + expires + "; path=/";
}

function eatCookie(a) {
    if(document.cookie.length > 0) {
        b = document.cookie.indexOf(a + '=');
        if(b != -1) {
            b = b + a.length + 1;
            c = document.cookie.indexOf(';', b)
            if(c == -1) {
                c = document.cookie.length;
            }
            return unescape(document.cookie.substring(b, c));
        }
    }
    return '';
}

function startTimer() {
    _timerStartTime = Date.now();
    _timerRunning = true;
    _timerInterval = setInterval( function printTimer() {
        _timerElapsedTime = Date.now() - _timerStartTime;
        printtime(timeToString(_timerElapsedTime));
    }, 10);
    updateView();
}

function pauseTimer() {
    clearInterval(_timerInterval);
    _timerRunning = false;
    updateView();
}

function stopTimer() {
    if(document.getElementById('time-display').innerHTML != '00:00:00'){
        clearInterval(_timerInterval);
        _pastTimes.push(timeToString(_timerElapsedTime)); 
        _timerRunning = false;
        _timerElapsedTime = 0;
        bakeCookie('times1', JSON.stringify(_pastTimes), 1);
        updateView();
    } else return;
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;  let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
  }