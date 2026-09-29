// ========================================
// 1~5周累计作业：Firefly Night
// ========================================

let x = [];
let y = [];
let speedX = [];
let speedY = [];

let num = 5;

let bugSize;
let moonSize;
let starSize;

let moonX;
let moonY;

let seaY;
let grassY;

let accel = 0.01;
let angle = 0;


// ========================================
// 第1周：setup
// ========================================

function setup() {

  createCanvas(600, 500);

  // 使用变量，让图形跟画布大小一起变化
  bugSize = width / 25;
  moonSize = width / 7;
  starSize = width / 120;

  moonX = width * 0.82;
  moonY = height * 0.18;

  seaY = height * 0.65;
  grassY = height * 0.86;


  // =====================================
  // 第4周：数组
  // =====================================

  x[0] = width * 0.15;
  x[1] = width * 0.30;
  x[2] = width * 0.45;
  x[3] = width * 0.65;
  x[4] = width * 0.82;

  y[0] = height * 0.35;
  y[1] = height * 0.48;
  y[2] = height * 0.28;
  y[3] = height * 0.42;
  y[4] = height * 0.32;


  // =====================================
  // 第5周：速度
  // =====================================

  speedX[0] = 1;
  speedX[1] = -1;
  speedX[2] = 1.2;
  speedX[3] = -1.2;
  speedX[4] = 1;

  speedY[0] = 0.5;
  speedY[1] = -0.5;
  speedY[2] = 0.7;
  speedY[3] = -0.7;
  speedY[4] = 0.5;
}


// ========================================
// 第1周：draw
// ========================================

function draw() {

  background(20, 30, 65);

  drawNight();


  // =====================================
  // 第3周：for 반복
  // =====================================

  for (let i = 0; i < num; i++) {

    moveBug(i);


    // ===================================
    // 第3周：if / else
    // 第5周：圆形碰撞
    // ===================================

    if (checkMoon(i)) {

      // 碰到月亮时变成粉橙色
      drawBug(i, 255, 160, 130);

    } else {

      // 平时是黄色
      drawBug(i, 255, 235, 100);
    }


    // 边界碰撞
    checkWall(i);
  }
}


// ========================================
// 第4周 函数类型①
// 无参数 + 无返回值
// ========================================

function drawNight() {

  noStroke();


  // =====================================
  // 第2周：圆 + 颜色
  // 月亮
  // =====================================

  fill(255, 235, 170);

  ellipse(
    moonX,
    moonY,
    moonSize,
    moonSize
  );


  // 用背景颜色遮住一部分形成月牙
  fill(20, 30, 65);

  ellipse(
    moonX + moonSize * 0.25,
    moonY - moonSize * 0.15,
    moonSize * 0.9,
    moonSize * 0.9
  );


  // =====================================
  // 第2周：point 点
  // 星星
  // =====================================

  stroke(255);
  strokeWeight(3);

  point(width * 0.10, height * 0.13);
  point(width * 0.20, height * 0.20);
  point(width * 0.30, height * 0.11);
  point(width * 0.40, height * 0.18);
  point(width * 0.55, height * 0.10);
  point(width * 0.68, height * 0.24);

  strokeWeight(1);


  // 小圆星星
  noStroke();
  fill(255);

  ellipse(
    width * 0.14,
    height * 0.27,
    starSize,
    starSize
  );

  ellipse(
    width * 0.36,
    height * 0.07,
    starSize,
    starSize
  );

  ellipse(
    width * 0.62,
    height * 0.17,
    starSize,
    starSize
  );


  // =====================================
  // 第2周：矩形
  // 海面
  // =====================================

  fill(35, 70, 110);

  rect(
    0,
    seaY,
    width,
    grassY - seaY
  );


  // =====================================
  // 月光倒影
  // =====================================

  fill(220, 220, 170);

  ellipse(
    moonX,
    seaY + height * 0.04,
    moonSize,
    height * 0.02
  );

  ellipse(
    moonX,
    seaY + height * 0.10,
    moonSize * 0.7,
    height * 0.015
  );

  ellipse(
    moonX,
    seaY + height * 0.16,
    moonSize * 0.4,
    height * 0.01
  );


  // =====================================
  // 第2周：arc 圆弧
  // 海面波纹
  // =====================================

  noFill();
  stroke(100, 150, 190);

  arc(
    width * 0.20,
    seaY + height * 0.08,
    width * 0.10,
    height * 0.04,
    0,
    PI
  );

  arc(
    width * 0.40,
    seaY + height * 0.14,
    width * 0.12,
    height * 0.04,
    0,
    PI
  );

  arc(
    width * 0.64,
    seaY + height * 0.07,
    width * 0.10,
    height * 0.04,
    0,
    PI
  );


  // =====================================
  // 草地
  // =====================================

  noStroke();
  fill(25, 65, 55);

  rect(
    0,
    grassY,
    width,
    height - grassY
  );


  // =====================================
  // 第2周：line 线
  // 第3周：for
  // 草
  // =====================================

  stroke(55, 120, 75);

  for (let i = 1; i < 7; i++) {

    let grassX = i * width / 7;

    line(
      grassX,
      height,
      grassX - width * 0.02,
      grassY
    );

    line(
      grassX,
      height,
      grassX + width * 0.02,
      grassY
    );
  }


  // =====================================
  // 第2周：自定义图形
  // 小叶子
  // =====================================

  noStroke();
  fill(75, 140, 85);

  beginShape();

  vertex(
    width * 0.10,
    grassY + height * 0.11
  );

  vertex(
    width * 0.14,
    grassY + height * 0.04
  );

  vertex(
    width * 0.17,
    grassY + height * 0.11
  );

  endShape(CLOSE);


  // =====================================
  // 小花
  // =====================================

  // 粉色花
  fill(255, 180, 200);

  ellipse(
    width * 0.20,
    grassY + height * 0.05,
    starSize * 2.5,
    starSize * 2.5
  );

  ellipse(
    width * 0.36,
    grassY + height * 0.10,
    starSize * 2.5,
    starSize * 2.5
  );


  // 紫色花
  fill(220, 190, 255);

  ellipse(
    width * 0.60,
    grassY + height * 0.05,
    starSize * 2.5,
    starSize * 2.5
  );

  ellipse(
    width * 0.76,
    grassY + height * 0.10,
    starSize * 2.5,
    starSize * 2.5
  );


  // 花心
  fill(255, 225, 120);

  ellipse(
    width * 0.20,
    grassY + height * 0.05,
    starSize,
    starSize
  );

  ellipse(
    width * 0.36,
    grassY + height * 0.10,
    starSize,
    starSize
  );

  ellipse(
    width * 0.60,
    grassY + height * 0.05,
    starSize,
    starSize
  );

  ellipse(
    width * 0.76,
    grassY + height * 0.10,
    starSize,
    starSize
  );


  // =====================================
  // 第2周：文字
  // =====================================

  fill(230);

  textSize(width / 40);

  text(
    "Firefly Night",
    width * 0.05,
    height * 0.08
  );
}


// ========================================
// 第4周 函数类型②
// 有参数 + 无返回值
// ========================================

function drawBug(i, r, g, b) {

  noStroke();


  // 萤火虫外面的光
  fill(r, g, b, 70);

  ellipse(
    x[i],
    y[i],
    bugSize * 1.8,
    bugSize * 1.8
  );


  // 萤火虫身体
  fill(r, g, b);

  ellipse(
    x[i],
    y[i],
    bugSize,
    bugSize
  );


  // 萤火虫的头
  fill(80, 60, 50);

  ellipse(
    x[i],
    y[i] - bugSize * 0.4,
    bugSize * 0.35,
    bugSize * 0.4
  );
}


// ========================================
// 第4周 函数类型③
// 无参数 + 有返回值
// ========================================

function getBugSize() {

  return bugSize;
}


// ========================================
// 第4周 函数类型④
// 有参数 + 有返回值
//
// 第5周：圆和圆碰撞
// ========================================

function checkMoon(i) {

  let s = getBugSize();


  // 萤火虫和月亮中心之间的距离
  let d = dist(
    x[i],
    y[i],
    moonX,
    moonY
  );


  // 圆和圆发生碰撞
  if (d < (s + moonSize) / 2) {

    return true;

  } else {

    return false;
  }
}


// ========================================
// 第5周：边界碰撞
// ========================================

function checkWall(i) {

  let s = getBugSize();


  // 左右边界
  if (
    x[i] < s / 2 ||
    x[i] > width - s / 2
  ) {

    speedX[i] = speedX[i] * -1;
  }


  // 上下边界
  if (
    y[i] < height * 0.25 ||
    y[i] > grassY - s / 2
  ) {

    speedY[i] = speedY[i] * -1;
  }
}


// ========================================
// 第5周：3种移动
//
// ① 速度
// ② 加速度
// ③ 振动
// ========================================

function moveBug(i) {


  // =====================================
  // ① 速度
  // =====================================

  x[i] = x[i] + speedX[i];
  y[i] = y[i] + speedY[i];


  // =====================================
  // ② 加速度
  // 第一只萤火虫
  // =====================================

  if (i == 0) {

    speedY[i] = speedY[i] + accel;

    if (speedY[i] > 1.5) {

      accel = -0.01;

    } else if (speedY[i] < -1.5) {

      accel = 0.01;
    }
  }


  // =====================================
  // ③ 振动
  // 第五只萤火虫
  // =====================================

  if (i == 4) {

    y[i] =
      height * 0.35 +
      sin(angle) * height * 0.08;

    angle = angle + 0.03;
  }
}