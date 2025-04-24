// Firebase 연동 코드 (이미 index.html과 admin.html에서 사용됨)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPvVhk9eOqEQR32wvuPUYV_NecQeXvLkg",
  authDomain: "bus4737-f30ee.firebaseapp.com",
  databaseURL: "https://bus4737-f30ee-default-rtdb.firebaseio.com",
  projectId: "bus4737-f30ee",
  storageBucket: "bus4737-f30ee.firebasestorage.app",
  messagingSenderId: "747409641968",
  appId: "1:747409641968:web:eb029981b694cb8beacd35"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function for handling the data
function handleButtonClick(type) {
  const timestamp = new Date().toISOString();
  const refPath = type === 'commute' ? 'commute' : 'departure';
  const refPathWithDate = ref(database, `${refPath}/${timestamp}`);
  
  push(refPathWithDate, { timestamp, type, status: "Checked In" })
    .then(() => {
      console.log(`${type === 'commute' ? '출근' : '퇴근'} 체크인 완료`);
    })
    .catch(error => {
      console.error('오류 발생:', error);
    });
}