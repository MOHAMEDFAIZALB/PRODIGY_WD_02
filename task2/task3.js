let startTime;
let running = false;
let lapCounter = 1;

function startStopwatch() {
  if (!running) {
    startTime = Date.now();
    running = true;
    document.getElementById('startBtn').textContent = 'Pause';
    updateStopwatch();
  } else {
    running = false;
    document.getElementById('startBtn').textContent = 'Resume';
  }
}

function updateStopwatch() {
  if (running) {
    let elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
    setTimeout(updateStopwatch, 10);
  }
}

function updateDisplay(time) {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  document.getElementById('minutes').textContent = padTime(minutes);
  document.getElementById('seconds').textContent = padTime(seconds);
  document.getElementById('milliseconds').textContent = padTime(milliseconds);
}

function padTime(time) {
  return time < 10 ? `0${time}` : time;
}

function recordLap() {
  if (running) {
    const lapTime = Date.now() - startTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${formatLapTime(lapTime)}`;
    document.getElementById('lapList').appendChild(lapItem);
  }
}

function formatLapTime(time) {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
}

function resetStopwatch() {
  running = false;
  startTime = 0;
  lapCounter = 1;
  document.getElementById('startBtn').textContent = 'Start';
  document.getElementById('minutes').textContent = '00';
  document.getElementById('seconds').textContent = '00';
  document.getElementById('milliseconds').textContent = '00';
  document.getElementById('lapList').innerHTML = '';
}
