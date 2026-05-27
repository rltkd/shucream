const startScreen = document.getElementById("startScreen");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionIcon = document.getElementById("questionIcon");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");

const resultIcon = document.getElementById("resultIcon");
const resultName = document.getElementById("resultName");
const resultCode = document.getElementById("resultCode");
const resultNickname = document.getElementById("resultNickname");
const resultTraits = document.getElementById("resultTraits");
const resultStory = document.getElementById("resultStory");

const questions = [
  {
    icon: "🌙",
    title: "첫 번째 밤",
    text: "빵집 문이 닫히고 어두워졌다. 주변의 슈크림들이 불안해한다. 당신은?",
    choices: [
      { text: "다른 슈크림들과 모여 이야기를 나눈다.", type: "F" },
      { text: "조용한 곳에서 혼자 생각을 정리한다.", type: "I" }
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
  },
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

const results = {
  FSE: {
    icon: "🍓",
    name: "딸기슈",
    nickname: "따뜻한 공감가",
    traits: ["사람을 좋아함", "배려심이 많음", "감정 표현이 풍부함"],
    story: "사람들의 이야기를 들어주는 작은 디저트 카페를 연다."
  },
  FSR: {
    icon: "🍦",
    name: "바닐라슈",
    nickname: "든든한 관리자",
    traits: ["책임감이 강함", "믿음직함", "계획을 잘 세움"],
    story: "모든 슈크림이 존중받는 베이커리를 운영한다."
  },
  FCE: {
    icon: "🍋",
    name: "레몬슈",
    nickname: "모험을 사랑하는 탐험가",
    traits: ["밝고 활발함", "새로운 경험을 좋아함", "사람들과 어울리기 좋아함"],
    story: "친구들과 함께 세계의 디저트를 찾아 여행한다."
  },
  FCR: {
    icon: "🔥",
    name: "시나몬슈",
    nickname: "열정적인 리더",
    traits: ["추진력이 강함", "목표 지향적", "조직을 이끄는 능력"],
    story: "버려진 슈크림들과 새로운 베이커리 브랜드를 만든다."
  },
  ISE: {
    icon: "🌙",
    name: "달빛슈",
    nickname: "감성 이야기꾼",
    traits: ["상상력이 풍부함", "감수성이 깊음", "혼자만의 시간을 즐김"],
    story: "밤하늘을 보며 그림책을 쓰는 작가가 된다."
  },
  ISR: {
    icon: "🍫",
    name: "초코슈",
    nickname: "성실한 장인",
    traits: ["신중함", "꾸준함", "집중력이 높음"],
    story: "자신만의 작은 공방에서 특별한 디저트를 만든다."
  },
  ICE: {
    icon: "🌈",
    name: "무지개슈",
    nickname: "자유로운 창작자",
    traits: ["개성이 강함", "창의력이 뛰어남", "틀에 얽매이지 않음"],
    story: "세상에 없던 새로운 디저트를 만들어낸다."
  },
  ICR: {
    icon: "☕",
    name: "에스프레소슈",
    nickname: "독립적인 개척자",
    traits: ["분석력이 뛰어남", "자기주도적", "문제 해결 능력이 높음"],
    story: "자신만의 브랜드를 세우고 새로운 길을 개척한다."
  }
};

let currentQuestion = 0;
let answers = [];

function showScreen(screen) {
  startScreen.classList.remove("active");
  questionScreen.classList.remove("active");
  resultScreen.classList.remove("active");

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

function calculateResultCode() {
  const counts = {
    F: 0,
    I: 0,
    S: 0,
    C: 0,
    E: 0,
    R: 0
  };

  answers.forEach(function (answer) {
    counts[answer]++;
  });

  const relationship = counts.F > counts.I ? "F" : "I";
  const choice = counts.S > counts.C ? "S" : "C";
  const action = counts.E > counts.R ? "E" : "R";

  return relationship + choice + action;
}

function showResult() {
  const code = calculateResultCode();
  const result = results[code];

  resultIcon.textContent = result.icon;
  resultName.textContent = result.name;
  resultCode.textContent = code.split("").join(" - ");
  resultNickname.textContent = result.nickname;
  resultStory.textContent = result.story;

  resultTraits.innerHTML = "";

  result.traits.forEach(function (trait) {
    const listItem = document.createElement("li");
    listItem.textContent = trait;
    resultTraits.appendChild(listItem);
  });

  showScreen(resultScreen);

  console.log("선택 결과:", answers);
  console.log("최종 유형:", code, result.name);
}

function selectChoice(choiceIndex) {
  const selectedType = questions[currentQuestion].choices[choiceIndex].type;
  answers.push(selectedType);

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
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