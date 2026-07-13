(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.dataset.theme = saved || preferred;
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
  });
  const menu = document.querySelector('#mobile-nav');
  document.querySelector('#menu-toggle')?.addEventListener('click', e => { const open = menu.hidden; menu.hidden = !open; e.currentTarget.setAttribute('aria-expanded', open); });
  const dialog = document.querySelector('#search-dialog');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  let index = [];
  async function openSearch(){ dialog.hidden=false; document.body.style.overflow='hidden'; input.focus(); if(!index.length){ try{ index=await fetch('/index.json').then(r=>r.json()); }catch(e){} } }
  function closeSearch(){ dialog.hidden=true; document.body.style.overflow=''; }
  document.querySelectorAll('[data-search-open]').forEach(b=>b.addEventListener('click',openSearch));
  document.querySelector('[data-search-close]')?.addEventListener('click',closeSearch);
  dialog?.addEventListener('click',e=>{if(e.target===dialog)closeSearch();});
  addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();} if(e.key==='Escape'&&!dialog?.hidden)closeSearch();});
  input?.addEventListener('input',()=>{const q=input.value.trim().toLowerCase(); if(!q){results.innerHTML='<p class="muted">Try “forecasting”, “inventory”, or “Python”.</p>';return;} const hits=index.filter(x=>(x.title+' '+x.summary+' '+(x.tags||[]).join(' ')).toLowerCase().includes(q)).slice(0,7); results.innerHTML=hits.length?hits.map(x=>`<a href="${x.url}"><small>${x.section}</small><strong>${x.title}</strong><span>${x.summary}</span></a>`).join(''):'<p class="muted">No results. Try a broader term.</p>';});
  const progress=document.querySelector('#reading-progress');
  if(progress)addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight; progress.style.width=`${Math.min(100,scrollY/h*100)}%`;},{passive:true});
})();

