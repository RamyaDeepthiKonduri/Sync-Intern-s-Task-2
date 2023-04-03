const questions = [
    {
        question: " What is the full form of “AI”?",
        answers: [
            { text: "Artificially Intelligent", correct: false},
            { text: "Artificial Intelligence", correct: true},
            { text: "Artificially Intelligence", correct: false},
            { text: "Advanced Intelligence", correct: false},
        ]
    },

    {
        question: "Who developed Python Programming Language?",
        answers: [
            { text: "Wick van Rossum", correct: false},
            { text: "Niene Stom", correct: false},
            { text: "Rasmus Lerdorf", correct: false},
            { text: "Guido van Rossum", correct: true},
        ]
    },

    {
        question: "There are ___ levels of heading in HTML?",
        answers: [
            { text: "6", correct: true},
            { text: "5", correct: false},
            { text: "1", correct: false},
            { text: "3", correct: false},
        ]
    },

    {
        question: "Android is based on which of the following language?",
        answers: [
            { text: "C++", correct: false},
            { text: "C", correct: false},
            { text: "Java", correct: true},
            { text: "HTML", correct: false},
        ]
    },

    {
        question: "What does API stand for?",
        answers: [
            { text: "Application Programming Interface", correct: true},
            { text: "Android Page Interface", correct: false},
            { text: "Application Page Interface", correct: false},
            { text: "Android Programming Interface", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
 }

 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
 }

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
 }

 nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 });
startQuiz();