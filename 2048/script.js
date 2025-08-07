const gridContainer = document.getElementById('grid-container');
const gameOverOverlay = document.getElementById('game-over');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

const size = 4;
let board = [];
let score = 0;

function init() {
  score = 0;
  updateScore(0);
  board = Array(size).fill().map(() => Array(size).fill(0));
  addRandomTile();
  addRandomTile();
  drawBoard();
  gameOverOverlay.style.display = 'none';
  document.addEventListener('keydown', handleKey);
}

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${score}`;
}

function addRandomTile() {
  let empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  if (empty.length === 0) return;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function drawBoard() {
  gridContainer.innerHTML = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const value = board[r][c];
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (value !== 0) {
        tile.classList.add(`tile-${value}`);
        tile.innerHTML = `<span>${value}</span>`;
      }
      gridContainer.appendChild(tile);
    }
  }
}

function handleKey(e) {
  let rotated = false;
  let flipped = false;
  switch (e.key) {
    case 'ArrowLeft': break;
    case 'ArrowRight':
      board = board.map(row => row.reverse());
      flipped = true;
      break;
    case 'ArrowUp':
      board = rotateLeft(board);
      rotated = true;
      break;
    case 'ArrowDown':
      board = rotateRight(board);
      rotated = true;
      flipped = true;
      break;
    default: return;
  }

  let moved = false;
  let gainedScore = 0;

  let newBoard = board.map(row => {
    let newRow = row.filter(val => val);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        gainedScore += newRow[i];
        newRow[i + 1] = 0;
        moved = true;
      }
    }
    newRow = newRow.filter(val => val);
    while (newRow.length < size) newRow.push(0);
    return newRow;
  });

  if (flipped) newBoard = newBoard.map(row => row.reverse());
  if (rotated) {
    newBoard = rotated ? rotateRight(newBoard) : rotateLeft(newBoard);
    if (flipped) newBoard = newBoard.map(row => row.reverse());
  }

  if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
    board = newBoard;
    updateScore(gainedScore);
    addRandomTile();
    drawBoard();
    if (isGameOver()) showGameOver();
  }
}

function rotateLeft(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
}

function rotateRight(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function isGameOver() {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
      if (c < size - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < size - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
}

function showGameOver() {
  gameOverOverlay.style.display = 'flex';
  document.removeEventListener('keydown', handleKey);
}

restartBtn.addEventListener('click', () => {
  document.removeEventListener('keydown', handleKey);
  init();
});

init();
