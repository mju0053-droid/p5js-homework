/// ========================================
// Firefly Night
// 1~6周累计作业
// ========================================


// ========================================
// 变量和数组
// ========================================

let x = [];
let y = [];
let speedX = [];
let speedY = [];

let num = 4;

let bugSize;
let moonSize;
let starSize;

let moonX;
let moonY;
let seaY;

let accel = 0.01;
let angle = 0;

let titleColor;
let frameSize;


// ========================================
// setup
// ========================================

function setup() {

  createCanvas(600, 500);

  bugSize = width / 25;
  moonSize = width / 7;
  starSize = width / 120;

  moonX = width * 0.82;
  moonY = height * 0.18;

  seaY = height * 0.72;

  frameSize = 16;

  // 第6周：color()
  titleColor = color(255, 225, 170);


  // 第4周：数组
  // 4只萤火虫的初始位置

  x[0] = width * 0.15;
  x[1] = width * 0.35;
  x[2] = width * 0.55;
  x[3] = width * 0.75;

  y[0] = height * 0.35;
  y[1] = height * 0.48;
  y[2] = height * 0.28;
  y[3] = height * 0.42;


  // 第5周：初始速度

  speedX[0] = 1;
  speedX[1] = -1;
  speedX[2] = 1.2;
  speedX[3] = -1.2;

  speedY[0] = 0.5;
  speedY[1] = -0.5;
  speedY[2] = 0.7;
  speedY[3] = -0.7;
}


// ========================================
// draw
// ========================================

function draw() {

  background(30, 32, 75);

  drawNight();


  // =====================================
  // 第3周：for / if / else if / else
  // =====================================

  for (let i = 0; i < num; i++) {

    // 第一只由键盘控制
    // 其他三只自动移动
    if (i != 0) {
      moveBug(i);
    }


    // 碰到月亮时改变颜色
    if (checkMoon(i)) {

      drawBug(i, 255, 160, 130);

    // 按住鼠标时改变颜色
    } else if (mouseIsPressed) {

      drawBug(i, 255, 180, 200);

    } else {

      drawBug(i, 255, 235, 100);
    }


    // 检查边界
    checkWall(i);
  }


  // =====================================
  // 第2周：画框
  // =====================================

  noFill();
  stroke(60, 38, 30);
  strokeWeight(frameSize);

  rect(
    frameSize / 2,
    frameSize / 2,
    width - frameSize,
    height - frameSize
  );

  strokeWeight(1);
}


// ========================================
// 第2周：基本图形
// 第4周函数类型①
// 无参数 + 无返回值
// ========================================

function drawNight() {

  // 天空
  noStroke();
  fill(30, 32, 75);

  rect(
    0,
    0,
    width,
    seaY
  );


  // 月亮
  fill(255, 225, 150);
  fill(titleColor);

  ellipse(
    moonX,
    moonY,
    moonSize,
    moonSize
  );


  // 用天空颜色盖住一部分，形成月牙
  fill(30, 32, 75);

  ellipse(
    moonX + moonSize * 0.25,
    moonY - moonSize * 0.15,
    moonSize * 0.9,
    moonSize * 0.9
  );


  // 星星
  stroke(245, 240, 225);
  strokeWeight(3);

  point(width * 0.12, height * 0.25);
  point(width * 0.25, height * 0.15);
  point(width * 0.40, height * 0.22);
  point(width * 0.58, height * 0.12);
  point(width * 0.70, height * 0.32);
  point(width * 0.90, height * 0.30);

  strokeWeight(1);


  // 湖水
  noStroke();
  fill(40, 68, 112);

  rect(
    0,
    seaY,
    width,
    height - seaY
  );


  // 月光倒影
  fill(255, 225, 150, 120);

  ellipse(
    moonX,
    seaY + height * 0.05,
    moonSize,
    height * 0.015
  );

  fill(255, 225, 150, 60);

  ellipse(
    moonX,
    seaY + height * 0.11,
    moonSize * 0.6,
    height * 0.01
  );


  // 水面波纹
  noFill();
  stroke(110, 145, 190);

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


  // 睡莲叶
  noStroke();

  fill(25, 75, 68);
  ellipse(
    width * 0.18,
    height * 0.91,
    width * 0.16,
    height * 0.05
  );

  fill(60, 125, 92);
  ellipse(
    width * 0.18,
    height * 0.905,
    width * 0.13,
    height * 0.035
  );


  fill(25, 75, 68);
  ellipse(
    width * 0.48,
    height * 0.96,
    width * 0.17,
    height * 0.055
  );

  fill(60, 125, 92);
  ellipse(
    width * 0.48,
    height * 0.955,
    width * 0.14,
    height * 0.038
  );


  fill(25, 75, 68);
  ellipse(
    width * 0.75,
    height * 0.90,
    width * 0.15,
    height * 0.05
  );

  fill(60, 125, 92);
  ellipse(
    width * 0.75,
    height * 0.895,
    width * 0.12,
    height * 0.035
  );


  // 自定义图形
  fill(28, 72, 65);

  beginShape();

  vertex(width * 0.07, height * 0.90);
  vertex(width * 0.12, height * 0.87);
  vertex(width * 0.08, height * 0.92);
  vertex(width * 0.055, height * 0.93);

  endShape(CLOSE);


  // 芦苇
  stroke(15, 42, 50);
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


  // 文字
  noStroke();

  fill(titleColor);
  textSize(width / 35);

  text(
    "Firefly Night",
    width * 0.05,
    height * 0.09
  );


  fill(205, 200, 220);
  textSize(width / 70);

  text(
    "Arrow Keys / Mouse / 1 / 2",
    width * 0.05,
    height * 0.13
  );
}


// ========================================
// 第4周函数类型②
// 有参数 + 无返回值
// ========================================

function drawBug(i, r, g, b) {

  noStroke();

  // 外层光
  fill(r, g, b, 70);

  ellipse(
    x[i],
    y[i],
    bugSize * 1.8,
    bugSize * 1.8
  );


  // 第二层光
  fill(r, g, b, 120);

  ellipse(
    x[i],
    y[i],
    bugSize * 1.4,
    bugSize * 1.4
  );


  // 身体
  fill(r, g, b);

  ellipse(
    x[i],
    y[i],
    bugSize,
    bugSize
  );


  // 小翅膀
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


  // 头
  fill(80, 60, 50);

  ellipse(
    x[i],
    y[i] - bugSize * 0.42,
    bugSize * 0.35,
    bugSize * 0.40
  );
}


// ========================================
// 第4周函数类型③
// 无参数 + 有返回值
// ========================================

function getBugSize() {

  return bugSize;
}


// ========================================
// 第4周函数类型④
// 有参数 + 有返回值
//
// 第5周：圆形碰撞
// ========================================

function checkMoon(i) {

  let s = getBugSize();

  let d = dist(
    x[i],
    y[i],
    moonX,
    moonY
  );

  if (d < (s + moonSize) / 2) {

    return true;

  } else {

    return false;
  }
}


// ========================================
// 第5周：边界检查
// ========================================

function checkWall(i) {

  let s = getBugSize();


  // 第一只：键盘控制
  if (i == 0) {

    // 左边
    if (x[i] < frameSize + s) {

      x[i] = frameSize + s;

    // 右边
    } else if (x[i] > width - frameSize - s) {

      x[i] = width - frameSize - s;
    }


    // 上面
    if (y[i] < height * 0.20) {

      y[i] = height * 0.20;

    // 下面
    } else if (y[i] > seaY - s) {

      y[i] = seaY - s;
    }


  } else {


    // 其他三只：自动移动

    // 左边
    if (x[i] < frameSize + s) {

      x[i] = frameSize + s;
      speedX[i] = speedX[i] * -1;


    // 右边
    } else if (x[i] > width - frameSize - s) {

      x[i] = width - frameSize - s;
      speedX[i] = speedX[i] * -1;
    }


    // 上面
    if (y[i] < height * 0.20) {

      y[i] = height * 0.20;
      speedY[i] = speedY[i] * -1;


    // 下面
    } else if (y[i] > seaY - s) {

      y[i] = seaY - s;
      speedY[i] = speedY[i] * -1;
    }
  }
}


// ========================================
// 第5周：三种移动
//
// ① 速度
// ② 加速度
// ③ 振动
// ========================================

function moveBug(i) {

  // ① 速度
  x[i] = x[i] + speedX[i];
  y[i] = y[i] + speedY[i];


  // ② 加速度
  // 第二只：i == 1
  if (i == 1) {

    speedY[i] = speedY[i] + accel;

    if (speedY[i] > 1.5) {

      accel = -0.01;

    } else if (speedY[i] < -1.5) {

      accel = 0.01;
    }
  }


  // ③ 振动
  // 第四只：i == 3
  if (i == 3) {

    y[i] =
      height * 0.35 +
      sin(angle) * height * 0.08;

    angle = angle + 0.03;
  }
}


// ========================================
// 第6周：鼠标按下事件
// ========================================

function mousePressed() {

  // 第一只移动到鼠标位置
  x[0] = mouseX;
  y[0] = mouseY;

  // 标题变粉色
  titleColor = color(
    255,
    185,
    205
  );
}


// ========================================
// 第6周：鼠标松开事件
// ========================================

function mouseReleased() {

  titleColor = color(
    255,
    225,
    170
  );
}


// ========================================
// 第6周：键盘事件
// 方向键 + 1、2键
// ========================================

function keyPressed() {

  // 左方向键
  if (keyCode === LEFT_ARROW) {

    x[0] = x[0] - 10;


  // 右方向键
  } else if (keyCode === RIGHT_ARROW) {

    x[0] = x[0] + 10;


  // 上方向键
  } else if (keyCode === UP_ARROW) {

    y[0] = y[0] - 10;


  // 下方向键
  } else if (keyCode === DOWN_ARROW) {

    y[0] = y[0] + 10;
  }


  // 第3周 switch
  // 第6周 key

  switch (key) {

    case '1':

      titleColor = color(
        255,
        185,
        205
      );

      break;


    case '2':

      titleColor = color(
        185,
        210,
        255
      );

      break;
  }
}
