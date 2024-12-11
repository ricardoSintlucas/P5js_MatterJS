class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(4, 32);
  }

  update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    noStroke();
    let px = floor(this.x / vScale);
    let py = floor(this.y / vScale);
    let col = video.get(px, py);
    //console.log(col);
    fill(col[0], col[1], col[2], 0.5);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
