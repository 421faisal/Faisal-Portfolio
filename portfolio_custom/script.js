// Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');

// Persisted theme key
const themeKey = 'mf_theme';

// Initialize theme from localStorage
(function initTheme(){
  const saved = localStorage.getItem(themeKey);
  if(saved === 'light'){
    document.documentElement.classList.add('light'); // apply light CSS vars
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    document.documentElement.classList.remove('light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
})();

// Toggle theme
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.contains('light');
  if(isLight){
    document.documentElement.classList.remove('light');
    localStorage.removeItem(themeKey);
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    document.documentElement.classList.add('light');
    localStorage.setItem(themeKey, 'light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
});

// Mobile navigation
hamburger.addEventListener('click', ()=> {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(!el) return;
    e.preventDefault();
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top,behavior:'smooth'});
    // close mobile nav if open
    if(navLinks.classList.contains('active')){
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Contact form (UI only)
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  toast.classList.add('show');
  contactForm.reset();
  setTimeout(()=> toast.classList.remove('show'), 3000);
});

// Small ripple effect on click
document.addEventListener('click', (e)=>{
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = (e.clientX - 9) + 'px';
  ripple.style.top = (e.clientY - 9) + 'px';
  document.body.appendChild(ripple);
  setTimeout(()=> ripple.remove(), 500);
});

// Navbar background on scroll (keeps header readable)
window.addEventListener('scroll', ()=>{
  const header = document.querySelector('header');
  if(window.scrollY > 40){
    header.style.backdropFilter = 'blur(8px)';
    header.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
  } else {
    header.style.backdropFilter = 'blur(0px)';
    header.style.boxShadow = 'none';
  }
});
