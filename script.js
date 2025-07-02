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
const countRef = db.ref("globalCount");

const btn = document.getElementById("salatBtn");
const globalCountEl = document.getElementById("globalCount");
const userCountEl = document.getElementById("userCount");

// تحميل العداد الشخصي من localStorage أو صفر إذا جديد
let userCount = parseInt(localStorage.getItem("userSalatCount")) || 0;
userCountEl.textContent = userCount;

// تحديث العداد العالمي من Firebase
countRef.on("value", (snapshot) => {
  const count = snapshot.val() || 0;
  globalCountEl.textContent = count;
});

// عند الضغط على زر الصلاة
btn.addEventListener("click", () => {
  // تحديث العداد العالمي في Firebase
  countRef.transaction((current) => {
    return (current || 0) + 1;
  });

  // تحديث العداد الشخصي وحفظه في localStorage
  userCount++;
  localStorage.setItem("userSalatCount", userCount);
  userCountEl.textContent = userCount;
});

// زر المشاركة
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
