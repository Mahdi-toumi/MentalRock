const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart'; 
    backButton.innerText = 'Back';
    startButton.classList.remove('hide');
    backButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'La santé mentale est',
    answers: [
      { text: 'Absence de trouble mental', correct: false },
      { text: 'Importante pour des personnes spécifiques', correct: false },
      { text: 'Le bien-être cognitif, comportemental et émotionnel', correct: true },
      { text: 'Pas liée au bien-être d\'une personne', correct: false }
    ]
  },
  {
    question: 'Avoir des troubles de santé mentale signifie :',
    answers: [
      { text: 'Des perturbations dans la pensée, le sentiment ou le comportement d\'une personne', correct: true },
      { text: 'Une intelligence faible', correct: false },
      { text: 'Un signe de faiblesse', correct: false },
      { text: 'Un manque de volonté', correct: false }
    ]
  },
  {
    question: 'La maladie mentale',
    answers: [
      { text: 'Peut être traitée!', correct: true },
      { text: 'Ne peut pas être traitée!', correct: false }
    ]
  },
  {
    question: 'Une mauvaise santé mentale augmente le risque de conditions physiques durables (chroniques) telles que les maladies cardiaques, les accidents vasculaires cérébraux et le cancer, etc.',
    answers: [
      { text: 'Oui', correct: true },
      { text: 'Non', correct: false }
    ]
  },
  {
    question: 'Si vous connaissez quelqu\'un avec une mauvaise santé mentale :',
    answers: [
      { text: 'Les contacter et leur faire savoir que de l\'aide est disponible', correct: false },
      { text: 'Les aider à accéder aux services de santé mentale', correct: false },
      { text: 'Apprendre et partager des faits, éliminer les mythes si vous êtes au courant', correct: false },
      { text: 'Tout ce qui précède', correct: true }
    ]
  },
  {
    question: 'La santé mentale n\'est pas',
    answers: [
      { text: 'Un mythe', correct: true },
      { text: 'Normale comme les conditions de santé physique', correct: false },
      { text: 'Un dysfonctionnement comportemental et émotionnel naturel', correct: false },
      { text: 'Quelque chose qui nécessite une attention et une sensibilisation', correct: false }
    ]
  }
];
