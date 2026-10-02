// Mobile menu
const btn = document.querySelector('.menu-btn'), links = document.getElementById('links');
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', links.classList.toggle('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  bar.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
});


// Certificate cards flip on tap (phones). On laptops they flip on hover.
document.querySelectorAll('.cert').forEach(c => c.addEventListener('click', e => {
  if (!e.target.closest('a')) c.classList.toggle('flip-on');
}));

// Sections turn into view
const io = new IntersectionObserver(items => items.forEach(i => {
  if (i.isIntersecting) { i.target.classList.add('in-view'); io.unobserve(i.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.section > h2, .about-grid, .timeline, .skills, .certs, .term, .contact')
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Interactive terminal. EDIT the answers here
const cmds = {
  help: 'Commands: whoami, education, skills, certificates, contact, clear',
  whoami: 'Konda Sri Sai Indhumitra, B.Tech CSE (Cybersecurity) student',
  education: 'B.Tech CSE (Cybersecurity), Swami Vivekanand Institute of Technology, expected 2028',
  skills: 'Cybersecurity, Ethical Hacking, Networking, Linux, Python, HTML & CSS, Git & GitHub, Operating Systems, Data Structures, Web Security',
  certificates: 'Hackathon 2025 (SVIT), JNTHU Workshop (Centre of Excellence in Cyber Security)',
  contact: 'indhukonda2007@gmail.com | github.com/indhumitra2007-ops'
};
const out = document.getElementById('out'), cmd = document.getElementById('cmd');
cmd.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const v = cmd.value.trim().toLowerCase(); cmd.value = '';
  if (v === 'clear') { out.textContent = ''; return; }
  const line = document.createElement('div');
  line.innerHTML = '<span class="c">$ </span>';
  line.append(v + '\n' + (cmds[v] || (v ? 'command not found: ' + v + '. Type help' : '')));
  out.append(line); out.scrollTop = out.scrollHeight;
});

// 3D HUD: layers follow the mouse
const stage = document.getElementById('stage');
addEventListener('mousemove', e => {
  const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
  stage.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 22}deg)`;
  glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
});
const glow = document.getElementById('glow');

// Name "decrypts" when the page loads
function decrypt(el, text) {
  const chars = '01#$%&*<>/\\'; let f = 0;
  const t = setInterval(() => {
    el.textContent = text.split('').map((c, i) => c === ' ' || i < f / 2 ? c : chars[Math.floor(Math.random() * chars.length)]).join('');
    if (++f > text.length * 2) { clearInterval(t); el.textContent = text; }
  }, 40);
}

// Boot sequence, then reveal. Click to skip.
const boot = document.getElementById('boot'), log = document.getElementById('bootlog');
const lines = ['[ OK ] loading portfolio.sys', '[ OK ] mounting certificates', '[ OK ] starting terminal', '> access granted'];
let done = false;
function finish() {
  if (done) return; done = true;
  boot.classList.add('off');
  decrypt(document.getElementById('name'), 'Konda Sri Sai Indhumitra');
}
lines.forEach((l, i) => setTimeout(() => { log.textContent += l + '\n'; }, 350 * (i + 1)));
setTimeout(finish, 350 * lines.length + 600);
boot.addEventListener('click', finish);

// Extra terminal commands
cmds.ls = 'about  education  skills  certificates  contact';
cmds.hack = 'Nice try. Ethical hacking only. Permission first, always.';
cmds.sudo = 'guest is not in the sudoers file. This incident will be reported.';
cmds.help = 'Commands: whoami, ls, education, skills, certificates, contact, hack, clear'; 
