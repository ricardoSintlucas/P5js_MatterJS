class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    let options = {
      friction: 0.3,
      restitution: 0.6,
    };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    this.hue = [floor(random(255)), floor(random(255)), floor(random(255))];
    Composite.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noStroke();
    fill(this.hue[0], this.hue[1], this.hue[2]);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
