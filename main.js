song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

var hpplay = "false";
var ppplay = "false";
hpstatusplay = "";
ppstatusplay = "";

function preload() {
    hp = loadSound("hp.mp3");
    pp = loadSound("peter_pans_flight.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 500, 400);
    hpstatusplay = hp.isPlaying();
    ppstatusplay = pp.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        pp.stop();
        if(hpstatusplay == false) {
            hp.play()
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        hp.stop();
        if(ppstatusplay == false) {
            pp.play()
        }
    }
}
function modelLoaded() {
    console.log("Model is Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left x: " + leftWristX + " left y: " + leftWristY);
        console.log("right x: " + rightWristX + " right y: " + rightWristY);
    }
}