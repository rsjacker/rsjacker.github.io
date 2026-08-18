// SEO signals for Google and social previews.
document.title="Rohit Kumar | MSc Finance | Queen's University Belfast";
const upsertMeta=(selector,attrs)=>{
  let el=document.head.querySelector(selector);
  if(!el){el=document.createElement('meta');document.head.appendChild(el);}
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
};
upsertMeta('meta[name="description"]',{name:'description',content:"Finance portfolio of Rohit Kumar, MSc Finance postgraduate at Queen's University Belfast, featuring financial analysis, valuation, Bloomberg, S&P Capital IQ Pro, Python, R and Excel projects and certifications."});
upsertMeta('meta[property="og:title"]',{property:'og:title',content:"Rohit Kumar | MSc Finance | Queen's University Belfast"});
upsertMeta('meta[property="og:description"]',{property:'og:description',content:"Finance portfolio featuring projects, education, skills and professional certifications."});
upsertMeta('meta[property="og:url"]',{property:'og:url',content:'https://rsjacker.github.io/'});
let canonical=document.head.querySelector('link[rel="canonical"]');
if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}
canonical.href='https://rsjacker.github.io/';
if(!document.getElementById('personStructuredData')){
  const schema=document.createElement('script');
  schema.id='personStructuredData';
  schema.type='application/ld+json';
  schema.textContent=JSON.stringify({
    '@context':'https://schema.org',
    '@type':'Person',
    name:'Rohit Kumar',
    url:'https://rsjacker.github.io/',
    sameAs:['https://www.linkedin.com/in/rohit-kumar-sharma-/','https://github.com/rsjacker'],
    alumniOf:{'@type':'CollegeOrUniversity',name:"Queen's University Belfast"},
    knowsAbout:['Finance','Financial Analysis','Corporate Finance','Valuation','Bloomberg Terminal','S&P Capital IQ Pro','Python','R','Excel']
  });
  document.head.appendChild(schema);
}

const menuBtn=document.getElementById('menuBtn');
const navMenu=document.getElementById('navMenu');
if(menuBtn&&navMenu){
  menuBtn.addEventListener('click',()=>{
    const open=navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open?'true':'false');
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

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

async function loadBase64Image(id,url,mime){
  const img=document.getElementById(id);
  if(!img) return;
  try{
    const r=await fetch(url+'?v=17',{cache:'no-store'});
    if(!r.ok) throw new Error('asset');
    const data=(await r.text()).replace(/\s+/g,'');
    img.src=`data:${mime};base64,${data}`;
    img.onload=()=>{
      const fallback=img.parentElement.querySelector('.edu-logo-placeholder');
      if(fallback) fallback.style.display='none';
    };
  }catch(e){
    const fallback=img.parentElement?.querySelector('.edu-logo-placeholder');
    if(fallback) fallback.style.display='grid';
  }
}

// Load profile photo from a valid base64 asset so it works reliably in mobile in-app browsers.
const profileImg=document.querySelector('.profile-photo img');
if(profileImg){
  profileImg.id='profilePhoto';
  loadBase64Image('profilePhoto','assets/profile/profile-tiny.b64.txt','image/jpeg');
}

// Valid Queen's University Belfast crest/logo asset and Sri Dev Suman logo.
loadBase64Image('qubLogo','assets/university/qub-tiny.b64.txt','image/jpeg');
loadBase64Image('sdsuLogo','assets/university/sdsu-tiny.b64.txt','image/jpeg');

// Make the three newer certificate cards open the ORIGINAL uploaded PDFs.
document.querySelectorAll('.cert').forEach(card=>{
  const title=card.querySelector('h3')?.textContent.trim()||'';
  const link=card.querySelector('a');
  if(!link) return;
  if(title==='The Fundamentals of Digital Marketing'){
    link.href='certificates/Google-Digital-Marketing.pdf';
    link.textContent='View certificate ↗';
  }
  if(title.includes('Entrepreneurship')){
    link.href='certificates/Entrepreneurship-OpenLearn.pdf';
    link.textContent='View certificate ↗';
  }
});

const certGrid=document.querySelector('.cert-grid');
if(certGrid && ![...certGrid.querySelectorAll('h3')].some(h=>h.textContent.includes('Private Bank Job Simulation'))){
  const card=document.createElement('article');
  card.className='cert';
  card.innerHTML=`<div class="cert-media"><svg viewBox="0 0 180 64" aria-hidden="true"><rect width="180" height="64" rx="14" fill="#fff"/><text x="14" y="27" font-size="12" font-family="Arial,sans-serif" font-weight="900" fill="#17386d">BANK OF AMERICA</text><g transform="translate(122 9) skewX(-18)"><rect x="18" y="0" width="28" height="5" rx="2" fill="#e31837"/><rect x="12" y="9" width="34" height="5" rx="2" fill="#e31837"/><rect x="6" y="18" width="40" height="5" rx="2" fill="#e31837"/><rect x="0" y="0" width="22" height="5" rx="2" fill="#1261a0"/><rect x="0" y="9" width="17" height="5" rx="2" fill="#1261a0"/></g><text x="14" y="49" font-size="11" font-family="Arial,sans-serif" font-weight="800" fill="#0a3474">Forage</text></svg></div><div><p>Bank of America · Forage · Jul 2026</p><h3>The Private Bank Job Simulation</h3><a href="certificates/Bank-of-America-Private-Bank.pdf" target="_blank" rel="noopener">View certificate ↗</a></div>`;
  certGrid.appendChild(card);
}
