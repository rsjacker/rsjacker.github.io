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

async function setBase64Image(selector,url,mime='image/jpeg'){
  try{
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok) throw new Error('asset');
    const data=(await r.text()).replace(/\s+/g,'');
    const target=document.querySelector(selector);
    if(!target) return;
    if(target.tagName==='IMG'){
      target.src=`data:${mime};base64,${data}`;
    }else{
      target.innerHTML='';
      const img=document.createElement('img');
      img.src=`data:${mime};base64,${data}`;
      img.alt=target.getAttribute('aria-label')||'';
      target.appendChild(img);
    }
  }catch(e){}
}
setBase64Image('.profile-photo img','assets/profile/profile-tiny.b64.txt','image/jpeg');
const eduLogos=document.querySelectorAll('.edu-logo');
if(eduLogos[0]) setBase64Image('.edu-logo:nth-of-type(1)','assets/university/qub-tiny.b64.txt','image/jpeg');
if(eduLogos[1]){
  const second=eduLogos[1];
  fetch('assets/university/sdsu-tiny.b64.txt',{cache:'no-store'}).then(r=>r.text()).then(data=>{
    second.innerHTML='';
    const img=document.createElement('img');
    img.src='data:image/jpeg;base64,'+data.replace(/\s+/g,'');
    img.alt='Sri Dev Suman Uttarakhand University logo';
    second.appendChild(img);
  }).catch(()=>{});
}
