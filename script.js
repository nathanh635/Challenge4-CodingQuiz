let correct = 0, totalQuestionsAsked = 0, percent = 0; questionnumber = 0;
let name = "";
let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let submitButton = document.getElementById("submit");
let cancelButton = document.getElementById("cancel");
let nameInput = document.getElementById("nameInput");
let questionLabel = document.getElementById("question");
let answers = document. querySelectorAll(".answer")
let quizSpace = document.getElementById("quiz");
let gamesPlayed = 0
/*let highScores = [
  highscore1 = {name],
  scores: []
}*/

let questions = [
  {
    question: "Which is the correct method if you want to change an object's properties?",
    answers: ["querySelector", "setAttribute", "changeAttribute", "adjustAttribute"],
    answerkey: 1
  }, {
    question: "Javascript waits for a button click using the __________ function.",
    answers: ["clickAwaiter", "buttonThingy", "eventListener", "dotheClick"],
    answerkey: 2
  }, {
    question: "What is the library we tap into to save an object to local storage?",
    answers: ["SMON", "MRIA", "LNDSAY", "JSON"],
    answerkey: 3
  }, {
    question: "Objects cannot be saved to local storage without the use of JSON, and are converted to what?",
    answers: ["strings", "arrays", "they are not converted to anything", "super-objects"],
    answerkey: 1
  }, {
    question: "What are you accessing if you type 'console.log(Window)'?",
    answers: ["the windows of a house", "microsoft windows", "the browser window", "it won't access anything"],
    answerkey: 2
  }, {
    question: "How many objects will 'querySelector' grab?",
    answers: [1, "up to 5", 0, "all of them"],
    answerkey: 0
  }]
  ;

function setTime() {
  // Sets interval in variable
  var secondsLeft = 60;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    //timer.setAttribute("display", "inline");
    timer.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      endCard()
    }

  }, 1000);
}


function startQuiz() {
  startButton.setAttribute("style", "display:none");

setTime();
generateQuestion();

}

startButton.addEventListener("click", function(event) {
  startQuiz();
})

function generateQuestion() {
//select random question

let random = Math.floor(Math.random()*questions.length); //total number of questions

//print question to question label
questionLabel.textContent = questions[random].question;
 
//set answers in answer boxes

for (i=0; i<4; i++) {
  answers[i].textContent = questions[random].answers[i];
}

//need to ensure same question not asked multiple times

 // Check if the clicked element was an image

 quizSpace.addEventListener("click", function(event) {
  let element = event.target;

 if (element.matches("#answer1") && questions[random].answerkey == 0) {
  // Get the current value of the image's data-state attribute
  //if (questions[random].answerkey = ) if the answer key matches the id of the element clicked, mark it correct
  correct++;
  generateQuestion();
 }
  else if (element.matches("#answer2") && questions[random].answerkey == 1) {
    correct++;
    generateQuestion();
  }
  else if (element.matches("#answer3") && questions[random].answerkey == 2) {
    correct++;
    generateQuestion();
  }
  else if (element.matches("#answer4") && questions[random].answerkey == 3) {
    correct++;
    generateQuestion();
  }
  else {
    secondsLeft-=5;
    generateQuestion();
  }

})

//Once timer expires, quiz ends
//Scores are logged to list of high scores
//button to log scores and button to clear scores
//button to return to quiz page

function endCard() {

  timer.setAttribute("display", "none");
questionLabel.textContent = "You got " + correct + " answers correct.";

answers[0].textContent = ""

nameInput.setAttribute("display", "block")
submitButton.setAttribute("display", "block")
cancelButton.setAttribute("display", "block")


}


function displayHighScores() {
  questionLabel.textContent = "High Scores";
  //answer[0].textContent = "High Scores"
  for (i=0; i < totalHighScores;i++) {
    //generate list of high scores

}
}

submitButton.addEventListener("click", function(event) {
  //add score to score array
  name = nameInput.value;
  totalHighScores++;
  //highScores.names.push
  //highScores.scores.push
  //sort arrays
})}