const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

// <===================================== VARIABLES ===================================>

const birdRadius = 12
const wallColumnCount = 4
const wallOffSetLeft = canvas.width / 2
const wallHeight = 80
const wallWidth = 40
const wallPadding = 90

let bird = {
  x : canvas.width / 6,
  y : canvas.height / 3,
  dx : 0,
  dy : 0
}

let walls = []
for (let c = 0; c < wallColumnCount; c++) {
  walls[c] = { x : 0, y : 0}
}

let controller = {
  left : false,
  right : false,
  up : false,

  keyListener: function(e) {
    let key_state = (e.type == "keydown") ? true : false

    switch (e.key) {
      case ' ':
        controller.up = key_state
        break
      case 'a':
        controller.left = key_state
        break
      case 'd':
        controller.right = key_state
        break
    }
  }
}

// <==================================== EVENT_LISTENERS ================================>

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)

// <==================================== FUNCTIONS ======================================>

const drawBird = () => {
  ctx.beginPath()
  ctx.arc(bird.x, bird.y, birdRadius, 0, Math.PI*2)
  ctx.fillStyle = "#89CFF0"
  ctx.fill()
}

const drawWall = () => {
  for (let c = 0; c < wallColumnCount; c++) {
    let wallX = (c * (wallWidth + wallPadding)) + wallOffSetLeft
    let wallY = canvas.height - wallHeight
    walls[c].x = wallX
    walls[c].y = wallY
    ctx.beginPath()
    ctx.rect(wallX, wallY, wallWidth, wallHeight)
    ctx.fillStyle = "#baffc9"
    ctx.fill()
  }
}

// <================================== MAIN GAME LOOP ==================================>

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawWall()
  drawBird()

  if (controller.left && bird.x > birdRadius + 2) {
    bird.x -= 7
  } else if (controller.right && bird.x < canvas.width - birdRadius) {
    bird.x += 7
  } else if (controller.up && bird.y > birdRadius + 2) {
    bird.y -= 4
  }

  requestAnimationFrame(draw)
}

draw()

