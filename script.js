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
    const r=await fetch(url+'?v=12',{cache:'no-store'});
    if(!r.ok) throw new Error('asset');
    const data=(await r.text()).replace(/\s+/g,'');
    img.src=`data:${mime};base64,${data}`;
    const fallback=img.parentElement.querySelector('.edu-logo-placeholder');
    if(fallback) fallback.style.display='none';
  }catch(e){}
}

// Queen's University Belfast crest-only image for a cleaner mobile layout.
const qubLogo=document.getElementById('qubLogo');
if(qubLogo){
  qubLogo.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgCUlEQVR42u2dd5xU1dnHv+fce6duXzpIUbBh7JXEqEkkllgQVEw09hhNNLZYYtRXX401sQIKKOobS1TAGo0NjahIsWJXkL4s22d2Zm475/3jDkvbhe0F5/f57D+7d2fvnud3nvP0AznkkEMOOeSQQw455JBDDjnkkEMOOeSQQw455JBDDjnkkEMOOeSQw9YG0VEfrEEsg4hBf5Fb5rbha1Y5h4DXEZ9tdtRLJw47rJd+5b/PKOkUIlE5MbYOIS2MbSm5DbfqoR5FgIzWpoBdIoICPyfHVsMSkIHijvr8DiOANgytwXWBHAHadkYL0THqv0MJ0Ni/oh0bjd2o6SEAYcZAyo59DQ0oBUKAFE1/ryNfwUmj8ZpYB4EIxTtNKp1GAO07hPbeGWuPXdD+RjpBCHAc0s+9AgkbTKt9BL3RN7TnonGReXko14GMi8BCSxcZj6FdF51xkGYUhFzHTN1O5rIG5aYI/3RfrB1GoH1vo2WQqEQdmedmga+Dddk6CCDQfoLY2GPIv+LKJp9KzXiaytPPRiTdtpFAa7SXQYTCaA1a2SAl5s5DKLz8UsKjRuGXryFx3/3Y8xZQdM1VhPfeK/jexEmkZ7yIdmyQBlKE0ToDroGwrMaY1Wzh+24dsfHH0WvyZER+QaOPeSu+p+ylvcFVYBhbjwYIjgBns0/EjhsHAipPOxuSLqI1JNCghUvhDX8h/d93MXv3JjpuDCIWJrzPvsiikuAf3257wnvvg7dqJebgocH3hu9AeNRPcD5cgLd4CTpZS/VlV1F83fUkJk3FW/gtwrDaJvypUxHxvKYfTWVAt5fK6VYEaB5iY8aBFlSefhYkPTBb9oradzEG96HgoovIzJ2PMXAAsWOOafi5/e472O/PJXbUUZjDhwfC9zzqH38cLSF21NGE9tiL0B574X33NdqziRx0MKq6lpor/4owitog/AcQ8Xi3Wu9uR4BAE4wFoak87WxES0mgNRgC7bvgK8jaG4n7J5Ke/S7YNsaQIaiqqvX0roe7bCneypXUP/EE1k47kn/m2Qihs0abDa2xTbu58LstARo0AYKK085CtoYEWrOBFacUeSeNJ3bYEZt6GpEIRX+5KuDCou+onzk9cGBD1oaf2Sa1H++W69xtCRCQYCy9NFSeflbLNUGDIBQgyD/3jw273a8oRxYVI0LhhsdUVSUYEnPb7Si85DIA3M8+bYO137wzv6shO/WvtcKtiR03ltJpU9B5Ajy3laEU8FYso/7RRyk/fhzlow/HfuOtdfLKZKg65/eUjz6C6muvwf5gAdq2WxcT6EHC73wNIFvn1sSOC46DQBO00EXMCrHm+mtBmBRecQXWDjsiYrF1FAmHKXnwQXQySf3TT1J1/XUUX3Qh5qBBrVL78fHHUdpK4YtIuLMcgM4kgEYYeSQffYLoscdgjdyldYYhmorTz0a2hAQqyEOV3j0REY40qZlkfj7k51Nw/p8oOPc8NALv6y9adea3Vvj4Hol/3IWutxFGZOs6AoQRwvtiEeVjT8T9bGGrNUGvaVPReRK8loXHRTiCqq4mMeFeKv70B5x589fJzrapue5aqi69GGfBfJAGokVG57qdH1j7rRN+1aWXkrhzUiD8TtICnWgDaGQohv/V920kwVhKH5qatQmaQQIpQSmqrryM8rFj8ZYuI7L3fsiiog2eCe2xB9Y2Q6m5/n8pG38C9ry5GxiJzdv5rXT1ssJP3jkJaeVtjUfAxiRYTPnYE+kz/V+tOw7GjAWg8rRmeAdagxTEjjiSgvP+iLnN4E21g2URO/pYAPLO+z32vLkYAwZAsq7jXb1NhN+59TOd6wU0kCAekGBcGzTBmLGUTmuGJjAMQBA58CDMbQbjr1pJ+oXnsee9n3URwV+5jPSLwfeEFSIy6ieYAwcF2qMpgbSHtd/Fwu/COECWBF8GJOjz9L9abxiKtZqgMcNQ468qw1uyCJVIYL/6OnV334u3ZBWYgvwzfkvkoAOpuuwK/BUVCFMSO/FY8k47HXPEtnjffQuut2n+px2s/e4g/C4OBLUTCcaMhYZgkdvg9yMERmkJqeeeJ/PGLPAVKpFEYGAWlIBWJKc8RHLqNGQojllYCkqRnv4SmZdnIaJhcNwgN79BRFDgu7XETjqO0imtFb7fLYTfDSKB65GgLTbBcVmb4PSzoM7OFnaYFN91F0U33LguuyaNLD80wjTJzH4L+/05FJx3PoQi68K9SgXHgwh+xxjQj/RzzwN6PbX/ACIW77E7v5sQYCOboF1IcCaqrIaq352LiEQ3tKj1WrtQI3sVU/Q/1xI7bhypGdNJvfgyUsiNA4jZ39E4H32KRhEfPyZQ+1uB8LsJAdqZBAIqTz2T+kcfQ2zm39P4OO/OwRgymMyzL6KS9YjN+F8Km9j48ZROndKjz/xuSoB2JMGYsQgNFaefhUjqrGG4aSZPAM7sBTD7fYQZQ4YKaLzaR6CcOmLjT6TXVib8LnIDO95FjB63vovYdBWSCEUQobxselg37uo5tcTGj+nRrl4PIsCm3kGbIoYNYWO3Na/RLrH9BuGb2d/3VfClcwRo4rBVoNQG3kHbwsZT0HkS3RIStLPwBRbKS6CFC1EJEYHSGZSTDMiQswGCs1b7HljB4gltZo+D79toE7SwxrA9yrgaEjsTEYaFtc+PiP3qV4T23w9z6BAwDbzvFpN+/nnq/+8JdFU6W3H8Q9UAGrRrI/sX0ee1Fyh9dCpa+iinFoFopwTSlC2HjdtV+PdiFpfS67EH6PvmGxRcdRWRn/8CrRT2q7Nw35+POWAwBdf/BWP7geB7P1ACaNDaQYd8zJ1GEP7xj4mM/gXmyBGU3Hc30TG/RBiy7SQYM47Sh6aimiJBOyd2DKsQlUziLlmKCEcBcD//GPvtt1D19YiCAnQmg7fwc4TIFrHyg8kFrCd8labg6suJ/OIQ6v5+FzgOqrKK2C8PJe+c32PuvCOpF19BymiDd9CWsHGjNYYdktiRaCeF9/VXQYRRCKwddsHaebeN1kBjz51Dxalnob5Z3rpeiB6rAbRGm0aRQw8h/OMDsQYOWNc8srYBw/cD10m3p3ewXo2hFh2S1dNuivDBP6X473esc/0a6/QRgvB+B1Byx21ow2959XGPJYAG5dWj3UwgdNdd16AJDanaDRdEt5N3MK7BRfTdqjZa+40kdjRoqcn/wx+w35qFTtRu8WMih/wMa/vtWuat9NgjQGm0qSi6/nrsjz9CJ+o3HyDRGu05CDMEkvYLG2tF6uWX6HX/lNYVrDYW5NGg3QyytJDwPnvhry4HK7RlHygUwhg8CO+zb7d+DaCVjyzOI//PFxIbPRqdSG5mZQRaaowRA9GWymqEDcPGLdUE/qqV1D/5BNaOO1N6173UP/kU9rw5DQWkbYrwSYXcti9Ft96AMWQYoX33C5JSWSQfeRh34afoZGLDAJVSW+yd3LqMQA06lUK7blAK3dRjNXXk/eZESu68i/p/PkLV+ZchiYDQLY4T6PoktbffSmLKA2gFsaOOJLLHrtTccx9q2RJC++5HyS03Edprn1YJXztJYqedQMmEiYhYHvgezkcf4C1dDo6PPXcOdf+4E6NPP2S/UnpNm0Zoz70CDWdn8JevBGH8QAjQXJ6kM4R2HonIyyM06gBEKATO2t755tcY+uWrWXPC8Tjffkfx5ZcRGzcOWVwKQPyU07Hnvk/tLbewavQv6T1pErETTmzZzgeQEey352LPn4/Zry/Vl15G5rXZqHQ9GhejVy9iY8bgr1qJPec9Ks84E2u3XSm54078VSvwl65AGOYPjACe3+CXqJpkg9Gn1yZxhEBnf64dp5HW6Q0TSI25iNpxqDz9DLxVq+j/2mtYO+6UVbtZqzsSIXLIz4gcdBDVf72KNaedTr9BgwiP+nHzhQ8I08RfXMaaw8YgoiF0VQKNjzl4APFTf0PeGWdhDh2GdhwyL/+bygsvwn7k/wj/aFf8stXotIMIxX5AbqDvI/OjyNJiMAzip52GCIcxBw8h73dnN+IFNH2ebM5FrH/8MdJz59L3iX+tEz5Qc9MNlP3qCPyyFdnVMCi+4W/EjjySqsuvQNcnmy389UkgXAE1DhqInXoiff87i6Lrb8QcOqzB4IsefSx9X36Z8G57UP3nK0ncNRnZycLvcgJo2yY2/iQihx8R+MMHHwyWhbd8OapyDapmTQumZDRFAo01Yjv6PvcM1h57NpCq/rFHcN6Zi/fRlyQn3oe/cnl2RSSlkyZSePFFgYZoytXb7KoaKJUhesJR9Jr6AOaQYY0+Zm2/A6VTJiHCUYTqGlF0rQYQInCRsqVYqraW+kemYf/3TQhHQEr8ioqgMrelJGjwDgTu199Q+fvzgtLv994BIah/6SUyr78BiTS1/7gDXAd/xQrS/3mJ6muvITFlCoTCaNel6tJLWpbP931EUT5F11272RY27Tgkpj0Crh8cxvqHRoD1QwOJWpx3ZxHae1/ivz0dbftUnns+qZnTsXb/0TrCNJcEXy1m9bHj8BYvJn78CZBMs/roY0nPmgVA0YUXkXfqKYh+RfT65yPIfv1RiQQVZ5xNYuJ95J18CiIcofrKK0jcOQFp5Te7mEP7DqFddsQasf1mn6t/5BHqJk3E2v1H5J1/JspL/UAJoHx0XSXhAw/B2nkk9nvvknricQovuYQ+z79A9MijgoWtTaKV2nLORGvAJ7zrSEQshojnETvqCFAKIy8fb/EinLnzST3zAv7iFaSeeQ7304XgOhhWBLN3f6KjDwUgvPvuyPy8lmfrDNlgrOp0olFbRoRDmNsPp/Cay4mfcRoiGmlZLKJHewFivR0tBMaAoSAkqroSXVtB0d/+tkk3rzN/PthpCBVsPsTs1hHdKLYfPuAA5L33U/vna6i9+kZUXR3SiCHNOKmHnyT91LNIaeIn64gcORpZknURTz4FGYtlawybN6RCGBbu51/jr1iBMXgw3qLvMPr0R/buu8Fz8ZNPITZmDCIvH3/lcqQVCuYSbO0aQAA640Im+88KuW4unyGJHHr4pq3cjk399JkIEd6i8BtL7JjbD0eGI+AZkHSRZjwgoFJIM4qwBTrtA4rQjjtuMEZmwxrDZsTqDQO1poq6yesNfdIPfV0ozaQyMsHwJ49G5VKdPygzG5xBEgDnbHxy9ds+qOC4nWZwPWQfvHfOAs+QpjhJoW/uTIuY8AACIVQqgal0ijTQ0dARwQ6pFHCQfkJNB7Gtts2mjtoSY2hNOMk75lI+oXnsEaOxP3iS9KvvLLp6Ve5huRDD1B9yZWgrE4vGu2aI0AItJ3G++prQnvtvWWjKlVPzd9uRigDjJYLPwjSxbD234PwrrtjjRiO7F2KiMSCxBQKVVWNKl9D/av/QRY3Ppt5/ellW5xjKAU4BpVn/I7Sf1oUXnsNa849F1GQR2T/UesZvwmqr/wrlCUQoWinuwJdRABAadKvvkbs17/e4uN1d9yBM/8jjMZq95tbxpWXR/EtN5OaMZP6l/6Nv3Q5ut5GRmMoJ4XRpzfWyB0oOPMMoocd3uS7tKTGUJgmuiLNmnEnUXL7LRRfcw0Vl15C4ZlnEj9hPN7335F5ezZGOA/fSHeJH9hlXoAw4qSeeQHnk483+5z76SfU3XYn0oi1XviAMAwQBpl5c3Hem4P72ULyzjqVkmn3o10X5/15pN9+B69s9RbrAppdY0gwe0CmBBXnnEti8v2U/s911N0/mco/X4KqrqX6iqvwl5S1bgJpO+3FDsHqI47ol3n5zYWWES31ReN/WrtpzD13ovS+CVi77tboRI6qC84nec/9yFDhhgRowfjVjVmjamtQ1TWYAwfi19QgLAudqkf26hMkm5qJ1Mzp2TmGejOaQKCcesyhAzD22BWjqJCCc86h7qGH0IkkZnERyQkPIqzGw8AhBLZQFwy2q+7ZyuIAGmFGcRYsIDVzJqp82brQa8PZn8J+822EiGwi/NaXcQlkYTHm0GFUXXQxZQcdhF9WhjFgUIuEHxwHY7Mzi5rSBALlpogc+hP6vPU6fWfMoOjqq6mZMIHiq69G9ulNavqzCCvaZVLo4kCQRmAR2m13jEHDN6nK0Y6LKq/a0DJurwLOiy4kOWEq6ovvKR8zrv1qDDf6OyI/RvEd/8AcPAS/bBXpF15EKk3i/smU3HgDhMItHnjVI4xAbWT0FlN5AoQQOPMWYO28U0Pat+GHto0oyIPy2g3Ufrxda/hkO8wnaHyOofY9rO22w8yGhN0vv6TigguQhkHpxHsR0Tih/fcms+RZBFbT8TLdcUd1hxEg/Ml3tq21vaVXF1Yeibsmk5g0tRG+CITKzulv7169hsROe84n2GiOoRDojN0wsDry45/Qa8LdYJjknZlNdztN9wOsvatCi467dKvDmPUF5MeJfGSF4ttuUcFpDUo3/jZSbrTzH+igaVyBsWbsMKzVJABIzZie1QQ6CHgZLn3+8yzhgw7Z9JW+X0TZAT9Fr0lCI5VAgiDs4Qt95iC74sEeZQPEg3vu6prFMCGC5Ils5KtD5vCJRu2R9WsM22WOofLB1VRf9hf8JYs3eM77fhGVZ5+Dv7qq0chnw6sDvibR4zSABmMp0VciodjPnDZ8iN/po9jaSRPMnJ6dXhZcWWMMH0TspBMxBw7C/eprUjOfwf9+JTKU12QASAAKPCEYvY1dOatHEQBgCbFHY6HorzOtFH5jWb1WC9/Ma8H07ywJdhzW6ja0DY+DYC6R1vXrbBsZy4aS9WbVs49O+bD3MKfqi46QUYe6gQKxWHT5zr8PaeWhfTuwM5qC0mjPQ7sO2nOQZgz/y+/b3ob20FR0VvHIUBEyVIgMFWRnEetm7E5RiZO/qkfGARTyK6elamat8E9qD1fvPgQW1v67knfZH1Ck0U4qsMqVBl+hXQfl1KFNH2NACebI7TCG9EEZDqDa3os4pnnjahqDgUCgFw1lSbLHuYEBg70vPCzHQIR0M4XfvnP48oPeQykovvkWIgf9lLoJE3HnLECnbIQhMYcNJXL4YUR+Mgpj2DBkOAQhA//7FSQffoTUY8+06xzDltx3YARL8rmg424O7VAb4DuKC0OW/MgUDPWaufPbffyq7yH6FlF8z9+JHnU0wjLxy1biLV2KEAIRi6OTiUD1Ow7+8mXExp/ckJcoP/oo7OdnodEYOwxto4u49l5EvcXKIpHVAK72zx7sVk/tkRpgW6rrVlA630AM9TZ33nVYkIegT782hb9yJXW334TZfwCyV68g9uD7yN59UJVVZF55k8yc2chQlPhJv8VbvAj30w/BddAoZLg9gkXjQIhmTTkXgIfOCMx5PTIUnP0n9DIhZmsYJ5oyeTpj6rZ2Ce25F9aOOwRNmPUpMMD58EPqn3gM+/X/giPRlsIYtA2quprMSy8QPeY4iu8YSfnCI1ArKztgjmHTJDAQ+OivfTf2VY8lQBDk899whEhLRFRvRvgdN3VbIMwQ9qsvk3npBVQyjV9ejlqxAm/FclAusqgvok8UlclQeNMNpF99ifDBP8MYOAhRV4OIRzftSm7DpJLocWMp3YJNYAKOUK8PY0mmgzdpBxMAzOWh0jdCiAOdRvL5HT5y3fcRBWH6LZyHCEVZtf8odGUSs39fCAexNlncH52sInryyUT23w+/ooLwAaOou/lG7Pfn487+EIxQh8UJSKgNpoRltaXv+94vh/q1r3ekfDo8HSzAE0o9IzZxu23ivx7bKfP2teeD6weLXJvE6F2ILIgjrXBQF6gzhPbfl/hxY3A+XEDkF6MRoRDp51/Bfuu9jYS/Xti4XeYYTkWURoJ+h4bdL9DoLy2/9r2Olk+n1AO4hppha1VlNBzJLsbAPpROnNTx4V0h0Z4XVAHV1QTnv2UFefhwGG1YGAN6Ez/lNDKvvkJk9GGB8J99Fverb5BWQZO6rS1DKta3CfLPOwftJTZw/xQ8NRBSWwUBhtm132shng+tjW2ZJv7KMlL//nfHCh+ClKxj4y1dBqFsH6IhENE4xGKgbGLHn4xK1GIMHozRvw+6vo7E/VMR2tjCIdl2EqjaGlIzX0DIaIPwM+haKYxHO0M2nVYRJJWanEE7MisU4QnqbvvHhi3Y7S38tQeq7+Is+ABZWIwoiCEiYUQ4gnY94r85CXPEcLxF3xEeNQqdSmK//Q72u3MRZnPu7msbCeqnTcP5dGFDv0N2k0wfbK/5dqsiwECveo7S+uUGLWBFcD78hOTUqR0n/AYlECbz2utBF9CgAcF1MAiMPiVEjzgG+803iB4zBr9sOSISJ3H/ZISnWvA3Wjfl3F+5gto770HKoB9AAml0RmkxsdM2Zmf9IQHK0PpWe60WAKSMUXvbHXiLF3WY8AGEEcaZ/zHul58T3nOP4GVqaij861U4c97D2msfhCFAgfvZl6Rffh1htnRYQ8vnGNbedDNqyfJg+hkQDjbH40PcigVbHQGyWuBdBU+EG2wBC7WijOqr/rpJRfD6blyb5+1Lic7YJKc+SORnP0dHQkRPOBKdsdF2hvD+B+B+9jHG4G1J3Dc56FlsVY9e872DzKuvkJwyDWnmAxoj2P3VHtzamTLp7KpgLRA3pLVeY65dMCuf1L9mkJw2rYmdf0k7XLagkWac+keeANPAGjKc+Pjx2G/NInb8eNzPPkGW9MJfuozUjOeQRpzWd+ls2Sbwy8uouuhShCMaahSswPW7c5hT+eXWTAC2cSq+Qesb5dobegRIItRcfjXOBx+0m9pvVAvUp6m75x6sbYdQN2kS0aOOBtPE/eIzrJG7k5g8BVVT04KxNK0ggedRffGleJ99ibAiDYZfGv1RxuHOzpZHl/QFpL2S+2ytX1n/KNCVCSrPPAu/fDVAu1+zon0Hc8QwCi78E9FfHYlavQZzuxHYb72Btf1OqPLV1P/zcaSM0T49ehvVGH4ekKD21ltJPfpUNr4QqH4fnRE+F21PVV1ny8LoCgLcQ5V/gRmbrzVjLUG+Ihiq4K9Yhr/4W+w5cxoqedqrXVp7SfLOPIP88/+I0acfQgjSL76AiEaIHPJzEhPuJTXzeaQZa9cAuTBCqPJy7Nlvo2srqbv+FiRhkIEGtBA46P8d7FU93BWy6NIbjJaFeo8zUY8psFT2dbSbBq2Ddql2fDvtu5g7DqPkvrvR9fUkp8/A++AD8v90EdaIEVSechreopUdNK5dBHMPlR14F1kDM4ogpdXzGbfq+O3B/sERAGBpqOTqEPJ6D902xasUOutJCDNoJNG+i5BGEA72PbRywJLZcjAbIeIQDoQhbB2EiNd6I+t7AUplS9Sz/QtStFkzhRE4qE98Qxw+JF25sqvW3+hqAhztp98tNCJ9I4i9/dYft4iYiexfgizKRyczaOViDusfDHdSGmNgKbIwjjAiCATGgH7oZBLhS3BtRCQUjKyPhSAkIe2AYQbj2y2B0BKkRhREEUK06bKnEODAMrRxwmC74tuuXP8uJ8DDoC7w+7ymDHtEFLlLa4rflFtLwcUXUvCXPxMaOZLM7LfIO+sU4uefh7nDMJyFn1Iy4S4KLrsMv6KM8L57UnDZpRj9S7E/XkDxxNvBBJWup/ie24keewTOF5/jr1qJufNwek29m/qnnyT/3HMouOpiVFUN7mcLW9XTHwI89GpP6hOGOJXzunr9u8WYuGEsySQdcXZG66cjm73AtUkKIPLz8aqrSb31JmrNGoz+/fHLV5Oc9jBq2Spqrr8RZ858Eg9Oxew3iMQTTxI59mgIhZFFhcj+/RB5ecFwqnAsGA1XGqfw8kuQfXoHpeK9+uBX1ODVVoI0WyV8X+syJcRJQzPV73SHte82gyJ3ojJR48rTM0pPs1rzYrrhZmiEjFB38+24n31Or8mTEdEQQvlgSIQH7pdfkPerw0jedif+mjLcDz9BWCYiGkZ7LsL30PEYxVdcgbHdEEQsn8ioA6mbeh/JZ2dQcsuNiMK8hqbP5p354GqWOFqP7Agunx5NAIBdWJP81qv8na31LdCSerUg5SvDYSJ77oksySd+6m8I7zQSVVsbGAlKodNphBEm/fos3C++IPXMi0hM0Cq4tyAWBU+hHRcjHif5z8dITH4ArRV+bRWxXxxC/NAjcD78GJ1OrxtttwUrOxq4eh/b+EcP9arf7U5r3r0usl0PS8Kl51qKGwxByRbbKbRCFMaQA3sjtMD7ZjlYYI4YivftEnS9gwiHkIVR1JoEWAayOB+1pjbQGIVBLl5V1GBuPzQoY/p6SbA/tI8cUIIqTyDyIpjbbYP3+bfgssV8gZHdYZ5mhjb1n7ZJVy3vbuvcbQkAsNQs2VdIJkWQewbF2ZszA3y0v9YNDAW3cPhucAGDNIJd7vvZlqxgeEPD5QwNrp+JdgO6rV+jpz0v+D21/mfKZhh71Gv0Td84Vbcc0oHNHVstAQCW5+eXiox1hRbi/BAi7LQ1XtDBMAlKuh30+76Ulw7JrJndnde32xNgLRaHSw8OKX2tFOLgoGmCbkUESXail1ZlQnB3KF/c27uyMtHd17XHEABgIYSKrJJfSyEulLCbIDiKu5IIBkE830bXaa0fE0LeMcip+LqnrGmPIsBaVFBSkLbkiVLosxTsE0EIN2sj6E7a7WZ28Rz0ag1Pe9qfOsyt/ainrWWPJEDDsQARK1R6qIbfoPUhlhB9DATtTQaR/TIBGex2R8CHwAxXeE8NtWsX99Q17NEEWB8rIsWDfc1oqeVorRklBH1DCFMA/kaE0M1YEJk15iRgo1HoBIiFWvOG1upl2yudtz3f2j193bYaAqyPr8nrHQuHd1WaPUDvJhHDtdZDEBSCsAhyghv881mC+ALtakRGa1aBXiTgc43+UApjwUCn4nsBzta0VlslATYlxPCwoj6/0Mr0dQ2jF0qVKC3iJtoE8EEb6LSS1OHLSmmqsopMqGomq9PXgSKHHHLIIYcccsghhxxyyCGHHHLIIYcccsghhxxyyCGHHHLIIYcccsghhxx6Cv4fiV+nNTheYg0AAAAASUVORK5CYII=';
  qubLogo.style.objectFit='contain';
  qubLogo.style.padding='8px';
  qubLogo.style.background='#fff';
  const fallback=qubLogo.parentElement.querySelector('.edu-logo-placeholder');
  if(fallback) fallback.style.display='none';
}
loadBase64Image('sdsuLogo','assets/university/sdsu-tiny.b64.txt','image/jpeg');

const profileImg=document.querySelector('.profile-photo img');
if(profileImg){
  profileImg.addEventListener('error',async()=>{
    try{
      const r=await fetch('assets/profile/profile-tiny.b64.txt?v=12',{cache:'no-store'});
      const data=(await r.text()).replace(/\s+/g,'');
      profileImg.src='data:image/jpeg;base64,'+data;
    }catch(e){}
  },{once:true});
}

// Link the uploaded certificate records to clean, sharp certificate pages.
const certCards=[...document.querySelectorAll('.cert')];
const googleCard=certCards.find(card=>card.textContent.includes('The Fundamentals of Digital Marketing'));
if(googleCard){
  const a=googleCard.querySelector('a');
  if(a){a.href='certificates/google-digital-marketing.html';a.textContent='View certificate ↗';}
}
const entrepreneurshipCard=certCards.find(card=>card.textContent.includes('Entrepreneurship – from ideas to reality'));
if(entrepreneurshipCard){
  const a=entrepreneurshipCard.querySelector('a');
  if(a){a.href='certificates/entrepreneurship-openlearn.html';a.textContent='View certificate ↗';}
}

const certGrid=document.querySelector('.cert-grid');
if(certGrid && ![...certGrid.querySelectorAll('h3')].some(h=>h.textContent.includes('Private Bank Job Simulation'))){
  const card=document.createElement('article');
  card.className='cert';
  card.innerHTML=`<div class="cert-media"><svg viewBox="0 0 180 64" aria-hidden="true"><rect width="180" height="64" rx="14" fill="#fff"/><text x="14" y="27" font-size="12" font-family="Arial,sans-serif" font-weight="900" fill="#17386d">BANK OF AMERICA</text><g transform="translate(122 9) skewX(-18)"><rect x="18" y="0" width="28" height="5" rx="2" fill="#e31837"/><rect x="12" y="9" width="34" height="5" rx="2" fill="#e31837"/><rect x="6" y="18" width="40" height="5" rx="2" fill="#e31837"/><rect x="0" y="0" width="22" height="5" rx="2" fill="#1261a0"/><rect x="0" y="9" width="17" height="5" rx="2" fill="#1261a0"/></g><text x="14" y="49" font-size="11" font-family="Arial,sans-serif" font-weight="800" fill="#0a3474">Forage</text></svg></div><div><p>Bank of America · Forage · Jul 2026</p><h3>The Private Bank Job Simulation</h3><a href="certificates/bank-of-america-private-bank.html" target="_blank" rel="noopener">View certificate ↗</a></div>`;
  certGrid.appendChild(card);
}
