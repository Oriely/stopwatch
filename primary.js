let _app = document.querySelectorAll('.app')[0];

let _pastTimes = [1,2,3,4,5];
let _pastTimesHTML = '';

let _currentLang = 'en'
let _lang = {
    en: {
        title: 'Stopwatch',
        btn_start: 'Start',
        btn_stop: 'Stop',
        btn_reset: 'Reset',
        text_pasttimes: 'Past times',
    },
    no: {
        title: 'Stoppeklokke',
        btn_start: 'Start',
        btn_stop: 'Stop',
        btn_reset: 'Reset',
    },
    se: {
        title: 'Stoppur',
        btn_start: 'Start',
        btn_stop: 'Stop',
        btn_reset: 'Reset',
    },
    dk: {
        title: 'Stopwatch',
        btn_start: 'Start',
        btn_stop: 'Stop',
        btn_reset: 'Reset',
    }

}

function updateView() {

    for(time of _pastTimes) {
          _pastTimesHTML += pastTime(time);
    }

    _app.innerHTML = `
                        <h1>${_lang[_currentLang].title}</h1>
                        <div class="controls">
                            <button onclick="startTimer()">${_lang[_currentLang].btn_start}</button>
                            <button onclick="stopTimer()">${_lang[_currentLang].btn_stop}</button>
                            <button onclick="resetTimer()">${_lang[_currentLang].btn_reset}</button>
                        </div>

                        <div class="past-times">
                        <h5>${_lang[_currentLang].text_pasttimes}:</h5>
                            ${_pastTimesHTML}
                        </div>
    `;
}

function pastTime(a){
    return `<span class="time"><i class="far fa-clock"></i><p>${a}</p></span>`;
}

updateView();


function startTimer() {

}

function stopTimer() {
    
}

function resetTimer() {

}