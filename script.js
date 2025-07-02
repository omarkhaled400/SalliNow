// إعدادات Firebase الخاصة بك
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

// اختيار عناصر الصفحة
const salatBtn = document.getElementById("salatBtn");
const userCount = document.getElementById("userCount");

// جلب العداد الشخصي من localStorage
let personalCount = parseInt(localStorage.getItem("userSalat") || "0");
userCount.textContent = personalCount;

// إنشاء مرجع لعداد الصلوات العالمي في Firebase
const salatRef = db.ref("globalSalatCount");

// متابعة تغييرات العداد العالمي من Firebase مباشرة
salatRef.on("value", (snapshot) => {
  const count = snapshot.val() || 0;
  salatBtn.textContent = count;
});

// عند الضغط على الزر
salatBtn.addEventListener("click", () => {
  // زيادة العداد الشخصي وحفظه
  personalCount++;
  localStorage.setItem("userSalat", personalCount);
  userCount.textContent = personalCount;

  // زيادة العداد العالمي داخل Firebase باستخدام transaction لضمان الدقة
  salatRef.transaction((currentValue) => {
    return (currentValue || 0) + 1;
  });
});

// وظيفة المشاركة (اختياري)
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
