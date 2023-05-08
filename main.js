object = []
status1 = " "
Object_To_be_found = document.getElementById("obj_name").value 
Object_to_detect = Object_To_be_found.toUpperCase()
console.log(Object_to_detect)
function setup(){
    Canvas = createCanvas(400,400)
    Canvas.position(550,400)
    video = createCapture(VIDEO)
    video.hide()
    video.size(400,400)
}
function begin(){
    objectDetect = ml5.objectDetector("cocossd",modelloaded)
    document.getElementById("status").innerHTML = "Started Detecting....."
}
function modelloaded(){
    console.log("MOdel loaded")
    status1 = true;
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        object = result
    }
}
function draw(){
    image(video,0,0,400,400)
    if(status1 != " "){
        objectDetect.detect(video,gotResult)
        for(i=0;i<object.lenght;i++){
            r = random(255)
            g = random(255)
            b = random(255)
            fill(r,g,b)
            console.log(object[i].confidence)
            percent = floor((object[i].confidence)*100)
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15)
            noFill()
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            Obj = object[i].label
            obj_To_found = Obj.toUpperCase()
            console.log(Obj)
            if(Object_to_detect == obj_To_found){
                document.getElementById("Obj_found").innerHTML = Object_To_be_found + "Have been found"
                document.getElementById("status").innerHTML = "Object Detected"
            }
            else{
                document.getElementById("Obj_found").innerHTML = Object_To_be_found + "have not been detected"
                document.getElementById("status").innerHTML = "Object has not Detected"
            }
        }
    }
}