const menuBtn=document.getElementById('menuBtn');
const navMenu=document.getElementById('navMenu');
if(menuBtn&&navMenu){menuBtn.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);menuBtn.textContent=open?'✕':'☰';});navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰';}));}
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const profilePhoto=document.querySelector('.profile-photo');
if(profilePhoto){fetch('assets/profile/rohit-avatar-base64.txt').then(r=>r.text()).then(data=>{const img=profilePhoto.querySelector('img');if(img)img.style.display='none';profilePhoto.style.width='104px';profilePhoto.style.height='104px';profilePhoto.style.backgroundImage=`url(data:image/jpeg;base64,${data.trim()})`;profilePhoto.style.backgroundSize='cover';profilePhoto.style.backgroundPosition='center';profilePhoto.style.backgroundRepeat='no-repeat';}).catch(()=>{});}
