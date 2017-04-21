// Draw and Animate Canvas Game Character
//

// Global Variables
var canvas = document.getElementById('canvas')
var context = document.getElementById('canvas').getContext("2d")
var images = {}
var totalResources = 6
var numResourcesLoaded = 0
var fps = 30
var charX = 245
var charY = 185
var breathInc = 0.1
var breathDir = 1
var breathAmt = 0
var breathMax = 2
var breathInterval = setInterval(updateBreath, 1000 / fps)
var maxEyeHeight = 14
var curEyeHeight = maxEyeHeight
var eyeOpenTime = 0
var timeBtwBlinks = 4000
var blinkUpdateTime = 200
var blinkTimer = setInterval(updateBlink, blinkUpdateTime)

loadImage("leftArm")
loadImage("legs")
loadImage("torso")
loadImage("rightArm")
loadImage("head")
loadImage("hair")

/* Load images into *images* Object
 *
 * @param {string} name - PNG filename
 */
function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

/* Check if our image resources are all loaded
 *  set the Canvas redraw interval when everything is loaded
 */
function resourceLoaded() {
  numResourcesLoaded += 1
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps)
  }
}


/* Redraw function to draw our game character on the canvs
 */
function redraw() {
  var x = charX
  var y = charY

  canvas.width = canvas.width    // clears the canvas

  // Draw shadow before character
  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6)

  context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt)
  context.drawImage(images["legs"], x, y)
  context.drawImage(images["torso"], x, y -50)
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt)
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt)
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt)

  // Draw eyes
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
}

/* Draw Ellipse
 * @param {number} centerX - x coord of ellipse
 * @param {number} centerY - y coord of ellipse
 * @param {number} width - width of ellipse
 * @param {number} height - height of ellipse
 */
function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();
  context.moveTo(centerX, centerY - height/2)

  context.bezierCurveTo(
      centerX + width/2, centerY - height/2,
      centerX + width/2, centerY - height/2,
      centerX, centerY + height/2)

  context.bezierCurveTo(
      centerX - width/2, centerY + height/2,
      centerX - width/2, centerY - height/2,
      centerX, centerY - height/2)

  context.fillStyle = "black"
  context.fill()
  context.closePath()
}

/* Update Breath
 */
function updateBreath() {
  if (breathDir === 1) {
    // breath in
    breathAmt -= breathInc
      if (breathAmt < -breathMax) {
        breathDir = -1
      }
  } else {
    // breath out
    breathAmt += breathInc
    if (breathAmt > breathMax) {
      breathDir = 1
    }
  }
}

/* Update Blinking
 */
function updateBlink() {
  eyeOpenTime += blinkUpdateTime
  if(eyeOpenTime >= timeBtwBlinks) {
    blink()
  }
}

/* Blink eyes
 */
function blink() {
  curEyeHeight -= 1
    if (curEyeHeight <= 0) {
      eyeOpenTime = 0
        curEyeHeight = maxEyeHeight
    } else {
      setTimeout(blink, 10)
    }
}

// Add click event
canvas.addEventListener('click', function() {
  blink()
}, false)
