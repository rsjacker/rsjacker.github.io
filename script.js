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

async function loadBase64Image(id,url,mime){
  const img=document.getElementById(id);
  if(!img) return;
  try{
    const r=await fetch(url+'?v=9',{cache:'no-store'});
    if(!r.ok) throw new Error('asset');
    const data=(await r.text()).replace(/\s+/g,'');
    img.src=`data:${mime};base64,${data}`;
    const fallback=img.parentElement.querySelector('.edu-logo-placeholder');
    if(fallback) fallback.style.display='none';
  }catch(e){}
}
loadBase64Image('qubLogo','assets/university/qub-tiny.b64.txt','image/png');
loadBase64Image('sdsuLogo','assets/university/sdsu-tiny.b64.txt','image/jpeg');

const profileImg=document.querySelector('.profile-photo img');
if(profileImg){
  profileImg.addEventListener('error',async()=>{
    try{
      const r=await fetch('assets/profile/profile-tiny.b64.txt?v=9',{cache:'no-store'});
      const data=(await r.text()).replace(/\s+/g,'');
      profileImg.src='data:image/jpeg;base64,'+data;
    }catch(e){}
  },{once:true});
}

const bbaCard=[...document.querySelectorAll('.education-card')].find(card=>card.textContent.includes('Bachelor of Business Administration'));
if(bbaCard && !bbaCard.querySelector('.degree-link')){
  const degreeLink=document.createElement('a');
  degreeLink.href='#';
  degreeLink.className='btn secondary degree-link';
  degreeLink.style.marginTop='14px';
  degreeLink.textContent='View Degree ↗';
  degreeLink.setAttribute('aria-label','View Bachelor of Business Administration degree certificate');
  degreeLink.addEventListener('click',async e=>{
    e.preventDefault();
    const original=degreeLink.textContent;
    degreeLink.textContent='Opening…';
    try{
      const r=await fetch('assets/education/Bachelor-Degree.pdf.b64.txt?v=9',{cache:'no-store'});
      if(!r.ok) throw new Error('degree');
      const b64=(await r.text()).replace(/\s+/g,'');
      const binary=atob(b64);
      const bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
      window.open(url,'_blank','noopener');
      setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(err){
      alert('The degree document could not be opened. Please refresh the page and try again.');
    }finally{
      degreeLink.textContent=original;
    }
  });
  bbaCard.appendChild(degreeLink);
}