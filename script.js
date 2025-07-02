const btnGlobal = document.getElementById('salatGlobalBtn');
let personalCount = parseInt(localStorage.getItem('salatPersonal')) || 0;
const personalCountElem = document.getElementById('salatPersonalCount');

function updatePersonalCount() {
  personalCountElem.textContent = `عدد صلواتك أنت فقط: ${personalCount}`;
}

function updateGlobalButton(count) {
  btnGlobal.textContent = `${count} (عالمي)`;
}

const refSalat = firebase.database().ref('counts/salat');

refSalat.on('value', snapshot => {
  updateGlobalButton(snapshot.val() || 0);
});

btnGlobal.addEventListener('click', () => {
  refSalat.transaction(current => (current || 0) + 1);
  personalCount++;
  localStorage.setItem('salatPersonal', personalCount);
  updatePersonalCount();
});

updatePersonalCount();
