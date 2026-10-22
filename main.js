// Shared behaviour: footer year, logo/photo upload preview (remembered on this device), nav highlight
(function () {
  const load = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  function showImg(slot, src) {
    slot.querySelectorAll('img,span').forEach(n => n.remove());
    const im = new Image();
    im.src = src; im.alt = '';
    slot.prepend(im);
    slot.classList.add('filled');
  }

  // Click a slot to preview your own image. For the final site, replace the slot with <img src="logo.png">.
  function bindSlot(id, key) {
    const slot = document.getElementById(id);
    if (!slot) return;
    const input = slot.querySelector('input');
    const saved = load(key);
    if (saved) showImg(slot, saved);
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = () => { showImg(slot, r.result); save(key, r.result); };
      r.readAsDataURL(file);
    });
  }

  // Highlight the current page in the nav
  const links = [...document.querySelectorAll('.glass-nav .nav-link')];
  const page = document.body.dataset.page;
  links.forEach(l => l.classList.toggle('active', l.dataset.page === page));

  // On the home page, highlight "Certifications" while that section is in view
  const cert = document.getElementById('certifications');
  if (cert && 'IntersectionObserver' in window) {
    const link = links.find(l => l.dataset.page === 'certifications');
    new IntersectionObserver(es => es.forEach(e => link.classList.toggle('active', e.isIntersecting)),
      { rootMargin: '-45% 0px -45% 0px' }).observe(cert);
  }

  // Close the mobile menu after tapping an in-page link
  links.forEach(l => l.addEventListener('click', () => {
    const c = document.getElementById('nav');
    if (c.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(c).hide();
  }));
})();
