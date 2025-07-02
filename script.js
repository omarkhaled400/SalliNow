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

const dbRef = firebase.database().ref('counts/salat');

const btnGlobal = document.getElementById('salatGlobalBtn');
const personalCountElem = document.getElementById('salatPersonalCount');

let personalCount = parseInt(localStorage.getItem('salatPersonal')) || 0;

function updatePersonalCount() {
  personalCountElem.textContent = `عدد صلواتك أنت فقط: ${personalCount}`;
}

function updateGlobalButton(count) {
  btnGlobal.textContent = `${count} (عالمي)`;
}

// تحديث العدّاد العالمي عند أي تغيير في القاعدة
dbRef.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(count);
});

// عند الضغط على زر العداد العالمي
btnGlobal.addEventListener('click', () => {
  dbRef.transaction(current => (current || 0) + 1)
    .then(() => {
      personalCount++;
      localStorage.setItem('salatPersonal', personalCount);
      updatePersonalCount();
    })
    .catch(error => console.error('خطأ في تحديث العداد:', error));
});

updatePersonalCount();
