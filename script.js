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

// مراجع لكل نوع عداد في الـ Firebase
const dbRefSalat = firebase.database().ref('counts/salat');
const dbRefHawqala = firebase.database().ref('counts/hawqala');
const dbRefIstighfar = firebase.database().ref('counts/istighfar');

// عناصر الصفحة
const btnSalatGlobal = document.getElementById('salatGlobalBtn');
const personalSalatCountElem = document.getElementById('salatPersonalCount');

const btnHawqalaGlobal = document.getElementById('hawqalaGlobalBtn');
const personalHawqalaCountElem = document.getElementById('hawqalaPersonalCount');

const btnIstighfarGlobal = document.getElementById('istighfarGlobalBtn');
const personalIstighfarCountElem = document.getElementById('istighfarPersonalCount');

const shareBtn = document.getElementById('shareBtn');
const contactBtn = document.getElementById('contactBtn');

// عدادات شخصية مخزنة في localStorage لكل نوع
let personalSalatCount = parseInt(localStorage.getItem('salatPersonal')) || 0;
let personalHawqalaCount = parseInt(localStorage.getItem('hawqalaPersonal')) || 0;
let personalIstighfarCount = parseInt(localStorage.getItem('istighfarPersonal')) || 0;

// تحديث العرض لكل نوع
function updatePersonalCounts() {
  personalSalatCountElem.textContent = `عدد صلواتك أنت فقط: ${personalSalatCount}`;
  personalHawqalaCountElem.textContent = `عدد حوقلتك أنت فقط: ${personalHawqalaCount}`;
  personalIstighfarCountElem.textContent = `عدد استغفاراتك أنت فقط: ${personalIstighfarCount}`;
}

function updateGlobalButton(btn, count) {
  btn.textContent = `${count} (عالمي)`;
}

// تفعيل الاستماع لتغييرات البيانات العالمية
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

// عند الضغط على أزرار العداد العالمي
btnSalatGlobal.addEventListener('click', () => {
  dbRefSalat.transaction(current => (current || 0) + 1)
    .then(() => {
      personalSalatCount++;
      localStorage.setItem('salatPersonal', personalSalatCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الصلاة:', err));
});
btnHawqalaGlobal.addEventListener('click', () => {
  dbRefHawqala.transaction(current => (current || 0) + 1)
    .then(() => {
      personalHawqalaCount++;
      localStorage.setItem('hawqalaPersonal', personalHawqalaCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الحوقلة:', err));
});
btnIstighfarGlobal.addEventListener('click', () => {
  dbRefIstighfar.transaction(current => (current || 0) + 1)
    .then(() => {
      personalIstighfarCount++;
      localStorage.setItem('istighfarPersonal', personalIstighfarCount);
      updatePersonalCounts();
    })
    .catch(err => console.error('خطأ في تحديث عداد الاستغفار:', err));
});

// تحديث عرض العدادات الشخصية أول مرة
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

// زر التواصل (واتساب)
contactBtn.addEventListener('click', () => {
  const phone = '201021069619'; // كود مصر بدون 0
  const url = `https://wa.me/${phone}`;
  window.open(url, '_blank');
});
