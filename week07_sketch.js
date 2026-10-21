// ========================================
// Firefly Night - 第7周
// p5.js 2.x
// ========================================


// ========================================
// 数组和基本变量
// ========================================

let x = [];
let y = [];
let speedX = [];
let speedY = [];

let num = 4;

let bugSize;
let moonSize;

let moonX;
let moonY;
let seaY;

let accel = 0.01;
let angle = 0;

let titleColor;
let frameSize;


// ========================================
// 第7周：游戏变量
// ========================================

let targetX;
let targetY;
let targetSize = 35;

let currentTime;
let previousTime = 0;
let interval;
let setTime = 1000;

let score = 0;


// ========================================
// 第7周：图片和声音
// ========================================

let starImage;
let soundFile;


// ========================================
// setup
// p5.js 2.x 使用 async / await 加载文件
// ========================================

async function setup() {

  starImage = await loadImage("data/star.png");
  soundFile = await loadSound("data/catch_sound.wav");

  createCanvas(600, 500);


  // 萤火虫大小
  bugSize = width / 25;


  // 月亮
  moonSize = width / 7;
  moonX = width * 0.82;
  moonY = height * 0.18;


  // 湖面位置
  seaY = height * 0.72;


  // 边框
  frameSize = 16;


  // 标题颜色
  titleColor = color(
    255,
    225,
    170
  );


  // ========================================
  // 数组：四只萤火虫的位置
  // ========================================

  x[0] = width * 0.15;
  x[1] = width * 0.35;
  x[2] = width * 0.55;
  x[3] = width * 0.75;

  y[0] = height * 0.35;
  y[1] = height * 0.48;
  y[2] = height * 0.28;
  y[3] = height * 0.42;


  // ========================================
  // 数组：四只萤火虫的速度
  // ========================================

  speedX[0] = 1;
  speedX[1] = -1;
  speedX[2] = 1.2;
  speedX[3] = -1.2;

  speedY[0] = 0.5;
  speedY[1] = -0.5;
  speedY[2] = 0.7;
  speedY[3] = -0.7;


  // ========================================
  // 第7周：目标萤火虫第一次出现的位置
  // ========================================

  targetX = random(
    targetSize,
    width - targetSize
  );

  targetY = random(
    height * 0.20,
    seaY - targetSize
  );
}


// ========================================
// draw
// ========================================

function draw() {

  background(
    30,
    32,
    75
  );


  // 夜晚背景
  drawNight();


  // ========================================
  // for循环：处理四只萤火虫
  // ========================================

  for (let i = 0; i < num; i++) {

    // 第一只不自动移动
    if (i != 0) {
      moveBug(i);
    }


    // ========================================
    // if / else if / else
    // ========================================

    if (checkMoon(i)) {

      drawBug(
        i,
        255,
        160,
        130
      );

    } else if (mouseIsPressed) {

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


    // 边界检查
    checkWall(i);
  }


  // ========================================
  // 第7周：每1秒改变目标位置
  // ========================================

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
      height * 0.20,
      seaY - targetSize
    );
  }


  // 画目标萤火虫
  drawTarget();


  // ========================================
  // 分数
  // ========================================

  noStroke();

  fill(255);

  textSize(
    width / 35
  );

  text(
    "Score: " + score,
    width * 0.05,
    height * 0.18
  );


  // ========================================
  // 最后画边框
  // ========================================

  noFill();

  stroke(
    60,
    38,
    30
  );

  strokeWeight(
    frameSize
  );

  rect(
    frameSize / 2,
    frameSize / 2,
    width - frameSize,
    height - frameSize
  );

  strokeWeight(1);
}


// ========================================
// 函数类型1
// 无参数 + 无返回值
// ========================================

function drawNight() {

  // 天空
  noStroke();

  fill(
    30,
    32,
    75
  );

  rect(
    0,
    0,
    width,
    seaY
  );


  // ========================================
  // 月亮
  // ========================================

  fill(
    255,
    225,
    150
  );

  ellipse(
    moonX,
    moonY,
    moonSize,
    moonSize
  );


  // 用背景色盖住一部分，做成月牙
  fill(
    30,
    32,
    75
  );

  ellipse(
    moonX + moonSize * 0.25,
    moonY - moonSize * 0.15,
    moonSize * 0.9,
    moonSize * 0.9
  );


  // ========================================
  // 星星：point
  // ========================================

  stroke(
    245,
    240,
    225
  );

  strokeWeight(3);

  point(
    width * 0.12,
    height * 0.25
  );

  point(
    width * 0.25,
    height * 0.15
  );

  point(
    width * 0.40,
    height * 0.22
  );

  point(
    width * 0.58,
    height * 0.12
  );

  point(
    width * 0.70,
    height * 0.32
  );

  point(
    width * 0.90,
    height * 0.30
  );

  strokeWeight(1);


  // ========================================
  // 第7周：图片
  // 使用上传的 star.png
  // ========================================

  image(
    starImage,
    width * 0.47,
    height * 0.08,
    width * 0.05,
    width * 0.05
  );


  // ========================================
  // 湖
  // ========================================

  noStroke();

  fill(
    40,
    68,
    112
  );

  rect(
    0,
    seaY,
    width,
    height - seaY
  );


  // ========================================
  // 月光倒影
  // ========================================

  fill(
    255,
    225,
    150,
    120
  );

  ellipse(
    moonX,
    seaY + height * 0.05,
    moonSize,
    height * 0.015
  );


  fill(
    255,
    225,
    150,
    60
  );

  ellipse(
    moonX,
    seaY + height * 0.11,
    moonSize * 0.6,
    height * 0.01
  );


  // ========================================
  // 水波：arc
  // ========================================

  noFill();

  stroke(
    110,
    145,
    190
  );

  arc(
    width * 0.25,
    seaY + height * 0.08,
    width * 0.12,
    height * 0.03,
    0,
    PI
  );

  arc(
    width * 0.60,
    seaY + height * 0.13,
    width * 0.12,
    height * 0.03,
    0,
    PI
  );


  // ========================================
  // 荷叶1
  // ========================================

  noStroke();

  fill(
    25,
    75,
    68
  );

  ellipse(
    width * 0.18,
    height * 0.91,
    width * 0.16,
    height * 0.05
  );


  fill(
    60,
    125,
    92
  );

  ellipse(
    width * 0.18,
    height * 0.905,
    width * 0.13,
    height * 0.035
  );


  // ========================================
  // 荷叶2
  // ========================================

  fill(
    25,
    75,
    68
  );

  ellipse(
    width * 0.48,
    height * 0.96,
    width * 0.17,
    height * 0.055
  );


  fill(
    60,
    125,
    92
  );

  ellipse(
    width * 0.48,
    height * 0.955,
    width * 0.14,
    height * 0.038
  );


  // ========================================
  // 荷叶3
  // ========================================

  fill(
    25,
    75,
    68
  );

  ellipse(
    width * 0.75,
    height * 0.90,
    width * 0.15,
    height * 0.05
  );


  fill(
    60,
    125,
    92
  );

  ellipse(
    width * 0.75,
    height * 0.895,
    width * 0.12,
    height * 0.035
  );


  // ========================================
  // 自定义叶子
  // beginShape
  // ========================================

  fill(
    28,
    72,
    65
  );

  beginShape();

  vertex(
    width * 0.07,
    height * 0.90
  );

  vertex(
    width * 0.12,
    height * 0.87
  );

  vertex(
    width * 0.08,
    height * 0.92
  );

  vertex(
    width * 0.055,
    height * 0.93
  );

  endShape(CLOSE);


  // ========================================
  // 芦苇：line
  // ========================================

  stroke(
    15,
    42,
    50
  );

  strokeWeight(3);

  line(
    width * 0.04,
    height,
    width * 0.07,
    height * 0.82
  );

  line(
    width * 0.10,
    height,
    width * 0.12,
    height * 0.86
  );

  line(
    width * 0.96,
    height,
    width * 0.93,
    height * 0.82
  );

  strokeWeight(1);


  // ========================================
  // 标题
  // ========================================

  noStroke();

  fill(
    titleColor
  );

  textSize(
    width / 35
  );

  text(
    "Firefly Night",
    width * 0.05,
    height * 0.09
  );


  fill(
    205,
    200,
    220
  );

  textSize(
    width / 70
  );

  text(
    "Catch the Firefly!",
    width * 0.05,
    height * 0.13
  );
}


// ========================================
// 函数类型2
// 有参数 + 无返回值
// ========================================

function drawBug(i, r, g, b) {

  noStroke();


  // 外层光
  fill(
    r,
    g,
    b,
    70
  );

  ellipse(
    x[i],
    y[i],
    bugSize * 1.8,
    bugSize * 1.8
  );


  // 第二层光
  fill(
    r,
    g,
    b,
    120
  );

  ellipse(
    x[i],
    y[i],
    bugSize * 1.4,
    bugSize * 1.4
  );


  // 身体
  fill(
    r,
    g,
    b
  );

  ellipse(
    x[i],
    y[i],
    bugSize,
    bugSize
  );


  // 小翅膀
  fill(
    230,
    230,
    220
  );

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


  // 头
  fill(
    80,
    60,
    50
  );

  ellipse(
    x[i],
    y[i] - bugSize * 0.42,
    bugSize * 0.35,
    bugSize * 0.40
  );
}


// ========================================
// 第7周：目标萤火虫
// ========================================

function drawTarget() {

  noStroke();


  // 外层光
  fill(
    255,
    245,
    120,
    70
  );

  ellipse(
    targetX,
    targetY,
    targetSize * 1.8,
    targetSize * 1.8
  );


  // 第二层光
  fill(
    255,
    245,
    120,
    120
  );

  ellipse(
    targetX,
    targetY,
    targetSize * 1.4,
    targetSize * 1.4
  );


  // 身体
  fill(
    255,
    245,
    120
  );

  ellipse(
    targetX,
    targetY,
    targetSize,
    targetSize
  );


  // 翅膀
  fill(
    230,
    230,
    220
  );

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


  // 头
  fill(
    80,
    60,
    50
  );

  ellipse(
    targetX,
    targetY - targetSize * 0.42,
    targetSize * 0.35,
    targetSize * 0.40
  );
}


// ========================================
// 函数类型3
// 无参数 + 有返回值
// ========================================

function getBugSize() {

  return bugSize;
}


// ========================================
// 函数类型4
// 有参数 + 有返回值
// ========================================

function checkMoon(i) {

  let s =
    getBugSize();


  let d =
    dist(
      x[i],
      y[i],
      moonX,
      moonY
    );


  if (
    d <
    (s + moonSize) / 2
  ) {

    return true;

  } else {

    return false;
  }
}


// ========================================
// 萤火虫移动
// ========================================

function moveBug(i) {

  // ========================================
  // 基本速度移动
  // ========================================

  x[i] =
    x[i] +
    speedX[i];

  y[i] =
    y[i] +
    speedY[i];


  // ========================================
  // 第二只：加速度
  // ========================================

  if (i == 1) {

    speedY[i] =
      speedY[i] +
      accel;


    if (
      speedY[i] >
      1.5
    ) {

      accel = -0.01;

    } else if (
      speedY[i] <
      -1.5
    ) {

      accel = 0.01;
    }
  }


  // ========================================
  // 第四只：上下振动
  // ========================================

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


// ========================================
// 边界检查
// ========================================

function checkWall(i) {

  let s =
    getBugSize();


  // 第一只不自动反弹
  if (i == 0) {

    if (
      x[i] <
      frameSize + s
    ) {

      x[i] =
        frameSize + s;

    } else if (
      x[i] >
      width - frameSize - s
    ) {

      x[i] =
        width - frameSize - s;
    }


    if (
      y[i] <
      height * 0.20
    ) {

      y[i] =
        height * 0.20;

    } else if (
      y[i] >
      seaY - s
    ) {

      y[i] =
        seaY - s;
    }


  } else {


    // 左右边界
    if (
      x[i] <
      frameSize + s
    ) {

      x[i] =
        frameSize + s;

      speedX[i] =
        speedX[i] * -1;


    } else if (
      x[i] >
      width - frameSize - s
    ) {

      x[i] =
        width - frameSize - s;

      speedX[i] =
        speedX[i] * -1;
    }


    // 上下边界
    if (
      y[i] <
      height * 0.20
    ) {

      y[i] =
        height * 0.20;

      speedY[i] =
        speedY[i] * -1;


    } else if (
      y[i] >
      seaY - s
    ) {

      y[i] =
        seaY - s;

      speedY[i] =
        speedY[i] * -1;
    }
  }
}


// ========================================
// 第7周：点击目标萤火虫
// ========================================

function mousePressed() {

  let d =
    dist(
      targetX,
      targetY,
      mouseX,
      mouseY
    );


  // 点击到目标
  if (
    d <
    targetSize / 2
  ) {

    score++;


    // 播放声音
    soundFile.play();


    // 改变目标位置
    targetX = random(
      targetSize,
      width - targetSize
    );


    targetY = random(
      height * 0.20,
      seaY - targetSize
    );


    previousTime =
      millis();
  }


  // 改变标题颜色
  titleColor =
    color(
      255,
      185,
      205
    );
}


// ========================================
// 鼠标松开事件
// ========================================

function mouseReleased() {

  titleColor =
    color(
      255,
      225,
      170
    );
}


// ========================================
// 键盘事件
// switch + key
// ========================================

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

