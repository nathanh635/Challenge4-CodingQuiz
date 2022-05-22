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
let check = document.getElementById("correct");
let secondsLeft = 0;
let gamesPlayed = 0;

let highScores = [
  {name: "",
  score: 0
}
]

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

  function endCard() {

    timer.setAttribute("display", "none");
    questionLabel.textContent = "You got " + correct + " answers correct.";
  
  answers[0].textContent = "";
  answers[1].textContent = "";
  answers[2].textContent = "";
  answers[3].textContent = "If you would like to submit your score, click Submit. If not, click Cancel."
  check.textContent = "";
  
  nameInput.setAttribute("style", "display: block");
  submitButton.setAttribute("style", "display: block");
  cancelButton.setAttribute("style", "display: block");

  }
  

function setTime() {

  var timerInterval = setInterval(function() {
    secondsLeft--;
    //timer.setAttribute("display", "inline");
    timer.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft <= 0) {
      //Once timer expires, quiz ends; calls function to display score
      clearInterval(timerInterval);
      endCard();
    }

  }, 1000);

  return secondsLeft;
}


function startQuiz() {
  startButton.setAttribute("style", "display:none");
secondsLeft = 60;
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
  //if the answer key matches the id of the element clicked, mark it correct

 if (element.matches("#answer1") && questions[random].answerkey == 0) {
  correct++;
  console.log(correct);
  check.textContent = "Correct!"
 }
  else if (element.matches("#answer2") && questions[random].answerkey == 1) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
  }
  else if (element.matches("#answer3") && questions[random].answerkey == 2) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
   }
  else if (element.matches("#answer4") && questions[random].answerkey == 3) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
  }
  else {
      console.log(correct);
    check.textContent = "Incorrect!"
    secondsLeft-=5;
  }

  //Generate a new question
  generateQuestion();
})


//Scores are logged to list of high scores
//button to log scores and button to clear scores
//button to return to quiz page



function displayHighScores() {
  questionLabel.textContent = "High Scores";
  if (highScores.name.length>0) {
    highScores = localStorage.getItem("highScores", JSON.parse(highScores));
  }

  highScores.forEach((e) => {
    answer[0].textContent += highScores.name + "   " + highScores.score + "\n";
})

    startButton.setAttribute("style", "display:block");
    startButton.textContent = "Restart";
}


submitButton.addEventListener("click", function(event) {
  //add score to score array
  name = nameInput.value.trim();
  //totalHighScores++;
    highScores.push({name:highScores.name, correct:highScores.score});

  //sort arrays
  highScores.sort((a, b) => {
    return b.score - a.score;
  })
  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScores();
})}