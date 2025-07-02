// جلب عناصر الصفحة
const btnGlobal = document.getElementById('salatGlobalBtn');
const personalCountElem = document.getElementById('salatPersonalCount');

// جلب العداد الشخصي من localStorage أو تعيين صفر
let personalCount = parseInt(localStorage.getItem('salatPersonal')) || 0;

// تحديث عرض العداد الشخصي
function updatePersonalCount() {
  personalCountElem.textContent = `عدد صلواتك أنت فقط: ${personalCount}`;
}

// تحديث نص الزر العالمي
function updateGlobalButton(count) {
  btnGlobal.textContent = `${count} (عالمي)`;
}

// مرجع قاعدة بيانات Firebase للعداد العالمي
const refSalat = firebase.database().ref('counts/salat');

// استماع لتغييرات العداد العالمي في Firebase
refSalat.on('value', snapshot => {
  const count = snapshot.val() || 0;
  updateGlobalButton(count);
});

// حدث الضغط على الزر: زيادة العداد العالمي في Firebase وتحديث العداد الشخصي محلياً
btnGlobal.addEventListener('click', () => {
  refSalat.transaction(current => (current || 0) + 1)
    .then(() => {
      personalCount++;
      localStorage.setItem('salatPersonal', personalCount);
      updatePersonalCount();
    })
    .catch(error => {
      console.error('خطأ في تحديث العداد العالمي:', error);
    });
});

// عرض العداد الشخصي عند تحميل الصفحة
updatePersonalCount();
