// Core navigation and reveal behaviour.
(function(){
  // Explicit site icons for browser tabs, favorites and mobile shortcuts.
  var oldIcons=document.querySelectorAll('link[rel~="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"]');
  for(var oi=0;oi<oldIcons.length;oi++) oldIcons[oi].remove();
  function addIcon(rel,href,type){
    var link=document.createElement('link');
    link.rel=rel;
    link.href=href;
    if(type) link.type=type;
    document.head.appendChild(link);
  }
  addIcon('icon','/site-icon.svg?v=8','image/svg+xml');
  addIcon('shortcut icon','/favicon.ico?v=8','image/x-icon');
  addIcon('apple-touch-icon','/apple-touch-icon.png?v=8','image/png');

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

  // Use one real brand-logo image per campaign card. No recreated SVG marks
  // and no second injected logo badge.
  var campaignLogos={
    'Country Delight':'https://en.wikipedia.org/wiki/Special:Redirect/file/Country_Delight_logo.png',
    'Toyota':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota_carlogo.svg',
    'PUMA':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puma-logo-(text).svg',
    'Comfort':'https://logodownload.org/wp-content/uploads/2022/10/comfort-logo-0.png',
    'Dabur Babool':'assets/brands/dabur-logo.jpg'
  };

  function restoreOriginalCampaignLogos(){
    var cards=document.querySelectorAll('.campaign-card');
    for(var i=0;i<cards.length;i++){
      var duplicates=cards[i].querySelectorAll('.campaign-logo-mark');
      for(var d=0;d<duplicates.length;d++) duplicates[d].remove();

      var title=cards[i].querySelector('h3');
      var badge=cards[i].querySelector('.campaign-brand');
      if(!title || !badge) continue;
      var name=title.textContent.trim();
      var src=campaignLogos[name];
      if(!src) continue;

      badge.innerHTML='';
      var img=document.createElement('img');
      img.src=src;
      img.alt=(name==='Dabur Babool'?'Dabur':name)+' logo';
      img.loading='eager';
      img.style.width='100%';
      img.style.height='100%';
      img.style.objectFit='contain';
      img.style.display='block';
      badge.appendChild(img);
    }
  }
  restoreOriginalCampaignLogos();

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