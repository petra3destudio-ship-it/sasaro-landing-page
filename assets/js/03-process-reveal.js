(()=>{
  const rows=[...document.querySelectorAll('#proceso .process-row')];
  if(!rows.length)return;
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||!('IntersectionObserver' in window)){rows.forEach(row=>row.classList.add('process-visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('process-visible');io.unobserve(entry.target);}
  }),{threshold:.16,rootMargin:'0px 0px -7% 0px'});
  rows.forEach(row=>io.observe(row));
})();
