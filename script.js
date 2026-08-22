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

  // Use one real brand-logo image per campaign card. No recreated SVG marks
  // and no second injected logo badge.
  var campaignLogos={
    'Country Delight':'https://en.wikipedia.org/wiki/Special:Redirect/file/Country_Delight_logo.png',
    'Toyota':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota_carlogo.svg',
    'PUMA':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puma-logo-(text).svg',
    'Comfort':'https://logodownload.org/wp-content/uploads/2022/10/comfort-logo-0.png',
    'Dabur Babool':'https://www.dabur.com/Brands/Oral%20Care/Dabur%20Babool/Products/babool%20paste.jpg'
  };

  function restoreOriginalCampaignLogos(){
    var cards=document.querySelectorAll('.campaign-card');
    for(var i=0;i<cards.length;i++){
      // Remove the extra logo badge injected by the previous fix, if a cached
      // version of that markup is still present in the page.
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
      img.alt=name+' logo';
      img.loading='eager';
      img.referrerPolicy='no-referrer';
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