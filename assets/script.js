
// selecting all the elements that make up the game
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timer = document.getElementById("timer");
var score = document.getElementById("score");
var highscores = document.getElementById("scoreboard");

// selecting all the answer choices
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");

var quizTime = 60;
let timeOut= 0;
let countDown;
var scoreCount = 0;

var question1 = {
    question: "this is place holder for question 1",
    choiceA: "this is place holder for question1 choiceA",
    choiceB: "this is place holder for question1 choiceB",
    choiceC: "this is place holder for question1 choiceC",
    choiceD: "this is place holder for question1 choiceD",
    correct: "A"
}
var question2 = {
    question: "this is place holder for question 2",
    choiceA: "this is place holder for question2 choiceA",
    choiceB: "this is place holder for question2 choiceB",
    choiceC: "this is place holder for question2 choiceC",
    choiceD: "this is place holder for question2 choiceD",
    correct: "A"
    
}
var question3 = {
    question: "this is place holder for question 3",
    choiceA: "this is place holder for question3 choiceA",
    choiceB: "this is place holder for question3 choiceB",
    choiceC: "this is place holder for question3 choiceC",
    choiceD: "this is place holder for question3 choiceD",
    correct: "A"
}
var question4 = {
    question: "this is place holder for question 4",
    choiceA: "this is place holder for question4 choiceA",
    choiceB: "this is place holder for question4 choiceB",
    choiceC: "this is place holder for question4 choiceC",
    choiceD: "this is place holder for question4 choiceD",
    correct: "A"
}
const A = "A";
const B = "B";
const C = "C";
const D = "D";

let questions = [question1,question2,question3,question4];

let lastQuestion = questions.length - 1;
let runningQuestionIndex = 0;

function renderQuestion(){
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<h2>" + q.question + "</h2>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
function timePenalty(){
    quizTime -= 5;  
}

function addScore(){
    scoreCount += 10;
    score.innerHTML = scoreCount;
}

function timerRender(){
   
    if (timeOut <= quizTime){
        timer.innerHTML = quizTime;
        quizTime--;
    }else{
        endQuiz();
        quizTime = 0;
        if(runningQuestionIndex < lastQuestion){
            runningQuestionIndex++;
            renderQuestion();
        }else {
            clearInterval(countDown);
            scoreBoardRender();
        }
    }
}

function checkAnswer(answer){
    if(answer == questions[runningQuestionIndex].correct){
       answerIsCorrect();
    }else{
        answerIsWrong();
    }
    if (runningQuestionIndex < lastQuestion){
        runningQuestionIndex++;
        renderQuestion();        
    }else{
        endQuiz();
        scoreBoardRender();
    }
}

function answerIsCorrect(){
    addScore();
}


function answerIsWrong(){
    timePenalty();   
}



function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    countDown = setInterval(timerRender,1000);
    timerRender();
}


start.addEventListener("click",startQuiz);
