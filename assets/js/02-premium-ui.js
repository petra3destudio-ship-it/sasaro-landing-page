(()=>{
  'use strict';
  const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
  const modal=q('#modal'), modalImg=q('#mimg'), closeBtn=q('#close');
  if(!modal||!modalImg) return;

  /* Upgrade touch targets and descriptive labels without altering visible content. */
  const prev=q('#prev'), next=q('#next');
  if(prev) prev.setAttribute('aria-label','Anterior');
  if(next) next.setAttribute('aria-label','Siguiente');
  if(closeBtn) closeBtn.setAttribute('aria-label','Cerrar imagen ampliada');
  qa('.dot').forEach((d,i)=>d.setAttribute('aria-label','Ir a imagen '+(i+1)));
  qa('.gcard').forEach(b=>b.setAttribute('aria-label','Ampliar '+(q('img',b)?.alt||'imagen')));

  /* Premium lightbox for every project photograph, with arrows, keyboard, swipe and zoom. */
  const photoEls=qa('.slide img,.svcphotos img,.gcard img');
  const sources=[];
  photoEls.forEach(img=>{const src=img.currentSrc||img.src;if(src&&!sources.includes(src))sources.push(src)});
  let current=0, touchX=0, touchY=0;

  const lbPrev=document.createElement('button');
  lbPrev.type='button';lbPrev.className='lbnav prev';lbPrev.innerHTML='‹';lbPrev.setAttribute('aria-label','Imagen anterior');
  const lbNext=document.createElement('button');
  lbNext.type='button';lbNext.className='lbnav next';lbNext.innerHTML='›';lbNext.setAttribute('aria-label','Imagen siguiente');
  modal.append(lbPrev,lbNext);

  const syncIndex=()=>{const i=sources.indexOf(modalImg.src);if(i>=0) current=i};
  const openSrc=src=>{const i=sources.indexOf(src);if(i>=0) current=i;modalImg.classList.remove('zoomed');modalImg.src=src;modal.classList.add('show');document.body.classList.add('modal-open')};
  const stepLightbox=dir=>{if(!sources.length)return;current=(current+dir+sources.length)%sources.length;modalImg.classList.remove('zoomed');modalImg.src=sources[current]};
  const closeLightbox=()=>{modal.classList.remove('show');modalImg.classList.remove('zoomed');document.body.classList.remove('modal-open')};

  qa('.svcphotos img').forEach(img=>{
    img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar '+(img.alt||'imagen'));
    img.addEventListener('click',e=>{e.stopPropagation();openSrc(img.currentSrc||img.src)});
    img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSrc(img.currentSrc||img.src)}});
  });
  qa('.slide,.gcard').forEach(el=>el.addEventListener('click',()=>{const img=q('img',el);if(img){const src=img.currentSrc||img.src;const i=sources.indexOf(src);if(i>=0)current=i;document.body.classList.add('modal-open')}}));

  lbPrev.addEventListener('click',e=>{e.stopPropagation();syncIndex();stepLightbox(-1)});
  lbNext.addEventListener('click',e=>{e.stopPropagation();syncIndex();stepLightbox(1)});
  if(closeBtn) closeBtn.addEventListener('click',closeLightbox);
  modalImg.addEventListener('click',e=>{e.stopPropagation();modalImg.classList.toggle('zoomed')});
  modal.addEventListener('touchstart',e=>{if(!e.changedTouches[0])return;touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY},{passive:true});
  modal.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-touchX,dy=t.clientY-touchY;if(Math.abs(dx)>58&&Math.abs(dx)>Math.abs(dy)*1.25){syncIndex();stepLightbox(dx<0?1:-1)}},{passive:true});
  document.addEventListener('keydown',e=>{if(!modal.classList.contains('show'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft'){syncIndex();stepLightbox(-1)}if(e.key==='ArrowRight'){syncIndex();stepLightbox(1)}});
  const observerModal=new MutationObserver(()=>document.body.classList.toggle('modal-open',modal.classList.contains('show')));
  observerModal.observe(modal,{attributes:true,attributeFilter:['class']});

  /* Reveal on scroll, progressive enhancement only. */
  const reveal=qa('.head,.slider,.svc,.step,.gcard,.ibox');
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    reveal.forEach(el=>el.classList.add('reveal-ready'));
    const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('revealed');io.unobserve(en.target)}}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
    reveal.forEach(el=>io.observe(el));
  }

  /* Highlight the visible destination in the sticky navigation. */
  const navLinks=qa('.links a[href^="#"]');
  const map=new Map(navLinks.map(a=>[a.getAttribute('href').slice(1),a]));
  if('IntersectionObserver' in window){
    const nio=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting&&map.has(en.target.id)){navLinks.forEach(a=>a.classList.remove('nav-on'));map.get(en.target.id).classList.add('nav-on')}}),{rootMargin:'-24% 0px -62% 0px',threshold:0});
    map.forEach((_,id)=>{const el=document.getElementById(id);if(el)nio.observe(el)});
  }

  /* Tactile ripple on the interactive controls. */
  qa('.btn,.links a,.ctrl button,.gcard,.contact-action,.map-action,.wa-float').forEach(el=>el.addEventListener('pointerdown',e=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const r=el.getBoundingClientRect(),d=Math.max(r.width,r.height),dot=document.createElement('span');
    dot.className='ripple-dot';dot.style.width=dot.style.height=d+'px';dot.style.left=(e.clientX-r.left-d/2)+'px';dot.style.top=(e.clientY-r.top-d/2)+'px';
    const pos=getComputedStyle(el).position;if(pos==='static')el.style.position='relative';el.appendChild(dot);setTimeout(()=>dot.remove(),650)
  },{passive:true}));

  /* Faster, more reliable image decode hints on modern mobile browsers. */
  photoEls.forEach(img=>{img.decoding='async'});
})();
