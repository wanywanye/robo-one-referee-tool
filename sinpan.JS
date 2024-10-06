let redCount = 0;
let blueCount = 0;
let redYellowCards = 0;
let blueYellowCards = 0;
let timer;
let isRunning = false;
let totalSeconds = 0;

function increment(player) {
    if (player === 'red') {
        redCount++;
        document.getElementById('red-counter').textContent = redCount;
    } else if (player === 'blue') {
        blueCount++;
        document.getElementById('blue-counter').textContent = blueCount;
    }
}

function decrement(player) {
    if (player === 'red' && redCount > 0) {
        redCount--;
        document.getElementById('red-counter').textContent = redCount;
    } else if (player === 'blue' && blueCount > 0) {
        blueCount--;
        document.getElementById('blue-counter').textContent = blueCount;
    }
}

function addYellowCard(player) {
    if (player === 'red') {
        redYellowCards++;
        updateYellowCardDisplay('red');
    } else if (player === 'blue') {
        blueYellowCards++;
        updateYellowCardDisplay('blue');
    }
}

function removeYellowCard(player) {
    if (player === 'red' && redYellowCards > 0) {
        redYellowCards--;
        updateYellowCardDisplay('red');
    } else if (player === 'blue' && blueYellowCards > 0) {
        blueYellowCards--;
        updateYellowCardDisplay('blue');
    }
}

function updateYellowCardDisplay(player) {
    const yellowCardContainer = document.getElementById(`${player}-yellow-card`);
    yellowCardContainer.innerHTML = '';
    const yellowCards = player === 'red' ? redYellowCards : blueYellowCards;
    for (let i = 0; i < yellowCards; i++) {
        const card = document.createElement('div');
        card.classList.add('yellow-card');
        yellowCardContainer.appendChild(card);
    }
}

function startTimer() {
    const timerInput = document.getElementById('timer-input').value;
    const [minutes, seconds] = timerInput.split(':').map(Number);
    totalSeconds = minutes * 60 + seconds;

    if (!isRunning && totalSeconds > 0) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function updateTimer() {
    if (totalSeconds > 0) {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        document.getElementById('timer-input').value = 
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    } else {
        stopTimer();
    }
}
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
