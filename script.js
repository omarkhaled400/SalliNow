// Firebase config
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref('counts/salat');

const btnGlobal = document.getElementById('salatGlobalBtn');
const personalCountElem = document.getElementById('salatPersonalCount');

let personalCount = parseInt(localStorage.getItem('salatPersonal')) || 0;

// تحديث العداد الشخصي بالصفحة
function updatePersonalCount() {
  personalCountElem.textContent = `عدد صلواتك أنت فقط: ${personalCount}`;
}

// تحديث زر العداد العالمي بالنص الصحيح
function updateGlobalButton(count) {
  btnGlobal.textContent = `${count} (عالمي)`;
}

// تحميل بيانات العداد العالمي من Firebase
dbRef.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(count);
});

// زيادة العدادين عند الضغط على الزر
btnGlobal.addEventListener('click', () => {
  dbRef.transaction(current => (current || 0) + 1)
    .then(() => {
      personalCount++;
      localStorage.setItem('salatPersonal', personalCount);
      updatePersonalCount();
    })
    .catch(error => console.error('خطأ في تحديث العداد:', error));
});

// تحديث العداد الشخصي عند تحميل الصفحة
updatePersonalCount();

// وظيفة زر التواصل عبر واتساب
function contactWhatsApp() {
  const phone = '201021069619'; // كود مصر 20 + رقمك بدون صفر البداية
  const url = `https://wa.me/${phone}`;
  window.open(url, '_blank');
}

// وظيفة المشاركة (يمكن تعديلها حسب الحاجة)
function share() {
  const url = window.location.href;
  const msg = `صلِّ على النبي ﷺ وشارك الأجر: ${url}`;
  if (navigator.share) {
    navigator.share({ title: "صلِّ على النبي ﷺ", text: msg, url });
  } else {
    navigator.clipboard.writeText(msg);
    alert("تم نسخ الرابط ✅ شارك الأجر مع غيرك 🤍");
  }
}
