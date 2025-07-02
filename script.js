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
const shareBtn = document.getElementById('shareBtn');
const contactBtn = document.getElementById('contactBtn');

let personalCount = parseInt(localStorage.getItem('salatPersonal')) || 0;

function updatePersonalCount() {
  personalCountElem.textContent = `عدد صلواتك أنت فقط: ${personalCount}`;
}

function updateGlobalButton(count) {
  btnGlobal.textContent = `${count} (عالمي)`;
}

// تحديث العداد العالمي عند تغير البيانات في قاعدة البيانات
dbRef.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(count);
});

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

shareBtn.addEventListener('click', () => {
  const url = window.location.href;
  const msg = `صلِّ على النبي ﷺ وشارك الأجر: ${url}`;
  if (navigator.share) {
    navigator.share({ title: "صلِّ على النبي ﷺ", text: msg, url });
  } else {
    navigator.clipboard.writeText(msg);
    alert("تم نسخ الرابط ✅ شارك الأجر مع غيرك 🤍");
  }
});

contactBtn.addEventListener('click', () => {
  const phone = '201021069619'; // كود مصر بدون 0
  const url = `https://wa.me/${phone}`;
  window.open(url, '_blank');
});
