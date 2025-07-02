let count = localStorage.getItem("salatCount") || 0;
document.getElementById("count").textContent = count;

document.getElementById("salatBtn").addEventListener("click", () => {
  count++;
  localStorage.setItem("salatCount", count);
  document.getElementById("count").textContent = count;
});

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
