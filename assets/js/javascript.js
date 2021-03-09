const quiz = document.getElementById('quiz');
const timerEl = document.getElementById('timer');
const question = document.getElementById('question');


var sec = 60;
var myTimer = document.getElementById('timer');
window.onload = countDown;

function countDown() {
    if (sec <= 60) {
        myTimer.innerHTML = "Time Left: " + sec;
    }
    if (sec <= 0) {
        myTimer.innerHTML = "Time is up!";
        return;
    }
    sec -= 1;
    window.setTimeout(countDown, 1000);
}

(function() {
    function buildQuiz() {
        const output = [];

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                const answers = [];

                for (letter in currentQuestion.answers) {

                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        quizContainer.innerHTML = output.join("");
    }

    function showResults() {


        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {

            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {

                numCorrect++;
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}
        <form>
         Enter Your Initials <input type="text" id="Initials" value="Initials"><input type="submit" value="Save Score"></form>
         <br><button id="link"><a href="./scores.html">View High Scores</a></button>`;

        document.querySelector('form').onsubmit = function(e) {
            e.preventDefault();
            var Initials = document.querySelector("#Initials");
            var score = numCorrect;
            localStorage["Name"] = document.querySelector("#Initials").value;
            localStorage["Score"] = numCorrect;
            console.log(Initials);
            console.log(score);
        }

    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [{
            question: "What is JavaScript?",
            answers: {
                A: "A programming language",
                B: "A web application",
                C: "An Operating system",
            },
            correctAnswer: "A"
        },
        {
            question: "Along with HTML and CSS, what makes up most of the World Wide Web?",
            answers: {
                A: "Python",
                B: "JavaScript",
                C: "jQuery",
            },
            correctAnswer: "B"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                A: "Angular",
                B: "jQuery",
                C: "RequireJS",
                D: "ESLint",
            },
            correctAnswer: "D"
        },
        {
            question: "What does HTML stand for?",
            answers: {
                A: "Hypertext Markup Language",
                B: "Hypertension Makeup Liquid",
                C: "Hypertransfer Machine Learning",
            },
            correctAnswer: "A"
        },
        {
            question: "Who invented JavaScript?",
            answers: {
                A: "Douglas Crockford",
                B: "Sheryl Sandberg",
                C: "Brendan Eich"
            },
            correctAnswer: "C"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                A: "Node.js",
                B: "TypeScript",
                C: "npm"
            },
            correctAnswer: "C"
        },
    ];


    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();