const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 200;

// Dino starting position and size
let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  color: '#333',
  jumpHeight: 0,
  isJumping: false,
};

// Obstacles
let obstacles = [];
let obstacleSpeed = 3;

// Set game speed
let gameSpeed = 1000 / 60; // 60 FPS (you can adjust this value to control game speed)

// Handle key press for jump
document.addEventListener('keydown', function (e) {
  if ((e.key === ' ' || e.key === 'ArrowUp') && !dino.isJumping) {
    dino.isJumping = true;
    dino.jumpHeight = 20;
  }
});

// Draw the Dino with legs
function drawDino() {
  ctx.fillStyle = dino.color;
  // Body
  ctx.fillRect(dino.x, dino.y - dino.jumpHeight, dino.width, dino.height);
  
  // Legs (simulating walking)
  ctx.fillStyle = 'black';
  ctx.fillRect(dino.x + 5, dino.y + 35 - dino.jumpHeight, 10, 5);
  ctx.fillRect(dino.x + 25, dino.y + 35 - dino.jumpHeight, 10, 5);
}

// Create obstacles
function createObstacle() {
  let height = Math.random() * 30 + 20;
  obstacles.push({ x: canvas.width, y: canvas.height - height, width: 20, height: height });
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = 'black';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Check for collisions
function checkCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    if (
      dino.x < obstacles[i].x + obstacles[i].width &&
      dino.x + dino.width > obstacles[i].x &&
      dino.y + dino.height - dino.jumpHeight > obstacles[i].y
    ) {
      gameOver();
    }
  }
}

// Update Game State
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
  
  if (dino.isJumping) {
    if (dino.jumpHeight < 40) {
      dino.jumpHeight += 2;
    } else {
      dino.isJumping = false;
    }
  } else if (dino.jumpHeight > 0) {
    dino.jumpHeight -= 2;
  }

  // Move obstacles
  obstacles.forEach(obstacle => {
    obstacle.x -= obstacleSpeed;
  });

  // Remove obstacles that go off-screen
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

  // Draw the Dino and obstacles
  drawDino();
  drawObstacles();
  checkCollisions();

  // Game over
  if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
    createObstacle();
  }
  
  // Next frame
  setTimeout(update, gameSpeed);  // This controls the game speed (slower speed here)
}

// Game over state
function gameOver() {
  document.getElementById('gameOver').style.display = 'block';
  document.getElementById('resetBtn').style.display = 'block';
}

// Reset the game
function resetGame() {
  dino.y = 150;
  dino.jumpHeight = 0;
  dino.isJumping = false;
  obstacles = [];
  document.getElementById('gameOver').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'none';
  update(); // Start the game again
}

// Start the game loop
update();
