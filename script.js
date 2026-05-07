/* =========================================
   Waqas Rai Portfolio — JavaScript
   Author : Waqas Rai
   ========================================= */

// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// Typing animation
const phrases = [
  'Flutter Developer 📱',
  'CS Student @ UAF 🎓',
  'Python Learner 🐍',
  'Mobile App Builder 🚀',
  'Problem Solver 💡',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typingEl');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => obs.observe(el));

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.style.width; // trigger CSS transition
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(b => { const w = b.style.width; b.style.width = '0'; setTimeout(() => barObs.observe(b), 100); });

// Fix: animate bars when section visible
const skillSection = document.getElementById('skills');
const skillSecObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.skill-bar').forEach(b => {
      b.style.transition = 'width 1.2s ease';
    });
  }
}, { threshold: 0.1 });
if(skillSection) skillSecObs.observe(skillSection);

// Contact form - real email via FormSubmit.co
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.querySelector('.btn-send');
  const form = document.getElementById('contactForm');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    if (response.ok) {
      form.reset();
      const msg = document.getElementById('successMsg');
      msg.style.display = 'flex';
      setTimeout(() => msg.style.display = 'none', 6000);
    } else {
      alert('Something went wrong. Please email directly: waqasrai0408@gmail.com');
    }
  })
  .catch(() => {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    alert('Network error. Email directly: waqasrai0408@gmail.com');
  });
}