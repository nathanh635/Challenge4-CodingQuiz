let correct = 0, totalQuestionsAsked = 0, percent = 0; questionnumber = 0;
let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let submitButton = document.getElementById("submit");
let cancelButton = document.getElementById("cancel");
let clearButton = document.getElementById("clear");
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
}];

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
  }, {
    question: "What does DOM refer to?",
    answers: ["direct order matrix", "dormant ordinary respirations", "destructive outer machine", "document object model"],
    answerkey: 3
  }, {
    question: "What do you often need to prevent during API functions to ensure it doesn't conflict with your code or inputs?",
    answers: ["the browser's default response", "the code exploding", "the html conflicting with the javascript", "the javascript conflicting with the CSSg"],
    answerkey: 0
  }, {
    question: "What is it called when a click on one element applies to all the parent elements??",
    answers: ["upgrading", "leveling", "bubbling", "handshaking"],
    answerkey: 2
  }, {
    question: "Which of the following is not a valid eventListener?",
    answers: ["click", "mouseover", "touch", "resize"],
    answerkey: 2
  }]
  ;

let questionsDefault = questions

function init() {
  highScores = JSON.parse(localStorage.getItem("highScores"));
}

//Start program by loading high scores from storage
init()

  //Set the timer
function setTime() {

  var timerInterval = setInterval(function() {
    secondsLeft--;
    
    if(secondsLeft <= 0) {
      //Once timer expires, quiz ends; calls function to display score
      clearInterval(timerInterval);
      timer.textContent = "0 seconds remaining";
      endCard();
    } else if (secondsLeft == 1) {
        timer.textContent = secondsLeft + " second remaining";
    }
    else {
      timer.textContent = secondsLeft + " seconds remaining";
    }

  }, 1000);

  return secondsLeft;
}

//Start the quiz when the start button is pressed

startButton.addEventListener("click", function(event) {
  startQuiz();
})

function startQuiz() {
  //hide the start button after the quiz starts
  startButton.setAttribute("style", "display:none");

  //show the answer blocks
  for (i=0; i<4; i++) {
    answers[i].setAttribute("style", "display:block");
  }
  check.textContent = "";

  //reset things in case the "restart" button is clicked from the high scores screen
  clearButton.setAttribute("style", "display: none");
  timer.setAttribute("style", "display: inline");
  questions = questionsDefault;

//Set the timer and generate the first question
  secondsLeft = 60;
  setTime();
  randomNumber = generateQuestion();
}

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

//Make answer space clickable
quizSpace.addEventListener("click", function(event) {
  checkAnswer(randomNumber);

  if (questions.length ==1) {
    secondsLeft = 0;
    endCard();
  } else {
    questions.splice(randomNumber,1);
  }

  randomNumber = generateQuestion();
})

//Check the answer clicked on
function checkAnswer(randomNumber) {
  let element = event.target;
  //if the answer key matches the id of the element clicked, mark it correct

 if (element.matches("#answer1") && questions[randomNumber].answerkey == 0) {
  correct++;
  check.textContent = "Correct!"
 }
  else if (element.matches("#answer2") && questions[randomNumber].answerkey == 1) {
    correct++;
    check.textContent = "Correct!"
  }
  else if (element.matches("#answer3") && questions[randomNumber].answerkey == 2) {
    correct++;
    check.textContent = "Correct!"
   }
  else if (element.matches("#answer4") && questions[randomNumber].answerkey == 3) {
    correct++;
    check.textContent = "Correct!"
  }
  else {
    check.textContent = "Incorrect!"
    secondsLeft-=5;
  }

}
//when the quiz is over, display results
function endCard() {
 
  for (i=0; i<4; i++) {
    answers[i].setAttribute("style", "display:none");
  }

  timer.setAttribute("style", "display:none");
  questionLabel.textContent = "You got " + correct + " answers correct.";

  check.textContent = "If you would like to submit your score, enter your name and click Submit. If not, click Cancel."

  nameInput.setAttribute("style", "display: block");
  submitButton.setAttribute("style", "display: inline");
  cancelButton.setAttribute("style", "display: inline");
}

//Display the high scores page
function displayHighScores() {
  questionLabel.textContent = "High Scores";
  nameInput.setAttribute("style", "display: none");
  submitButton.setAttribute("style", "display: none");
  cancelButton.setAttribute("style", "display: none");
  clearButton.setAttribute("style", "display: initial");
  check.textContent = "";

  //Get list of high scores from local storage
  highScores = JSON.parse(localStorage.getItem("highScores"));
  
  //Print list of high scores
  check.setAttribute('style','white-space: pre;')
  for (let i = 0; i<highScores.length; i++) {
    check.textContent += highScores[i].name + "   " + highScores[i].correct + "\r\n";
}

  startButton.setAttribute("style", "display:inline");
  startButton.textContent = "Restart quiz";
}
  //add score to highScores array
submitButton.addEventListener("click", function(event) {

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
    //reset score variable
         correct = 0;

  //sort highScores array by score
        highScores.sort((a, b) => {
          return b.correct - a.correct;
        })

        //write array highScores to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  //go to the high scores page
  displayHighScores();
})

//clear the high scores
clearButton.addEventListener("click", function(event) {
  highScores = [
    {name: "",
    correct: 0
  }
  ]
  localStorage.setItem("highScores", JSON.stringify(highScores));
  check.textContent = "Scores cleared"
})