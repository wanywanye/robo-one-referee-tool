let timerInterval;
let timeRemaining;

function startTimer() {
    let timeInput = document.getElementById('timer-input').value;
    let timeParts = timeInput.split(':');
    timeRemaining = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);

    timerInterval = setInterval(function() {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
        } else {
            timeRemaining--;
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;
            document.getElementById('timer-input').value = 
                (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

            // 残り30秒になったら枠を点滅
            if (timeRemaining === 30) {
                startBorderBlinking();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    stopBorderBlinking();
}

function startBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.add('border-blinking');
}

function stopBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.remove('border-blinking');
}
