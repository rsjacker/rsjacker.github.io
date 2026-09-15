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

  function addMonsterProject(){
    var projects=document.querySelector('#projects > .cards.two');
    if(!projects || document.getElementById('monster-project-card')) return;
    var article=document.createElement('article');
    article.className='card project-card featured-card';
    article.id='monster-project-card';
    article.innerHTML='<div class="project-identity"><div class="project-symbol" style="background:linear-gradient(145deg,#111827,#16a34a)">MNST</div><div><strong>Monster Beverage Corporation · Equity Research</strong><span>NASDAQ: MNST · Beverages</span></div></div><p class="card-kicker">EQUITY RESEARCH &amp; VALUATION · 2026</p><h3>Monster Beverage Corporation</h3><p>Built a full equity research and valuation case on Monster Beverage Corporation using DCF and peer-based valuation, supported by Bloomberg and S&amp;P Capital IQ Pro.</p><p><strong>My work:</strong> Modelled 2026E–2030E revenue, analysed growth, margins, volume and pricing trends, and tested valuation across bear, base and bull scenarios.</p><div class="result-grid"><div><strong>$40.58</strong><span>Base Case</span></div><div><strong>7.0%</strong><span>WACC</span></div><div><strong>3.5%</strong><span>Terminal Growth</span></div></div><p><strong>Scenario range:</strong> $27.70 bear case · $40.58 base case · $63.07 bull case, using revenue forecasts from $9.80bn in 2026E to $14.03bn in 2030E.</p><div class="tags"><span>S&amp;P Capital IQ Pro</span><span>Bloomberg</span><span>Excel</span><span>DCF</span><span>Peer Valuation</span></div>';
    projects.insertBefore(article,projects.firstChild);
  }
  addMonsterProject();

  function addForagePrivateBankCertificate(){
    var grid=document.querySelector('#certifications .cert-grid');
    if(!grid || document.getElementById('forage-private-bank-cert')) return;
    var article=document.createElement('article');
    article.className='cert';
    article.id='forage-private-bank-cert';
    article.innerHTML='<div class="cert-media">Forage</div><div><p>Forage · Jul 2026</p><h3>Private Bank Job Simulation (Bank of America)</h3><a href="#" target="_blank" rel="noopener">View certificate ↗</a></div>';
    var cards=grid.children;
    if(cards.length>=2) grid.insertBefore(article,cards[2]);
    else grid.appendChild(article);
  }
  addForagePrivateBankCertificate();

  function applyCertificatePreview(titleText,b64Path,altText){
    var titles=document.querySelectorAll('#certifications .cert h3');
    for(var i=0;i<titles.length;i++){
      if(titles[i].textContent.trim()!==titleText) continue;
      var card=titles[i].closest('.cert');
      if(!card) return;
      var media=card.querySelector('.cert-media');
      var link=card.querySelector('a');
      fetch(b64Path+'?v=1',{cache:'no-store'}).then(function(resp){
        if(!resp.ok) throw new Error('asset');
        return resp.text();
      }).then(function(data){
        var uri='data:image/webp;base64,'+data.replace(/\s+/g,'');
        if(media){
          media.innerHTML='';
          var img=document.createElement('img');
          img.src=uri;
          img.alt=altText;
          img.loading='eager';
          img.style.width='100%';
          img.style.height='100%';
          img.style.objectFit='cover';
          img.style.display='block';
          media.appendChild(img);
        }
        if(link){
          link.href=uri;
          link.textContent='View certificate ↗';
        }
      }).catch(function(){});
      return;
    }
  }

  applyCertificatePreview('Private Bank Job Simulation (Bank of America)','assets/certificates/forage-private-bank-preview.b64.txt','Bank of America Private Bank Job Simulation certificate issued by Forage');
  applyCertificatePreview('The Fundamentals of Digital Marketing','assets/certificates/google-digital-marketing-preview.b64.txt','Google Digital Unlocked Fundamentals of Digital Marketing certificate');
  applyCertificatePreview('Entrepreneurship – from ideas to reality','assets/certificates/openlearn-entrepreneurship-preview.b64.txt','OpenLearn Entrepreneurship from ideas to reality statement of participation');

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