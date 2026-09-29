// Mobile menu: opens and closes the navigation links
const btn = document.querySelector('.menu-btn');
const links = document.getElementById('links');

btn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

// Close the menu after tapping a link
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  })
);

// Footer year updates itself
document.getElementById('year').textContent = new Date().getFullYear();
