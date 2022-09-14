https://teachablemachine.withgoogle.com/models/ejmw1Blxo/

var predidction1 = "";
var predidction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snapshot' src='"+data_uri+"'>"
    })
};

console.log("ml5 version: ",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ejmw1Blxo/model.json', model_Loaded);

function model_Loaded(){
    console.log("model_Loaded")
};

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The Frist Predidction is "+predidction1;
    speak_data2 = "The Second Predidction is "+predidction2;
    utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
};

function check(){
    img = document.getElementById("snapshot");
    classifier.classify(img, gotresults);
}

function gotresults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        predidction1 = results[0].label;
        predidction2 = results[1].label;
        speak();

        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }

        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }

        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }

        if(results[1].label == "Amazing"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }

        if(results[1].label == "Best"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }

        if(results[1].label == "Victory"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;"
        }
    }
}