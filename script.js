// Core navigation and reveal behaviour.
(function(){
  var menuBtn=document.getElementById('menuBtn');
  var navMenu=document.getElementById('navMenu');
  if(menuBtn&&navMenu){
    menuBtn.addEventListener('click',function(){
      var open=navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',open?'true':'false');
      menuBtn.textContent=open?'✕':'☰';
    });
    var links=navMenu.querySelectorAll('a');
    for(var i=0;i<links.length;i++) links[i].addEventListener('click',function(){
      navMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.textContent='☰';
    });
  }

  var year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      for(var i=0;i<entries.length;i++){
        if(entries[i].isIntersecting){
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    },{threshold:.08});
    for(var r=0;r<reveals.length;r++) observer.observe(reveals[r]);
  }else{
    for(var j=0;j<reveals.length;j++) reveals[j].classList.add('visible');
  }

  // Campaign cards.
  var campaignScript=document.createElement('script');
  campaignScript.src='mobile-projects-fix.js?v=4';
  campaignScript.async=false;
  document.head.appendChild(campaignScript);

  // Self-contained brand marks: no hot-linked images, so they work on desktop and mobile.
  var logoStyle=document.createElement('style');
  logoStyle.textContent='.campaign-logo-mark{width:118px;height:68px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:center;padding:7px;margin:0 0 18px;box-shadow:0 6px 18px rgba(15,23,42,.05);overflow:hidden}.campaign-logo-mark svg{width:100%;height:100%;display:block}@media(max-width:560px){.campaign-logo-mark{width:104px;height:62px}}';
  document.head.appendChild(logoStyle);

  var logos={
    'Country Delight':'<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="32" r="28" fill="#0871b9"/><path d="M35 42c12-11 24-12 38-2 7-7 13-8 20-6v12H35z" fill="#7fbe32"/><circle cx="80" cy="36" r="7" fill="#f6be22"/><path d="M43 27c8-8 27-9 36 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><text x="60" y="35" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="12" font-weight="700" fill="#fff">Country</text><text x="60" y="47" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="11" font-weight="700" fill="#fff">Delight</text></svg>',
    'Toyota':'<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#d71920" stroke-width="4"><ellipse cx="60" cy="32" rx="29" ry="19"/><ellipse cx="60" cy="32" rx="10" ry="19"/><ellipse cx="60" cy="26" rx="18" ry="8"/></g></svg>',
    'PUMA':'<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg"><text x="10" y="40" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#111">PUMA</text><path d="M84 18c8-4 16-2 22 3l-7 2 5 4-9 1-7 7-8-1 4-6-8 2 5-6z" fill="#111"/></svg>',
    'Comfort':'<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg"><path d="M16 42c19 7 49 7 87-6" fill="none" stroke="#0a3f85" stroke-width="3" stroke-linecap="round"/><text x="60" y="37" text-anchor="middle" font-family="Trebuchet MS,Arial,sans-serif" font-size="24" font-weight="700" font-style="italic" fill="#0a3f85">Comfort</text></svg>',
    'Dabur Babool':'<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="9" width="110" height="46" rx="13" fill="#d71920"/><path d="M5 43h110v12H5z" fill="#238b45"/><ellipse cx="30" cy="27" rx="18" ry="10" fill="#a91318" stroke="#f3c25b" stroke-width="2"/><text x="30" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="9" font-weight="700" fill="#fff">Dabur</text><text x="77" y="35" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="19" font-style="italic" font-weight="900" fill="#fff">Babool</text></svg>'
  };

  function installCampaignLogos(){
    var cards=document.querySelectorAll('.campaign-card');
    if(!cards.length) return false;
    for(var i=0;i<cards.length;i++){
      if(cards[i].querySelector('.campaign-logo-mark')) continue;
      var h=cards[i].querySelector('h3');
      if(!h) continue;
      var key=h.textContent.trim();
      if(!logos[key]) continue;
      var box=document.createElement('div');
      box.className='campaign-logo-mark';
      box.setAttribute('aria-label',key+' logo');
      box.innerHTML=logos[key];
      cards[i].insertBefore(box,cards[i].firstChild);
    }
    return true;
  }

  var tries=0;
  var logoTimer=setInterval(function(){
    tries++;
    if(installCampaignLogos() || tries>30) clearInterval(logoTimer);
  },150);

  function loadBase64Image(id,url,mime){
    var img=document.getElementById(id);
    if(!img) return;
    fetch(url+'?v=18',{cache:'no-store'}).then(function(resp){
      if(!resp.ok) throw new Error('asset');
      return resp.text();
    }).then(function(data){
      img.src='data:'+mime+';base64,'+data.replace(/\s+/g,'');
      var fallback=img.parentElement ? img.parentElement.querySelector('.edu-logo-placeholder') : null;
      if(fallback) fallback.style.display='none';
    }).catch(function(){});
  }

  var profileImg=document.querySelector('.profile-photo img');
  if(profileImg){
    profileImg.id='profilePhoto';
    loadBase64Image('profilePhoto','assets/profile/profile-tiny.b64.txt','image/jpeg');
  }
  loadBase64Image('qubLogo','assets/university/qub-tiny.b64.txt','image/jpeg');
  loadBase64Image('sdsuLogo','assets/university/sdsu-tiny.b64.txt','image/jpeg');
})();