
status="";
objects = [];

function setup() {
    canvas =  createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);

}
function start()
{;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="status : Detecting Objects";
    object_name=document.getElementById("object_name").value;
}


function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(r, g, b);
    percent = floor(objects[1].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    if(objects[i].label==object_name)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object_status").innerHTML = object_name + "found";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance( object_name + "found");
        synth.speak(utterThis);

    }
    else
    {
        document.getElementById("object_status").innerHTML = object_name + "notfound";
    }
        }
    }


    
}

function modelLoaded() {
    console.log("Model Loaded!")
    status=true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}