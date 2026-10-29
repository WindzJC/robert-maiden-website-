// Robert S. Maiden — homepage concept by Astra Productions
// 1) Drives the story stage: intro → Her → Them → Me.
// 2) Small-screen menu.
(function () {
  var saga = document.querySelector('.saga');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step[data-step]'));

  function setStep(name) {
    if (saga && saga.getAttribute('data-step') !== name) saga.setAttribute('data-step', name);
  }

  if (saga && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setStep(entry.target.getAttribute('data-step'));
      });
    }, { rootMargin: '-50% 0px -49% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  }

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-open', String(open));
  }
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();
