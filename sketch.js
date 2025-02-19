////////////////////////////////////////////////////////////////
// Matter.js setup
////////////////////////////////////////////////////////////////
const { Engine, World, Bodies, Body, Composite, Constraint } = Matter;

let engine;
let world;
let boxes = [];
let ground;
let constraint;
let constrainOptions;
let squareSize = 80;

let handPose;
let video;
let hands = [];
let pickUp = false;
let released = false;
let activeBox;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(800, 600);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  //Matter js
  // create an engine
  engine = Engine.create();
  world = engine.world;
  // Engine.run is deprecated
  ground = new Boundary(width / 2, height + 50, width, 100);
  ceiling = new Boundary(width / 2, 0, width, 100);
  wallLeft = new Boundary(-50, height / 2, 100, height);
  wallRight = new Boundary(width + 50, height / 2, 100, height);
  World.add(world, [ground, wallLeft, wallRight]);
  for (let i = 0; i < 10; i++) {
    let xLocation = random(50, width - 50);
    boxes.push(new Box(xLocation, 200, squareSize, squareSize));
  }
  activeBox = boxes[0];
}

function draw() {
  // Draw the webcam video
  //move image by the width of image to the left
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // If there are hands detected
  if (hands.length > 0) {
    for (let i = 0; i < boxes.length; i++) {
      if (calculateDistance(hands[0].index_finger_tip, boxes[i].body.position) < 20) {
        activeBox = boxes[i];
        if (calculateDistance(hands[0].index_finger_tip, hands[0].thumb_tip) < 25 && calculateDistance(hands[0].index_finger_tip, activeBox.body.position) < 20) {
          pickUp = true;
        }
        break;
      }
    }
  }

  if (pickUp) {
    Body.setStatic(activeBox.body, true);
    if (hands.length > 0) {
      Body.setPosition(activeBox.body, { x: hands[0].index_finger_tip.x, y: hands[0].index_finger_tip.y }, true);

      if (calculateDistance(hands[0].index_finger_tip, hands[0].thumb_tip) > 25) {
        Body.setStatic(activeBox.body, false);
        pickUp = false;
      }
    }
  }

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // Draw the keypoints
    fill(0, 255, 0);
    noStroke();
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 10);
    circle(hand.thumb_tip.x, hand.thumb_tip.y, 10);
  }

  //Matter js
  Engine.update(engine);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  ground.show();
  wallLeft.show();
  wallRight.show();
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function mousePressed() {
  boxes.push(new Box(width - mouseX, mouseY, squareSize, squareSize));
}

// Calculating the distance between two points
function calculateDistance(point1, point2) {
  const x = point1.x - point2.x;
  const y = point1.y - point2.y;
  return Math.sqrt(x * x + y * y);
}
