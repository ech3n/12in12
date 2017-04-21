Create HTML5 Canvas JavaScript Game Character
=============================================

1) Create basic *index.html* file

```
<!DOCTYPE html>
<html>
<head>
  <title>HTML5 Canvas Game Character</title>
</head>
<body>

</body>
</html>
```
2) Add Canvas ``div`` and load JavaScript files inside the ``body`` tag:

```
<html>
  <head>
    <title>HTML5 Canvas Game Character</title>
  </head>
  <body>
    <div>
			<canvas width="490" height="220" id="canvas"></canvas>
		</div>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>
```
3) Load PNG files into a JavaScript *image* object.

```
// Draw and Animate Canvas Game Character
//

// Global Variables
var canvas = document.getElementById('canvas')
var context = document.getElementById('canvas').getContext("2d")
var images = {}

// Execute *loadImage()* when script is loaded
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
```

4)  
a) Add some variables the ``resoourceLoaded()`` function needs to the Global Variables section:

```
// Global Variables
var canvas = document.getElementById('canvas')
var context = document.getElementById('canvas').getContext("2d")
var images = {}
var totalResources = 6
var numResourcesLoaded = 0
var fps = 30
```


b) Write the ``resourceLoaded()`` function:

```
/* Check if our image resources are all loaded
 *  set the Canvas redraw interval when everything is loaded
 */
function resourceLoaded() {
  numResourcesLoaded += 1
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps)
  }
}
```

5) Redraw Function 

Add Global Variables:
```
var canvas = document.getElementById('canvas')
var context = document.getElementById('canvas').getContext("2d")
var charX = 245
var charY = 185
```
```
/* Redraw function to draw our game character on the canvas
 */
function redraw() {
  var x = charX
  var y = charY

  canvas.width = canvas.width    // clears the canvas

  context.drawImage(images["leftArm"], x + 40, y - 42)
  context.drawImage(images["legs"], x, y)
  context.drawImage(images["torso"], x, y -50)
  context.drawImage(images["rightArm"], x - 15, y - 42)
  context.drawImage(images["head"], x - 10, y - 125)
  context.drawImage(images["hair"], x - 37, y - 138)
} 
```

6) 
Add *canvas* and *context* variables
```
// Global Variables
var canvas = document.getElementById('canvas')
var context = document.getElementById('canvas').getContext("2d")
var images = {}
var totalResources = 6
var numResourcesLoaded = 0
var fps = 30
var charX = 245
var charY = 185
```

Loading *index.html* should show our basic character:  
![Basic Game Character](/images/screenshot01.png "Basic Character")

7) write new ``drawEllipse()`` function:

```
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
```

Now call ``drawEllipse()`` in the ``redraw()`` function:

```
function redraw() {
	...
  // Draw eyes
  drawEllipse(x + 47, y - 68, 8, 14); // Left Eye
  drawEllipse(x + 58, y - 68, 8, 14); // Right Eye
}
```

![Add eyes to our character](/images/screenshot02.png "Eyes...")


8) Draw shadow right after the canvas is cleared
```
function redraw() {
  ...
  canvas.width = canvas.width    // clears the canvas

  // Draw shadow before character
  drawEllipse(x + 40, y + 29, 160, 6)
}
```

9) Breath  
Add some variables to **Global Variables**
```
// Global Variables
...
var breathInc = 0.1
var breathDir = 1
var breathAmt = 0
var breathMax = 2
var breathInterval = setInterval(updateBreath, 1000 / fps)
```

**``updateBreath()``** function

```
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
```

Now modify ``redraw()`` to include ``breathAmt``

```
function redraw() {
 	... 
  // Draw shadow before character 
  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6)
  
  context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt)
  context.drawImage(images["legs"], x, y) 
  context.drawImage(images["torso"], x, y -50)
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt)
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt)
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt)
  
  // Draw eyes
  drawEllipse(x + 47, y - 68 - breathAmt, 8, 14); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, 14); // Right Eye
}
```

10) Add blinking animation  
Add some more global variables
```
// Global Variables
...
var maxEyeHeight = 14
var curEyeHeight = maxEyeHeight
var eyeOpenTime = 0
var timeBtwBlinks = 4000
var blinkUpdateTime = 200
var blinkTimer = setInterval(updateBlink, blinkUpdateTime)
```

Update the eye drawing code in ``redraw()``
```
  // Draw eyes
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
```

Add two more functions to handle the blinking:
```
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
```

11) Let's add an event listener to the *canvas* element:  
```
// Add click event
canvas.addEventListener('click', function() {
  blink()
}, false)
```
This will call the ``blink()`` function when we click anywhere in the canvas.

Add a border around our canvas so we know where to click.
**index.html**:
```
  <style>
    canvas { border: thin solid #d3d3d3; }
  </style>
```
