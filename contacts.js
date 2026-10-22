// Contact page: validate, then open the visitor's email app with the message filled in
(function () {
  const TO = 'you@example.com'; // <-- change to your real email
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [form.cn, form.ce, form.cm];
    let ok = true;
    fields.forEach(f => {
      const valid = f.value.trim() && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    status.className = '';
    if (!ok) { status.textContent = 'Please fill in every field with a valid email.'; return; }

    const subject = encodeURIComponent('Portfolio message from ' + form.cn.value.trim());
    const body = encodeURIComponent(form.cm.value.trim() + '\n\n— ' + form.cn.value.trim() + ' (' + form.ce.value.trim() + ')');
    status.className = 'ok';
    status.textContent = 'Opening your email app…';
    location.href = 'mailto:' + TO + '?subject=' + subject + '&body=' + body;
  });
})();
