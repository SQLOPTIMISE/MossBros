// Accessibility & interactions
(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu){
    toggle.addEventListener('click', ()=>{
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for same-page anchors
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id && id.length > 1){
      const target = document.querySelector(id);
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.pushState(null, '', id);
        // Close mobile menu after navigation
        if (menu && menu.classList.contains('open')){
          menu.classList.remove('open');
          toggle?.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // FAQ accordion (keyboard friendly)
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const region = document.getElementById(btn.getAttribute('aria-controls'));
      if (region){
        if (expanded){ region.hidden = true; }
        else { region.hidden = false; region.focus?.(); }
      }
    });
    btn.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
    });
  });

  // Current year in footer
  const y = document.getElementById('year');
  if (y){ y.textContent = new Date().getFullYear(); }
})();
