const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 200;

let gameRunning = true;

// Dino setup
let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  legState: 0, // For walking animation
  color: '#333',
  velocityY: 0,
  gravity: 1,
  isJumping: false
};

// Obstacle setup
let obstacle = {
  x: canvas.width,
  y: 160,
  width: 20,
  height: 40,
  color: '#228B22',
  speed: 5
};

// Draw the dino with leg animation
function drawDino() {
  ctx.fillStyle = dino.color;

  if (dino.isJumping) {
    // Legs same height when jumping
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  } else {
    // Animate walking legs
    if (dino.legState % 2 === 0) {
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    } else {
      // Fake simple leg offset
      ctx.fillRect(dino.x, dino.y + 1, dino.width, dino.height - 2);
    }
    dino.legState++;
  }
}

// Draw the obstacle
function drawObstacle() {
  ctx.fillStyle = obstacle.color;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Check for collision
function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Handle jumping
function handleJump() {
  if (dino.isJumping) {
    dino.y += dino.velocityY;
    dino.velocityY += dino.gravity;

    if (dino.y >= 150) {
      dino.y = 150;
      dino.velocityY = 0;
      dino.isJumping = false;
    }
  }
}

// Game loop
function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawDino();
  drawObstacle();
  handleJump();

  // Move obstacle
  obstacle.x -= obstacle.speed;
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width; // Reset obstacle
  }

  // Check for collision
  if (checkCollision(dino, obstacle)) {
    gameRunning = false;
    showGameOver();
    return;
  }

  requestAnimationFrame(update);
}

function showGameOver() {
  ctx.fillStyle = 'red';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over!', canvas.width / 2 - 80, 100);

  document.getElementById('restartBtn').style.display = 'block';
}

// Restart the game
function resetGame() {
  dino.y = 150;
  dino.velocityY = 0;
  dino.isJumping = false;
  obstacle.x = canvas.width;
  gameRunning = true;
  document.getElementById('restartBtn').style.display = 'none';
  update();
}

// Handle keyboard jump
document.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.code === 'ArrowUp') && !dino.isJumping && gameRunning) {
    dino.isJumping = true;
    dino.velocityY = -15;
  }
});

// Start the game
update();
