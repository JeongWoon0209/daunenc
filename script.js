// Firebase 모듈 로드
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyAPvVhk9eOqEQR32wvuPUYV_NecQeXvLkg",
  authDomain: "bus4737-f30ee.firebaseapp.com",
  databaseURL: "https://bus4737-f30ee-default-rtdb.firebaseio.com",
  projectId: "bus4737-f30ee",
  storageBucket: "bus4737-f30ee.appspot.com",
  messagingSenderId: "747409641968",
  appId: "1:747409641968:web:eb029981b694cb8beacd35",
  measurementId: "G-70P0G6SKD1"
};

// 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const now = new Date();
const todayKey = now.toISOString().split("T")[0]; // YYYY-MM-DD

function checkIn(type) {
  const time = new Date();
  const timestamp = time.toLocaleString();

  // 중복 체크용 키
  const key = `${todayKey}_${type}`;
  const userKey = localStorage.getItem(key);
  if (userKey) {
    alert("이미 체크되었습니다.");
    return;
  }

  const entry = {
    timestamp,
    type
  };

  const logRef = ref(db, `bus4737/logs/${todayKey}`);
  const newLog = push(logRef, entry);

  localStorage.setItem(key, "true");

  alert(`${type} 체크 완료!`);
}

// 관리자 페이지용
if (document.getElementById('log')) {
  const countElement = document.getElementById("count");
  const logElement = document.getElementById("log");
  const logRef = ref(db, `bus4737/logs/${todayKey}`);

  onValue(logRef, (snapshot) => {
    const logs = snapshot.val();
    const list = [];
    let count = 0;

    if (logs) {
      for (const id in logs) {
        const entry = logs[id];
        list.push(`${count + 1}. ${entry.timestamp} - ${entry.type}`);
        count++;
      }
    }

    logElement.textContent = list.join("\n");
    countElement.textContent = `${count}명`;
  });
}

function downloadCSV() {
  const logElement = document.getElementById("log");
  const text = logElement.textContent;
  const rows = text.split("\n").map(row => {
    const parts = row.split(" - ");
    const timestamp = parts[0].split(". ")[1];
    const type = parts[1];
    return `${timestamp},${type}`;
  });

  let csvContent = "data:text/csv;charset=utf-8,날짜 및 시간,탑승유형\n";
  csvContent += rows.join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `탑승기록_${todayKey}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}