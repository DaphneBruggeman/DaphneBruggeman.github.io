const Model = ml5.imageClassifier('./Model/model.json', modelLoaded)

let score = 0;
let model = false;
let synth = window.speechSynthesis;

// Verkrijg de HTML elementen
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")
const prediction = document.querySelector("#prediction")
const predictionDiv = document.querySelector("#prediction-div")

fileButton.addEventListener("change",(event)=>loadFile(event))

function loadFile(event){
    image.src = URL.createObjectURL(event.target.files[0]);
    image.addEventListener("load", ()=> userImgUploaded())
    function userImgUploaded(){
        if(model === true){
            console.log("Foto is zichtbaar");
            Model.classify(document.getElementById("output"), (err, results)=>{
                console.log(results);
                predictionDiv.style.display = "block";
                prediction.innerHTML = results[0].label
                if(results[0].label === "fles"){
                    speak("Gefeliciteerd, Je hebt de fles gefotografeerd")
                    score++
                    document.getElementById("score").textContent = "Je score =" + score;
                }else{
                    speak("Dit is geen fles. Probeer opnieuw")
                }
            })
        }
    }
}

function modelLoaded(){
    model = true
    console.log('Model is loaded!')
    document.getElementById("score").textContent = "Je score = : " + score
    document.getElementById("giveWord").style.display = "block"
    document.getElementById("upload").style.display = "block"
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        console.log(text)
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

function givePrompt(){
    let word = "Fotografeer een fles";
    speak(word)
}