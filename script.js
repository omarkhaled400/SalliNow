// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLrWhEzLiH2zO8pN-fm7SAe0Z6kvU8ceY",
  authDomain: "salinow.firebaseapp.com",
  databaseURL: "https://salinow-default-rtdb.firebaseio.com",
  projectId: "salinow",
  storageBucket: "salinow.firebasestorage.app",
  messagingSenderId: "199271794819",
  appId: "1:199271794819:web:00cc0805877129b4ae73b6",
  measurementId: "G-23J4RKD3L9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// مراجع العدادات العالمية
const salatGlobalRef = db.ref('counts/salat');
const hawqalaGlobalRef = db.ref('counts/hawqala');
const estighfarGlobalRef = db.ref('counts/estighfar');

// تحميل العدادات الشخصية من التخزين المحلي
let salatPersonal = parseInt(localStorage.getItem('salatPersonal')) || 0;
let hawqalaPersonal = parseInt(localStorage.getItem('hawqalaPersonal')) || 0;
let estighfarPersonal = parseInt(localStorage.getItem('estighfarPersonal')) || 0;

// عناصر الأزرار
const salatGlobalBtn = document.getElementById('salatGlobalBtn');
const salatPersonalBtn = document.getElementById('salatPersonalBtn');

const hawqalaGlobalBtn = document.getElementById('hawqalaGlobalBtn');
const hawqalaPersonalBtn = document.getElementById('hawqalaPersonalBtn');

const estighfarGlobalBtn = document.getElementById('estighfarGlobalBtn');
const estighfarPersonalBtn = document.getElementById('estighfarPersonalBtn');

// تحديث نصوص الأزرار
function updateButtons(globalBtn, personalBtn, globalCount, personalCount) {
  globalBtn.textContent = `${globalCount} (عالمي)`;
  personalBtn.textContent = `${personalCount} (شخصي)`;
}

// الاستماع لتحديثات العدادات العالمية من Firebase
salatGlobalRef.on('value', snapshot => {
  const val = snapshot.val() || 0;
  updateButtons(salatGlobalBtn, salatPersonalBtn, val, salatPersonal);
});

hawqalaGlobalRef.on('value', snapshot => {
  const val = snapshot.val() || 0;
  updateButtons(hawqalaGlobalBtn, hawqalaPersonalBtn, val, hawqalaPersonal);
});

estighfarGlobalRef.on('value', snapshot => {
  const val = snapshot.val() || 0;
  updateButtons(estighfarGlobalBtn, estighfarPersonalBtn, val, estighfarPersonal);
});

// زيادة العداد العالمي والشخصي عند الضغط

salatGlobalBtn.addEventListener('click', () => {
  salatGlobalRef.transaction(current => (current || 0) + 1);
  salatPersonal++;
  localStorage.setItem('salatPersonal', salatPersonal);
  updateButtons(salatGlobalBtn, salatPersonalBtn, salatGlobalBtn.textContent, salatPersonal);
});

salatPersonalBtn.addEventListener('click', () => {
  salatPersonal++;
  localStorage.setItem('salatPersonal', salatPersonal);
  updateButtons(salatGlobalBtn, salatPersonalBtn, salatGlobalBtn.textContent, salatPersonal);
});

hawqalaGlobalBtn.addEventListener('click', () => {
  hawqalaGlobalRef.transaction(current => (current || 0) + 1);
  hawqalaPersonal++;
  localStorage.setItem('hawqalaPersonal', hawqalaPersonal);
  updateButtons(hawqalaGlobalBtn, hawqalaPersonalBtn, hawqalaGlobalBtn.textContent, hawqalaPersonal);
});

hawqalaPersonalBtn.addEventListener('click', () => {
  hawqalaPersonal++;
  localStorage.setItem('hawqalaPersonal', hawqalaPersonal);
  updateButtons(hawqalaGlobalBtn, hawqalaPersonalBtn, hawqalaGlobalBtn.textContent, hawqalaPersonal);
});

estighfarGlobalBtn.addEventListener('click', () => {
  estighfarGlobalRef.transaction(current => (current || 0) + 1);
  estighfarPersonal++;
  localStorage.setItem('estighfarPersonal', estighfarPersonal);
  updateButtons(estighfarGlobalBtn, estighfarPersonalBtn, estighfarGlobalBtn.textContent, estighfarPersonal);
});

estighfarPersonalBtn.addEventListener('click', () => {
  estighfarPersonal++;
  localStorage.setItem('estighfarPersonal', estighfarPersonal);
  updateButtons(estighfarGlobalBtn, estighfarPersonalBtn, estighfarGlobalBtn.textContent, estighfarPersonal);
});
