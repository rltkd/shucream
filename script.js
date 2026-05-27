const startScreen = document.getElementById("startScreen");
const questionScreen = document.getElementById("questionScreen");
const finishScreen = document.getElementById("finishScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionIcon = document.getElementById("questionIcon");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");

const questions = [
  {
    icon: "🌙",
    title: "첫 번째 밤",
    text: "빵집 문이 닫히고 어두워졌다. 주변의 슈크림들이 불안해한다. 당신은?",
    choices: [
      { text: "다른 슈크림들과 모여 이야기를 나눈다.", type: "F" },
      { text: "조용한 곳에서 앞으로를 생각한다.", type: "I" }
    ]
  },
  {
    icon: "🍞",
    title: "빵집의 불빛",
    text: "멀리서 빵집의 불빛이 보인다. 당신은 어떤 생각이 드는가?",
    choices: [
      { text: "다시 빵집으로 돌아갈 방법을 찾아보고 싶다.", type: "S" },
      { text: "새로운 세상으로 나가보고 싶다.", type: "C" }
    ]
  },
  {
    icon: "🍓",
    title: "처음 보는 재료",
    text: "길을 걷다 처음 보는 과일을 발견했다. 당신은?",
    choices: [
      { text: "왠지 끌린다. 바로 맛본다.", type: "E" },
      { text: "먹어도 괜찮은지 먼저 살펴본다.", type: "R" }
    ]
  },
  {
    icon: "🎈",
    title: "새로운 친구",
    text: "다른 슈크림이 길을 잃고 울고 있다. 당신은?",
    choices: [
      { text: "다가가 함께 길을 찾는다.", type: "F" },
      { text: "응원해 주고 스스로 해결할 수 있게 돕는다.", type: "I" }
    ]
  },
  {
    icon: "🗺️",
    title: "새로운 갈림길",
    text: "두 개의 길이 나타났다. 당신은 어느 길을 선택할까?",
    choices: [
      { text: "익숙하고 안전해 보이는 길", type: "S" },
      { text: "어디로 이어질지 모르는 길", type: "C" }
    ]
  },
  {
    icon: "✨",
    title: "나만의 슈를 찾는 순간",
    text: "마침내 자신만의 슈를 고를 수 있게 되었다. 당신은?",
    choices: [
      { text: "마음이 가장 끌리는 슈를 선택한다.", type: "E" },
      { text: "나에게 가장 잘 맞는 슈를 신중히 선택한다.", type: "R" }
    ]
  }  ,
  {
    icon: "💬",
    title: "임시 질문 7",
    text: "임시 질문입니다. 친구형과 독립형을 확인하는 선택입니다.",
    choices: [
      { text: "임시 선택지 A - 친구형", type: "F" },
      { text: "임시 선택지 B - 독립형", type: "I" }
    ]
  },
  {
    icon: "🚪",
    title: "임시 질문 8",
    text: "임시 질문입니다. 안정형과 도전형을 확인하는 선택입니다.",
    choices: [
      { text: "임시 선택지 A - 안정형", type: "S" },
      { text: "임시 선택지 B - 도전형", type: "C" }
    ]
  },
  {
    icon: "💭",
    title: "임시 질문 9",
    text: "임시 질문입니다. 감성형과 현실형을 확인하는 선택입니다.",
    choices: [
      { text: "임시 선택지 A - 감성형", type: "E" },
      { text: "임시 선택지 B - 현실형", type: "R" }
    ]
  }
];

let currentQuestion = 0;
let answers = [];

function showScreen(screen) {
  startScreen.classList.remove("active");
  questionScreen.classList.remove("active");
  finishScreen.classList.remove("active");

  screen.classList.add("active");
}

function showQuestion() {
  const question = questions[currentQuestion];

  progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionIcon.textContent = question.icon;
  questionTitle.textContent = question.title;
  questionText.textContent = question.text;

  choiceA.textContent = `A. ${question.choices[0].text}`;
  choiceB.textContent = `B. ${question.choices[1].text}`;
}

function selectChoice(choiceIndex) {
  const selectedType = questions[currentQuestion].choices[choiceIndex].type;
  answers.push(selectedType);

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScreen(finishScreen);
    console.log("선택 결과:", answers);
  }
}

function startJourney() {
  currentQuestion = 0;
  answers = [];
  showScreen(questionScreen);
  showQuestion();
}

startButton.addEventListener("click", startJourney);
restartButton.addEventListener("click", function () {
  showScreen(startScreen);
});

choiceA.addEventListener("click", function () {
  selectChoice(0);
});

choiceB.addEventListener("click", function () {
  selectChoice(1);
});