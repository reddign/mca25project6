const board = document.getElementById('game-board');
const ROWS = 9;
const COLS = 9;

let currentSkin = 'green'; // default skin
let cells = [];
let playerPos = { row: ROWS - 1, col: Math.floor(COLS / 2) };
let gameInterval;
const lanes = [1, 2, 3, 5, 6, 7]; // rows with cars (road lanes)
let cars = [];

const levelSettings = {
  easy: {
    speedRange: [700, 900],
    carDensity: 4 // spacing between cars (larger = fewer cars)
  },
  medium: {
    speedRange: [400, 600],
    carDensity: 3
  },
  hard: {
    speedRange: [250, 400],
    carDensity: 2
  }
};

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (lanes.includes(r)) {
        cell.classList.add('lane');
      }

      board.appendChild(cell);
      cells.push(cell);
    }
  }
}

function getCell(row, col) {
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null;
  return cells[row * COLS + col];
}

function drawPlayer() {
  cells.forEach(cell => cell.classList.remove('player'));
  const cell = getCell(playerPos.row, playerPos.col);
  if (cell) cell.classList.add('player');
}

class Car {
  constructor(row, speed, direction, carDensity) {
    this.row = row;
    this.speed = speed;
    this.direction = direction; // 1 = right, -1 = left
    this.positions = [];
    this.carDensity = carDensity;
    this.intervalId = null;
    this.createCars();
    this.startMoving();
  }

  createCars() {
    this.positions = [];
    // create cars spaced by carDensity
    for (let c = 0; c < COLS; c += this.carDensity) {
      this.positions.push(c);
    }
  }

  move() {
    this.positions = this.positions.map(pos => {
      let newPos = pos + this.direction;
      if (newPos >= COLS) newPos = 0;
      if (newPos < 0) newPos = COLS - 1;
      return newPos;
    });
  }

  draw() {
    // clear old cars
    for (let c = 0; c < COLS; c++) {
      const cell = getCell(this.row, c);
      if (cell) cell.classList.remove('car');
    }
    // draw cars in new positions
    this.positions.forEach(pos => {
      const cell = getCell(this.row, pos);
      if (cell) cell.classList.add('car');
    });
  }

  checkCollision() {
    return this.positions.includes(playerPos.col) && playerPos.row === this.row;
  }

  startMoving() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.move();
      this.draw();

      if (this.checkCollision()) {
        alert('You got hit! Game over.');
        resetGame();
      }
    }, this.speed);
  }

  stopMoving() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}

function startGame(level) {
  createBoard();

  playerPos = { row: ROWS - 1, col: Math.floor(COLS / 2) };
  drawPlayer();

  // Clear existing cars
  cars.forEach(car => car.stopMoving());
  cars = [];

  // Setup lanes with cars according to level settings
  lanes.forEach((row, index) => {
    // Alternate directions for lanes
    const direction = index % 2 === 0 ? 1 : -1;

    // Random speed within range for variety
    const speed = randomInt(levelSettings[level].speedRange[0], levelSettings[level].speedRange[1]);
    const carDensity = levelSettings[level].carDensity;

    const car = new Car(row, speed, direction, carDensity);
    cars.push(car);
  });

  // Global check for winning condition
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    if (playerPos.row === 0) {
      alert('You crossed safely! You win!');
      resetGame();
    }
  }, 100);
}

function resetGame() {
  const select = document.getElementById('level-select');
  const selectedLevel = select.value;
  startGame(selectedLevel);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('keydown', (e) => {
  const key = e.key;
  let newRow = playerPos.row;
  let newCol = playerPos.col;

  if (key === 'ArrowUp') newRow--;
  else if (key === 'ArrowDown') newRow++;
  else if (key === 'ArrowLeft') newCol--;
  else if (key === 'ArrowRight') newCol++;

  // Stay within board limits
  if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
    playerPos = { row: newRow, col: newCol };
    drawPlayer();
  }
});

// Start button
document.getElementById('start-btn').addEventListener('click', () => {
  const select = document.getElementById('level-select');
  const level = select.value;
  startGame(level);
});

function drawPlayer() {
  cells.forEach(cell => cell.classList.remove('player', 'green', 'blue', 'purple', 'orange'));
  const cell = getCell(playerPos.row, playerPos.col);
  if (cell) {
    cell.classList.add('player', currentSkin);
  }
}
document.getElementById('skin-select').addEventListener('change', (e) => {
  currentSkin = e.target.value;
  drawPlayer();
});

// Initialize game with medium difficulty by default
startGame('medium');
