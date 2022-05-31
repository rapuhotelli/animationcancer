let canvas, ctx
const f = Math.floor

const ArtDimensions = {
  width: 256,
  height: 130.5
}

function init() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  canvas.width = f(window.innerWidth / 2)
  canvas.height = f(window.innerHeight / 2)
  window.requestAnimationFrame(renderFrame)
}

const DVDStepper = {
  currentX: 100,
  currentY: 100,
  stepX: 1,
  stepY: 1,
  flipHorizontal() {
    this.stepX = this.stepX * -1
  },
  flipVertical() {
    this.stepY = this.stepY * -1
  },
  step() {
    this.currentX = this.currentX + this.stepX
    this.currentY = this.currentY + this.stepY
  }
}
// IMG_20180905_092149.jpg
function renderFrame(tick) {
  ctx.save()

  // Reset buffer
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Collision detection
  if (DVDStepper.currentY >= ctx.canvas.height - ArtDimensions.height) {
    DVDStepper.flipVertical()
  }
  if (DVDStepper.currentX >= ctx.canvas.width - ArtDimensions.width) {
    DVDStepper.flipHorizontal()
  }
  if (DVDStepper.currentX < 0) {
    DVDStepper.flipHorizontal()
  }
  if (DVDStepper.currentY < 0) {
    DVDStepper.flipVertical()
  }
  
  // Wasteful image drawing
  const img = new Image()
  img.src = '1024px-DVD_logo.svg.png'
  ctx.drawImage(img,  DVDStepper.currentX, DVDStepper.currentY, ArtDimensions.width, ArtDimensions.height)
  
  // Walk
  DVDStepper.step()
  
  ctx.restore()
  window.requestAnimationFrame(renderFrame)
}

init()
