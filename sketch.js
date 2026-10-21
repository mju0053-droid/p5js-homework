// Firefly Night

let num = 4;
let bugSize;

let accel = 0.01;
let angle = 0;

let titleColor;

// Arrays
let x = [];
let y = [];
let speedX = [];
let speedY = [];

// Game
let targetX;
let targetY;
let targetSize = 35;

let currentTime;
let previousTime = 0;
let interval;
let setTime = 1000;

let score = 0;
let stage = 1;

// Image and sound
let cosmosImage;
let soundFile;


async function setup() {

  cosmosImage = await loadImage("data/cosmos.jpg");
  soundFile = await loadSound("data/catch.mp3");

  createCanvas(600, 500);

  bugSize = width / 25;

  titleColor = color(255, 225, 120);

  x[0] = width * 0.15;
  x[1] = width * 0.35;
  x[2] = width * 0.55;
  x[3] = width * 0.75;

  y[0] = height * 0.35;
  y[1] = height * 0.48;
  y[2] = height * 0.28;
  y[3] = height * 0.42;

  speedX[0] = 1;
  speedX[1] = -1;
  speedX[2] = 1.2;
  speedX[3] = -1.2;

  speedY[0] = 0.5;
  speedY[1] = -0.5;
  speedY[2] = 0.7;
  speedY[3] = -0.7;

  targetX = random(
    targetSize,
    width - targetSize
  );

  targetY = random(
    height * 0.25,
    height * 0.66
  );
}


function draw() {

  background(10, 18, 35);

  drawNight();

  // Stage
  if (score < 5) {

    stage = 1;
    setTime = 1000;

  } else if (score < 10) {

    stage = 2;
    setTime = 800;

  } else {

    stage = 3;
    setTime = 600;
  }

  for (let i = 0; i < num; i++) {

    if (i != 0) {
      moveBug(i);
    }

    if (mouseIsPressed) {

      drawBug(
        i,
        255,
        180,
        200
      );

    } else {

      drawBug(
        i,
        255,
        235,
        100
      );
    }

    checkWall(i);
  }

  currentTime = millis();

  interval =
    currentTime -
    previousTime;

  if (interval > setTime) {

    previousTime = millis();

    targetX = random(
      targetSize,
      width - targetSize
    );

    targetY = random(
      height * 0.25,
      height * 0.66
    );
  }

  drawTarget();

  noStroke();

  fill(245, 240, 230);

  textSize(width / 29);

  text(
    "Score: " + score,
    width * 0.09,
    height * 0.235
  );

  text(
    "Stage: " + stage,
    width * 0.09,
    height * 0.275
  );

  drawFrame();
}


// Background
function drawNight() {

  image(
    cosmosImage,
    0,
    0,
    width,
    height
  );

  // Small lights
  noStroke();

  fill(255, 220, 60, 35);
  ellipse(
    width * 0.08,
    height * 0.73,
    18,
    18
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.08,
    height * 0.73,
    4,
    4
  );


  fill(255, 220, 60, 25);
  ellipse(
    width * 0.11,
    height * 0.79,
    12,
    12
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.11,
    height * 0.79,
    3,
    3
  );


  fill(255, 225, 70, 45);
  ellipse(
    width * 0.18,
    height * 0.82,
    24,
    24
  );

  fill(255, 235, 90);
  ellipse(
    width * 0.18,
    height * 0.82,
    6,
    6
  );


  fill(255, 220, 60, 25);
  ellipse(
    width * 0.16,
    height * 0.88,
    12,
    12
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.16,
    height * 0.88,
    3,
    3
  );


  fill(255, 220, 60, 30);
  ellipse(
    width * 0.27,
    height * 0.78,
    15,
    15
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.27,
    height * 0.78,
    4,
    4
  );


  fill(255, 225, 70, 45);
  ellipse(
    width * 0.31,
    height * 0.87,
    22,
    22
  );

  fill(255, 235, 90);
  ellipse(
    width * 0.31,
    height * 0.87,
    6,
    6
  );


  fill(255, 220, 60, 30);
  ellipse(
    width * 0.39,
    height * 0.80,
    14,
    14
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.39,
    height * 0.80,
    4,
    4
  );


  fill(255, 225, 70, 45);
  ellipse(
    width * 0.48,
    height * 0.84,
    22,
    22
  );

  fill(255, 235, 90);
  ellipse(
    width * 0.48,
    height * 0.84,
    6,
    6
  );


  fill(255, 220, 60, 25);
  ellipse(
    width * 0.55,
    height * 0.89,
    14,
    14
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.55,
    height * 0.89,
    4,
    4
  );


  fill(255, 220, 60, 25);
  ellipse(
    width * 0.65,
    height * 0.79,
    13,
    13
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.65,
    height * 0.79,
    4,
    4
  );


  fill(255, 225, 70, 45);
  ellipse(
    width * 0.73,
    height * 0.86,
    23,
    23
  );

  fill(255, 235, 90);
  ellipse(
    width * 0.73,
    height * 0.86,
    6,
    6
  );


  fill(255, 220, 60, 30);
  ellipse(
    width * 0.79,
    height * 0.74,
    15,
    15
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.79,
    height * 0.74,
    4,
    4
  );


  fill(255, 220, 60, 25);
  ellipse(
    width * 0.84,
    height * 0.81,
    12,
    12
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.84,
    height * 0.81,
    3,
    3
  );


  fill(255, 225, 70, 45);
  ellipse(
    width * 0.90,
    height * 0.84,
    23,
    23
  );

  fill(255, 235, 90);
  ellipse(
    width * 0.90,
    height * 0.84,
    6,
    6
  );


  fill(255, 220, 60, 30);
  ellipse(
    width * 0.94,
    height * 0.75,
    15,
    15
  );

  fill(255, 230, 80);
  ellipse(
    width * 0.94,
    height * 0.75,
    4,
    4
  );


  // Points
  stroke(255, 225, 100, 180);
  strokeWeight(2);

  point(
    width * 0.13,
    height * 0.84
  );

  point(
    width * 0.22,
    height * 0.91
  );

  point(
    width * 0.34,
    height * 0.75
  );

  point(
    width * 0.43,
    height * 0.89
  );

  point(
    width * 0.59,
    height * 0.82
  );

  point(
    width * 0.70,
    height * 0.76
  );

  point(
    width * 0.87,
    height * 0.90
  );


  // Title
  noStroke();

  fill(titleColor);

  textSize(width / 20);

  text(
    "Firefly Night",
    width * 0.09,
    height * 0.14
  );


  fill(230, 235, 245);

  textSize(width / 34);

  text(
    "Catch the Firefly!",
    width * 0.09,
    height * 0.19
  );
}


// Frame
function drawFrame() {

  noFill();

  stroke(48, 25, 9);
  strokeWeight(18);

  rect(
    9,
    9,
    width - 18,
    height - 18
  );


  stroke(88, 48, 15);
  strokeWeight(7);

  rect(
    18,
    18,
    width - 36,
    height - 36
  );


  stroke(190, 140, 35);
  strokeWeight(3);

  rect(
    22,
    22,
    width - 44,
    height - 44
  );


  stroke(235, 190, 65);
  strokeWeight(1);

  rect(
    27,
    27,
    width - 54,
    height - 54
  );


  // Corner lines
  stroke(225, 175, 50);
  strokeWeight(4);

  line(
    32,
    34,
    32,
    65
  );

  line(
    32,
    34,
    65,
    34
  );


  line(
    width - 32,
    34,
    width - 32,
    65
  );

  line(
    width - 65,
    34,
    width - 32,
    34
  );


  line(
    32,
    height - 65,
    32,
    height - 34
  );

  line(
    32,
    height - 34,
    65,
    height - 34
  );


  line(
    width - 32,
    height - 65,
    width - 32,
    height - 34
  );

  line(
    width - 65,
    height - 34,
    width - 32,
    height - 34
  );


  // Custom shapes
  noStroke();

  fill(225, 175, 50);


  beginShape();

  vertex(45, 45);
  vertex(52, 52);
  vertex(45, 59);
  vertex(38, 52);

  endShape(CLOSE);


  beginShape();

  vertex(width - 45, 45);
  vertex(width - 38, 52);
  vertex(width - 45, 59);
  vertex(width - 52, 52);

  endShape(CLOSE);


  beginShape();

  vertex(45, height - 59);
  vertex(52, height - 52);
  vertex(45, height - 45);
  vertex(38, height - 52);

  endShape(CLOSE);


  beginShape();

  vertex(width - 45, height - 59);
  vertex(width - 38, height - 52);
  vertex(width - 45, height - 45);
  vertex(width - 52, height - 52);

  endShape(CLOSE);

  strokeWeight(1);
}


// Function type 2
function drawBug(i, r, g, b) {

  noStroke();

  // Glow
  fill(r, g, b, 70);

  ellipse(
    x[i],
    y[i],
    bugSize * 1.8,
    bugSize * 1.8
  );


  fill(r, g, b, 120);

  ellipse(
    x[i],
    y[i],
    bugSize * 1.4,
    bugSize * 1.4
  );


  // Body
  fill(r, g, b);

  ellipse(
    x[i],
    y[i],
    bugSize,
    bugSize
  );


  // Arc
  noFill();

  stroke(r, g, b);
  strokeWeight(1);

  arc(
    x[i],
    y[i] + bugSize * 0.12,
    bugSize * 0.55,
    bugSize * 0.28,
    0,
    PI
  );

  noStroke();


  // Wings
  fill(230, 230, 220);

  ellipse(
    x[i] - bugSize * 0.35,
    y[i] - bugSize * 0.15,
    bugSize * 0.55,
    bugSize * 0.30
  );

  ellipse(
    x[i] + bugSize * 0.35,
    y[i] - bugSize * 0.15,
    bugSize * 0.55,
    bugSize * 0.30
  );


  // Head
  fill(80, 60, 50);

  ellipse(
    x[i],
    y[i] - bugSize * 0.42,
    bugSize * 0.35,
    bugSize * 0.40
  );
}


// Target
function drawTarget() {

  noStroke();

  fill(255, 235, 80, 60);

  ellipse(
    targetX,
    targetY,
    targetSize * 1.8,
    targetSize * 1.8
  );


  fill(255, 235, 80, 120);

  ellipse(
    targetX,
    targetY,
    targetSize * 1.4,
    targetSize * 1.4
  );


  fill(255, 235, 80);

  ellipse(
    targetX,
    targetY,
    targetSize,
    targetSize
  );


  // Arc
  noFill();

  stroke(255, 235, 80);
  strokeWeight(1);

  arc(
    targetX,
    targetY + targetSize * 0.12,
    targetSize * 0.55,
    targetSize * 0.28,
    0,
    PI
  );

  noStroke();


  // Wings
  fill(230, 230, 220);

  ellipse(
    targetX - targetSize * 0.35,
    targetY - targetSize * 0.15,
    targetSize * 0.55,
    targetSize * 0.30
  );

  ellipse(
    targetX + targetSize * 0.35,
    targetY - targetSize * 0.15,
    targetSize * 0.55,
    targetSize * 0.30
  );


  // Head
  fill(80, 60, 50);

  ellipse(
    targetX,
    targetY - targetSize * 0.42,
    targetSize * 0.35,
    targetSize * 0.40
  );
}


// Function type 3
function getBugSize() {

  return bugSize;
}


// Function type 4
function checkTarget(mx, my) {

  let distance = dist(
    targetX,
    targetY,
    mx,
    my
  );

  if (distance < targetSize / 2) {

    return true;

  } else {

    return false;
  }
}


// Movement
function moveBug(i) {

  // Speed
  x[i] =
    x[i] +
    speedX[i];

  y[i] =
    y[i] +
    speedY[i];


  // Acceleration
  if (i == 1) {

    speedY[i] =
      speedY[i] +
      accel;

    if (speedY[i] > 1.5) {

      accel = -0.01;

    } else if (speedY[i] < -1.5) {

      accel = 0.01;
    }
  }


  // Vibration
  if (i == 3) {

    y[i] =
      height * 0.35 +
      sin(angle) *
      height * 0.08;

    angle =
      angle +
      0.03;
  }
}


// Boundary
function checkWall(i) {

  let s = getBugSize();

  if (i == 0) {

    if (x[i] < s) {

      x[i] = s;

    } else if (x[i] > width - s) {

      x[i] =
        width - s;
    }


    if (y[i] < height * 0.25) {

      y[i] =
        height * 0.25;

    } else if (y[i] > height * 0.68) {

      y[i] =
        height * 0.68;
    }

  } else {

    if (x[i] < s) {

      x[i] = s;

      speedX[i] =
        speedX[i] * -1;

    } else if (x[i] > width - s) {

      x[i] =
        width - s;

      speedX[i] =
        speedX[i] * -1;
    }


    if (y[i] < height * 0.25) {

      y[i] =
        height * 0.25;

      speedY[i] =
        speedY[i] * -1;

    } else if (y[i] > height * 0.68) {

      y[i] =
        height * 0.68;

      speedY[i] =
        speedY[i] * -1;
    }
  }
}


// Event function 1
function mouseReleased() {

  titleColor =
    color(
      255,
      225,
      120
    );
}


// Event function 2
function keyPressed() {

  switch (key) {

    case '1':

      titleColor =
        color(
          255,
          185,
          205
        );

      break;


    case '2':

      titleColor =
        color(
          185,
          210,
          255
        );

      break;
  }
}


function mousePressed() {

  if (
    checkTarget(
      mouseX,
      mouseY
    )
  ) {

    score++;

    soundFile.play();

    targetX = random(
      targetSize,
      width - targetSize
    );

    targetY = random(
      height * 0.25,
      height * 0.66
    );

    previousTime =
      millis();
  }

  titleColor =
    color(
      255,
      185,
      205
    );
}