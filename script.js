// グローバル変数
let redCount = 0;
let blueCount = 0;
let redYellowCards = 0;
let blueYellowCards = 0;
let timerInterval, twoMinuteTimerInterval;
let timeRemaining, twoMinuteTimeRemaining = 120;

/**
 * スコア、イエローカード操作
 */
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

/**
 * メインタイマー操作
 */
function startTimer() {
    const timerInput = document.getElementById('timer-input').value;
    const [minutes, seconds] = timerInput.split(':').map(Number);
    timeRemaining = minutes * 60 + seconds;

    if (!timerInterval && timeRemaining > 0) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    stopBorderBlinking();
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer-input').value =
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        if (timeRemaining === 30) {
            startBorderBlinking();
        }
    } else {
        stopTimer();
    }
}

function startBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.add('border-blinking');
}

function stopBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.remove('border-blinking');
}

/**
 * 2分間タイマー操作
 */
function startTwoMinuteTimer() {
    if (!twoMinuteTimerInterval && twoMinuteTimeRemaining > 0) {
        twoMinuteTimerInterval = setInterval(updateTwoMinuteTimer, 1000);
    }
}

function stopTwoMinuteTimer() {
    clearInterval(twoMinuteTimerInterval);
    twoMinuteTimerInterval = null;
    stopTwoMinuteBorderBlinking();
}

function updateTwoMinuteTimer() {
    if (twoMinuteTimeRemaining > 0) {
        twoMinuteTimeRemaining--;
        const minutes = Math.floor(twoMinuteTimeRemaining / 60);
        const seconds = twoMinuteTimeRemaining % 60;
        document.getElementById('two-minute-timer').textContent =
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        if (twoMinuteTimeRemaining === 30) {
            startTwoMinuteBorderBlinking();
        }
    } else {
        stopTwoMinuteTimer();
    }
}

function startTwoMinuteBorderBlinking() {
    const timerElement = document.getElementById('two-minute-timer');
    timerElement.classList.add('border-blinking');
}

function stopTwoMinuteBorderBlinking() {
    const timerElement = document.getElementById('two-minute-timer');
    timerElement.classList.remove('border-blinking');
}

/**
 * リセット機能
 */
function resetApp() {
    redCount = 0;
    blueCount = 0;
    redYellowCards = 0;
    blueYellowCards = 0;
    timeRemaining = 0;
    twoMinuteTimeRemaining = 120;

    document.getElementById('red-counter').textContent = redCount;
    document.getElementById('blue-counter').textContent = blueCount;
    document.getElementById('red-player').value = '';
    document.getElementById('blue-player').value = '';
    document.getElementById('timer-input').value = '00:30';
    document.getElementById('two-minute-timer').textContent = '02:00';

    updateYellowCardDisplay('red');
    updateYellowCardDisplay('blue');

    stopTimer();
    stopTwoMinuteTimer();
}
