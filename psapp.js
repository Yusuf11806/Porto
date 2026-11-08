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
                name: 'About Me',
                iconImg: 'image0.jpg',
                title: 'Yusuf Rayyan Daniel',
                desc: 'Step into a pixel-styled art gallery and discover my projects through an interactive 3D world.',
                projectInfo: 'Play as a cat in a handcrafted 3D gallery. Walk between the exhibits and open each artwork to learn about the project behind it.',
                techCards: [
                    { name: 'JavaScript', use: 'Movement, camera, interactions, and animation.' },
                    { name: 'WebGL', use: 'Renders the real-time 3D gallery in the browser.' },
                    { name: 'HTML & CSS', use: 'Builds the interface and responsive presentation.' }
                ],
                art: 'image0.jpg',
                link: 'Resonance/index.html',
                sameTab: true,
                actionLabel: 'Play Game',
                cards: []
            },
            {
                id: 'resonance',
                name: 'Resonance Archive',
                icon: '<i class="fa-solid fa-cube text-2xl text-amber-300"></i>',
                isStore: true,
                title: 'Resonance — Yusuf’s Portfolio',
                desc: 'Explore a pixelated 3D house, meet the cat, and find projects hidden among gravity shifting anomalies.',
                projectInfo: 'Resonance is an interactive portfolio built as a small, self-contained WebGL game. Walk through the connected house, explore project anomalies, and use gravity shifts near walls to discover the archive.',
                techCards: [
                    { name: 'JavaScript', use: 'Handles movement, gravity, project interactions, and animation.' },
                    { name: 'WebGL', use: 'Draws the low-resolution 3D house and its pixel-styled objects.' },
                    { name: 'Game design', use: 'Combines exploration, a companion cat, and portfolio discovery.' }
                ],
                art: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"%3E%3Cdefs%3E%3ClinearGradient id="g" x2="1" y2="1"%3E%3Cstop stop-color="%23090b12"/%3E%3Cstop offset="1" stop-color="%233c2c24"/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill="url(%23g)" d="M0 0h1600v900H0z"/%3E%3Cpath fill="%23c9955d" d="M0 650 800 390l800 260v250H0z"/%3E%3Cpath fill="%23766b5e" d="M180 190h1240v470H180z"/%3E%3Cpath fill="%23ffb86b" d="M740 370h120v120H740z"/%3E%3C/svg%3E',
                link: 'Resonance/index.html'
            },
            {
                id: 'shipdeckk',
                name: 'ShipDecKK Maritime',
                iconImg: 'https://images.pexels.com/photos/35310682/pexels-photo-35310682.jpeg?auto=compress&cs=tinysrgb&w=300',
                title: 'ShipDecKK Maritime Solutions',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                projectInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Replace this placeholder with a detailed explanation of the project, its purpose, the features you built, and the results.',
                techCards: [
                    { name: 'HTML & CSS', use: 'Responsive structure and visual styling.' },
                    { name: 'JavaScript', use: 'Interactive interface and project flow.' },
                    { name: 'Web design', use: 'Visual identity and page composition.' }
                ],
                art: 'https://images.pexels.com/photos/35310682/pexels-photo-35310682.jpeg?auto=compress&cs=tinysrgb&w=1920',
                link: 'https://shipdeckk.vercel.app/',
            },
            {
                id: 'hr_analytics',
                name: 'HR Data Analytics',
                iconImg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80',
                title: 'Data Analytics in HR Database',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                projectInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Replace this placeholder with a detailed explanation of the project, its purpose, the features you built, and the results.',
                techCards: [
                    { name: 'Language / tool name', use: 'Add how you used it in this project.' },
                    { name: 'Language / tool name', use: 'Add how you used it in this project.' },
                    { name: 'Language / tool name', use: 'Add how you used it in this project.' }
                ],
                art: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=80',
                link: 'https://github.com/Yusuf11806/Analytics-for-HR-Database',
            },
        ];

        // Keep the PS app home as the landing screen; launch Resonance from its profile card.
        PROJECTS_APPS.length = 1;

        // Activity Dataset
        const ACTIVITY_APPS = [
            {
                id: 'commit_1',
                name: 'GitHub Commit Push',
                iconImg: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=300&q=80',
                title: 'Pushed 12 commits to main branch',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                art: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1920&q=80',
                link: 'https://github.com/Yusuf11806'
            },
            {
                id: 'binus_exam',
                name: 'BINUS Course Project',
                iconImg: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80',
                title: 'Advanced Computer Science Milestone',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                art: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
                link: 'https://github.com/Yusuf11806'
            },
            {
                id: 'data_run',
                name: 'Jupyter Notebook Execution',
                iconImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80',
                title: 'HR Database Statistical Modeling',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                art: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
                link: 'https://github.com/Yusuf11806/Analytics-for-HR-Database'
            }
        ];

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
                        : `<img src="${app.iconImg}" class="w-full h-full object-cover">`
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
            document.getElementById('projectTechSection').classList.toggle('hidden', currentCategory !== 'projects');

            // Render Hero Play Button if link exists
            if (app.link && app.link !== '#') {
                heroActionContainer.innerHTML = `
                    <a href="${app.link}" target="${app.sameTab ? '_self' : '_blank'}" class="hero-play-button inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-black font-extrabold px-7 py-3 rounded-xl shadow-xl transition-transform active:scale-95 text-xs">
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
                if (app.sameTab) window.location.href = app.link;
                else window.open(app.link, '_blank');
            } else {
                openSearchModal();
            }
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
            const allApps = [...PROJECTS_APPS, ...ACTIVITY_APPS];
            showModal('Search Projects & Activity', `
                <input type="text" placeholder="Lorem ipsum dolor sit amet..." class="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-psBlue">
                <div class="space-y-2 pt-2 max-h-60 overflow-y-auto">
                    ${allApps.map(a => `
                        <div onclick="window.open('${a.link}', '_blank')" class="p-3 bg-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/10">
                            <span class="font-bold text-white">${a.title}</span>
                            <i class="fa-solid fa-chevron-right text-gray-400"></i>
                        </div>
                    `).join('')}
                </div>
            `);
        }

        function openProfileModal() {
            showModal('User Profile', `
                <div class="text-center space-y-3">
                    <img src="image0.jpg" alt="Yusuf Rayyan Daniel" class="w-20 h-20 rounded-full mx-auto border-2 border-psBlue object-cover">
                    <h3 class="text-base font-bold text-white">Yusuf Rayyan Daniel</h3>
                    <p class="text-xs text-gray-400">Binus University @AlamSutera Computer Science</p>
                    <p class="text-xs text-gray-300 font-medium">
                        <i class="fa-solid fa-cake-candles text-psBlue mr-1"></i> 11 August 2006
                    </p>
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
                </div>
            `);
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
            setupIntroFlow();
            setupScrollReveal();
            renderTiles();
            selectApp(0);
            setInterval(updateClock, 1000);
            updateClock();
        };
