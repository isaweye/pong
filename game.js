const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.setAttribute('style', "top: 50%;margin-top:90px;");

const paddleWidth = 20;
const paddleHeight = 150;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;

const ballSize = 17;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
var r = random(4, 10);
var b = random(-5, 5);
if (b >= 0) {
  ballSpeedX = -r;
  ballSpeedY = -r; 
}
else {
  ballSpeedX = r;
  ballSpeedY = r;
}
let max = 25;
let ballSpeedIncrement = 0.05;

document.getElementById("ballSpeed").innerText = Math.abs(ballSpeedX.toFixed(2));

let hitCounter = 0;

function drawPaddle(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

function updateGame() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= ballSize / 2 || ballY >= canvas.height - ballSize / 2) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX <= paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight ||
      ballX >= canvas.width - paddleWidth && ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    if (Math.abs(ballSpeedX) < max) {
      ballSpeedX *= 1 + ballSpeedIncrement;
      document.getElementById("ballSpeed").innerText = Math.abs(ballSpeedX.toFixed(2));
    }
    hitCounter++;
    document.getElementById("hits").innerText = hitCounter;
  }

  if (ballX < 0 || ballX > canvas.width) {
    resetGame();
  }

  const computerPaddleCenter = computerPaddleY + paddleHeight / 2;
  const distanceFromBall = Math.abs(computerPaddleCenter - ballY);
  const moveSpeed = Math.min(8, (distanceFromBall+2) / 4); 
  if (ballX >= canvas.width / 2) {
    if (computerPaddleCenter < ballY) {
      computerPaddleY += moveSpeed;
    } else if (computerPaddleCenter > ballY) {
      computerPaddleY -= moveSpeed;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(0, playerPaddleY);
  drawPaddle(canvas.width - paddleWidth, computerPaddleY);
  drawBall(ballX, ballY);

  requestAnimationFrame(updateGame);
}

function handleMouseMove(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const mouseY = event.clientY - canvasRect.top;
  const moveSpeed = 20;
  if (mouseY >= 0 && mouseY <= canvas.height - paddleHeight) {
    playerPaddleY = mouseY;
  }
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function resetGame() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  var r = random(6, 10);
  var b = random(0, 1);
  if (b == 0) {
    ballSpeedX = -r;
    ballSpeedY = -r; 
  }
  else {
    ballSpeedX = r;
    ballSpeedY = r;
  }
  ballSpeedIncrement = 0.05;
  hitCounter = 0;
  document.getElementById("hits").innerText = hitCounter;
  document.getElementById("ballSpeed").innerText = Math.abs(ballSpeedX.toFixed(2));
}

canvas.addEventListener("mousemove", handleMouseMove);

updateGame();

