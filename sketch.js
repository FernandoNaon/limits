let n = 400; 
let nodes = [];
let t = 0;
let radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB);
  radius = min(windowWidth, windowHeight) * 0.4;
  for (let i = 0; i < n * 25; i++) {
    let angle = random(TWO_PI);
    let r = random(radius); 
    nodes.push({
      x: r * cos(angle),
      y: r * sin(angle),
      angle: angle
    });
  }
  strokeWeight(0.001);
  frameRate(200);
}

function draw() {
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  fill(5, 0.05);
  stroke(255);

  for (let i = 0; i < n; i++) {
    let node = nodes[i];
    let d = dist(node.x, node.y, 0, 0);

    if (d > radius) {
      node.x += cos(node.angle);
      node.y += sin(node.angle);
    } else {
      node.x += 1.5 - 3 * noise(node.x / 999, d / 990, t);
      node.y += 1 - 2 * noise(node.y / 99, d / 99, t);
      node.angle = atan2(node.y, node.x); 
    }

    let x = node.x + centerX;
    let y = node.y + centerY;

    point(x , y );
  }

  noFill();
  stroke(255, 5); 
  ellipse(centerX, centerY, radius * 2);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let x1 = nodes[i].x + centerX;
      let y1 = nodes[i].y + centerY;
      let x2 = nodes[j].x + centerX;
      let y2 = nodes[j].y + centerY;
      let distance = dist(x1, y1, x2, y2);

      if (distance < 2) {
        strokeWeight(0.3);
        line(x1, y1, x2, y2);
      }
    }
  }

  t += 0.01;
}
