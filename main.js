document.addEventListener('DOMContentLoaded',()=>{
const b=document.body,btn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
requestAnimationFrame(()=>b.classList.add('ready'));
if(window.AOS)AOS.init({duration:reduce?0:800,once:true,offset:60,easing:'ease-out-cubic'});
// mobile menu
const toggle=o=>{nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o)};
btn.addEventListener('click',()=>toggle(!nav.classList.contains('open')));
document.addEventListener('keydown',e=>e.key==='Escape'&&toggle(false));
// page transitions
document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{
 if(e.metaKey||e.ctrlKey||a.target)return;e.preventDefault();b.classList.add('leave');
 setTimeout(()=>location.href=a.href,reduce?0:350)}));
addEventListener('pageshow',e=>e.persisted&&(b.classList.remove('leave'),b.classList.add('ready')));
// counters
document.querySelectorAll('[data-count]').forEach(el=>{
 const t=+el.dataset.count,io=new IntersectionObserver(([x])=>{if(!x.isIntersecting)return;io.disconnect();
  if(reduce){el.textContent=t;return}
  const s=performance.now();(function f(n){const p=Math.min((n-s)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)})(s)});
 io.observe(el)});
// 3D tilt on pointer devices
if(matchMedia('(hover:hover)').matches&&!reduce)document.querySelectorAll('.tilt').forEach(c=>{
 c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-8px)`});
 c.addEventListener('mouseleave',()=>c.style.transform='')});
// contact form (front-end validation; connect to Formspree/EmailJS/your backend)
const f=document.querySelector('.form');
if(f)f.addEventListener('submit',e=>{e.preventDefault();const s=f.querySelector('.status');
 if(!f.checkValidity()){s.textContent='يرجى تعبئة جميع الحقول بشكل صحيح.';f.reportValidity();return}
 s.textContent='تم إرسال رسالتك بنجاح، سأتواصل معك قريبًا.';f.reset()});
});

// تشغيل Swiper Slider للمشروعات
if (document.querySelector('.projects-slider')) {
  new Swiper('.projects-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}


// video settings
// التحكم في الفيديو (الصوت + التشغيل والإيقاف)
const video = document.querySelector('.bg-video');
const unmuteBtn = document.querySelector('.unmute-btn');
const videoContainer = document.querySelector('.video-container');

if (video && videoContainer) {
  // 1. التحكم في الإيقاف والتشغيل عند الضغط على مساحة الفيديو
  videoContainer.addEventListener('click', (e) => {
    // السطر ده عشان لو المستخدم داس على زرار الصوت، الفيديو ميعملش إيقاف
    if (e.target.closest('.unmute-btn')) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // 2. التحكم في زرار الصوت
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // عشان الضغطة دي متأثرش على إيقاف/تشغيل الفيديو
      
      if (video.muted) {
        video.muted = false;
        // أيقونة الصوت شغال
        unmuteBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      } else {
        video.muted = true;
        // أيقونة صامت
        unmuteBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      }
    });
  }
}