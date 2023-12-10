Aa_Raaha_Ho_Mein_Zindagi="";
Mahiye_Jinna_Sohna="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Aa_Raaha_Ho_Mein_Zindagi = "";
song_Mahiye_Jinna_Sohna= "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Aa_Raaha_Ho_Mein_Zindagi= loadSound("Aa_Raaha_Ho_Mein_Zindagi.mp3");
    Mahiye_Jinna_Sohna = loadSound("Mahiye_Jinna_Sohna.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Aa_Raaha_Ho_Mein_Zindagi = Aa_Raaha_Ho_Mein_Zindagi.isPlaying();
    console.log(song_Aa_Raaha_Ho_Mein_Zindagi);

    song_Mahiye_Jinna_Sohna = Mahiye_Jinna_Sohna.isPlaying();
    console.log(song_Mahiye_Jinna_Sohna);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Mahiye_Jinna_Sohna.stop();
        if(song_Aa_Raaha_Ho_Mein_Zindagi == false){
            Mahiye_Jinna_Sohna.play();
        }
        else{
            console.log("Song Name: Mahiye Jinna Sohna");
            document.getElementById("song_id").innerHTML = "Song Name: Mahiye Jinna Sohna";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Peter_pan_song.stop();
        if(song_Harry_potter_theme == false){
            Harry_potter_theme_song.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}