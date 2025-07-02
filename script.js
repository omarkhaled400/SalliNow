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
const countEl = document.getElementById("count");

// عرض العدد عند تحميل الصفحة
countRef.on("value", (snapshot) => {
  const count = snapshot.val() || 0;
  console.log("Current count from DB:", count);
  countEl.textContent = count;
});

// عند الضغط على الزر
btn.addEventListener("click", () => {
  console.log("Button clicked");
  countRef.transaction(current => {
    console.log("Transaction current value:", current);
    return (current || 0) + 1;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error("Transaction failed:", error);
    } else if (!committed) {
      console.log("Transaction not committed");
    } else {
      console.log("Transaction committed, new count:", snapshot.val());
      countEl.textContent = snapshot.val();
    }
  });
});

window.share = function () {
  const url = window.location.href;
  const msg = `صلِّ على النبي ﷺ وشارك الأجر: ${url}`;
  if (navigator.share) {
    navigator.share({ title: "صلِّ على النبي ﷺ", text: msg, url });
  } else {
    navigator.clipboard.writeText(msg);
    alert("تم نسخ الرابط ✅ شارك الأجر مع غيرك 🤍");
  }
};
