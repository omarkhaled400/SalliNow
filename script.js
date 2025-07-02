// تكوين Firebase الخاص بك
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

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// مراجع عدادات Firebase لكل نوع ذكر
const dbRefSalat = db.ref('counts/salat');
const dbRefHawqala = db.ref('counts/hawqala');
const dbRefIstighfar = db.ref('counts/istighfar');

// جلب عناصر HTML
const btnSalatGlobal = document.getElementById('salatGlobalBtn');
const salatPersonalCountEl = document.getElementById('salatPersonalCount');

const btnHawqalaGlobal = document.getElementById('hawqalaGlobalBtn');
const hawqalaPersonalCountEl = document.getElementById('hawqalaPersonalCount');

const btnIstighfarGlobal = document.getElementById('istighfarGlobalBtn');
const istighfarPersonalCountEl = document.getElementById('istighfarPersonalCount');

const shareBtn = document.getElementById('shareBtn');
const contactBtn = document.getElementById('contactBtn');

// جلب العدادات الشخصية من localStorage أو تعيين صفر
let personalSalatCount = parseInt(localStorage.getItem('salatPersonal')) || 0;
let personalHawqalaCount = parseInt(localStorage.getItem('hawqalaPersonal')) || 0;
let personalIstighfarCount = parseInt(localStorage.getItem('istighfarPersonal')) || 0;

// تحديث عرض العدادات الشخصية
function updatePersonalCounts() {
  salatPersonalCountEl.textContent = `عدد صلواتك أنت فقط: ${personalSalatCount}`;
  hawqalaPersonalCountEl.textContent = `عدد حوقلتك أنت فقط: ${personalHawqalaCount}`;
  istighfarPersonalCountEl.textContent = `عدد استغفاراتك أنت فقط: ${personalIstighfarCount}`;
}

// تحديث النص على أزرار العداد العالمي
function updateGlobalButton(btn, count) {
  btn.textContent = `${count} (عالمي)`;
}

// الاستماع لتحديثات قاعدة البيانات العالمية
dbRefSalat.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(btnSalatGlobal, count);
});
dbRefHawqala.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(btnHawqalaGlobal, count);
});
dbRefIstighfar.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(btnIstighfarGlobal, count);
});

// عند الضغط على زر العداد العالمي للصلاة على النبي
btnSalatGlobal.addEventListener('click', () => {
  dbRefSalat.transaction(current => (current || 0) + 1)
    .then(() => {
      personalSalatCount++;
      localStorage.setItem('salatPersonal', personalSalatCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الصلاة:', err));
});

// عند الضغط على زر العداد العالمي للحوقلة
btnHawqalaGlobal.addEventListener('click', () => {
  dbRefHawqala.transaction(current => (current || 0) + 1)
    .then(() => {
      personalHawqalaCount++;
      localStorage.setItem('hawqalaPersonal', personalHawqalaCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الحوقلة:', err));
});

// عند الضغط على زر العداد العالمي للاستغفار
btnIstighfarGlobal.addEventListener('click', () => {
  dbRefIstighfar.transaction(current => (current || 0) + 1)
    .then(() => {
      personalIstighfarCount++;
      localStorage.setItem('istighfarPersonal', personalIstighfarCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الاستغفار:', err));
});

// تحديث العدادات الشخصية في أول تحميل
updatePersonalCounts();

// زر المشاركة
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

// زر التواصل واتساب
contactBtn.addEventListener('click', () => {
  const phone = '201021069619'; // كود مصر بدون صفر
  const url = `https://wa.me/${phone}`;
  window.open(url, '_blank');
});
