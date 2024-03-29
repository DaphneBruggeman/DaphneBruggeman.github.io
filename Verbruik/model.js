const predictButton = document.getElementById("btn");
const horsepowerDiv = document.getElementById("horsepower");
const cylinderDiv = document.getElementById("cylinders");
const resultDiv = document.getElementById("result");

predictButton.addEventListener("click", (e) => {
  e.preventDefault();
  makePrediction(+horsepowerDiv.value, +cylinderDiv.value);
});

let nn = ml5.neuralNetwork({ task: "regression", debug: true });
nn.load("./model/model.json", modelLoaded);

function modelLoaded() {
  console.log("model loaded");
}

async function makePrediction(horsepower, cylinders) {
  const results = await nn.predict({
    horsepower: horsepower,
    cylinders: cylinders,
  });
  resultDiv.innerText = `${results[0].mpg}`;
}
