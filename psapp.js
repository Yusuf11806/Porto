window.tailwind = window.tailwind || {};
window.tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        psBlue: '#0070d1',
                        psGlow: '#0082f3',
                        psDark: '#07090e',
                        psCard: 'rgba(255, 255, 255, 0.08)',
                        psCardHover: 'rgba(255, 255, 255, 0.18)',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        ps: ['Orbitron', 'sans-serif'],
                    }
                }
            }
        }

// Projects Dataset with 100% Unique Page-by-Page Cards
        const PROJECTS_APPS = [
            {
                id: 'about',
                name: 'Yusuf Rayyan Daniel',
                iconImg: 'image0.jpg',
                title: 'Yusuf Rayyan Daniel',
                desc: 'Explore the house of projects and information',
                art: 'image0.jpg',
                link: 'Resonance/index.html',
                sameTab: true,
                actionLabel: 'Play the Game',
                cards: []
            }
        ];

        // Volunteering tab - personal photos with a title each (no other info).
        const MEDIA_PHOTOS = [
            { src: 'Bersama1.jpg', title: 'Biosphere in Bandung' },
            { src: 'Bersama2.jpg', title: 'Tree Planting in Bandung' },
            { src: 'Bersama3.jpg', title: 'Beverage Bottle Recycling & Waste Management' },
            { src: 'Bersama4.png', title: 'The Ethics of Communication' },
            { src: 'Bersama5.jpg', title: 'Educational Workshop on Youth Ambition & National Prosperity' }
        ];
        const ACTIVITY_APPS = MEDIA_PHOTOS.map((p, i) => ({
            id: 'photo_' + (i + 1),
            name: p.title,
            iconImg: p.src,
            title: p.title,
            desc: '',
            art: p.src,
            isPhoto: true,
            link: '#'
        }));

        let currentCategory = 'projects';
        let activeIndex = 0;
        let introStage = 'welcome';

        function showIntroProfile() {
            if (introStage !== 'welcome') return;
            introStage = 'profile';
            document.getElementById('introWelcome').classList.remove('is-active');
            document.getElementById('introProfile').classList.add('is-active');
            document.getElementById('introWelcome').setAttribute('aria-hidden', 'true');
            document.getElementById('introProfile').setAttribute('aria-hidden', 'false');
        }

        function enterPortfolio() {
            if (introStage !== 'profile') return;
            introStage = 'portfolio';
            document.getElementById('introFlow').classList.add('is-dismissed');
            document.getElementById('introFlow').setAttribute('aria-hidden', 'true');
        }

        function setupIntroFlow() {
            const welcome = document.getElementById('introWelcome');
            welcome.addEventListener('click', showIntroProfile);
            document.getElementById('introContinueButton').addEventListener('click', showIntroProfile);
            document.getElementById('introUserButton').addEventListener('click', enterPortfolio);

            const clock = document.getElementById('introClock');
            const updateIntroClock = () => {
                clock.textContent = new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date());
            };
            updateIntroClock();
            setInterval(updateIntroClock, 1000);

            const particles = document.getElementById('introParticles');
            for (let i = 0; i < 58; i += 1) {
                const particle = document.createElement('span');
                particle.className = 'intro-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.setProperty('--size', `${2 + Math.random() * 8}px`);
                particle.style.setProperty('--opacity', `${0.18 + Math.random() * 0.62}`);
                particle.style.setProperty('--blur', `${Math.random() * 2.5}px`);
                particle.style.setProperty('--duration', `${8 + Math.random() * 18}s`);
                particle.style.setProperty('--delay', `${-Math.random() * 24}s`);
                particle.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
                particles.appendChild(particle);
            }
        }

        function setupScrollReveal() {
            const revealItems = document.querySelectorAll('.project-info-reveal');
            if (!('IntersectionObserver' in window)) {
                revealItems.forEach(item => item.classList.add('is-visible'));
                return;
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    entry.target.classList.toggle('is-visible', entry.isIntersecting);
                });
            }, { threshold: 0.18 });

            revealItems.forEach(item => observer.observe(item));
        }

        function renderProjectTechCards(app) {
            const container = document.getElementById('projectTechCards');
            container.innerHTML = (app.techCards || []).map((card, index) => `
                <article class="project-tech-card" style="--card-index:${index}">
                    <span class="project-tech-icon"><i class="fa-solid fa-code" aria-hidden="true"></i></span>
                    <h4>${card.name}</h4>
                    <p>${card.use}</p>
                </article>
            `).join('');
        }

        // Switch Category (Projects vs Activity)
        function switchCategory(cat) {
            currentCategory = cat;
            activeIndex = 0;

            const projBtn = document.getElementById('tabProjects');
            const actBtn = document.getElementById('tabActivity');
            const projLine = document.getElementById('tabProjectsUnderline');
            const actLine = document.getElementById('tabActivityUnderline');

            if (cat === 'projects') {
                projBtn.classList.replace('text-gray-400', 'text-white');
                actBtn.classList.replace('text-white', 'text-gray-400');
                projLine.className = "absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300";
                actLine.className = "absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-300";
            } else {
                actBtn.classList.replace('text-gray-400', 'text-white');
                projBtn.classList.replace('text-white', 'text-gray-400');
                actLine.className = "absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full transition-all duration-300";
                projLine.className = "absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-300";
            }

            renderTiles();
            selectApp(0);
        }

        // Get Active List
        function getActiveList() {
            return currentCategory === 'projects' ? PROJECTS_APPS : ACTIVITY_APPS;
        }

        // Render Tiles
        function renderTiles() {
            const list = getActiveList();
            const container = document.getElementById('gameTileContainer');
            container.innerHTML = list.map((app, idx) => `
                <div onclick="selectApp(${idx})" class="game-tile shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-psCard border-2 border-white/10 flex items-center justify-center cursor-pointer overflow-hidden ${idx === activeIndex ? 'active-tile' : 'hover:border-white/40'}" id="tile-${idx}">
                    ${app.isStore 
                        ? `<div class="w-full h-full bg-gradient-to-tr from-psBlue to-cyan-400 flex items-center justify-center">${app.icon}</div>` 
                        : `<img src="${app.iconImg}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='image0.jpg';this.style.opacity=.4">`
                    }
                </div>
            `).join('');
        }

        function selectApp(idx) {
            activeIndex = idx;
            const list = getActiveList();
            const app = list[idx];

            // Update Active Tile State
            document.querySelectorAll('.game-tile').forEach((t, i) => {
                if (i === idx) t.classList.add('active-tile');
                else t.classList.remove('active-tile');
            });

            // Update Label
            const label = document.getElementById('tileLabel');
            label.innerText = app.name;
            label.classList.remove('animate-ps-appear');
            void label.offsetWidth;
            label.classList.add('animate-ps-appear');

            // Update Hero Text Details
            const heroTitle = document.getElementById('heroTitle');
            const heroDesc = document.getElementById('heroDesc');
            const heroContainer = document.getElementById('heroTextContainer');
            const heroActionContainer = document.getElementById('heroActionContainer');
            heroTitle.innerText = app.title;
            heroDesc.innerText = app.desc;
            renderProjectTechCards(app);
            document.getElementById('projectTechSection').classList.toggle('hidden', !(app.techCards && app.techCards.length));

            // Media photos: show the photo as the backdrop with only its title (no description/buttons).
            if (app.isPhoto) {
                heroContainer.classList.remove('hidden');
                heroTitle.innerText = app.title;
                heroDesc.innerText = '';
                heroActionContainer.innerHTML = '';
                const bgArtPhoto = document.getElementById('psBgArt');
                bgArtPhoto.classList.add('changing');
                setTimeout(() => { bgArtPhoto.src = app.art; bgArtPhoto.classList.remove('changing'); }, 300);
                return;
            }
            heroContainer.classList.remove('hidden');

            // Render Hero Play Button if link exists
            if (app.link && app.link !== '#') {
                const sameTab = !!app.sameTab;
                const onClick = sameTab
                    ? `event.preventDefault(); launchGame('${app.link}');`
                    : '';
                heroActionContainer.innerHTML = `
                    <a href="${app.link}" ${sameTab ? `onclick="${onClick}"` : `target="_blank"`} class="hero-play-button inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-black font-extrabold px-7 py-3 rounded-xl shadow-xl transition-transform active:scale-95 text-xs">
                        <div class="w-5 h-5 rounded-full bg-psBlue flex items-center justify-center text-white text-[10px]">
                            <i class="fa-solid fa-play ml-0.5"></i>
                        </div>
                        ${app.actionLabel || 'Play / Launch'}
                    </a>
                `;
            } else {
                heroActionContainer.innerHTML = `
                    <button onclick="openSearchModal()" class="inline-flex items-center gap-3 bg-psBlue hover:bg-psGlow text-white font-extrabold px-7 py-3 rounded-xl shadow-xl transition-transform active:scale-95 text-xs">
                        <div class="w-5 h-5 rounded-full bg-white flex items-center justify-center text-psBlue text-[10px]">
                            <i class="fa-solid fa-compass"></i>
                        </div>
                        Explore App
                    </button>
                `;
            }

            heroContainer.classList.remove('animate-ps-appear');
            void heroContainer.offsetWidth;
            heroContainer.classList.add('animate-ps-appear');

            // Update Background Art with Zoom Fade
            const bgArt = document.getElementById('psBgArt');
            bgArt.classList.add('changing');
            setTimeout(() => {
                bgArt.src = app.art;
                bgArt.classList.remove('changing');
            }, 300);
        }

        function launchCurrent() {
            const list = getActiveList();
            const app = list[activeIndex];
            if (app.link && app.link !== '#') {
                if (app.sameTab) launchGame(app.link);
                else window.open(app.link, '_blank');
            } else {
                openSearchModal();
            }
        }

        // Smooth fade-to-black "launch" transition into the 3D game.
        let isLaunching = false;
        function launchGame(url) {
            if (isLaunching) return;
            isLaunching = true;
            const overlay = document.getElementById('launchOverlay');
            overlay.classList.add('is-active');
            setTimeout(() => { window.location.href = url; }, 750);
        }

        // Modal Helpers
        function showModal(title, contentHtml) {
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalContent').innerHTML = contentHtml;
            const modal = document.getElementById('psModal');
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
        }

        function closeModal() {
            const modal = document.getElementById('psModal');
            modal.classList.add('opacity-0');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }

        function openSearchModal() {
            showModal('Search projects', `
                <input id="searchInput" type="text" placeholder="Search by name or technology..." class="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-psBlue" autocomplete="off">
                <div id="searchResults" class="space-y-2 pt-2 max-h-60 overflow-y-auto"></div>
            `);
            const input = document.getElementById('searchInput');
            input.addEventListener('input', () => renderSearchResults(input.value));
            renderSearchResults('');
            setTimeout(() => input.focus(), 50);
        }

        function renderSearchResults(query) {
            const q = query.trim().toLowerCase();
            const all = [...PROJECTS_APPS, ...ACTIVITY_APPS];
            const matches = all.filter(a => {
                if (!q) return true;
                const haystack = [a.title, a.name, a.desc, ...(a.techCards || []).map(c => c.name)].join(' ').toLowerCase();
                return haystack.includes(q);
            });
            const container = document.getElementById('searchResults');
            if (!container) return;
            container.innerHTML = matches.length ? matches.map(a => `
                <a href="${a.link}" target="${a.sameTab ? '_self' : '_blank'}" class="p-3 bg-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/10 no-underline">
                    <span>
                        <span class="block font-bold text-white">${a.title}</span>
                        <span class="block text-[10px] text-gray-400 mt-0.5">${a.name}</span>
                    </span>
                    <i class="fa-solid fa-chevron-right text-gray-400"></i>
                </a>
            `).join('') : `<p class="text-center text-gray-500 py-6 text-xs">No projects match "${query}".</p>`;
        }

        function openProfileModal() {
            showModal('User Profile', `
                <div class="text-center space-y-3">
                    <img src="image0.jpg" alt="Yusuf Rayyan Daniel" class="w-20 h-20 rounded-full mx-auto border-2 border-psBlue object-cover">
                    <h3 class="text-base font-bold text-white">Yusuf Rayyan Daniel</h3>
                    <p class="text-xs text-gray-400">Binus University @AlamSutera · Computer Science</p>
                    <div class="flex flex-wrap justify-center gap-2 pt-1">
                        <span class="text-[11px] text-gray-200 bg-white/10 rounded-full px-3 py-1"><i class="fa-solid fa-cake-candles text-psBlue mr-1"></i> 11 August 2006</span>
                        <span class="text-[11px] text-gray-200 bg-white/10 rounded-full px-3 py-1"><i class="fa-solid fa-graduation-cap text-psBlue mr-1"></i> GPA 3.41</span>
                        <span class="text-[11px] text-gray-200 bg-white/10 rounded-full px-3 py-1"><i class="fa-solid fa-calendar text-psBlue mr-1"></i> Term 5 (up to now)</span>
                    </div>
                    <div class="flex justify-center items-center gap-4 pt-2">
                        <a href="https://www.linkedin.com/in/yusuf-rayyan-daniel-936a35318" target="_blank" class="w-10 h-10 rounded-full bg-white/10 hover:bg-psBlue flex items-center justify-center text-white text-base transition-colors" title="LinkedIn Profile">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://github.com/Yusuf11806" target="_blank" class="w-10 h-10 rounded-full bg-white/10 hover:bg-psBlue flex items-center justify-center text-white text-base transition-colors" title="GitHub Profile">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="https://instagram.com/yusufrayyan1108" target="_blank" class="w-10 h-10 rounded-full bg-white/10 hover:bg-psBlue flex items-center justify-center text-white text-base transition-colors" title="Instagram Profile">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                    <button onclick="backToUserSelect()" class="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-psBlue text-white text-xs font-semibold rounded-xl px-4 py-3 transition-colors">
                        <i class="fa-solid fa-right-from-bracket"></i> Switch user
                    </button>
                </div>
            `);
        }

        // Go back to the home user-select screen.
        function backToUserSelect() {
            closeModal();
            const overlay = document.getElementById('launchOverlay');
            if (overlay) overlay.classList.add('is-active');
            setTimeout(() => { window.location.href = 'index.html'; }, 500);
        }

        // Live Clock
        function updateClock() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById('psClock').innerText = timeStr;
        }

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            if (introStage === 'welcome') {
                showIntroProfile();
                e.stopImmediatePropagation();
                return;
            }
            if (introStage === 'profile') {
                if (e.key === 'Enter') enterPortfolio();
                e.stopImmediatePropagation();
                return;
            }
            const list = getActiveList();
            if (e.key === 'ArrowRight') {
                selectApp((activeIndex + 1) % list.length);
            } else if (e.key === 'ArrowLeft') {
                selectApp((activeIndex - 1 + list.length) % list.length);
            } else if (e.key === 'Enter') {
                launchCurrent();
            }
        });

        window.onload = function() {
            // Skip the duplicate welcome/profile intro when arriving from the home boot screen.
            const cameFromHome = new URLSearchParams(window.location.search).get('from') === 'home';
            if (cameFromHome) {
                introStage = 'portfolio';
                const introFlow = document.getElementById('introFlow');
                introFlow.classList.add('is-dismissed');
                introFlow.setAttribute('aria-hidden', 'true');
            } else {
                setupIntroFlow();
            }
            setupScrollReveal();
            renderTiles();
            selectApp(0);
            setInterval(updateClock, 1000);
            updateClock();
        };
