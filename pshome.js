const welcomeScreen = document.getElementById('welcomeScreen');
const profileScreen = document.getElementById('profileScreen');
let hasEnteredProfile = false;

function showProfile() {
    if (hasEnteredProfile) return;
    hasEnteredProfile = true;
    welcomeScreen.classList.remove('is-active');
    welcomeScreen.setAttribute('aria-hidden', 'true');
    profileScreen.classList.add('is-active');
    profileScreen.setAttribute('aria-hidden', 'false');
}

document.getElementById('psButton').addEventListener('click', showProfile);
welcomeScreen.addEventListener('click', showProfile);
document.addEventListener('keydown', event => {
    if (!hasEnteredProfile && !event.ctrlKey && !event.altKey && !event.metaKey) showProfile();
});

function updateClock() {
    document.getElementById('clock').textContent = new Intl.DateTimeFormat([], {
        hour: 'numeric',
        minute: '2-digit'
    }).format(new Date());
}

updateClock();
setInterval(updateClock, 1000);

const particleLayer = document.getElementById('particles');
for (let i = 0; i < 58; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty('--size', `${2 + Math.random() * 8}px`);
    particle.style.setProperty('--opacity', `${0.18 + Math.random() * 0.62}`);
    particle.style.setProperty('--blur', `${Math.random() * 2.5}px`);
    particle.style.setProperty('--duration', `${8 + Math.random() * 18}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 24}s`);
    particle.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
    particleLayer.appendChild(particle);
}
