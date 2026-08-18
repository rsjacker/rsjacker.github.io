const menuBtn=document.getElementById('menuBtn');
const navMenu=document.getElementById('navMenu');
if(menuBtn&&navMenu){
  menuBtn.addEventListener('click',()=>{
    const open=navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open);
    menuBtn.textContent=open?'✕':'☰';
  });
  navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.textContent='☰';
  }));
}
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const profileImg=document.querySelector('.profile-photo img');
if(profileImg){
  Promise.all([1,2,3,4,5,6].map(n=>fetch(`assets/profile/photo-${n}.txt`).then(r=>{
    if(!r.ok) throw new Error('photo chunk');
    return r.text();
  }))).then(parts=>{
    const photoData=parts.join('').replace(/\s+/g,'');
    profileImg.src='data:image/jpeg;base64,'+photoData;
    profileImg.style.display='block';
  }).catch(()=>{});
}
