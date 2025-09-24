(function(){
  const STRIPE_LINK='https://buy.stripe.com/7sY5kF0JN2GU1KR3AEeEo05';
  const WHATSAPP_LINK='https://wa.me/34690232999?text=Hola%21%20Me%20interesa%20el%20stand%20NFC%20%F0%9F%99%8C%20Voy%20a%20poner%20a%20prueba%20vuestro%20r%C3%A9cord%20de%20respuesta%20de%202%20minutos%20%E2%98%BA%EF%B8%8F';

  const defaultLang='es'; const supported=['es','en'];
  let current=localStorage.getItem('reviply_lang')||defaultLang;

  async function loadLocale(lang){
    if(!supported.includes(lang)) lang=defaultLang;
    const res=await fetch('locales/'+lang+'.json'); const data=await res.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.getAttribute('data-i18n');
      if(data[key]!==undefined){ if(el.placeholder!==undefined) el.placeholder=data[key]; else el.textContent=data[key];}
    });
    document.querySelectorAll('[data-lang]').forEach(btn=>{
      const active=btn.getAttribute('data-lang')===lang;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed', active?'true':'false');
    });
    current=lang; localStorage.setItem('reviply_lang',lang); document.documentElement.lang=lang;
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-lang]'); if(b){e.preventDefault(); loadLocale(b.getAttribute('data-lang'));}
  });

  function setLinks(){
    document.querySelectorAll('[data-checkout]').forEach(a=>a.href=STRIPE_LINK);
    document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=WHATSAPP_LINK);
  }

  function setupFAQ(){
    document.querySelectorAll('[data-faq]').forEach(dt=>{
      dt.addEventListener('click',()=>{
        const dd=dt.nextElementSibling; const open=dd.style.display==='block';
        document.querySelectorAll('.faq dd').forEach(x=>x.style.display='none');
        dd.style.display=open?'none':'block';
      });
    });
  }

  setLinks(); setupFAQ(); loadLocale(current);
})();