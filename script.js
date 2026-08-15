const langBtn = document.getElementById('langBtn');
let hindi = false;

function setLanguage(isHindi) {
  hindi = isHindi;
  document.documentElement.lang = hindi ? 'hi' : 'en';

  document.querySelectorAll('[data-en]').forEach((el) => {
    el.textContent = hindi ? el.dataset.hi : el.dataset.en;
  });

  langBtn.textContent = hindi ? 'English' : 'हिन्दी';
}

langBtn.addEventListener('click', () => setLanguage(!hindi));
setLanguage(false);
