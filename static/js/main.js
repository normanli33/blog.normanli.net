(()=>{
  const menu=document.querySelector('#mobile-nav');
  document.querySelector('#menu-toggle')?.addEventListener('click',e=>{const open=menu.hidden;menu.hidden=!open;e.currentTarget.setAttribute('aria-expanded',open);});
  // Set active nav link
  const path=location.pathname.replace(/\/$/,'');
  document.querySelectorAll('.nav-links a,.mobile-nav a').forEach(a=>{if(a.getAttribute('href').replace(/\/$/,'')===path)a.classList.add('active');});
})();
