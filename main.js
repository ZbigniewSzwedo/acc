// Smooth scroll helper
function scrollToContact(){
  const el = document.getElementById('kontakt');
  if(el){ el.scrollIntoView({behavior:'smooth'}); }
}

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');
if(toggle && menu){
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    // toggle display
    if(getComputedStyle(menu).display === 'none'){
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
    } else {
      menu.style.display = 'none';
    }
  });
}

// Accordion
document.querySelectorAll('.accordion__trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion__item');
    const open = item.hasAttribute('open');
    document.querySelectorAll('.accordion__item').forEach(i => i.removeAttribute('open'));
    if(!open){ item.setAttribute('open',''); }
  });
});

// Form validation + fake submit
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

function setError(id, msg){
  const node = document.querySelector(`.error[data-for="${id}"]`);
  if(node){ node.textContent = msg || ''; }
}

function validate(){
  let ok = true;
  setError('name',''); setError('email',''); setError('message',''); setError('consent','');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const consent = document.getElementById('consent').checked;

  if(name.length < 2){ setError('name','Podaj imię i nazwisko.'); ok=false; }
  if(!/^\S+@\S+\.\S+$/.test(email)){ setError('email','Podaj poprawny e-mail.'); ok=false; }
  if(message.length < 10){ setError('message','Wpisz wiadomość (min. 10 znaków).'); ok=false; }
  if(!consent){ setError('consent','Zaznacz zgodę.'); ok=false; }
  return ok;
}

if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!validate()) return;
    // Tu podepnij wysyłkę do swojego endpointu:
    // fetch('/api/contact', { method:'POST', body:new FormData(form) })
    //   .then(r=>r.ok? r.json(): Promise.reject())
    //   .then(()=>{ ... })
    form.reset();
    if(status){ status.textContent = 'Dziękujemy! Wiadomość została wysłana.'; }
    setTimeout(() => { if(status) status.textContent=''; }, 5000);
  });
}
