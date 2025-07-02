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

const refs = {
  salat: db.ref('counts/salat'),
  hawqala: db.ref('counts/hawqala'),
  estighfar: db.ref('counts/estighfar')
};

let personal = {
  salat: parseInt(localStorage.getItem('salatPersonal')) || 0,
  hawqala: parseInt(localStorage.getItem('hawqalaPersonal')) || 0,
  estighfar: parseInt(localStorage.getItem('estighfarPersonal')) || 0
};

const btns = {
  salatGlobal: document.getElementById('salatGlobalBtn'),
  salatPersonal: document.getElementById('salatPersonalBtn'),
  hawqalaGlobal: document.getElementById('hawqalaGlobalBtn'),
  hawqalaPersonal: document.getElementById('hawqalaPersonalBtn'),
  estighfarGlobal: document.getElementById('estighfarGlobalBtn'),
  estighfarPersonal: document.getElementById('estighfarPersonalBtn')
};

function updateButtons(globalBtn, personalBtn, globalCount, personalCount) {
  globalBtn.textContent = `${globalCount} (عالمي)`;
  personalBtn.textContent = `${personalCount} (شخصي)`;
}

// عرض القيم الأولية
updateButtons(btns.salatGlobal, btns.salatPersonal, 0, personal.salat);
updateButtons(btns.hawqalaGlobal, btns.hawqalaPersonal, 0, personal.hawqala);
updateButtons(btns.estighfarGlobal, btns.estighfarPersonal, 0, personal.estighfar);

// الاستماع لتحديثات العدادات العالمية من Firebase
refs.salat.on('value', snap => {
  updateButtons(btns.salatGlobal, btns.salatPersonal, snap.val() || 0, personal.salat);
});
refs.hawqala.on('value', snap => {
  updateButtons(btns.hawqalaGlobal, btns.hawqalaPersonal, snap.val() || 0, personal.hawqala);
});
refs.estighfar.on('value', snap => {
  updateButtons(btns.estighfarGlobal, btns.estighfarPersonal, snap.val() || 0, personal.estighfar);
});

// التعامل مع ضغطات الأزرار وتحديث القيم
btns.salatGlobal.addEventListener('click', () => {
  refs.salat.transaction(current => (current || 0) + 1);
  personal.salat++;
  localStorage.setItem('salatPersonal', personal.salat);
  updateButtons(btns.salatGlobal, btns.salatPersonal, btns.salatGlobal.textContent, personal.salat);
});
btns.salatPersonal.addEventListener('click', () => {
  personal.salat++;
  localStorage.setItem('salatPersonal', personal.salat);
  updateButtons(btns.salatGlobal, btns.salatPersonal, btns.salatGlobal.textContent, personal.salat);
});

btns.hawqalaGlobal.addEventListener('click', () => {
  refs.hawqala.transaction(current => (current || 0) + 1);
  personal.hawqala++;
  localStorage.setItem('hawqalaPersonal', personal.hawqala);
  updateButtons(btns.hawqalaGlobal, btns.hawqalaPersonal, btns.hawqalaGlobal.textContent, personal.hawqala);
});
btns.hawqalaPersonal.addEventListener('click', () => {
  personal.hawqala++;
  localStorage.setItem('hawqalaPersonal', personal.hawqala);
  updateButtons(btns.hawqalaGlobal, btns.hawqalaPersonal, btns.hawqalaGlobal.textContent, personal.hawqala);
});

btns.estighfarGlobal.addEventListener('click', () => {
  refs.estighfar.transaction(current => (current || 0) + 1);
  personal.estighfar++;
  localStorage.setItem('estighfarPersonal', personal.estighfar);
  updateButtons(btns.estighfarGlobal, btns.estighfarPersonal, btns.estighfarGlobal.textContent, personal.estighfar);
});
btns.estighfarPersonal.addEventListener('click', () => {
  personal.estighfar++;
  localStorage.setItem('estighfarPersonal', personal.estighfar);
  updateButtons(btns.estighfarGlobal, btns.estighfarPersonal, btns.estighfarGlobal.textContent, personal.estighfar);
});
