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

// Smooth fade transition when selecting the profile -> PS app dashboard.
let isLeaving = false;
const profileChoice = document.querySelector('.profile-choice');
if (profileChoice) {
    profileChoice.addEventListener('click', event => {
        if (isLeaving) return;
        isLeaving = true;
        event.preventDefault();
        const url = profileChoice.getAttribute('href');
        profileChoice.classList.add('is-selected');
        document.getElementById('homeTransition').classList.add('is-active');
        setTimeout(() => { window.location.href = url; }, 620);
    });
}

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
