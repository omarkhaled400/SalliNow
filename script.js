// بيانات Firebase
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
const countRef = db.ref("globalCount");

const btn = document.getElementById("salatBtn");
const countEl = document.getElementById("count");

// تحديث العداد أول ما الصفحة تفتح
countRef.on("value", (snapshot) => {
  const count = snapshot.val() || 0;
  countEl.textContent = count;
});

// لما تضغط على زر الصلاة
btn.addEventListener("click", () => {
  countRef.transaction((current) => {
    return (current || 0) + 1;
  });
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
