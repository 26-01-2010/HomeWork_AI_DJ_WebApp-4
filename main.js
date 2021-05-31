beleiver = "";
harry_potter_theme_song = "";

beleiver_status = "";
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;
function preload()
{
	beleiver = loadSound("Believer.mp3");
    harry_potter_theme_song = loadSound("Harry Potter Theme Song.mp3");
}

function setup()
{
    canvas = createCanvas(400,400);
    canvas.position(500, 160);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 400);
    beleiver_status = beleiver.isPlaying()
    if(scoreLeftWrist > 0.2)
    {
        fill("#000000");
        stroke("#FFFFFF");
        circle(leftWristX,leftWristY,20);
        harry_potter_theme_song.stop();
        if(beleiver_status == false)
        {
            beleiver.play();
            document.getElementById("song_name_tag").innerHTML = "Playing - Beleiver by Imagine Dragons";
        }   
    }
}

function modelLoaded()
{
    console.log('PoseNet is initialised!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLeftWrist);
        leftWristScore = floor(leftWristX/500);
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }	
}