// عداد الصلاة العالمي (من Firebase مثلاً)
let globalCount = localStorage.getItem("salatCount") || 0;
let userCount = localStorage.getItem("userSalat") || 0;
document.getElementById("count").textContent = globalCount;
document.getElementById("userCount").textContent = userCount;

document.getElementById("salatBtn").addEventListener("click", () => {
  globalCount++;
  userCount++;
  localStorage.setItem("salatCount", globalCount);
  localStorage.setItem("userSalat", userCount);
  document.getElementById("count").textContent = globalCount;
  document.getElementById("userCount").textContent = userCount;
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

// عدادات الحوقلة والاستغفار
document.getElementById("hawqalaDisplay").textContent =
  localStorage.getItem("hawqalaCount") || 0;

document.getElementById("estighfarDisplay").textContent =
  localStorage.getItem("estighfarCount") || 0;

function incrementCounter(key, displayId) {
  let current = parseInt(localStorage.getItem(key) || "0");
  current++;
  localStorage.setItem(key, current);
  document.getElementById(displayId).textContent = current;
}
