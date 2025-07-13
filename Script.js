const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const playArea = document.getElementById('play-area');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');

let score = 0;
let appearTimeout, removeTimeout;
let speed = 1000;

startBtn.addEventListener('click', startGame);

function startGame() {
  score = 0;
  speed = 1000;
  scoreEl.textContent = score;
  startBtn.disabled = true;
  gameOverEl.style.display = 'none';
  playNext();
}

function playNext() {
  const zip = document.createElement('div');
  zip.className = 'zip';
  zip.textContent = '';
  const size = 60;
  const x = Math.random() * (playArea.clientWidth - size);
  const y = Math.random() * (playArea.clientHeight - size);
  zip.style.left = x + 'px';
  zip.style.top = y + 'px';
  playArea.appendChild(zip);

  zip.addEventListener('mousedown', () => {
    clearTimeout(removeTimeout);
    score++;
    scoreEl.textContent = score;
    zip.style.transform = 'scale(1.2)';
    setTimeout(() => zip.remove(), 100);
    speed = Math.max(300, speed - 20);
    setTimeout(playNext, 200);
  });

  removeTimeout = setTimeout(() => {
    zip.remove();
    endGame();
  }, speed);
}

function endGame() {
  startBtn.disabled = false;
  finalScoreEl.textContent = score;
  gameOverEl.style.display = 'flex';
}
