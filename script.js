// إعداد Firebase
const firebaseConfig = {
  apiKey: "مفتاح-API-هنا",
  authDomain: "مشروعك.firebaseapp.com",
  databaseURL: "https://مشروعك-default-rtdb.firebaseio.com",
  projectId: "مشروعك",
  storageBucket: "مشروعك.appspot.com",
  messagingSenderId: "رقم-مرسل",
  appId: "معرف-تطبيق"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

// المراجع لكل عداد عالمي في Firebase
const salatGlobalRef = db.ref('counts/salat');
const hawqalaGlobalRef = db.ref('counts/hawqala');
const estighfarGlobalRef = db.ref('counts/estighfar');

// تحميل الأعداد الشخصية من localStorage
let salatPersonal = parseInt(localStorage.getItem('salatPersonal')) || 0;
let hawqalaPersonal = parseInt(localStorage.getItem('hawqalaPersonal')) || 0;
let estighfarPersonal = parseInt(localStorage.getItem('estighfarPersonal')) || 0;

// العناصر
const salatGlobalBtn = document.getElementById('salatGlobalBtn');
const salatPersonalBtn = document.getElementById('salatPersonalBtn');

const hawqalaGlobalBtn = document.getElementById('hawqalaGlobalBtn');
const hawqalaPersonalBtn = document.getElementById('hawqalaPersonalBtn');

const estighfarGlobalBtn = document.getElementById('estighfarGlobalBtn');
const estighfarPersonalBtn = document.getElementById('estighfarPersonalBtn');

// تحديث الأزرار بالعدد الحالي
function updateButtons(globalBtn, personalBtn, globalCount, personalCount) {
  globalBtn.textContent = `${globalCount} (عالمي)`;
  personalBtn.textContent = `${personalCount} (شخصي)`;
}

// استماع لتحديثات القاعدة لكل عداد عالمي
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

// دوال زيادة العداد عند الضغط

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
