const swEls = {
  display: document.getElementById('sw-display'),
  label: document.getElementById('sw-label'),
  laps: document.getElementById('lap-list'),
  timerDisplay: document.getElementById('timer-display'),
  timerLabel: document.getElementById('timer-label'),
  timerStatus: document.getElementById('timer-status'),
  timerMin: document.getElementById('timer-min'),
  timerSec: document.getElementById('timer-sec'),
  pomodoroDisplay: document.getElementById('pomodoro-display'),
  pomodoroLabel: document.getElementById('pomodoro-label'),
  pomodoroStatus: document.getElementById('pomodoro-status'),
  chessA: document.getElementById('chess-a'),
  chessB: document.getElementById('chess-b'),
  chessABox: document.getElementById('chess-a-box'),
  chessBBox: document.getElementById('chess-b-box'),
  chessATime: document.getElementById('chess-a-time'),
  chessBTime: document.getElementById('chess-b-time'),
  chessStatus: document.getElementById('chess-status'),
  toast: document.getElementById('timer-toast')
};

function showToast(message) {
  swEls.toast.textContent = message;
  swEls.toast.classList.add('show');
  setTimeout(() => swEls.toast.classList.remove('show'), 1600);
}

function pad(n) { return String(n).padStart(2, '0'); }

function formatMs(ms) {
  ms = Math.max(0, ms);
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${pad(min)}:${pad(sec)}.${pad(cs)}`;
}

function formatClock(ms) {
  ms = Math.max(0, ms);
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${pad(min)}:${pad(sec)}`;
}

// Stopwatch
let swRunning = false;
let swStart = 0;
let swElapsed = 0;
let swTimer = null;
let swLapCount = 0;

function renderStopwatch() {
  const elapsed = swElapsed + (swRunning ? performance.now() - swStart : 0);
  swEls.display.textContent = formatMs(elapsed);
}

function toggleStopwatch() {
  if (!swRunning) {
    swRunning = true;
    swStart = performance.now();
    swEls.label.textContent = 'Running';
    swTimer = setInterval(renderStopwatch, 20);
    document.getElementById('sw-toggle-btn').textContent = 'Pause';
  } else {
    swElapsed += performance.now() - swStart;
    swRunning = false;
    clearInterval(swTimer);
    swEls.label.textContent = 'Paused';
    document.getElementById('sw-toggle-btn').textContent = 'Start';
  }
  renderStopwatch();
}

function lapStopwatch() {
  const elapsed = swElapsed + (swRunning ? performance.now() - swStart : 0);
  swLapCount += 1;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${swLapCount}</span><b>${formatMs(elapsed)}</b>`;
  swEls.laps.prepend(li);
  showToast('Lap recorded');
}

function resetStopwatch() {
  clearInterval(swTimer);
  swRunning = false;
  swStart = 0;
  swElapsed = 0;
  swLapCount = 0;
  swEls.display.textContent = '00:00.00';
  swEls.label.textContent = 'Ready';
  swEls.laps.innerHTML = '';
  document.getElementById('sw-toggle-btn').textContent = 'Start';
}

// Countdown timer
let timerRunning = false;
let timerMode = 'countdown';
let timerRemaining = 25 * 60 * 1000;
let timerTarget = 0;
let timerInterval = null;
let timerPhase = 'idle';

function renderTimer() {
  swEls.timerDisplay.textContent = formatClock(timerRemaining);
}

function stopTimerInterval() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
}

function startCountdown(ms, label) {
  timerMode = 'countdown';
  timerPhase = 'countdown';
  timerRemaining = Math.max(0, ms);
  timerTarget = performance.now() + timerRemaining;
  swEls.timerLabel.textContent = label;
  swEls.timerStatus.textContent = 'Timer running';
  stopTimerInterval();
  timerRunning = true;
  timerInterval = setInterval(() => {
    timerRemaining = Math.max(0, timerTarget - performance.now());
    renderTimer();
    if (timerRemaining <= 0) {
      stopTimerInterval();
      swEls.timerStatus.textContent = 'Done';
      showToast('Timer finished');
    }
  }, 100);
  renderTimer();
}

function startCustomTimer() {
  const min = Math.max(0, parseInt(swEls.timerMin.value || '0', 10));
  const sec = Math.max(0, parseInt(swEls.timerSec.value || '0', 10));
  const ms = (min * 60 + Math.min(sec, 59)) * 1000;
  if (ms <= 0) {
    showToast('Set a time first');
    return;
  }
  startCountdown(ms, 'Custom countdown');
}

function startPreset(seconds, label) {
  if (seconds > 0) {
    startCountdown(seconds * 1000, label);
    return;
  }
  swEls.timerLabel.textContent = label;
  swEls.timerStatus.textContent = 'Use the custom inputs above';
  showToast('Countdown preset selected');
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRemaining = Math.max(0, timerTarget - performance.now());
  stopTimerInterval();
  swEls.timerStatus.textContent = 'Paused';
}

function resetTimer() {
  stopTimerInterval();
  timerRemaining = 25 * 60 * 1000;
  swEls.timerLabel.textContent = 'Custom countdown';
  swEls.timerStatus.textContent = 'Set a duration and press start.';
  renderTimer();
}

// Pomodoro timer
let pomoPhase = 'work';
let pomoRemaining = 25 * 60 * 1000;
let pomoTarget = 0;
let pomoInterval = null;
let pomoRunning = false;

function renderPomodoro() {
  swEls.pomodoroDisplay.textContent = formatClock(pomoRemaining);
  swEls.pomodoroLabel.textContent = pomoPhase === 'work' ? 'Work phase' : 'Break phase';
}

function clearPomodoro() {
  clearInterval(pomoInterval);
  pomoInterval = null;
  pomoRunning = false;
}

function startPomodoro() {
  clearPomodoro();
  pomoPhase = 'work';
  pomoRemaining = 25 * 60 * 1000;
  pomoTarget = performance.now() + pomoRemaining;
  swEls.pomodoroStatus.textContent = 'Focus for 25 minutes';
  pomoRunning = true;
  pomoInterval = setInterval(() => {
    pomoRemaining = Math.max(0, pomoTarget - performance.now());
    renderPomodoro();
    if (pomoRemaining <= 0) {
      if (pomoPhase === 'work') {
        pomoPhase = 'break';
        pomoRemaining = 5 * 60 * 1000;
        pomoTarget = performance.now() + pomoRemaining;
        swEls.pomodoroStatus.textContent = 'Break for 5 minutes';
        showToast('Break time');
      } else {
        clearPomodoro();
        swEls.pomodoroStatus.textContent = 'Pomodoro complete';
        showToast('Pomodoro complete');
      }
    }
  }, 100);
  renderPomodoro();
}

function pausePomodoro() {
  if (!pomoRunning) return;
  pomoRemaining = Math.max(0, pomoTarget - performance.now());
  clearPomodoro();
  swEls.pomodoroStatus.textContent = 'Paused';
}

function resetPomodoro() {
  clearPomodoro();
  pomoPhase = 'work';
  pomoRemaining = 25 * 60 * 1000;
  swEls.pomodoroStatus.textContent = '25 / 5 cycle';
  renderPomodoro();
}

// Chess clock
let chessRunning = false;
let chessActive = 'a';
let chessATime = 5 * 60 * 1000;
let chessBTime = 5 * 60 * 1000;
let chessInterval = null;

function renderChess() {
  swEls.chessATime.textContent = formatClock(chessATime);
  swEls.chessBTime.textContent = formatClock(chessBTime);
  swEls.chessABox.classList.toggle('active', chessActive === 'a' && chessRunning);
  swEls.chessBBox.classList.toggle('active', chessActive === 'b' && chessRunning);
}

function clearChess() {
  clearInterval(chessInterval);
  chessInterval = null;
  chessRunning = false;
}

function startChessClock() {
  clearChess();
  chessATime = Math.max(1, parseInt(swEls.chessA.value || '5', 10)) * 60 * 1000;
  chessBTime = Math.max(1, parseInt(swEls.chessB.value || '5', 10)) * 60 * 1000;
  chessActive = 'a';
  chessRunning = true;
  swEls.chessStatus.textContent = 'Player A is running';
  chessInterval = setInterval(() => {
    if (!chessRunning) return;
    if (chessActive === 'a') {
      chessATime = Math.max(0, chessATime - 100);
      if (chessATime <= 0) {
        clearChess();
        swEls.chessStatus.textContent = 'Player A time expired';
        showToast('Player A time expired');
      }
    } else {
      chessBTime = Math.max(0, chessBTime - 100);
      if (chessBTime <= 0) {
        clearChess();
        swEls.chessStatus.textContent = 'Player B time expired';
        showToast('Player B time expired');
      }
    }
    renderChess();
  }, 100);
  renderChess();
}

function swapChessTurn() {
  if (!chessRunning) {
    chessRunning = true;
    if (!chessInterval) startChessClock();
    return;
  }
  chessActive = chessActive === 'a' ? 'b' : 'a';
  swEls.chessStatus.textContent = chessActive === 'a' ? 'Player A is running' : 'Player B is running';
  renderChess();
}

function resetChessClock() {
  clearChess();
  chessATime = Math.max(1, parseInt(swEls.chessA.value || '5', 10)) * 60 * 1000;
  chessBTime = Math.max(1, parseInt(swEls.chessB.value || '5', 10)) * 60 * 1000;
  chessActive = 'a';
  swEls.chessStatus.textContent = 'Tap Start to begin the first turn.';
  renderChess();
}

window.toggleStopwatch = toggleStopwatch;
window.lapStopwatch = lapStopwatch;
window.resetStopwatch = resetStopwatch;
window.startCustomTimer = startCustomTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.startPreset = startPreset;
window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetPomodoro = resetPomodoro;
window.startChessClock = startChessClock;
window.swapChessTurn = swapChessTurn;
window.resetChessClock = resetChessClock;

renderStopwatch();
renderTimer();
renderPomodoro();
renderChess();
