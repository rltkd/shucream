import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where
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

const results = {
  FSE: { icon: "🍓", name: "딸기슈" },
  FSR: { icon: "🍦", name: "바닐라슈" },
  FCE: { icon: "🍋", name: "레몬슈" },
  FCR: { icon: "🔥", name: "시나몬슈" },
  ISE: { icon: "🌙", name: "달빛슈" },
  ISR: { icon: "🍫", name: "초코슈" },
  ICE: { icon: "🌈", name: "무지개슈" },
  ICR: { icon: "☕", name: "에스프레소슈" }
};

const statisticsOrder = [
  "FSE", "FSR", "FCE", "FCR",
  "ISE", "ISR", "ICE", "ICR"
];

const roundInput = document.getElementById("roundInput");
const loadButton = document.getElementById("loadButton");
const statsTotal = document.getElementById("statsTotal");
const statsList = document.getElementById("statsList");
const roundText = document.getElementById("roundText");

let unsubscribe = null;

function loadStatistics() {
  const round = roundInput.value.trim();

  if (!round) {
    alert("라운드 이름을 입력해줘.");
    return;
  }

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  roundText.textContent = `현재 조회 라운드: ${round}`;
  statsTotal.textContent = "불러오는 중...";
  statsList.innerHTML = "";

  const currentRoundQuery = query(
    collection(db, "responses"),
    where("round", "==", round)
  );

  unsubscribe = onSnapshot(
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
      statsTotal.textContent = "통계를 불러오지 못했습니다.";
      statsList.innerHTML = "";
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
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);
    const barWidth = count === 0 ? 0 : (count / maximumCount) * 100;

    const row = document.createElement("div");
    row.className = "stats-row";

    row.innerHTML = `
      <div class="stats-label">
        <span>${result.icon} ${result.name} (${code})</span>
        <span>${count}명 / ${percent}%</span>
      </div>
      <div class="stats-bar">
        <div class="stats-bar-fill" style="width: ${barWidth}%"></div>
      </div>
    `;

    statsList.appendChild(row);
  });
}

loadButton.addEventListener("click", loadStatistics);

loadStatistics();