const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const scoreElement = document.getElementById('score');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

// Tetromino shapes and their colors
const tetrominoes = {
  'I': {
    shape: [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0],
    ],
    color: 'cyan'
  },
  'J': {
    shape: [
      [2,0,0],
      [2,2,2],
      [0,0,0],
    ],
    color: 'blue'
  },
  'L': {
    shape: [
      [0,0,3],
      [3,3,3],
      [0,0,0],
    ],
    color: 'orange'
  },
  'O': {
    shape: [
      [4,4],
      [4,4],
    ],
    color: 'yellow'
  },
  'S': {
    shape: [
      [0,5,5],
      [5,5,0],
      [0,0,0],
    ],
    color: 'green'
  },
  'T': {
    shape: [
      [0,6,0],
      [6,6,6],
      [0,0,0],
    ],
    color: 'purple'
  },
  'Z': {
    shape: [
      [7,7,0],
      [0,7,7],
      [0,0,0],
    ],
    color: 'red'
  }
};

// The arena is the playing field
const arena = createMatrix(COLS, ROWS);

// Draw a single block
function drawBlock(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
  context.strokeStyle = '#222';
  context.lineWidth = 0.05;
  context.strokeRect(x, y, 1, 1);
}

// Draw matrix on the canvas
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0) {
        const color = getColor(value);
        drawBlock(x + offset.x, y + offset.y, color);
      }
    });
  });
}

function getColor(value) {
  switch(value) {
    case 1: return tetrominoes.I.color;
    case 2: return tetrominoes.J.color;
    case 3: return tetrominoes.L.color;
    case 4: return tetrominoes.O.color;
    case 5: return tetrominoes.S.color;
    case 6: return tetrominoes.T.color;
    case 7: return tetrominoes.Z.color;
    default: return 'white';
  }
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function collide(arena, player) {
  const m = player.matrix;
  const o = player.pos;
  for(let y = 0; y < m.length; ++y) {
    for(let x = 0; x < m[y].length; ++x) {
      if(m[y][x] !== 0 &&
         (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

// Rotate matrix clockwise or counter-clockwise
function rotate(matrix, dir) {
  for(let y = 0; y < matrix.length; ++y) {
    for(let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }

  if(dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

function playerReset() {
  const pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  if(collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    score = 0;
    updateScore();
  }
}

function createPiece(type) {
  return tetrominoes[type].shape.map(row => row.slice());
}

function playerDrop() {
  player.pos.y++;
  if(collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    sweepLines();
    playerReset();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if(collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while(collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if(offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function sweepLines() {
  let rowCount = 1;
  outer: for(let y = arena.length -1; y >= 0; --y) {
    for(let x = 0; x < arena[y].length; ++x) {
      if(arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    score += rowCount * 10;
    rowCount *= 2;
  }
}

function updateScore() {
  scoreElement.textContent = score;
}

function draw() {
  context.fillStyle = '#111';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x:0, y:0});
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
let score = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if(dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

const player = {
  pos: {x:0, y:0},
  matrix: null,
};

playerReset();
updateScore();
update();

window.addEventListener('keydown', event => {
  if(event.key === 'ArrowLeft') {
    playerMove(-1);
  } else if(event.key === 'ArrowRight') {
    playerMove(1);
  } else if(event.key === 'ArrowDown') {
    playerDrop();
  } else if(event.key === 'ArrowUp') {
    playerRotate(1);
  } else if(event.code === 'Space') {
    // Hard drop
    while(!collide(arena, player)) {
      player.pos.y++;
    }
    player.pos.y--;
    merge(arena, player);
    sweepLines();
    playerReset();
    updateScore();
    dropCounter = 0;
  }
});
