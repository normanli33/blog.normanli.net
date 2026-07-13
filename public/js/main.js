(()=>{
  // Theme toggle with localStorage persistence
  const h=document.documentElement;
  document.getElementById('theme-toggle')?.addEventListener('click',()=>{
    const dark = h.getAttribute('data-theme')==='dark' ||
      (!h.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    h.setAttribute('data-theme', next);
    try{ localStorage.setItem('theme', next); }catch(e){}
  });
  // Mobile menu
  const mn=document.getElementById('mobile-nav');
  document.getElementById('menu-toggle')?.addEventListener('click',e=>{
    mn.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',mn.classList.contains('open'));
  });
})();
