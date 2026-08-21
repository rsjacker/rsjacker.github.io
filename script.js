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

  // Campaign cards are loaded immediately from a small dedicated file.
  // This keeps them independent from the rest of the site enhancements.
  var campaignScript=document.createElement('script');
  campaignScript.src='mobile-projects-fix.js?v=3';
  campaignScript.async=false;
  document.head.appendChild(campaignScript);

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