
// selecting all the elements that make up the game
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timer = document.getElementById("timer");
var scores = document.getElementById("score");
var highscores = document.getElementById("scoreboard");
var restart = document.getElementById("restart");
var submitForm = document.getElementById("submissionArea");
var finalScore = document.getElementById("endScore");
var scorelist = document.getElementById('scoreList');
var user = document.getElementById('initials');
var previousScores = document.getElementById("previous-scores");
// selecting all the answer choices
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");


var quizTime = 60;          // variables initialized to be used in later functions
let timeOut = 0;
let countDown;
var scoreCount = 0;
var endGameScore;

var question1 = {
    question: "this is place holder for question 1",
    choiceA: "this is place holder for question1 choiceA",   //first question object
    choiceB: "this is place holder for question1 choiceB",
    choiceC: "this is place holder for question1 choiceC",
    choiceD: "this is place holder for question1 choiceD",
    correct: "A"
}
var question2 = {
    question: "this is place holder for question 2",
    choiceA: "this is place holder for question2 choiceA",
    choiceB: "this is place holder for question2 choiceB",      // second question object
    choiceC: "this is place holder for question2 choiceC",
    choiceD: "this is place holder for question2 choiceD",
    correct: "A"

}
var question3 = {
    question: "this is place holder for question 3",
    choiceA: "this is place holder for question3 choiceA",  // third question object
    choiceB: "this is place holder for question3 choiceB",
    choiceC: "this is place holder for question3 choiceC",
    choiceD: "this is place holder for question3 choiceD",
    correct: "A"
}
var question4 = {
    question: "this is place holder for question 4",
    choiceA: "this is place holder for question4 choiceA",
    choiceB: "this is place holder for question4 choiceB",      //4 question object
    choiceC: "this is place holder for question4 choiceC",
    choiceD: "this is place holder for question4 choiceD",
    correct: "A"
}
const A = "A";
const B = "B";      // initialize the answer check with constants equivalent to the answer clicked
const C = "C";
const D = "D";

let questions = [question1, question2, question3, question4];   // puts the questions in an array to be iterated over
var endGameScore;    // initialize the end game score
let lastQuestion = questions.length - 1; // keeps track of the previous question answered
let runningQuestionIndex = 0;  // the question that is currently displayed

function renderQuestion() {                // renders the question to the screen 
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<h2>" + q.question + "</h2>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
function timePenalty() {   // removes time if question is answered wrong 
    quizTime -= 5;
}

function addScore() {               // adds score to your current score count if answered correct
    scoreCount += 10 * quizTime;
    scores.innerHTML = scoreCount;
}

function timerRender() {         //renders a countdown timer and ends the game if you run out of time

    if (timeOut <= quizTime) {
        timer.innerHTML = quizTime;
        quizTime--;
    } else {
        endQuiz();
        quizTime = 0;
        if (runningQuestionIndex < lastQuestion) {
            runningQuestionIndex++;
            renderQuestion();
        } else {
            clearInterval(countDown);
            renderScoreBoard();
        }
    }
}
function checkAnswer(answer) { // checks if answers are correct or not 
    if (answer == questions[runningQuestionIndex].correct) {
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    if (runningQuestionIndex < lastQuestion) {
        runningQuestionIndex++;
        renderQuestion();
    } else {
        endQuiz();
    }
}
function answerIsCorrect() {  // adds score on correct answer
    addScore();
}
function answerIsWrong() {  // takes time away if the answer is wrong 
    timePenalty();
}
function startQuiz() {     // starts the quiz and calls functions to 
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    countDown = setInterval(timerRender, 1000);
    timerRender();
}


function endQuiz() {            // ends the quiz and renders the scoreboard to the screen 
    clearInterval(countDown);
    quiz.style.display = "none";
    endGameScore = scores;
    renderScoreBoard();
    submitForm.style.display = 'block';
    scores.style.display = 'block';
    console.log(scores.style);
}

function renderScoreBoard() {         // handles rendering the score board and end score at the end of the game
    highscores.style.display = "block";
    restart.style.display = "block";
    finalScore.appendChild(endGameScore);
}
function restartQuiz() {            // restarts the quiz and score values allowing the game to be replayable without refresh of page
    quizTime = 60;
    runningQuestionIndex = 0;
    scoreCount = 0;
    endGameScore.innerHTML = scoreCount;
    countDown = setInterval(timerRender, 1000);
    renderQuestion();
    timerRender();
    highscores.style.display = "none";
    restart.style.display = "none";
    quiz.style.display = "block";
    quiz.appendChild(scores);
    scorelist.innerHTML = "";
    previousScores.style.display = "none;"
}

const userscores = JSON.parse(localStorage.getItem('userscores')) || [];  // pulls the userscores from local storage
function saveData() {   // saves the scores to local storage in an array to be retrieved later
    const userscore = {
        name: user.value,
        score: finalScore.textContent
    };
    userscores.push(userscore);
    userscores.sort((A, B) => B.userscore - A.userscore).slice(5);
    localStorage.setItem("userscores", JSON.stringify(userscores));
}

function renderScore() {   // renders the top 5 high scores from storage

    var scoreItem = JSON.parse(localStorage.getItem("userscores"));

    scoreItem.sort(function (a, b) {
        return b.score - a.score;
    });
    scoreItem = scoreItem.splice(0, 5);
    for (var i = 0; i < scoreItem.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = scoreItem[i].name + ' ' + scoreItem[i].score;
        scorelist.appendChild(item);
    }
}

function formSubmission(event) {    // function to handle the submission form 
    event.preventDefault();
    submitForm.style.display = "none";
    saveData();
    renderScore();
    previousScores.style.display = "block";
}

start.addEventListener("click", startQuiz);   //click handlers for the start restart and submit areas 
restart.addEventListener("click", restartQuiz);
submitForm.addEventListener('submit', formSubmission);