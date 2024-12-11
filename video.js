var snapshot = [];
function takeSnapshot() {
  snapshot.push(video.get());
  if (snapshot.length > 25) {
    snapshot.splice(0, 1);
  }
}
var img1;
function setup() {
  createCanvas(800, 600);
  background(255);
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  img1 = video.get();
  image(video.get(), 0, 0);
}

function draw() {
  tint(255, 30);
  image(video, 0, 0, 800, 600);
  var img2 = video.get();
}

// var snapshot = [];
// var img1;

// function takeSnapshot() {
//   snapshot.push(video.get());
//   if (snapshot.length > 25) {
//     snapshot.splice(0, 1);
//   }
// }

// function setup() {
//   createCanvas(800, 600);
//   background(255);
//   video = createCapture(VIDEO);
//   video.size(800, 600);
//   video.hide();
//   takeSnapshot();
//   img1 = snapshot[0];
// }

// setInterval(makeSnapshot, 500);

// function makeSnapshot() {
//   img1 = createImage(800, 600);
//   // takeSnapshot();
//   // var img2 = snapshot[1];
//   // if (img1) {
//   //   img2.blend(img1, 0, 0, 800, 600, 0, 0, 800, 600, MULTIPLY);
//   // }
//   // image(img2, 0, 0);
//   // img1.copy(img2, 0, 0, 800, 600, 0, 0, 800, 600);
// }
