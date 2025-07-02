// إعدادات Firebase
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

// عناصر الواجهة
const salatBtn = document.getElementById("salatBtn");
const userSalatCount = document.getElementById("userSalatCount");

const hawqalaBtn = document.getElementById("hawqalaBtn");
const userHawqalaCount = document.getElementById("userHawqalaCount");

const estighfarBtn = document.getElementById("estighfarBtn");
const userEstighfarCount = document.getElementById("userEstighfarCount");

// جلب القيم من localStorage أو تعيين صفر
let personalSalat = parseInt(localStorage.getItem("userSalat") || "0");
let personalHawqala = parseInt(localStorage.getItem("userHawqala") || "0");
let personalEstighfar = parseInt(localStorage.getItem("userEstighfar") || "0");

userSalatCount.textContent = personalSalat;
userHawqalaCount.textContent = personalHawqala;
userEstighfarCount.textContent = personalEstighfar;

// مراجع Firebase
const salatRef = db.ref("globalSalatCount");
const hawqalaRef = db.ref("globalHawqalaCount");
const estighfarRef = db.ref("globalEstighfarCount");

// تحديث الأزرار بالعداد العالمي لحظياً
salatRef.on("value", snapshot => {
  salatBtn.textContent = snapshot.val() || 0;
});
hawqalaRef.on("value", snapshot => {
  hawqalaBtn.textContent = snapshot.val() || 0;
});
estighfarRef.on("value", snapshot => {
  estighfarBtn.textContent = snapshot.val() || 0;
});

// دوال الزيادة عند الضغط مع تحديث العدادات الشخصية والعالمية
salatBtn.addEventListener("click", () => {
  personalSalat++;
  localStorage.setItem("userSalat", personalSalat);
  userSalatCount.textContent = personalSalat;

  salatRef.transaction(current => (current || 0) + 1);
});

hawqalaBtn.addEventListener("click", () => {
  personalHawqala++;
  localStorage.setItem("userHawqala", personalHawqala);
  userHawqalaCount.textContent = personalHawqala;

  hawqalaRef.transaction(current => (current || 0) + 1);
});

estighfarBtn.addEventListener("click", () => {
  personalEstighfar++;
  localStorage.setItem("userEstighfar", personalEstighfar);
  userEstighfarCount.textContent = personalEstighfar;

  estighfarRef.transaction(current => (current || 0) + 1);
});

// مشاركة الموقع
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
