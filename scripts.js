// script.js

/* ---------------------------
   Animación al hacer scroll
---------------------------- */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = "translateY(0)";
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.opacity = 0;
  fader.style.transform = "translateY(30px)";
  fader.style.transition = "all 0.6s ease-out";
  appearOnScroll.observe(fader);
});


/* ---------------------------
   Función de scroll animado con easing
---------------------------- */
function smoothScroll(target, duration = 800) {
  const targetSection = document.getElementById(target);
  if (!targetSection) return;

  const startPosition = window.pageYOffset;
  const targetPosition = targetSection.offsetTop - 60; // Ajusta según navbar sticky
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}


/* ---------------------------
   Scroll suave para enlaces del navbar
---------------------------- */
const navLinks = document.querySelectorAll('.navbar nav a');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    smoothScroll(targetId, 1000); // Scroll de 1 segundo
  });
});


/* ---------------------------
   Scroll suave para botón "Haz tu pedido"
---------------------------- */
const orderBtn = document.querySelector('.hero .btn');
orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  smoothScroll('dashboard', 1000); // Scroll de 1 segundo
});
