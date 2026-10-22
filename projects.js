// Projects page: category filter
(function () {
  const buttons = document.querySelectorAll('.filter-bar .btn');
  const cards = document.querySelectorAll('.project-col');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => b.classList.toggle('active', b === btn));
    cards.forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
  }));
})();

