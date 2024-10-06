let redCount = 0;
let blueCount = 0;
let redYellowCards = 0;
let blueYellowCards = 0;
let timer; // 従来のタイマー
let isRunning = false;
let totalSeconds = 0;

// カウンターを増加させる関数
function increment(player) {
    if (player === 'red') {
        redCount++;
        document.getElementById('red-counter').textContent = redCount;
    } else if (player === 'blue') {
        blueCount++;
        document.getElementById('blue-counter').textContent = blueCount;
    }
}

// カウンターを減少させる関数
function decrement(player) {
    if (player === 'red' && redCount > 0) {
        redCount--;
        document.getElementById('red-counter').textContent = redCount;
    } else if (player === 'blue' && blueCount > 0) {
        blueCount--;
        document.getElementById('blue-counter').textContent = blueCount;
    }
}

// イエローカードを追加する関数
function addYellowCard(player) {
    if (player === 'red') {
        redYellowCards++;
        updateYellowCardDisplay('red');
    } else if (player === 'blue') {
        blueYellowCards++;
        updateYellowCardDisplay('blue');
    }
}

// イエローカードを削除する関数
function removeYellowCard(player) {
    if (player === 'red' && redYellowCards > 0) {
        redYellowCards--;
        updateYellowCardDisplay('red');
    } else if (player === 'blue' && blueYellowCards > 0) {
        blueYellowCards--;
        updateYellowCardDisplay('blue');
    }
}

// イエローカードの表示を更新する関数
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

// タイマーを開始する関数
let timerInterval;
let timeRemaining;

function startTimer() {
    let timeInput = document.getElementById('timer-input').value;
    let timeParts = timeInput.split(':');
    timeRemaining = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);

    if (!isRunning && timeRemaining > 0) {
        isRunning = true;
        timerInterval = setInterval(function() {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                stopBorderBlinking(); // 点滅を停止
                isRunning = false; // タイマーの状態をリセット
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
}

// タイマーを停止する関数
function stopTimer() {
    clearInterval(timerInterval);
    stopBorderBlinking(); // 点滅を停止
    isRunning = false; // タイマーの状態をリセット
}

// タイマー枠の点滅を開始する関数
function startBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.add('border-blinking');
}

// タイマー枠の点滅を停止する関数
function stopBorderBlinking() {
    const timerElement = document.getElementById('timer-input');
    timerElement.classList.remove('border-blinking');
}
