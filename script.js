// مفروض firebase متفعّل مسبقًا في مشروعك

// المراجع لعناصر الأزرار والعدادات الشخصية
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

// جلب القيم الشخصية من localStorage أو تهيئتها بالصفر
let personal = {
  salat: parseInt(localStorage.getItem('salatPersonal')) || 0,
  hawqala: parseInt(localStorage.getItem('hawqalaPersonal')) || 0,
  istighfar: parseInt(localStorage.getItem('istighfarPersonal')) || 0,
};

// تحديث عرض الأعداد الشخصية
function updatePersonalDisplays() {
  countsPersonal.salat.textContent = `عدد صلواتك أنت فقط: ${personal.salat}`;
  countsPersonal.hawqala.textContent = `عدد الحوقلة الخاصة بك: ${personal.hawqala}`;
  countsPersonal.istighfar.textContent = `عدد الاستغفار الخاص بك: ${personal.istighfar}`;
}

// تحديث عرض زر العدّاد العالمي (النص مع العدد والكلمة "عالمي" فقط مرة واحدة)
function updateGlobalButton(button, count) {
  button.textContent = `${count} (عالمي)`;
}

// --- كود الربط مع Firebase ---

// مثال: مراجع لقاعدة البيانات (غيرها حسب مشروعك)
const database = firebase.database();

const refs = {
  salat: database.ref('counts/salat'),
  hawqala: database.ref('counts/hawqala'),
  istighfar: database.ref('counts/istighfar'),
};

// تحديث الزر العالمي عند تغير البيانات في قاعدة Firebase
refs.salat.on('value', snapshot => {
  updateGlobalButton(btns.salatGlobal, snapshot.val() || 0);
});

refs.hawqala.on('value', snapshot => {
  updateGlobalButton(btns.hawqalaGlobal, snapshot.val() || 0);
});

refs.istighfar.on('value', snapshot => {
  updateGlobalButton(btns.istighfarGlobal, snapshot.val() || 0);
});

// عند الضغط على زر عالمي، زيادة القيمة في Firebase وعدادك الشخصي
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

// دالة المشاركة
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

// تحديث العرض عند بداية تحميل الصفحة
updatePersonalDisplays();
