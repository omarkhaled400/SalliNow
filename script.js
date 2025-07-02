// عداد الصلاة
let globalCount = localStorage.getItem("salatCount") || 0;
let userCount = localStorage.getItem("userSalat") || 0;
const salatBtn = document.getElementById("salatBtn");
const userCounter = document.getElementById("userCount");

salatBtn.textContent = globalCount;
userCounter.textContent = userCount;

salatBtn.addEventListener("click", () => {
  globalCount++;
  userCount++;
  localStorage.setItem("salatCount", globalCount);
  localStorage.setItem("userSalat", userCount);
  salatBtn.textContent = globalCount;
  userCounter.textContent = userCount;
});

// مشاركة
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

// الحوقلة والاستغفار
function initZekr(keyDisplay, keyUser, displayId, userId) {
  const global = localStorage.getItem(keyDisplay) || 0;
  const user = localStorage.getItem(keyUser) || 0;
  document.getElementById(displayId).textContent = global;
  document.getElementById(userId).textContent = user;
}

function incrementCounter(keyDisplay, displayId, userId) {
  let global = parseInt(localStorage.getItem(keyDisplay) || "0");
  global++;
  localStorage.setItem(keyDisplay, global);
  document.getElementById(displayId).textContent = global;

  // عداد شخصي
  let user = parseInt(localStorage.getItem(keyDisplay + "_user") || "0");
  user++;
  localStorage.setItem(keyDisplay + "_user", user);
  document.getElementById(userId).textContent = user;
}

// البداية
initZekr("hawqalaCount", "hawqalaCount_user", "hawqalaDisplay", "hawqalaUser");
initZekr("estighfarCount", "estighfarCount_user", "estighfarDisplay", "estighfarUser");
