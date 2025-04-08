const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 200;

let gameRunning = true;

// 🦖 Dino setup
let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  color: '#333',
  vy: 0,
  gravity: 0.9,
  jumpStrength: -15,
  onGround: true,
  frame: 0
};

// ⬛ Obstacle setup
let obstacles = [];
let spawnInterval = 1500; // milliseconds
let lastSpawnTime = 0;

// 🎮 Controls
document.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.code === 'ArrowUp') && dino.onGround && gameRunning) {
    dino.vy = dino.jumpStrength;
    dino.onGround = false;
  }
});

// 🟩 Spawn a new obstacle
function spawnObstacle() {
  const height = 30 + Math.random() * 20;
  const obstacle = {
    x: canvas.width,
    y: canvas.height - height,
    width: 20 + Math.random() * 20,
    height,
    color: 'green'
  };
  obstacles.push(obstacle);
}

// 🛑 Collision detection
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// 🧹 Reset
document.getElementById('resetBtn').addEventListener('click', () => {
  dino.y = 150;
  dino.vy = 0;
  dino.onGround = true;
  obstacles = [];
  gameRunning = true;
  document.getElementById('gameOver').style.display = 'none';
  update();
});

// ✍️ Draw Dino
function drawDino() {
  ctx.fillStyle = dino.color;
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// ✍️ Draw Obstacles
function drawObstacles() {
  obstacles.forEach(obs => {
    ctx.fillStyle = obs.color;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

// 🧠 Game Loop
function update(timestamp) {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply gravity
  dino.vy += dino.gravity;
  dino.y += dino.vy;

  // Ground check
  if (dino.y + dino.height >= canvas.height) {
    dino.y = canvas.height - dino.height;
    dino.vy = 0;
    dino.onGround = true;
  }

  // Spawn obstacle randomly
  if (!lastSpawnTime || timestamp - lastSpawnTime > spawnInterval + Math.random() * 1000) {
    spawnObstacle();
    lastSpawnTime = timestamp;
  }

  // Move and draw obstacles
  obstacles.forEach(obs => {
    obs.x -= 5;
  });

  // Remove off-screen obstacles
  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

  drawDino();
  drawObstacles();

  // Check for collisions
  for (let obs of obstacles) {
    if (checkCollision(dino, obs)) {
      gameRunning = false;
      document.getElementById('gameOver').style.display = 'block';
      return;
    }
  }

  requestAnimationFrame(update);
}

// 🟢 Start game
update();
