img = "";
objects = [];
modelStatus = "";

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
   
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: detectando objetos";
}

function modelLoaded() {
    console.log("Modelo  carregado")
    modelStatus = true;

    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    tamanho = objects.length;
    console.log("tamanho" + tamanho);
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (modelStatus != "") {

        r = random(255);
        b = random(255);
        g = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : objeto detectado";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de objetos detectado:"+ objects.length;
            fill(r,b,g);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,b,g);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
