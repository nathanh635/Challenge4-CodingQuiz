let correct = 0, totalQuestionsAsked = 0, percent = 0; questionnumber = 0;
let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let submitButton = document.getElementById("submit");
let cancelButton = document.getElementById("cancel");
let nameInputForm = document.querySelector("#nameInputForm");
let questionLabel = document.getElementById("question");
let answers = document. querySelectorAll(".answer")
let quizSpace = document.getElementById("quiz");
let check = document.getElementById("correct");
let secondsLeft = 0;
let gamesPlayed = 0;
let randomNumber = 0;

let highScores = [
  {name: "",
  correct: 0
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
//quizSpace.removeEventListener("click", answerClick());


    timer.setAttribute("display", "none");
    questionLabel.textContent = "You got " + correct + " answers correct.";
  
  answers[0].textContent = "";
  answers[1].textContent = "";
  answers[2].textContent = "";
  answers[3].textContent = "If you would like to submit your score, click Submit. If not, click Cancel."
  check.textContent = "";
  
  nameInput.setAttribute("style", "display: block");
  submitButton.setAttribute("style", "display: inline");
  cancelButton.setAttribute("style", "display: inline");
  }
  
function setTime() {

  var timerInterval = setInterval(function() {
    secondsLeft--;
    //timer.setAttribute("display", "inline");
    timer.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft <= 0) {
      //Once timer expires, quiz ends; calls function to display score
      clearInterval(timerInterval);
      timer.textContent = "0 seconds remaining";
      endCard();
    }

  }, 1000);

  return secondsLeft;
}


function startQuiz() {
  startButton.setAttribute("style", "display:none");
  secondsLeft = 60;
  setTime();
randomNumber = generateQuestion();
//quizSpace.addEventListener("click", answerClick())
}

// function answerClick() {
//   checkAnswer(randomNumber);
//   generateQuestion();
// }

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
return random;
}

//need to ensure same question not asked multiple times

//button to log scores and button to clear scores
//button to return to quiz page



function displayHighScores() {
  questionLabel.textContent = "High Scores";
  nameInput.setAttribute("style", "display: none");
  submitButton.setAttribute("style", "display: none");
  cancelButton.setAttribute("style", "display: none");

  console.log(highScores);
  highScores = localStorage.getItem("highScores", JSON.parse(highScores));
  

  answers[0].setAttribute('style','white-space: pre;')

  for (let i = 0; i<highScores.length; i++) {
    answers[0].textContent += highScores[i].name + "   " + highScores[i].correct + "\r\n";
}

    startButton.setAttribute("style", "display:block");
    startButton.textContent = "Restart";
}


submitButton.addEventListener("click", function(event) {
  //add score to score array
  let newName = nameInputForm.value;
  //totalHighScores++;
  let obj = {
    name: nameInputForm.value,
    correct: correct
  }
    if (highScores[0].name == "") {
      highScores[0].name = nameInputForm.value;
      highScores[0].correct = correct;
     } else {
      highScores.push(obj);
     }
    
correct = 0;
  //sort array
  function compare(a, b) {
    const score1 = a.correct;
    const score2 = b.correct;
  
    let comparison = 0;
    if (score1 > score2) {
      comparison = 1;
    } else if (score1<score2) {
      comparison = -1;
    }
    return comparison;
    }
    highScores.sort(compare);


  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScores();
})




quizSpace.addEventListener("click", function(event) {
  checkAnswer(randomNumber);
  generateQuestion();
})

function checkAnswer(randomNumber) {
  let element = event.target;
  //if the answer key matches the id of the element clicked, mark it correct

 if (element.matches("#answer1") && questions[randomNumber].answerkey == 0) {
  correct++;
  console.log(correct);
  check.textContent = "Correct!"

 }
  else if (element.matches("#answer2") && questions[randomNumber].answerkey == 1) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
  }
  else if (element.matches("#answer3") && questions[randomNumber].answerkey == 2) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
   }
  else if (element.matches("#answer4") && questions[randomNumber].answerkey == 3) {
    correct++;
    console.log(correct);
    check.textContent = "Correct!"
  }
  else {
      console.log(correct);
    check.textContent = "Incorrect!"
    secondsLeft-=5;
  }

}