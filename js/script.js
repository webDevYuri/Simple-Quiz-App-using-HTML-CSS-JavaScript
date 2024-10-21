const questions = [ 
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Osmium", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Iron", correct: false }
        ]
    },
    {
        question: "Which country is home to the kangaroo?",
        answers: [
            { text: "Brazil", correct: false },
            { text: "India", correct: false },
            { text: "South Africa", correct: false },
            { text: "Australia", correct: true }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Tokyo", correct: true },
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Quartz", correct: false },
            { text: "Diamond", correct: true },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
            { text: "Neptune", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1920", correct: false },
            { text: "1898", correct: false },
            { text: "1905", correct: false },
            { text: "1912", correct: true }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "H2", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answerButton");
const nextBtn = document.getElementById("nextButton");
const finishMessage = document.querySelector(".finish-message");
const restartBtn = document.getElementById("restartBtn");
const questionWrapper = document.querySelector(".question-wrapper");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.style.display = "none";
    finishMessage.style.display = "none"; 
    questionWrapper.style.display = "block"; 
    answerBtn.style.display = "flex"; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.querySelector(`.answer-buttons .${String.fromCharCode(97 + index)} .btn`);
        button.innerHTML = answer.text;
        button.onclick = () => selectAnswer(button, answer.correct);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    selectedAnswer = false;
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong', 'no-hover'); 
    });
}

function selectAnswer(button, isCorrect) {
    if (selectedAnswer) return; 
    selectedAnswer = true;
    
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('no-hover'); 
    });

    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        showCorrectAnswer();
    }

    nextBtn.style.display = "block";
}

function showCorrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    currentQuestion.answers.forEach((answer, index) => {
        if (answer.correct) {
            const correctButton = document.querySelector(`.answer-buttons .${String.fromCharCode(97 + index)} .btn`);
            correctButton.classList.add('correct'); 
        }
    });
}

function showFinishMessage() {
    finishMessage.style.display = "block"; 
    questionWrapper.style.display = "none"; 
    answerBtn.style.display = "none"; 
    nextBtn.style.display = "none"; 
    document.getElementById("congrats").innerHTML = `Your score is ${score}`; 
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinishMessage(); 
    }
});

restartBtn.addEventListener('click', startQuiz); 

startQuiz();
