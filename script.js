// Links to the HTML code div ID containers & buttons
const welcomeContainer = document.getElementById("welcome-container");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const restartButton = document.getElementById("restart-button");

//Array of objects for quiz questions, options, and answers
const quizData = [
  {
    question:
      "In an array, each item has a position (index) starting from which value?",
    options: ["0", "1", "2", "-1"],
    answer: 0,
  },
  {
    question: "Which of the following is an example of conditional logic?",
    options: ["console.log", "push()", "shift()", "if/then statement"],
    answer: 3,
  },
  {
    question:
      "When your if statement is short and only returns or assigns a value, which of the following tools is the cleanest option to use?",
    options: [
      "pop()",
      "ternary operator",
      "gitinit",
      "none of the options work",
    ],
    answer: 1,
  },
  {
    question: "When should you use the camelCase naming system?",
    options: [
      "Always",
      "For classes, constructor functions, or React components",
      "For variables, object properties, and function names",
      "For constants or configuration values that won't change",
    ],
    answer: 2,
  },
  {
    question: "What is the DOM Tree?",
    options: [
      "The hierarchical structure of the page content",
      "A node",
      "A set of tools that belongs to the Browser and you as a JS developer use to interact with",
      "<div>",
    ],
    answer: 0,
  },
];

//This helps loop through the questions one-by-one
let currentQuestionIndex = 0;

//This helps keep track of user score - later one
let score = 0;

// This is used in the Welcome page - controls the Start Quiz button
function startQuiz() {
  welcomeContainer.classList.add("hidden"); // Hide welcome screen
  quizContainer.classList.remove("hidden"); // Show quiz
  loadQuestion(); // Load first question
  nextButton.disabled = true;
}

// This is used in the Quiz page - loads questions
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  // Clear previous content
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  // Create option buttons
  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.style.backgroundColor = "";
    optionButton.style.color = "";
    optionButton.disabled = false;
    optionButton.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(optionButton);
  });

  // Update next button text depending on question position
  if (currentQuestionIndex === quizData.length - 1) {
    nextButton.textContent = "Get Score";
  } else {
    nextButton.textContent = "Next Question";
  }

  // Disable the button until an answer is selected
  nextButton.disabled = true;
}

// This is used in the Quiz page - when selecting options
function selectOption(selectedIndex) {
  const currentQuestion = quizData[currentQuestionIndex];
  const optionButtons = optionsContainer.querySelectorAll("button");

  // Disable all buttons and apply colors for correct/incorrect
  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.answer) {
      button.style.backgroundColor = "green"; // correct answer
      button.style.color = "white";
    }
    if (index === selectedIndex && selectedIndex !== currentQuestion.answer) {
      button.style.backgroundColor = "red"; // wrong selection
      button.style.color = "white";
    }
  });

  // Updates the score
  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  // Enable next button after selection
  nextButton.disabled = false;
}

// This will load either the next question or the quiz score
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    nextButton.disabled = true;
  } else {
    showScore();
  }
}

// This will load the quiz score
function showScore() {
  quizContainer.classList.add("hidden"); // Hide quiz
  scoreContainer.classList.remove("hidden"); // Show score
  scoreContainer.querySelector(
    "#score"
  ).textContent = `You scored ${score} out of ${quizData.length}.`;
}

// This will restart the quiz
function restartQuiz() {
  shuffleArray(quizData);
  currentQuestionIndex = 0;
  score = 0;
  optionSelected = false;
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  loadQuestion();
  nextButton.disabled = true;
}

// This is for randominzing the question order once the quiz is restarted
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// This is creating Event listeners (aka clicks) for each button
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);
startButton.addEventListener("click", startQuiz);
