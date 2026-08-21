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

// Explicit favicon for browser tabs.
let favicon=document.head.querySelector('link[rel="icon"]');
if(!favicon){favicon=document.createElement('link');favicon.rel='icon';document.head.appendChild(favicon);}
favicon.type='image/svg+xml';
favicon.href='favicon.svg?v=1';

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

// Bloomberg Finance Fundamentals certificate — verified through Bloomberg for Education.
if(certGrid && ![...certGrid.querySelectorAll('h3')].some(h=>h.textContent.includes('Bloomberg Finance Fundamentals'))){
  const card=document.createElement('article');
  card.className='cert';
  card.innerHTML=`<div class="cert-media"><svg viewBox="0 0 180 64" aria-hidden="true"><rect width="180" height="64" rx="14" fill="#07111f"/><text x="16" y="28" font-size="17" font-family="Arial,sans-serif" font-weight="700" fill="#4c7dff">BFF</text><text x="16" y="46" font-size="10.5" font-family="Arial,sans-serif" font-weight="700" fill="#ffffff">Bloomberg Finance Fundamentals</text><g stroke="#4c7dff" stroke-width="3"><line x1="132" y1="17" x2="132" y2="47"/><line x1="147" y1="11" x2="147" y2="40"/><line x1="162" y1="24" x2="162" y2="52"/></g></svg></div><div><p>Bloomberg for Education</p><h3>Bloomberg Finance Fundamentals</h3><a href="https://portal.bloombergforeducation.com/certificates/wVcuNZx1SKgu8DfJiGFjcxx4" target="_blank" rel="noopener">Verify certificate ↗</a></div>`;
  certGrid.appendChild(card);
}

// Selected commercial campaign case studies from influencer marketing work, 2022–2025.
const projectsSection=document.getElementById('projects');
if(projectsSection && !document.getElementById('campaignCaseStudies')){
  const style=document.createElement('style');
  style.id='campaignCaseStudyStyles';
  style.textContent=`
    .campaign-block{margin-top:54px;padding-top:42px;border-top:1px solid var(--line)}
    .campaign-intro{display:grid;grid-template-columns:.8fr 1.2fr;gap:44px;align-items:end;margin-bottom:26px}
    .campaign-intro .card-kicker{margin-bottom:10px}.campaign-intro h3{font-size:clamp(1.8rem,3vw,2.65rem);line-height:1;letter-spacing:-.045em;margin:0}
    .campaign-intro>p{margin:0;color:var(--muted);max-width:720px}
    .campaign-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
    .campaign-card{display:flex;flex-direction:column;min-height:100%;padding:30px}
    .campaign-card .ownership{display:inline-flex;align-self:flex-start;padding:6px 9px;border:1px solid #cbd5e1;border-radius:999px;background:#f8fafc;color:#475569;font-size:.66rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;margin-bottom:16px}
    .campaign-card h3{font-size:1.55rem;margin-bottom:10px}.campaign-card>p{margin:0;color:var(--muted)}
    .campaign-card .result-grid{margin:24px 0 4px}.campaign-card .result-grid strong{font-size:1.2rem}.campaign-card .result-grid span{line-height:1.25;display:block;margin-top:2px}
    .campaign-card .tags{margin-top:auto;padding-top:22px}.campaign-note{font-size:.78rem!important;margin-top:14px!important;color:#64748b!important}
    .campaign-card.wide{grid-column:1/-1}.campaign-card.wide .campaign-wide-body{display:grid;grid-template-columns:1.25fr .75fr;gap:28px;align-items:start}
    @media(max-width:900px){.campaign-intro{grid-template-columns:1fr;gap:12px}.campaign-grid{grid-template-columns:1fr}.campaign-card.wide{grid-column:auto}.campaign-card.wide .campaign-wide-body{grid-template-columns:1fr}}
    @media(max-width:560px){.campaign-block{margin-top:40px;padding-top:34px}.campaign-card{padding:23px}.campaign-card .result-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const block=document.createElement('div');
  block.id='campaignCaseStudies';
  block.className='campaign-block';
  block.innerHTML=`
    <div class="campaign-intro">
      <div><p class="card-kicker">COMMERCIAL CAMPAIGN EXPERIENCE · 2022–2025</p><h3>Selected Brand Campaigns</h3></div>
      <p>Influencer marketing work across regional creator activation, event coverage, community seeding and large-scale campaign operations for consumer and automotive brands.</p>
    </div>
    <div class="campaign-grid">
      <article class="card campaign-card">
        <span class="ownership">Sole Campaign Ownership</span>
        <p class="card-kicker">REGIONAL CREATOR ACTIVATION</p>
        <h3>Country Delight</h3>
        <p>Built a Bengali-native micro-influencer campaign across Instagram and YouTube, translating the brand's farm-to-consumer, no-middleman proposition into natural lifestyle content for a defined geography.</p>
        <div class="result-grid"><div><strong>100K+</strong><span>Views</span></div><div><strong>10K+</strong><span>Engagements</span></div><div><strong>Bengali</strong><span>Native audience</span></div></div>
        <div class="tags"><span>Micro Influencers</span><span>Regional Marketing</span><span>Instagram</span><span>YouTube</span></div>
      </article>

      <article class="card campaign-card">
        <span class="ownership">Sole Campaign Ownership</span>
        <p class="card-kicker">AUTO EXPO 2023 · NEW DELHI</p>
        <h3>Toyota</h3>
        <p>Led automobile creator activation around Toyota's Auto Expo 2023 showcase, focusing on hybrid technology and future vehicle reveals. Selected credible Indian automotive creators and coordinated high-reach coverage, including a one-take Instagram execution.</p>
        <div class="result-grid"><div><strong>10M+</strong><span>Views</span></div><div><strong>Auto Expo</strong><span>Event coverage</span></div><div><strong>Hybrid</strong><span>Technology story</span></div></div>
        <div class="tags"><span>Creator Sourcing</span><span>Automotive</span><span>Instagram</span><span>Event Campaign</span></div>
      </article>

      <article class="card campaign-card wide">
        <span class="ownership">Sole Campaign Ownership</span>
        <div class="campaign-wide-body">
          <div><p class="card-kicker">SPORTS AWARENESS · COMMUNITY SEEDING</p><h3>PUMA</h3><p>Executed community content seeding for a PUMA sports-awareness initiative positioning sport as part of education rather than simply an extracurricular activity. Distributed brand-generated content featuring Virat Kohli across targeted WhatsApp and Telegram communities.</p><p class="campaign-note">Distribution included 250 WhatsApp groups, typically with 200+ members, and 50 Telegram groups, typically with 5K+ members.</p></div>
          <div><div class="result-grid"><div><strong>250</strong><span>WhatsApp groups</span></div><div><strong>50</strong><span>Telegram groups</span></div><div><strong>300</strong><span>Communities seeded</span></div></div><div class="tags"><span>Content Seeding</span><span>Community Marketing</span><span>WhatsApp</span><span>Telegram</span></div></div>
        </div>
      </article>

      <article class="card campaign-card">
        <span class="ownership">Campaign Team</span>
        <p class="card-kicker">LARGE-SCALE CREATOR OPERATIONS · 3 MONTHS</p>
        <h3>Comfort</h3>
        <p>Supported a three-month lifestyle campaign positioning Comfort as an everyday clothing-care product through mom, lifestyle and female creators across India. Managed influencer data, product-delivery tracking, content deadlines and campaign consolidation in Google Sheets.</p>
        <div class="result-grid"><div><strong>1,500</strong><span>Influencers</span></div><div><strong>100M+</strong><span>Views</span></div><div><strong>10+</strong><span>Regional languages</span></div></div>
        <div class="tags"><span>Campaign Operations</span><span>Google Sheets</span><span>Influencer Tracking</span><span>Pan-India</span></div>
      </article>

      <article class="card campaign-card">
        <span class="ownership">Campaign Team</span>
        <p class="card-kicker">REGIONAL NANO-INFLUENCER ACTIVATION</p>
        <h3>Dabur Babool</h3>
        <p>Supported a Maharashtra-focused nano-influencer campaign communicating Babool toothpaste's ingredient-led product proposition. Maintained live content trackers, coordinated brand feedback and approvals, and kept creator deliverables on deadline.</p>
        <div class="result-grid"><div><strong>250</strong><span>Influencers</span></div><div><strong>Maharashtra</strong><span>Regional focus</span></div><div><strong>Live</strong><span>Content tracking</span></div></div>
        <div class="tags"><span>Nano Influencers</span><span>Brand Reporting</span><span>Content Approval</span><span>Google Sheets</span></div>
      </article>
    </div>`;

  projectsSection.appendChild(block);
}
