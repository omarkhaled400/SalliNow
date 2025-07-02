// 1. إعداد Firebase
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
const database = firebase.database();

// 2. عناصر الصفحة
const btns = {
  salatGlobal: document.getElementById('salatGlobalBtn'),
  hawqalaGlobal: document.getElementById('hawqalaGlobalBtn'),
  istighfarGlobal: document.getElementById('istighfarGlobalBtn'),
};

const countsPersonal = {
  salat: document.getElementById('salatPersonalCount'),
  hawqala: document.getElementById('hawqalaPersonalCount'),
  istighfar: document.getElementById('istighfarPersonalCount'),
};

// 3. جلب البيانات الشخصية من localStorage أو تهيئتها
let personal = {
  salat: parseInt(localStorage.getItem('salatPersonal')) || 0,
  hawqala: parseInt(localStorage.getItem('hawqalaPersonal')) || 0,
  istighfar: parseInt(localStorage.getItem('istighfarPersonal')) || 0,
};

// 4. تحديث العرض الشخصي
function updatePersonalDisplays() {
  countsPersonal.salat.textContent = `عدد صلواتك أنت فقط: ${personal.salat}`;
  countsPersonal.hawqala.textContent = `عدد الحوقلة الخاصة بك: ${personal.hawqala}`;
  countsPersonal.istighfar.textContent = `عدد الاستغفار الخاص بك: ${personal.istighfar}`;
}

// 5. تحديث نص زر العدّاد العالمي (عدد + كلمة "عالمي")
function updateGlobalButton(button, count) {
  button.textContent = `${count} (عالمي)`;
}

// 6. مراجع Firebase لعدادات كل نوع
const refs = {
  salat: database.ref('counts/salat'),
  hawqala: database.ref('counts/hawqala'),
  istighfar: database.ref('counts/istighfar'),
};

// 7. الاستماع لتحديث القيم من Firebase وتحديث الأزرار
refs.salat.on('value', snap => {
  updateGlobalButton(btns.salatGlobal, snap.val() || 0);
});
refs.hawqala.on('value', snap => {
  updateGlobalButton(btns.hawqalaGlobal, snap.val() || 0);
});
refs.istighfar.on('value', snap => {
  updateGlobalButton(btns.istighfarGlobal, snap.val() || 0);
});

// 8. عند الضغط على زر عالمي: تحديث القاعدة والعداد الشخصي
btns.salatGlobal.addEventListener('click', () => {
  refs.salat.transaction(current => (current || 0) + 1);
  personal.salat++;
  localStorage.setItem('salatPersonal', personal.salat);
  updatePersonalDisplays();
});
btns.hawqalaGlobal.addEventListener('click', () => {
  refs.hawqala.transaction(current => (current || 0) + 1);
  personal.hawqala++;
  localStorage.setItem('hawqalaPersonal', personal.hawqala);
  updatePersonalDisplays();
});
btns.istighfarGlobal.addEventListener('click', () => {
  refs.istighfar.transaction(current => (current || 0) + 1);
  personal.istighfar++;
  localStorage.setItem('istighfarPersonal', personal.istighfar);
  updatePersonalDisplays();
});

// 9. دالة المشاركة
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

// 10. دالة التواصل على الواتساب
function contact() {
  const phone = '01021069619';
  const url = `https://wa.me/${phone}`;
  window.open(url, '_blank');
}

// 11. تهيئة العرض عند تحميل الصفحة
updatePersonalDisplays();
