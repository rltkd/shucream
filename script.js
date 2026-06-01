import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyr0kh01_AX0h57xvPkXuY8Wbwq6FdLQY",
  authDomain: "shucream-statistics.firebaseapp.com",
  projectId: "shucream-statistics",
  storageBucket: "shucream-statistics.firebasestorage.app",
  messagingSenderId: "1023143944203",
  appId: "1:1023143944203:web:86690e3976ca7a618a670e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

const statsTotal = document.getElementById("statsTotal");
const statsList = document.getElementById("statsList");

const otherResultsButton = document.getElementById("otherResultsButton");
const otherResultsPanel = document.getElementById("otherResultsPanel");
const otherResultsList = document.getElementById("otherResultsList");
const otherResultDetail = document.getElementById("otherResultDetail");

const questions = [
  {
    icon: "🌙",
    title: "첫 번째 밤",
    text: "빵집 문이 닫히고 주위가 어두워졌다. 다른 슈크림빵들도 불안해 보인다. 당신은?",
    choices: [
      { text: "다른 빵들과 모여 이야기를 나눈다.", type: "F" },
      { text: "조용한 곳에서 혼자 생각을 정리한다.", type: "I" }
    ]
  },
  {
    icon: "🍞",
    title: "창밖의 불빛",
    text: "창문 너머로 빵집의 불빛이 보인다. 당신은 어떤 생각이 드는가?",
    choices: [
      { text: "원래 있던 곳으로 돌아갈 방법을 찾아본다.", type: "S" },
      { text: "빵집 밖 세상에는 무엇이 있을지 궁금해진다.", type: "C" }
    ]
  },
  {
    icon: "🚪",
    title: "여행의 시작",
    text: "드디어 빵집 밖으로 나왔다. 당신은 먼저 무엇을 할까?",
    choices: [
      { text: "주변 사람들에게 말을 걸어 정보를 얻는다.", type: "F" },
      { text: "혼자 둘러보며 상황을 파악한다.", type: "I" }
    ]
  },
  {
    icon: "🍓",
    title: "낯선 재료 발견",
    text: "처음 보는 과일과 재료들이 가득 놓여 있다. 당신은?",
    choices: [
      { text: "어떤 맛일지 궁금해서 바로 맛본다.", type: "E" },
      { text: "먹어도 괜찮을지 먼저 살펴본다.", type: "R" }
    ]
  },
  {
    icon: "🎈",
    title: "새로운 친구",
    text: "길을 가다 다른 빵 친구를 만났다. 당신은?",
    choices: [
      { text: "먼저 다가가 말을 건다.", type: "F" },
      { text: "상대가 먼저 다가오기를 기다린다.", type: "I" }
    ]
  },
  {
    icon: "🗺️",
    title: "갈림길",
    text: "눈앞에 두 개의 길이 나타났다. 당신은 어느 길을 선택할까?",
    choices: [
      { text: "익숙하고 안전해 보이는 길로 간다.", type: "S" },
      { text: "어디로 이어질지 모르는 길로 간다.", type: "C" }
    ]
  },
  {
    icon: "🎁",
    title: "예상치 못한 만남",
    text: "여행 중, 원래 생각하지 못했던 새로운 재료들을 만나게 되었다. 당신은?",
    choices: [
      { text: "처음 생각했던 재료를 계속 찾아본다.", type: "S" },
      { text: "새로운 재료도 한번 경험해 본다.", type: "C" }
    ]
  },
  {
    icon: "✨",
    title: "나만의 슈를 고를 시간",
    text: "드디어 원하는 재료를 넣을 수 있게 되었다. 당신은?",
    choices: [
      { text: "가장 마음이 끌리는 재료를 선택한다.", type: "E" },
      { text: "나와 가장 잘 어울릴 재료를 고민해서 선택한다.", type: "R" }
    ]
  },
  {
    icon: "🎂",
    title: "완성된 나",
    text: "마침내 새로운 모습의 슈가 된 당신. 가장 중요한 것은 무엇이라고 생각하는가?",
    choices: [
      { text: "내가 좋아하는 모습으로 변했다는 것.", type: "E" },
      { text: "나에게 잘 맞는 모습으로 변했다는 것.", type: "R" }
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

const statisticsOrder = [
  "FSE", "FSR", "FCE", "FCR",
  "ISE", "ISR", "ICE", "ICR"
];

function prepareOtherResults(myCode) {
  otherResultsPanel.classList.add("hidden");
  otherResultDetail.classList.add("hidden");
  otherResultsButton.textContent = "다른 슈들도 만나보기";
  otherResultsList.innerHTML = "";
  otherResultDetail.innerHTML = "";

  statisticsOrder.forEach(function (code) {
    const result = results[code];
    const button = document.createElement("button");

    button.className = "other-result-button";
    button.textContent = `${result.icon} ${result.name}`;

    if (code === myCode) {
      button.classList.add("my-result");
      button.textContent = `${result.icon} ${result.name} · 나`;
    }

    button.addEventListener("click", function () {
      showOtherResultDetail(code);
    });

    otherResultsList.appendChild(button);
  });
}

function showOtherResultDetail(code) {
  const result = results[code];

  otherResultDetail.innerHTML = `
    <h3 class="other-detail-title">${result.icon} ${result.name}</h3>
    <p class="other-detail-code">${code.split("").join(" - ")}</p>
    <p class="other-detail-nickname">${result.nickname}</p>
    <ul class="other-detail-traits">
      ${result.traits.map(function (trait) {
        return `<li>${trait}</li>`;
      }).join("")}
    </ul>
    <p class="other-detail-story">${result.story}</p>
  `;

  otherResultDetail.classList.remove("hidden");
}

const CURRENT_ROUND = "test_3";

let statisticsListenerStarted = false;
const STATISTICS_PARTICIPATION_KEY = "shucream-statistics-submitted-round";

async function saveResultToStatistics(code) {
  const submittedRound = localStorage.getItem(STATISTICS_PARTICIPATION_KEY);

  if (submittedRound === CURRENT_ROUND) {
    console.log("이 기기의 첫 번째 결과가 현재 회차 통계에 이미 반영되었습니다.");
    return;
  }

  try {
    await addDoc(collection(db, "responses"), {
      code: code,
      round: CURRENT_ROUND,
      createdAt: serverTimestamp()
    });

    localStorage.setItem(STATISTICS_PARTICIPATION_KEY, CURRENT_ROUND);
    console.log("현재 회차 첫 번째 결과가 통계에 반영되었습니다:", code);
  } catch (error) {
    console.error("통계 저장 실패:", error);
  }
}
function startStatisticsListener() {
  if (statisticsListenerStarted) {
    return;
  }

  statisticsListenerStarted = true;

  const currentRoundQuery = query(
    collection(db, "responses"),
    where("round", "==", CURRENT_ROUND)
  );

  onSnapshot(
    currentRoundQuery,
    function (snapshot) {
      const counts = {
        FSE: 0,
        FSR: 0,
        FCE: 0,
        FCR: 0,
        ISE: 0,
        ISR: 0,
        ICE: 0,
        ICR: 0
      };

      snapshot.forEach(function (document) {
        const code = document.data().code;

        if (counts[code] !== undefined) {
          counts[code]++;
        }
      });

      renderStatistics(counts, snapshot.size);
    },
    function (error) {
      console.error("통계 불러오기 실패:", error);
      statsList.innerHTML =
        '<p class="stats-loading">통계를 불러오지 못했습니다.</p>';
    }
  );
}

function renderStatistics(counts, total) {
  statsTotal.textContent = `총 ${total}개의 결과`;

  statsList.innerHTML = "";

  const maximumCount = Math.max(...Object.values(counts), 1);

  statisticsOrder.forEach(function (code) {
    const result = results[code];
    const count = counts[code];
    const barWidth = count === 0 ? 0 : (count / maximumCount) * 100;

    const row = document.createElement("div");
    row.className = "stats-row";

    row.innerHTML = `
      <div class="stats-label">
        <span>${result.icon} ${result.name}</span>
        <span>${count}명</span>
      </div>
      <div class="stats-bar">
        <div class="stats-bar-fill" style="width: ${barWidth}%"></div>
      </div>
    `;

    statsList.appendChild(row);
  });
}

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

  prepareOtherResults(code);
  showScreen(resultScreen);

  startStatisticsListener();
  saveResultToStatistics(code);


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

otherResultsButton.addEventListener("click", function () {
  const isHidden = otherResultsPanel.classList.contains("hidden");

  if (isHidden) {
    otherResultsPanel.classList.remove("hidden");
    otherResultsButton.textContent = "다른 슈들 접기";
  } else {
    otherResultsPanel.classList.add("hidden");
    otherResultDetail.classList.add("hidden");
    otherResultsButton.textContent = "다른 슈들도 만나보기";
  }
});