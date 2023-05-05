const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'What does HTML stand for?',
    choice1: 'Hyper Text Preprocessor',
    choice2: 'Hyper Text Markup Language',
    choice3: 'Hyper Text Multiple Language',
    choice4: 'Hyper Tool Multi Language',
    answer: 2,
  },
  {
    question: 'What does CSS stand for??',
    choice1: 'Common Style Sheet',
    choice2: 'Colorful Style Sheet',
    choice3: 'Computer Style Sheet',
    choice4: 'Cascading Style Sheet',
    answer: 4,
  },
  {
    question: 'What does PHP stand for?',
    choice1: 'Hypertext Preprocessor',
    choice2: 'Hypertext Programming',
    choice3: 'Hypertext Preprogramming',
    choice4: 'Hometext Preprocessor',
    answer: 1,
  },
  {
    question: 'What does SQL stand for?',
    choice1: 'Stylish Question Language',
    choice2: 'Stylesheet Query Language',
    choice3: 'Statement Question Language',
    choice4: 'Structured Query Language',
    answer: 4,
  },
  {
    question: 'What does XML stand for?',
    choice1: 'eXtensible Markup Language',
    choice2: 'eXecutable Multiple Language',
    choice3: 'eXTra Multi-Program Language',
    choice4: 'eXamine Multiple Language',
    answer: 1,
  },
  {
    question:'The Tallest Building in the World is found Where?',
    choice1: 'Dubai',
    choice2: 'New Work',
    choice3: 'Shanghai',
    choice4: 'China',
    answer: 1,
  },
  {
    question:'What is the Current Version of Scratch App?',
    choice1: '2.5',
    choice2: '4.0',
    choice3: '3.0',
    choice4: '3.5',
    answer: 3,
  },
  {
    question:'How Many Planets are in our Solar System?',
    choice1: '7',
    choice2: '9',
    choice3: '8',
    choice4: '6',
    answer: 3,
  },
  {
    question:'Which Planet is the Largest?',
    choice1: 'Earth',
    choice2: 'Mercury',
    choice3: 'Uranus',
    choice4: 'Jupiter',
    answer: 4,
  },
  {
    question:'Which is not a Programming Language?',
    choice1: 'Python',
    choice2: 'PHP',
    choice3: 'Vscode',
    choice4: 'Java',
    answer: 3,
  }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions] //Using a Spread Operator
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    
    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    
    if(classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()

if (document.referrer === '') {
  window.location.href = '/'; // replace with your redirect page URL
}
