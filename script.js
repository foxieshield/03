const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 200;

// Dino setup
let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  color: '#333'
};

let isJumping = false;
let jumpVelocity = 0;
let dinoFrame = 0;
let frameCount = 0;

// Draw dino in different frames
function drawDino() {
  ctx.fillStyle = dino.color;

  // Body
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

  // Legs
  if (isJumping) {
    // Jump pose: both legs same
    ctx.fillRect(dino.x + 5, dino.y + dino.height, 10, 10);
    ctx.fillRect(dino.x + 25, dino.y + dino.height, 10, 10);
  } else if (dinoFrame === 0) {
    // Right leg short
    ctx.fillRect(dino.x + 5, dino.y + dino.height, 10, 10);
    ctx.fillRect(dino.x + 25, dino.y + dino.height, 10, 5);
  } else {
    // Left leg short
    ctx.fillRect(dino.x + 5, dino.y + dino.height, 10, 5);
    ctx.fillRect(dino.x + 25, dino.y + dino.height, 10, 10);
  }
}

// Handle dino jump
function handleJump() {
  if (isJumping) {
    dino.y += jumpVelocity;
    jumpVelocity += 0.5; // gravity

    if (dino.y >= 150) {
      dino.y = 150;
      isJumping = false;
      jumpVelocity = 0;
    }
  }
}

// Trigger jump
function jumpStart() {
  if (!isJumping) {
    isJumping = true;
    jumpVelocity = -10; // go up
  }
}

// Handle key input
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    jumpStart();
  }
});

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen

  frameCount++;
  if (!isJumping && frameCount % 10 === 0) {
    dinoFrame = (dinoFrame + 1) % 2;
  }

  handleJump();
  drawDino();

  requestAnimationFrame(update);
}

update(); // Start game
