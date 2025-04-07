const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 200;

// Dino starting position
let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  color: '#333'
};

// Draw the dino
function drawDino() {
  ctx.fillStyle = dino.color;
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Main game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen
  drawDino();
  requestAnimationFrame(update);
}

update(); // start game
