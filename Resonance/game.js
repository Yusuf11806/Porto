(() => {
  // Self-contained low-resolution WebGL portfolio game. No libraries, fonts, or external downloads.
  const showRenderError = error => { const fatal = document.getElementById('fatal'); if (fatal) { fatal.hidden = false; fatal.textContent = 'The 3D scene stopped: ' + (error && error.message || error || 'unknown error'); } };
  addEventListener('error', event => { if (event.filename && event.filename.includes('game.js')) showRenderError(event.error || (event.message + ' (' + event.lineno + ':' + event.colno + ')')); });

  const canvas = document.getElementById('world');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: true, powerPreference: 'low-power' });
  if (!gl) { document.getElementById('fatal').hidden = false; return; }

  const vertex = `attribute vec3 aPosition;attribute vec3 aColor;uniform mat4 uProjection;uniform mat4 uView;varying vec3 vColor;void main(){gl_Position=uProjection*uView*vec4(aPosition,1.0);vColor=aColor;}`;
  const fragment = `precision mediump float;varying vec3 vColor;void main(){gl_FragColor=vec4(min(vColor*1.28+vec3(0.012),vec3(1.0)),1.0);}`;
  function shader(type, source) { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(s)); return s; }
  const program = gl.createProgram();
  gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const posLoc = gl.getAttribLocation(program, 'aPosition'), colorLoc = gl.getAttribLocation(program, 'aColor'), projLoc = gl.getUniformLocation(program, 'uProjection'), viewLoc = gl.getUniformLocation(program, 'uView');
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
  gl.enableVertexAttribArray(colorLoc); gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 24, 12);
  gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.disable(gl.CULL_FACE);

  // ---------------------------------------------------------------------------
  // PORTFOLIO DATA — 9 projects, each grouped into a genre room of the library.
  // ---------------------------------------------------------------------------
  const allProjects = [
    { name: 'WeGoGym', tag: 'PROJECT / 001', year: '2024', genre: 'Web & App', description: 'In 2024, my colleagues and I were assigned to create a simple app prototype in Figma. Nicho and I designed WeGoGym, an app where users could log meals, plan gym routines, and watch workout videos from instructors. It was our first app, and although the design had plenty of room to improve, it was an important first step for us. A big thank you to Bernhard, Geronimo, Oliver, and Nicholas Carlen for helping bring the project to life.', tags: ['Figma', 'UI/UX prototype', 'Fitness app', 'Team project'], images: Array.from({ length: 10 }, (_, i) => `../${i + 1}.png`), link: '#', showLink: false },
    { name: 'ShippDecKk', tag: 'PROJECT / 002', year: '2024', genre: 'Web & App', description: 'In 2024, I created ShippDecKk as a solo website project where visitors can browse ships at a range of prices, from affordable options to more premium vessels. I built the site myself using basic HTML, CSS, and JavaScript.', tags: ['HTML', 'CSS', 'JavaScript', 'Solo project'], images: ['../shipdeckk.png'], link: 'https://shipdeckk.vercel.app/' },
    { name: 'SmartBaby', tag: 'PROJECT / 003', year: '2024', genre: 'Web & App', description: 'In 2024, my colleagues and I created SmartBaby, a prototype app for parents. Families could contact doctors who specialize in baby care, shop for baby products, and have their orders delivered to their homes. This project was my first introduction to business concepts in computer science. Thank you, Bryan, Silva, Patrick, and Ayundini, for helping make it happen. You are amazing.', tags: ['App prototype', 'Baby care', 'E-commerce', 'Team project'], images: Array.from({ length: 5 }, (_, i) => `../${i + 20}.png`), link: '#', showLink: false },
    { name: 'Face Mask Detector', tag: 'PROJECT / 004', year: '2025', genre: 'AI & Science', description: 'In 2025, I took my first artificial intelligence course, where I learned foundational concepts such as intelligent agents. For the course project, I built a face mask detector that identifies whether a person is wearing a mask. I prepared a dataset and trained a YOLOv8 model with PyTorch; the trained weights are saved as best.pt.', tags: ['Artificial intelligence', 'Computer vision', 'YOLOv8', 'PyTorch'], images: ['../67.png'], link: 'https://facemask-keav-j342p68sv-yusuf-rayyan-daniel-portofolio.vercel.app/' },
    { name: 'matK Gene Alignment', tag: 'PROJECT / 006', year: '2025', genre: 'AI & Science', description: 'My colleagues and I compared matK gene DNA sequences from the Venus flytrap and sundew using global and local sequence alignment. We implemented the analysis with Biopython, including the Needleman-Wunsch method for global alignment. Thank you to Filbert, Felix, and Atiqah for their collaboration and help with this project.', tags: ['Bioinformatics', 'Biopython', 'DNA sequence analysis', 'Needleman-Wunsch'], images: ['../69.png'], link: 'https://github.com/Yusuf11806/Global-Alignment-Study' },
    { name: 'Database HR Analysis', tag: 'PROJECT / 005', year: '2025', genre: 'Data & Database', description: 'My colleagues and I analyzed an HR database to understand which employees stayed and which left. We cleaned the original dataset and saved a clean version, then analyzed it with Python, pandas, NumPy, Matplotlib, and Seaborn. We also used statistical and machine-learning methods, including Pearson correlation (pearsonr) and chi-squared contingency analysis. Thank you to Richard, Felix, and Filbert for their teamwork and help completing this project.', tags: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'Machine learning'], link: 'https://github.com/Yusuf11806/Analytics-for-HR-Database/blob/main/Code%20-%20Data%20Analytics.ipynb' },
    { name: 'E-Commerce Analytics Pipeline', tag: 'PROJECT / 008', year: '2025', genre: 'Data & Database', description: 'In 2025, my colleagues and I built a data engineering pipeline for an e-commerce sales and profit analytics project. We used a Kaggle dataset, cleaned and prepared the data with Pentaho, then created visualizations in Power BI. Thank you to Christian, Filbert, Jovita, Felix, and Richard for your teamwork.', tags: ['Pentaho', 'Power BI', 'Data engineering', 'Data cleaning', 'Team project'], images: ['../pipeline.png'], link: 'https://github.com/Yusuf11806/E-Commerce-Sales-and-Profit-Analytics-Using-Data-Engineering-Pipeline' },
    { name: 'Video Game Sales Analytics', tag: 'PROJECT / 009', year: '2025', genre: 'Data & Database', description: 'I used Power BI to analyze video game sales across genres, release date categories, and regions, as well as global sales. The visualizations make it easier to compare how sales vary across these categories.', tags: ['Power BI', 'Data visualization', 'Video game sales', 'Regional analysis'], images: ['../DataVis.png'], link: 'https://github.com/Yusuf11806/Video-Game-Sales' },
    { name: 'BINUS Network (Floors 4-6)', tag: 'PROJECT / 007', year: '2025', genre: 'Network & Infra', description: 'My team and I designed a network system for floors 4 through 6 at BINUS. Using Cisco Packet Tracer, we planned the IP addresses, subnet masks, default gateways, Wi-Fi network, and cable types for the floor network.', tags: ['Cisco Packet Tracer', 'Network design', 'IP addressing', 'Team project'], images: ['../11.jpg', '../12.jpg', '../13.jpg'], link: 'https://github.com/Yusuf11806/binus-network-4-6-floor' }
  ];

  // World runs along +z: a BEDROOM (z 2..18) then a LIBRARY split into 4 genre rooms.
  const W = { minX: -12, maxX: 12, minZ: 2, maxZ: 60, ceilY: 9 };
  const WALL_T = .6, DOOR_HALF = 2.2, EXHIBIT_Y = 4.0;
  // Internal walls (each with a doorway gap at x in [-DOOR_HALF, DOOR_HALF]):
  //   z=18 bedroom<->library, then library dividers at 28, 38, 50.
  const INTERNAL_WALLS = [18, 28, 38, 50];

  // Genre rooms along the library: [name, zStart, zEnd, accent colour].
  const GENRE_ROOMS = [
    { name: 'WEB & APP', z0: 18, z1: 28, accent: 0x4b9cff },
    { name: 'AI & SCIENCE', z0: 28, z1: 38, accent: 0x8f6bff },
    { name: 'DATA & DATABASE', z0: 38, z1: 50, accent: 0x36c98d },
    { name: 'NETWORK & INFRA', z0: 50, z1: 60, accent: 0xffab52 }
  ];

  // Painting placements (validated reachable). wall: left(+x), right(-x), end(-z).
  const exhibitSpots = [
    { wall: 'left', x: -11.8, z: 22 }, { wall: 'right', x: 11.8, z: 22 }, { wall: 'right', x: 11.8, z: 25.5 }, // Web & App
    { wall: 'left', x: -11.8, z: 32 }, { wall: 'right', x: 11.8, z: 32 },                                      // AI & Science
    { wall: 'left', x: -11.8, z: 42 }, { wall: 'right', x: 11.8, z: 42 }, { wall: 'left', x: -11.8, z: 47 },   // Data & Database
    { wall: 'end', x: 0, z: 59.6 }                                                                             // Network & Infra
  ];
  allProjects.forEach((p, i) => { const s = exhibitSpots[i]; p.wall = s.wall; p.x = s.x; p.y = EXHIBIT_Y; p.z = s.z; p.angle = s.wall === 'left' ? Math.PI / 2 : s.wall === 'right' ? -Math.PI / 2 : Math.PI; });
  const projects = allProjects;

  // Bedroom "about me" interactables.
  const PROFILE_POS = { x: -11.5, y: 3.5, z: 11 };   // pixel portrait on the bedroom left wall (lowered)
  const CV_POS = { x: -11.5, y: 3.5, z: 15 };        // CV board (coming soon) beside it (lowered)

  function zoneLabel(z) {
    if (z < 18) return 'BEDROOM / ABOUT ME';
    for (const r of GENRE_ROOMS) if (z >= r.z0 && z < r.z1) return `LIBRARY / ${r.name}`;
    return 'LIBRARY';
  }

  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const keys = {}, collected = new Set();
  let nearby = -1, nearbySpecial = '', last = 0, toastTimer, modalOpen = false, started = false, paused = false, galleryIndex = 0;

  // ---------------------------------------------------------------------------
  // COLLISION BLOCKS (bedroom + library). kind drives how each is drawn.
  // ---------------------------------------------------------------------------
  const furnitureBlocks = [
    // ---- BEDROOM (z 2..18) ----
    { x: 9.0, z: 13, hx: 2.9, hz: 3.4, top: 1.0, kind: 'bed' },
    { x: -10.3, z: 6, hx: 1.6, hz: 1.4, top: 5.0, kind: 'wardrobe' },
    { x: -9.8, z: 14.5, hx: 2.0, hz: .8, top: 1.7, kind: 'deskBed' },
    { x: -9.8, z: 13.2, hx: .5, hz: .5, top: 1.0, kind: 'deskChairBlock' },
    // TV lounge: media console on the entry wall, sofa facing it, coffee table between.
    { x: 5.5, z: 2.9, hx: 2.6, hz: .7, top: 1.4, kind: 'tvConsole' },
    { x: 5.5, z: 8.2, hx: 2.5, hz: 1.0, top: 1.0, kind: 'sofa' },
    { x: 5.5, z: 5.6, hx: 1.2, hz: .7, top: .7, kind: 'coffee' },
    { x: 4.9, z: 13, hx: .7, hz: .7, top: 1.1, kind: 'nightstand' },
    { x: -4.5, z: 3.0, hx: .8, hz: .8, top: 1.2, kind: 'bookStack' },
    // library decorative pedestals (collision so the cat can't stand inside them)
    { x: 10.9, z: 49, hx: .45, hz: .45, top: 2.3, kind: 'pedestalBlock' },
    { x: -10.8, z: 20, hx: .45, hz: .45, top: 2.3, kind: 'pedestalBlock' },
    // ---- LIBRARY central furniture (low pieces only; NO free-standing bookcases
    //      in the middle of a room — all books live on the walls). Aisle |x|<2.5 clear. ----
    // WEB & APP room: central reading table + chairs, plus two symmetric wall benches.
    { x: 0, z: 23, hx: 1.8, hz: 1.0, top: 1.0, kind: 'table' }, { x: -2.9, z: 23, hx: .45, hz: .45, top: 1.1, kind: 'chair', face: 1 }, { x: 2.9, z: 23, hx: .45, hz: .45, top: 1.1, kind: 'chair', face: -1 },
    { x: -9.3, z: 24.5, hx: 1.2, hz: .5, top: .8, kind: 'bench' }, { x: 9.3, z: 24.5, hx: 1.2, hz: .5, top: .8, kind: 'bench' },
    // AI & SCIENCE room: a round display plinth (model under glass) + a low exhibit table.
    { x: 0, z: 33, hx: 1.1, hz: 1.1, top: 1.3, kind: 'plinth' }, { x: 0, z: 35.6, hx: 1.6, hz: .7, top: .9, kind: 'exhibitTable' },
    // DATA & DATABASE room: central study table + two facing chairs + a side console.
    { x: 0, z: 44, hx: 1.9, hz: 1.1, top: 1.0, kind: 'table' }, { x: -3.0, z: 44, hx: .45, hz: .45, top: 1.1, kind: 'chair', face: 1 }, { x: 3.0, z: 44, hx: .45, hz: .45, top: 1.1, kind: 'chair', face: -1 },
    { x: 9.3, z: 40.5, hx: 1.3, hz: .5, top: .9, kind: 'console' },
    // NETWORK & INFRA room: study table + globe + a server-rack console against the wall.
    { x: 0, z: 54, hx: 1.8, hz: 1.0, top: 1.05, kind: 'table' }, { x: 0, z: 51.8, hx: .45, hz: .45, top: 1.1, kind: 'chair', face: 2 },
    { x: 6.5, z: 57, hx: .6, hz: .6, top: 1.4, kind: 'globe' }, { x: -9.5, z: 56, hx: 1.4, hz: 1.0, top: 2.0, kind: 'serverRack' }
  ];

  const PLAYER_R = .42;
  function insideWorld(x, z) {
    if (x < W.minX + WALL_T / 2 || x > W.maxX - WALL_T / 2 || z < W.minZ + WALL_T / 2 || z > W.maxZ - WALL_T / 2) return false;
    for (const dz of INTERNAL_WALLS) { if (Math.abs(z - dz) < WALL_T / 2 + PLAYER_R && Math.abs(x) > DOOR_HALF - PLAYER_R) return false; }
    return true;
  }
  function hitsFurniture(x, z, y) { for (const o of furnitureBlocks) { if (y < o.top - .08 && Math.abs(x - o.x) < o.hx + PLAYER_R && Math.abs(z - o.z) < o.hz + PLAYER_R) return true; } return false; }
  function canMoveTo(fromX, fromZ, toX, toZ, y) {
    if (!insideWorld(toX, toZ)) return false;
    for (const o of furnitureBlocks) {
      if (y >= o.top - .08) continue;
      const overlap = (x, z) => Math.max(0, o.hx + PLAYER_R - Math.abs(x - o.x)) * Math.max(0, o.hz + PLAYER_R - Math.abs(z - o.z));
      if (overlap(toX, toZ) > .0001 && overlap(toX, toZ) > overlap(fromX, fromZ) + .0001) return false;
    }
    return true;
  }
  function recoverPlayer() { if (insideWorld(player.x, player.z) && !hitsFurniture(player.x, player.z, player.y)) return; for (let r = .2; r <= 12; r += .2) { for (let n = 0; n < 24; n++) { const a = n * Math.PI / 12, x = player.x + Math.cos(a) * r, z = player.z + Math.sin(a) * r; if (insideWorld(x, z) && !hitsFurniture(x, z, player.y)) { player.x = x; player.z = z; player.vx = 0; player.vz = 0; return; } } } }
  function furnitureLanding(x, z, fromY, toY) { if (player.vy >= 0) return 0; let top = 0; for (const o of furnitureBlocks) { if (o.top > top && fromY >= o.top && toY <= o.top && Math.abs(x - o.x) < o.hx && Math.abs(z - o.z) < o.hz) top = o.top; } return top; }

  // yaw 0 => camera behind the cat (at -z) looking +z; face PI => cat head points +z.
  const player = { x: 0, y: 0, z: 8, vx: 0, vy: 0, vz: 0, face: Math.PI, attackUntil: 0, attackHitAt: 0, attackPending: false };
  const cameraRig = { x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0, yaw: 0, pitch: 3.0, distance: 6.0, shoulder: 1.25, sensitivity: 1, dragging: false, lastX: 0, lastY: 0, ready: false };

  // ---------------------------------------------------------------------------
  // GEOMETRY HELPERS
  // ---------------------------------------------------------------------------
  let activeFrame = null; const held = []; const add = (...nums) => held.push(...nums);
  const profileImage = new Image(); let profilePixels = null, profilePixelUrl = '';
  profileImage.onload = () => { try { const c = document.createElement('canvas'); c.width = 24; c.height = 32; const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(profileImage, 0, 0, 24, 32); profilePixels = ctx.getImageData(0, 0, 24, 32).data; profilePixelUrl = c.toDataURL('image/png'); } catch (error) { profilePixels = null; profilePixelUrl = '../image0.jpg'; } };
  profileImage.src = '../image0.jpg';

  function rgb(hex, shade = 1) { return [((hex >> 16) & 255) / 255 * shade, ((hex >> 8) & 255) / 255 * shade, (hex & 255) / 255 * shade]; }
  function tri(a, b, c, color, shade = 1) { const k = rgb(color, shade); for (const raw of [a, b, c]) { let p = raw; if (activeFrame) { const dx = raw[0] - activeFrame.ox, dy = raw[1] - activeFrame.oy, dz = raw[2] - activeFrame.oz; const m = activeFrame.matrix; p = [activeFrame.x + m[0] * dx + m[1] * dy + m[2] * dz, activeFrame.y + m[3] * dx + m[4] * dy + m[5] * dz, activeFrame.z + m[6] * dx + m[7] * dy + m[8] * dz]; } add(p[0], p[1], p[2], ...k); } }
  function quad(a, b, c, d, color, shade = 1) { tri(a, b, c, color, shade); tri(a, c, d, color, shade * .94); }
  function box(x, y, z, sx, sy, sz, color, angle = 0) { const turn = v => { const dx = v[0] - x, dz = v[2] - z, c = Math.cos(angle), s = Math.sin(angle); return [x + dx * c + dz * s, v[1], z - dx * s + dz * c]; }, a = turn([x - sx / 2, y - sy / 2, z - sz / 2]), b = turn([x + sx / 2, y - sy / 2, z - sz / 2]), c = turn([x + sx / 2, y + sy / 2, z - sz / 2]), d = turn([x - sx / 2, y + sy / 2, z - sz / 2]), e = turn([x - sx / 2, y - sy / 2, z + sz / 2]), f = turn([x + sx / 2, y - sy / 2, z + sz / 2]), g = turn([x + sx / 2, y + sy / 2, z + sz / 2]), h = turn([x - sx / 2, y + sy / 2, z + sz / 2]); quad(a, b, c, d, color, .75); quad(e, h, g, f, color, 1); quad(a, e, f, b, color, .85); quad(d, c, g, h, color, 1.12); quad(a, d, h, e, color, .92); quad(b, f, g, c, color, .8); }

  // A framed painting. angle: PI/2 faces +x, -PI/2 faces -x, PI faces -z.
  function galleryArt(x, y, z, w, h, angle, index, accent) {
    const palette = [[0x405b69, 0xe7aa65, 0xe9d7b7], [0x604c7c, 0x9de5dc, 0xe8b77d], [0x344e4b, 0xef9b79, 0xf4dca9], [0x4d536d, 0xd3a2e8, 0xf4c871], [0x6d493f, 0x9ed8d0, 0xf4e3c4], [0x343f5d, 0xffb86b, 0x9de5dc], [0x62534a, 0xec8d9d, 0xe5cb91], [0x3e594e, 0xd8b4f4, 0xffd27d], [0x554665, 0xf4a76c, 0xb6e7db]][index % 9];
    const normal = .19, c = Math.cos(angle), s = Math.sin(angle);
    const part = (u, v, d, sx, sy, sz, color) => box(x + u * c + d * s, y + v, z - u * s + d * c, sx, sy, sz, color, angle);
    part(0, 0, 0, w, h, .3, 0xc59b64); part(0, 0, normal, w - .22, h - .22, .08, 0xe8dfce); part(0, 0, normal + .055, w - .48, h - .48, .04, palette[0]);
    const face = (u, v, sx, sy, color) => part(u, v, normal + .09, sx, sy, .035, color);
    face(-w * .19, -h * .22, w * .52, .11, palette[1]); face(w * .19, h * .08, w * .25, .2, palette[2]); face(-w * .08, h * .24, w * .12, .12, palette[2]); face(w * .29, -h * .25, w * .09, .09, palette[1]);
    if (index % 3 === 0) face(-w * .24, h * .06, .1, h * .5, palette[2]);
    // a thin accent strip under the frame to colour-code the genre
    part(0, -h * .5 - .12, .02, w * .9, .09, .06, accent);
  }
  // A seven-segment year plaque under each painting.
  function yearPlaque(x, y, z, year, angle = 0) { const c = Math.cos(angle), s = Math.sin(angle), stamp = (dx, dy, dz, sx, sy, sz, color) => box(x + dx * c + dz * s, y + dy, z - dx * s + dz * c, sx, sy, sz, color, angle); stamp(0, 0, 0, 1.42, .52, .12, 0x353641); const segments = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgecd', 7: 'abc', 8: 'abcdefg', 9: 'abfgcd' }, digitW = .24, start = -.48; for (let i = 0; i < 4; i++) { const cx = start + i * digitW, pattern = segments[Number(year[i])] || segments[0], horizontal = (name, dx, dy) => { if (pattern.includes(name)) stamp(cx + dx, dy, .09, .13, .035, .035, 0xffd895); }, vertical = (name, dx, dy) => { if (pattern.includes(name)) stamp(cx + dx, dy, .09, .035, .12, .035, 0xffd895); }; horizontal('a', 0, .17); horizontal('g', 0, 0); horizontal('d', 0, -.17); vertical('f', -.075, .085); vertical('b', .075, .085); vertical('e', -.075, -.085); vertical('c', .075, -.085); } }

  // A Sims-style plumbob: a rotating green octahedron floating above an openable item.
  function plumbob(x, y, z, t, active) {
    const spin = t * (active ? .004 : .0018), bobY = y + Math.sin(t * .003 + x) * .12;
    const r = active ? .34 : .26, hTop = active ? .5 : .4, hBot = active ? .42 : .34, bright = active ? 1.18 : 1.0;
    const top = [x, bobY + hTop, z], bot = [x, bobY - hBot, z], pts = [];
    for (let i = 0; i < 4; i++) { const a = spin + i * Math.PI / 2; pts.push([x + Math.cos(a) * r, bobY, z + Math.sin(a) * r]); }
    for (let i = 0; i < 4; i++) { const p = pts[i], q = pts[(i + 1) % 4]; tri(top, p, q, 0x46e07a, (i % 2 ? 1.25 : .95) * bright); tri(bot, q, p, 0x2fae55, (i % 2 ? .8 : 1.1) * bright); }
  }

  // ---------------------------------------------------------------------------
  // THE COMPANION CAT
  // ---------------------------------------------------------------------------
  function drawCat(t) {
    const moving = started && Math.hypot(player.vx, player.vz) > .5;
    const bob = moving ? Math.abs(Math.sin(t * .019)) * .05 : Math.sin(t * .002) * .012;
    const step = moving ? Math.sin(t * .019) * .14 : 0;
    const tail = Math.sin(t * .005) * .13 + (moving ? Math.sin(t * .019) * .08 : 0);
    const anchor = player.y + .5 + bob, cf = Math.cos(player.face), sf = Math.sin(player.face);
    activeFrame = { ox: 0, oy: anchor, oz: 0, x: player.x, y: anchor, z: player.z, matrix: [cf, 0, sf, 0, 1, 0, -sf, 0, cf] };
    const part = (x, y, z, sx, sy, sz, c) => box(x, anchor + y, z, sx, sy, sz, c);
    part(0, 0, 0, .72, .5, .92, 0xc77b3d);
    part(0, -.11, -.03, .5, .28, .66, 0xf4d2a0);
    part(0, .32, -.4, .6, .55, .58, 0xd18a46);
    for (const side of [-1, 1]) { part(side * .21, .62, -.45, .17, .27, .19, 0xd18a46); part(side * .21, .63, -.55, .07, .13, .025, 0xf0a5a0); part(side * .14, .36, -.68, .06, .09, .025, 0x27332b); }
    part(0, .3, -.7, .09, .06, .03, 0xf0a5a0);
    for (const [x, z, phase] of [[-.23, -.3, 1], [.23, -.3, -1], [-.23, .3, -1], [.23, .3, 1]]) { part(x, -.31, z + step * phase, .17, .33, .2, 0xc77b3d); part(x, -.49, z + step * phase, .19, .11, .22, 0xf4d2a0); }
    part(tail, .12, .52, .19, .24, .21, 0xc77b3d); part(tail * 1.7, .33, .68, .19, .24, .19, 0xc77b3d); part(tail * 2, .52, .68, .17, .19, .17, 0xf4d2a0);
    activeFrame = null;
  }

  // ---------------------------------------------------------------------------
  // FURNITURE PIECES
  // ---------------------------------------------------------------------------
  function readingTable(x, z, w, d) { box(x, .9, z, w, .16, d, 0x7a5338); box(x, 1.0, z, w * .92, .05, d * .92, 0x4a6a60); for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(x + sx * (w / 2 - .25), .45, z + sz * (d / 2 - .25), .2, .9, .2, 0x5c3f2b); box(x, 1.2, z, .3, .4, .3, 0x3a3f4a); box(x, 1.55, z, .5, .3, .5, 0xffd58b); }
  // face: 1 => faces +x, -1 => faces -x, 2 => faces +z, -2 => faces -z (default).
  // The backrest sits BEHIND the seat (opposite the facing direction).
  function chair(x, z, face = -2) {
    box(x, .32, z, .78, .12, .78, 0x7a5338); // seat
    let bx = x, bz = z, sx = .78, sz = .14;
    if (face === 1) { bx = x - .33; sx = .14; sz = .78; }        // faces +x => back on -x
    else if (face === -1) { bx = x + .33; sx = .14; sz = .78; }   // faces -x => back on +x
    else if (face === 2) { bz = z - .33; }                        // faces +z => back on -z
    else { bz = z + .33; }                                        // faces -z => back on +z
    box(bx, .74, bz, sx, .74, sz, 0x6a4a32); // backrest
    for (const ox of [-1, 1]) for (const oz of [-1, 1]) box(x + ox * .3, .16, z + oz * .3, .1, .34, .1, 0x5c3f2b);
  }
  // A swivel desk chair. faceZ=+1 => seat faces +z (backrest on the -z side).
  function deskChair(x, z, faceZ = 1) { box(x, .5, z, .9, .14, .9, 0x2f3340); box(x, .95, z - faceZ * .4, .86, .9, .14, 0x363b49); box(x, .22, z, .12, .5, .12, 0x1f232c); box(x, .08, z, 1.0, .1, 1.0, 0x1f232c); box(x, 1.15, z - faceZ * .38, .5, .22, .1, 0x363b49); }
  function globe(x, z) { box(x, .7, z, .18, 1.4, .18, 0x6a4a32); box(x, 1.5, z, .7, .7, .7, 0x4e7fa6); box(x, 1.5, z, .74, .12, .74, 0xd7b06a); }
  // A small display pedestal topped with a stylised bust (decor, no plants).
  function pedestal(x, z) { box(x, .7, z, .7, 1.4, .7, 0xd8cdb6); box(x, 1.45, z, .9, .18, .9, 0xe8dfca); box(x, 1.85, z, .5, .6, .4, 0xb9c2cc); box(x, 2.25, z, .38, .38, .34, 0xc9d0d8); }
  // A cushioned wall bench (seat + low back).
  function bench(x, z, color = 0x8a5750) { box(x, .3, z, 2.4, .4, 1.0, 0x6b4a34); box(x, .6, z, 2.3, .22, .9, color); box(x, 1.0, z + .4, 2.4, .8, .2, 0x6b4a34); }
  // A round display plinth with a glowing "model" under a glass dome (AI room centrepiece).
  function plinth(x, z, t) { box(x, .4, z, 2.0, .8, 2.0, 0x3b4150); box(x, .82, z, 1.7, .08, 1.7, 0x4a5262); const s = .9 + .2 * Math.sin(t * .003); box(x, 1.2, z, .7, .7, .7, 0x6b9bff, s); box(x, 1.55, z, .35, .35, .35, 0xbfe0ff, s + .2); box(x, 1.35, z, 1.4, 1.1, 1.4, 0x2b3340, .4); }
  function exhibitTable(x, z) { box(x, .7, z, 3.2, .18, 1.4, 0x6b4a34); for (const sx of [-1, 1]) box(x + sx * 1.3, .35, z, .2, .7, 1.2, 0x5c3f2b); box(x, .85, z, 2.2, .1, .8, 0x2b3550); }
  function console3(x, z) { box(x, .45, z, 2.6, .9, 1.0, 0x4a4036); box(x, .95, z, 2.7, .12, 1.1, 0x6b5a48); for (const dx of [-.8, .8]) box(x + dx, .45, z + .4, .9, .6, .06, 0x2f281f); }
  // A tall server rack with blinking status lights (Network room).
  function serverRack(x, z, t) { box(x, 1.0, z, 2.8, 4.0, 2.0, 0x23262e); box(x, 1.0, z - 1.02, 2.6, 3.7, .06, 0x15171c); for (let r = 0; r < 8; r++) { box(x, .4 + r * .45, z - 1.05, 2.2, .3, .04, 0x2d323c); for (let c = 0; c < 6; c++) { const on = (Math.sin(t * .006 + r * 1.7 + c) > .2); box(x - .9 + c * .36, .4 + r * .45, z - 1.08, .08, .08, .03, on ? (c % 2 ? 0x57e08a : 0x6bb6ff) : 0x20242c); } } }
  function floorLamp(x, z) { box(x, .1, z, .5, .2, .5, 0x3a3f4a); box(x, 1.4, z, .1, 2.6, .1, 0x5c5248); box(x, 2.75, z, .7, .5, .7, 0xffe0a0); }

  // Big flat-screen TV on a low media console (mounted + standing). Screen faces +z.
  function tvWall(x, z, t) {
    // media console
    box(x, .5, z, 5.0, 1.0, 1.3, 0x6b4a34); box(x, 1.02, z, 5.1, .12, 1.4, 0x8a6244);
    for (const dx of [-1.6, 0, 1.6]) { box(x + dx, .5, z + .35, 1.2, .5, .06, 0x3a2a1e); } // cabinet doors
    for (const dx of [-1.6, 0, 1.6]) box(x + dx, .5, z + .42, .18, .12, .04, 0xd7b06a);     // handles
    // soundbar
    box(x, 1.18, z, 3.6, .18, .32, 0x1c1e24);
    // big screen on a stand
    box(x, 3.2, z - .2, .5, 2.2, .35, 0x24252b);          // mount/stand
    box(x, 4.2, z - .35, 6.6, 3.7, .28, 0x15161c);         // bezel
    box(x, 4.2, z - .5, 6.2, 3.35, .06, 0x2b3550);         // screen base
    // subtle animated "picture": shifting colour bands
    const bands = [0x3f6f9f, 0x54618f, 0x8a5f7e, 0x4f8a6b];
    for (let i = 0; i < 4; i++) { const w = 6.0, bw = w / 4, bx = x - w / 2 + bw * (i + .5); const shade = .8 + .35 * Math.sin(t * .002 + i); box(bx, 4.2, z - .54, bw * .92, 3.1, .03, bands[i], shade); }
    box(x, 4.2, z - .56, 1.3, .9, .02, 0xcfe0f0, 1.1 + .2 * Math.sin(t * .004)); // highlight glint
  }
  // A cosy 3-seater sofa. Seat faces -z (toward the TV); backrest on the +z side.
  function sofa(x, z) {
    box(x, .35, z, 5.0, .5, 1.9, 0x8a5750);               // base
    box(x, .78, z - .1, 4.7, .35, 1.5, 0xb87a72);         // seat cushions
    for (const cx of [-1.55, 0, 1.55]) box(x + cx, .95, z - .1, 1.45, .25, 1.4, 0xc98c82); // seat seams
    box(x, 1.25, z + .8, 5.0, 1.3, .5, 0x8a5750);         // backrest
    for (const cx of [-1.55, 0, 1.55]) box(x + cx, 1.25, z + .62, 1.45, 1.0, .25, 0xc98c82); // back cushions
    for (const sx of [-1, 1]) box(x + sx * 2.5, 1.0, z, .5, 1.1, 1.9, 0x7a4a44); // armrests
    for (const sx of [-1, 1]) box(x + sx * .9, 1.35, z - .1, .7, .4, 1.0, 0xcf9a90); // throw pillows
  }
  function coffeeTable(x, z) { box(x, .45, z, 2.4, .18, 1.4, 0x6b4a34); box(x, .55, z, 2.0, .05, 1.1, 0x4a3426); for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(x + sx * 1.0, .22, z + sz * .55, .16, .45, .16, 0x5c3f2b); box(x - .5, .62, z, .7, .1, .5, 0xcf9a90); }
  function nightstand(x, z) { box(x, .5, z, 1.3, 1.0, 1.3, 0x8e684d); box(x, 1.02, z, 1.4, .1, 1.4, 0xb88d66); box(x, .55, z + .35, 1.0, .5, .05, 0x6b4a34); box(x, 1.25, z, .3, .4, .3, 0x3a3f4a); box(x, 1.5, z, .5, .3, .5, 0xffd58b); }
  function bookStack(x, z) { const cols = [0x9a6849, 0x55728b, 0xa14f43, 0x63527e]; for (let i = 0; i < 4; i++) box(x, .25 + i * .22, z, 1.1 - i * .08, .2, .8, cols[i]); box(x + .2, 1.2, z, .7, .08, .7, 0xd0a06b); }

  // ---------------------------------------------------------------------------
  // PIXEL TEXT (tiny 3x5 block font) — used for genre room name signs.
  // Each glyph is 5 rows x 3 cols, top row first. '1' = filled cell.
  // ---------------------------------------------------------------------------
  const FONT = {
    'A': ['010', '101', '111', '101', '101'], 'B': ['110', '101', '110', '101', '110'],
    'C': ['011', '100', '100', '100', '011'], 'D': ['110', '101', '101', '101', '110'],
    'E': ['111', '100', '110', '100', '111'], 'F': ['111', '100', '110', '100', '100'],
    'G': ['011', '100', '101', '101', '011'], 'H': ['101', '101', '111', '101', '101'],
    'I': ['111', '010', '010', '010', '111'], 'K': ['101', '110', '100', '110', '101'],
    'L': ['100', '100', '100', '100', '111'], 'M': ['101', '111', '111', '101', '101'],
    'N': ['101', '111', '111', '111', '101'], 'O': ['010', '101', '101', '101', '010'],
    'P': ['110', '101', '110', '100', '100'], 'R': ['110', '101', '110', '101', '101'],
    'S': ['011', '100', '010', '001', '110'], 'T': ['111', '010', '010', '010', '010'],
    'U': ['101', '101', '101', '101', '111'], 'V': ['101', '101', '101', '101', '010'],
    'W': ['101', '101', '111', '111', '101'], 'Y': ['101', '101', '010', '010', '010'],
    '&': ['010', '101', '010', '101', '011'], ' ': ['000', '000', '000', '000', '000']
  };
  // Draw text on a wall perpendicular to z (letters run along x), facing +z (toward the room).
  // cx = centre x, topY = top of the text, zFace = z position of the wall face, cell = glyph cell size.
  function pixelTextOnZWall(text, cx, topY, zFace, cell, color, maxWidth) {
    const glyphW = 3, gap = 1;
    // Auto-shrink the cell so the whole word fits within maxWidth (if given).
    if (maxWidth) { const need = text.length * (glyphW + gap) * cell - gap * cell; if (need > maxWidth) cell *= maxWidth / need; }
    const stride = (glyphW + gap) * cell;
    const totalW = text.length * stride - gap * cell;
    // The sign is read from the -z side (player walks toward +z). Looking down +z, the
    // world +x axis runs to the viewer's LEFT, so lay characters out along -x and flip
    // each glyph's columns — otherwise the text reads mirrored.
    let x0 = cx + totalW / 2;
    for (let i = 0; i < text.length; i++) {
      const g = FONT[text[i]] || FONT[' '];
      for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) {
        if (g[r][c] === '1') { const px = x0 - c * cell - cell / 2, py = topY - r * cell - cell / 2; box(px, py, zFace, cell * .92, cell * .92, .08, color); }
      }
      x0 -= stride;
    }
  }

  // Bedroom furniture pieces.
  // Bed with the HEADBOARD + pillows against the right wall (+x), footboard toward -x,
  // so it reads as a bed pushed against the wall rather than floating.
  function bed(x, z) {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(x + sx * 2.5, .25, z + sz * 2.9, .4, .5, .4, 0x6a4a32); // legs
    box(x, .55, z, 5.4, .5, 6.2, 0x7a5338);          // frame
    box(x, .95, z, 5.1, .4, 5.9, 0xe8d8bf);          // mattress
    box(x + .9, 1.2, z, 3.0, .25, 5.6, 0x6ea0c4);    // folded blanket toward the foot (-x)
    // two pillows along the headboard end (+x)
    for (const pz of [-1.4, 1.4]) box(x + 1.9, 1.25, z + pz, 1.0, .3, 1.9, 0xf7e7d0);
    // headboard panel standing on the +x (wall) side
    box(x + 2.5, 2.0, z, .22, 2.4, 5.4, 0x6a4a32); for (let bz = -2; bz <= 2; bz += .8) box(x + 2.38, 2.0, z + bz, .14, 2.0, .14, 0xc4935e);
  }
  function wardrobe(x, z) { box(x, 2.5, z, 3.2, 5.0, 2.6, 0x8b674f); box(x + 1.55, 2.5, z, .1, 4.7, 2.3, 0xb68b66); for (const sz of [-1, 1]) box(x + 1.6, 2.5, z + sz * .55, .06, 4.2, .08, 0x57483c); for (const sz of [-1, 1]) box(x + 1.64, 2.5, z + sz * .55, .12, .3, .08, 0xe5c893); }
  function deskWithPC(x, z) {
    box(x, .95, z, 4.0, .22, 1.5, 0x76533f); for (const sx of [-1, 1]) box(x + sx * 1.7, .45, z, .2, 1.0, 1.2, 0x5c3f2b);
    box(x, 1.75, z - .4, 2.0, 1.2, .12, 0x24252b); box(x, 1.75, z - .33, 1.8, .98, .05, 0x79aeb4); box(x, 1.3, z - .1, .16, .5, .16, 0x333741); box(x, 1.08, z - .1, 1.3, .08, .6, 0x333741);
    box(x + 1.3, 1.2, z, .9, .25, .4, 0x2a2d36); // keyboard-ish stack
  }

  // ---------------------------------------------------------------------------
  // THE WORLD
  // ---------------------------------------------------------------------------
  function drawWorld(t) {
    const midZ = (W.minZ + W.maxZ) / 2, lenZ = W.maxZ - W.minZ, lenX = W.maxX - W.minX;
    // ---- Cohesive palette: warm cream plaster walls, honey floor, soft teal ceiling ----
    const bedroomFloor = 0xb08a5c, libraryFloor = 0xa07e52, ceil = 0x3a4752;
    const wallBedroom = 0xcdb79a, wallLibrary = 0xc3b59a, trim = 0xe8cfa3;
    // Floors.
    box(0, -.3, 10, lenX + 1, .6, 17, bedroomFloor);
    box(0, -.3, 39.5, lenX + 1, .6, 43.5, libraryFloor);
    box(0, W.ceilY, midZ, lenX + 1, .5, lenZ + 1, ceil);
    // Outer walls — bedroom portion a touch warmer than the library portion.
    for (const x of [W.minX, W.maxX]) { box(x, W.ceilY / 2, 10, WALL_T, W.ceilY, 17, wallBedroom); box(x, W.ceilY / 2, 39.5, WALL_T, W.ceilY, 43.5, wallLibrary); }
    box(0, W.ceilY / 2, W.minZ, lenX + 1, W.ceilY, WALL_T, wallBedroom);
    box(0, W.ceilY / 2, W.maxZ, lenX + 1, W.ceilY, WALL_T, wallLibrary);
    // Plank lines + rugs.
    for (let z = W.minZ + 2; z < W.maxZ; z += 2.4) box(0, -.001, z, lenX, .012, .04, 0x8a6a44);
    box(0, .02, 10, 9.4, .03, 8.0, 0x9c5c57);                   // bedroom rug (warm terracotta)
    const rugColors = { 23: 0x3f6f8f, 44: 0x3f7f63, 54: 0x7a6aa0 }; // tinted per genre area
    for (const z of [23, 44, 54]) box(0, .02, z, 8.0, .03, 7.2, rugColors[z]);
    // Baseboards + picture rail.
    for (const x of [W.minX + .32, W.maxX - .32]) { box(x, .4, midZ, .12, .8, lenZ, trim); box(x, 6.6, midZ, .1, .16, lenZ, trim); }

    // Internal walls (bedroom door + 3 library dividers), each with a doorway + archway trim.
    for (const dz of INTERNAL_WALLS) {
      const wc = dz <= 18 ? wallBedroom : wallLibrary;
      const lCx = (W.minX + (-DOOR_HALF)) / 2, lW = (-DOOR_HALF) - W.minX;
      const rCx = (DOOR_HALF + W.maxX) / 2, rW = W.maxX - DOOR_HALF;
      box(lCx, W.ceilY / 2, dz, lW, W.ceilY, WALL_T, wc);
      box(rCx, W.ceilY / 2, dz, rW, W.ceilY, WALL_T, wc);
      box(0, W.ceilY - 1.1, dz, DOOR_HALF * 2 + .4, 2.2, WALL_T, wc);
      for (const sx of [-1, 1]) box(sx * DOOR_HALF, 2.9, dz, .22, 5.8, WALL_T + .1, trim);
      box(0, 5.9, dz, DOOR_HALF * 2 + .4, .3, WALL_T + .1, trim);
    }

    // Ceiling lamps down the aisle.
    for (let z = 6; z <= 58; z += 8) { box(0, W.ceilY - .3, z, .25, .5, .25, 0x8a7a63); box(0, W.ceilY - .7, z, .7, .18, .7, 0xffe3a8); box(0, W.ceilY - .82, z, .42, .1, .42, 0xfff3cf); }

    // ---------------- BEDROOM contents ----------------
    bed(9.0, 13); wardrobe(-10.3, 6); deskWithPC(-9.8, 14.5); deskChair(-9.8, 13.2, 1);
    // TV lounge: big screen on a media console (entry wall) with a sofa + coffee table facing it.
    tvWall(5.5, 2.9, t); sofa(5.5, 8.2); coffeeTable(5.5, 5.6);
    nightstand(4.9, 13); bookStack(-4.5, 3.0); floorLamp(-11.0, 11.5);
    // Window with warm light on the bedroom right wall.
    box(11.72, 5.0, 9, .12, 3.2, 5.0, 0x9bd8e7); box(11.55, 5.0, 6.4, .2, 3.6, .2, 0xc89c69); box(11.55, 5.0, 11.6, .2, 3.6, .2, 0xc89c69); box(11.55, 6.85, 9, .2, .2, 5.2, 0xc89c69); box(11.55, 3.15, 9, .2, .2, 5.2, 0xc89c69);
    // Pixel self-portrait (ABOUT ME) on the bedroom LEFT wall at z=11.
    box(-11.72, PROFILE_POS.y, 11, .18, 3.0, 2.4, 0x735841); box(-11.6, PROFILE_POS.y, 11, .12, 2.76, 2.16, 0xe4d2ad);
    if (profilePixels) { const cell = .07; for (let py = 0; py < 32; py++) for (let px = 0; px < 24; px++) { const o = (py * 24 + px) * 4, a = profilePixels[o + 3] / 255; if (a < .1) continue; const color = (profilePixels[o] << 16) | (profilePixels[o + 1] << 8) | profilePixels[o + 2]; const bz = 11 - 11.5 * cell + px * cell, by = PROFILE_POS.y + 1.1 - py * cell; quad([-11.48, by, bz], [-11.48, by, bz + cell], [-11.48, by - cell, bz + cell], [-11.48, by - cell, bz], color); } }
    // CV board (coming soon) beside the portrait at z=15.
    box(-11.72, CV_POS.y, 15, .16, 2.8, 2.2, 0x45506a); box(-11.6, CV_POS.y + .9, 15, .1, .5, 1.7, 0xdce6f5); box(-11.6, CV_POS.y + .2, 15, .1, .3, 1.5, 0xaebbd2); box(-11.6, CV_POS.y - .35, 15, .1, .3, 1.5, 0xaebbd2); box(-11.6, CV_POS.y - .9, 15, .1, .3, 1.0, 0xaebbd2);

    // ---------------- LIBRARY contents (data-driven from collision blocks) ----------------
    furnitureBlocks.forEach(o => {
      switch (o.kind) {
        case 'table': readingTable(o.x, o.z, o.hx * 2, o.hz * 2); break;
        case 'chair': chair(o.x, o.z, o.face); break;
        case 'globe': globe(o.x, o.z); break;
        case 'bench': bench(o.x, o.z); break;
        case 'plinth': plinth(o.x, o.z, t); break;
        case 'exhibitTable': exhibitTable(o.x, o.z); break;
        case 'console': console3(o.x, o.z); break;
        case 'serverRack': serverRack(o.x, o.z, t); break;
        // tvConsole/sofa/coffee/nightstand/bookStack/pedestal are drawn explicitly elsewhere.
      }
    });
    // Interior accents (no bookcases, no plants): floor lamps + display pedestals with busts.
    floorLamp(-10.9, 20.5); floorLamp(10.9, 51.5);
    pedestal(10.9, 49); pedestal(-10.8, 20);
    // Framed wall sconces glowing along the library side walls.
    for (const z of [22, 32, 42, 52]) { for (const sx of [-1, 1]) { box(sx * 11.55, 5.6, z, .12, .5, .3, 0x6a4a32); box(sx * 11.5, 5.95, z, .1, .3, .24, 0xffdf9b); } }

    // ---------------- GENRE SIGNS (name boards over each doorway) ----------------
    GENRE_ROOMS.forEach(r => {
      const dz = r.z0;
      // backing board + accent frame on the -z (aisle) side of the divider, facing the player
      box(0, 7.1, dz - .32, 7.3, 1.66, .08, r.accent);
      box(0, 7.1, dz - .38, 7.0, 1.5, .1, 0x1c1e26);
      // genre name in pixel letters, sitting in front of the board so it reads clearly
      pixelTextOnZWall(r.name, 0, 7.55, dz - .46, .15, r.accent === 0xffab52 ? 0xfff0d0 : 0xeef3ff, 6.6);
    });

    // ---------------- PROJECT EXHIBITS ----------------
    projects.forEach((p, i) => {
      const a = p.angle, w = 2.6, h = 2.0;
      const accent = (GENRE_ROOMS.find(r => r.name === p.genre.toUpperCase()) || GENRE_ROOMS[0]).accent;
      const offX = p.wall === 'left' ? .35 : p.wall === 'right' ? -.35 : 0, offZ = p.wall === 'end' ? -.35 : 0;
      galleryArt(p.x + offX, EXHIBIT_Y, p.z + offZ, w, h, a, i, accent);
      const pOffX = p.wall === 'left' ? .3 : p.wall === 'right' ? -.3 : 0, pOffZ = p.wall === 'end' ? -.3 : 0;
      yearPlaque(p.x + pOffX, EXHIBIT_Y - 1.45, p.z + pOffZ, p.year, a);
    });
  }

  function makeScene(t) {
    held.length = 0;
    drawWorld(t);
    drawCat(t);
    // Plumbob over each openable painting...
    projects.forEach((p, i) => { const gx = p.x + (p.wall === 'left' ? 1.0 : p.wall === 'right' ? -1.0 : 0), gz = p.z + (p.wall === 'end' ? -1.0 : 0); plumbob(gx, EXHIBIT_Y + 1.7, gz, t, started && nearby === i); });
    // ...and over the ABOUT ME portrait + CV board.
    plumbob(PROFILE_POS.x + 1.0, PROFILE_POS.y + 2.0, PROFILE_POS.z, t, started && nearbySpecial === 'profile');
    plumbob(CV_POS.x + 1.0, CV_POS.y + 1.9, CV_POS.z, t, started && nearbySpecial === 'cv');
  }

  // ---------------------------------------------------------------------------
  // CAMERA MATH
  // ---------------------------------------------------------------------------
  function perspective(fov, aspect, near, far) { const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far); return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]); }
  function lookAt(eye, center) { let zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2], l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l; let xx = zz, xy = 0, xz = -zx; l = Math.hypot(xx, xz) || 1; xx /= l; xz /= l; const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx; return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * eye[0] + xy * eye[1] + xz * eye[2]), -(yx * eye[0] + yy * eye[1] + yz * eye[2]), -(zx * eye[0] + zy * eye[1] + zz * eye[2]), 1]); }
  function resize() { const d = 3, w = Math.max(320, Math.floor(innerWidth / d)), h = Math.max(180, Math.floor(innerHeight / d)); canvas.width = w; canvas.height = h; canvas.style.width = '100%'; canvas.style.height = '100%'; gl.viewport(0, 0, w, h); gl.uniformMatrix4fv(projLoc, false, perspective(58 * Math.PI / 180, w / h, .1, 170)); }
  addEventListener('resize', resize); resize();

  function showToast(s) { const e = document.getElementById('toast'); e.textContent = s; e.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => e.classList.remove('show'), 1600); }
  function jump() { const onFloor = player.y <= .08, onFurniture = furnitureBlocks.some(o => Math.abs(player.y - o.top) < .08 && Math.abs(player.x - o.x) < o.hx && Math.abs(player.z - o.z) < o.hz); if (!onFloor && !onFurniture) return; player.vy = 15.5; }

  // ---------------------------------------------------------------------------
  // GAME UPDATE
  // ---------------------------------------------------------------------------
  function update(dt, t) {
    const smooth = 1 - Math.exp(-6.5 * dt);
    if (!started) {
      if (!cameraRig.ready) { cameraRig.x = player.x - Math.sin(cameraRig.yaw) * cameraRig.distance; cameraRig.y = player.y + cameraRig.pitch; cameraRig.z = player.z - Math.cos(cameraRig.yaw) * cameraRig.distance; cameraRig.tx = player.x; cameraRig.ty = player.y + 1.15; cameraRig.tz = player.z + 2.5; cameraRig.ready = true; }
      gl.uniformMatrix4fv(viewLoc, false, lookAt([cameraRig.x, cameraRig.y, cameraRig.z], [cameraRig.tx, cameraRig.ty, cameraRig.tz]));
      return;
    }
    if (paused) return;
    recoverPlayer();

    let dx = Number(Boolean(keys.d || keys.D || keys.ArrowRight)) - Number(Boolean(keys.a || keys.A || keys.ArrowLeft));
    let dz = Number(Boolean(keys.s || keys.S || keys.ArrowDown)) - Number(Boolean(keys.w || keys.W || keys.ArrowUp));
    if (dx && dz) { dx *= .707; dz *= .707; }
    const hasInput = dx !== 0 || dz !== 0;
    const forward = -dz; // W => +1 (deeper into the world, away from camera)
    // Camera-relative movement. Forward dir = (sin,cos); screen-right dir = (-cos,sin).
    // So D (dx=+1) strafes to the player's screen-right, A (dx=-1) to screen-left.
    const moveX = forward * Math.sin(cameraRig.yaw) - dx * Math.cos(cameraRig.yaw);
    const moveZ = forward * Math.cos(cameraRig.yaw) + dx * Math.sin(cameraRig.yaw);
    const sprint = keys.Shift ? 1.6 : 1, speed = 7.2 * sprint, blend = 1 - Math.exp(-16 * dt);

    if (hasInput) { player.vx += (moveX * speed - player.vx) * blend; player.vz += (moveZ * speed - player.vz) * blend; }
    else { const sb = 1 - Math.exp(-22 * dt); player.vx -= player.vx * sb; player.vz -= player.vz * sb; if (Math.abs(player.vx) < .05) player.vx = 0; if (Math.abs(player.vz) < .05) player.vz = 0; }
    player.vy -= 32 * dt;
    player.vx = clamp(player.vx, -24, 24); player.vy = clamp(player.vy, -30, 30); player.vz = clamp(player.vz, -24, 24);

    const previousY = player.y, previousZ = player.z;
    const nextX = clamp(player.x + player.vx * dt, W.minX, W.maxX);
    const nextZ = clamp(player.z + player.vz * dt, W.minZ, W.maxZ);
    let nextY = clamp(player.y + player.vy * dt, 0, W.ceilY), landing = furnitureLanding(nextX, nextZ, previousY, nextY);
    if (landing) { nextY = landing; player.vy = 0; }
    player.y = nextY;
    if (player.y <= 0) { player.y = 0; if (player.vy < 0) player.vy = 0; }
    if (canMoveTo(player.x, previousZ, nextX, previousZ, player.y)) player.x = nextX; else player.vx = 0;
    if (canMoveTo(player.x, player.z, player.x, nextZ, player.y)) player.z = nextZ; else player.vz = 0;

    const movingNow = hasInput && Math.hypot(player.vx, player.vz) > .1;
    const wanted = movingNow ? Math.atan2(-moveX, -moveZ) : player.face;
    const turn = Math.atan2(Math.sin(wanted - player.face), Math.cos(wanted - player.face));
    player.face += turn * (1 - Math.exp(-(movingNow ? 10 : 7) * dt));

    // Over-the-shoulder rig: camera right vector = (-cos, sin); offset eye + aim sideways.
    const rightX = -Math.cos(cameraRig.yaw), rightZ = Math.sin(cameraRig.yaw);
    const shoulder = cameraRig.shoulder; // sideways offset (world units)
    const eye = [player.x - Math.sin(cameraRig.yaw) * cameraRig.distance + rightX * shoulder, player.y + cameraRig.pitch, player.z - Math.cos(cameraRig.yaw) * cameraRig.distance + rightZ * shoulder];
    const target = [player.x + Math.sin(cameraRig.yaw) * 1.6 + rightX * shoulder, player.y + 1.35, player.z + Math.cos(cameraRig.yaw) * 2.5 + rightZ * shoulder];
    cameraRig.x += (eye[0] - cameraRig.x) * smooth; cameraRig.y += (eye[1] - cameraRig.y) * smooth; cameraRig.z += (eye[2] - cameraRig.z) * smooth;
    cameraRig.x = clamp(cameraRig.x, W.minX + .35, W.maxX - .35); cameraRig.y = clamp(cameraRig.y, .55, W.ceilY - .3); cameraRig.z = clamp(cameraRig.z, W.minZ + .35, W.maxZ - .35);
    const aim = 1 - Math.exp(-8 * dt);
    cameraRig.tx += (target[0] - cameraRig.tx) * aim; cameraRig.ty += (target[1] - cameraRig.ty) * aim; cameraRig.tz += (target[2] - cameraRig.tz) * aim;
    gl.uniformMatrix4fv(viewLoc, false, lookAt([cameraRig.x, cameraRig.y, cameraRig.z], [cameraRig.tx, cameraRig.ty, cameraRig.tz]));

    // Proximity: nearest painting, or the profile/CV in the bedroom.
    nearby = -1; nearbySpecial = '';
    let closest = 4.6;
    projects.forEach((p, i) => { const d = Math.hypot(player.x - p.x, player.y + 1.1 - p.y, player.z - p.z); if (d < closest) { closest = d; nearby = i; nearbySpecial = ''; } });
    const dProfile = Math.hypot(player.x - PROFILE_POS.x, player.y + 1 - PROFILE_POS.y, player.z - PROFILE_POS.z);
    if (dProfile < closest) { closest = dProfile; nearby = -1; nearbySpecial = 'profile'; }
    const dCv = Math.hypot(player.x - CV_POS.x, player.y + 1 - CV_POS.y, player.z - CV_POS.z);
    if (dCv < closest) { closest = dCv; nearby = -1; nearbySpecial = 'cv'; }

    const hint = document.getElementById('interactHint');
    if (hint) { const prompt = nearbySpecial === 'profile' ? 'CLICK OR PRESS E  /  ABOUT ME' : nearbySpecial === 'cv' ? 'CLICK OR PRESS E  /  CV' : nearby >= 0 ? 'CLICK OR PRESS E  /  VIEW PROJECT' : ''; hint.textContent = prompt; hint.classList.toggle('visible', Boolean(prompt)); }
    if (player.attackPending && t >= player.attackHitAt) { player.attackPending = false; if (nearby >= 0 || nearbySpecial) openSignal(); }

    document.getElementById('zoneLabel').textContent = nearby >= 0 ? `${projects[nearby].genre.toUpperCase()} / ${projects[nearby].tag}` : nearbySpecial === 'profile' ? 'ABOUT / YUSUF RAYYAN DANIEL' : nearbySpecial === 'cv' ? 'ABOUT / CURRICULUM VITAE' : zoneLabel(player.z);
    document.getElementById('coord').textContent = `${String(Math.round(player.x + 12)).padStart(2, '0')} : ${String(Math.round(player.z)).padStart(2, '0')}`;
  }

  // ---------------------------------------------------------------------------
  // MODAL / INTERACTION
  // ---------------------------------------------------------------------------
  function showGalleryImage(images) { const image = document.getElementById('galleryImage'); image.src = images[galleryIndex]; image.alt = `Project image ${galleryIndex + 1} of ${images.length}`; document.getElementById('galleryCount').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`; }
  document.getElementById('galleryPrevious').addEventListener('click', () => { const images = projects[nearby]?.images; if (images) { galleryIndex = (galleryIndex - 1 + images.length) % images.length; showGalleryImage(images); } });
  document.getElementById('galleryNext').addEventListener('click', () => { const images = projects[nearby]?.images; if (images) { galleryIndex = (galleryIndex + 1) % images.length; showGalleryImage(images); } });

  function openSignal() {
    const gallery = document.getElementById('projectGallery'), projectLink = document.getElementById('modalLink'), extra = document.getElementById('modalExtraLinks');
    gallery.classList.remove('pixel-profile', 'single-image');
    document.getElementById('galleryImage').hidden = false; document.getElementById('friendPhotoEmpty').hidden = true;
    document.getElementById('galleryPrevious').hidden = false; document.getElementById('galleryNext').hidden = false;
    projectLink.hidden = true; extra.hidden = true;

    if (nearbySpecial === 'profile') {
      document.getElementById('modalEyebrow').textContent = 'ABOUT / YUSUF RAYYAN DANIEL';
      document.getElementById('modalTitle').textContent = 'Yusuf Rayyan Daniel';
      document.getElementById('modalCopy').textContent = 'Computer Science student at BINUS University @ Alam Sutera (born 11 August 2006). This is my bedroom — my personal space. Head through the doorway into the library to explore my projects, grouped by genre.';
      document.getElementById('modalTags').innerHTML = ['BINUS UNIVERSITY', 'COMPUTER SCIENCE', 'BORN 11 AUGUST 2006'].map(x => `<span>${x}</span>`).join('');
      gallery.hidden = !profilePixelUrl; gallery.classList.add('pixel-profile', 'single-image');
      document.getElementById('galleryPrevious').hidden = true; document.getElementById('galleryNext').hidden = true;
      if (profilePixelUrl) { document.getElementById('galleryImage').src = profilePixelUrl; document.getElementById('galleryImage').alt = 'Pixelated portrait of Yusuf Rayyan Daniel'; document.getElementById('galleryCount').textContent = 'PROFILE PHOTO'; }
      extra.hidden = false;
      document.getElementById('modalLinkedIn').href = 'https://www.linkedin.com/in/yusuf-rayyan-daniel-936a35318';
      document.getElementById('modalGithub').href = 'https://github.com/Yusuf11806';
      openModal(); return;
    }
    if (nearbySpecial === 'cv') {
      document.getElementById('modalEyebrow').textContent = 'ABOUT / CURRICULUM VITAE';
      document.getElementById('modalTitle').textContent = 'My CV';
      document.getElementById('modalCopy').textContent = 'My curriculum vitae will be available here soon. Check back shortly — the download link is being prepared.';
      document.getElementById('modalTags').innerHTML = ['<span>COMING SOON</span>'];
      gallery.hidden = true; openModal(); return;
    }
    if (nearby < 0) { showToast('MOVE CLOSER TO AN ARTWORK'); return; }
    const p = projects[nearby];
    document.getElementById('modalEyebrow').textContent = `${p.genre.toUpperCase()} · ${p.year} / ${p.tag}`;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalCopy').textContent = p.description;
    document.getElementById('modalTags').innerHTML = p.tags.map(x => `<span>${x}</span>`).join('');
    gallery.hidden = !p.images?.length;
    if (p.images?.length) { galleryIndex = 0; const single = p.images.length === 1; gallery.classList.toggle('single-image', single); document.getElementById('galleryPrevious').hidden = single; document.getElementById('galleryNext').hidden = single; showGalleryImage(p.images); }
    projectLink.href = p.link || '#'; projectLink.hidden = p.showLink === false || !p.link || p.link === '#';
    openModal();
    if (!collected.has(nearby)) { collected.add(nearby); showToast(`PROJECT ${collected.size} / ${projects.length} DISCOVERED`); }
  }
  function openModal() { document.getElementById('modal').classList.add('open'); document.getElementById('modal').setAttribute('aria-hidden', 'false'); modalOpen = true; }
  function closeModal() { document.getElementById('modal').classList.remove('open'); document.getElementById('modal').setAttribute('aria-hidden', 'true'); modalOpen = false; }

  // ---------------------------------------------------------------------------
  // PAUSE MENU + SETTINGS
  // ---------------------------------------------------------------------------
  function setPauseMenu(open) { paused = open; const menu = document.getElementById('escapeMenu'); menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open)); if (open) { player.vx = 0; player.vy = 0; player.vz = 0; cameraRig.dragging = false; } }
  document.getElementById('resumeGame').addEventListener('click', () => setPauseMenu(false));
  function exitToGameMenu() { closeModal(); setPauseMenu(false); started = false; player.x = 0; player.y = 0; player.z = 8; player.vx = 0; player.vy = 0; player.vz = 0; player.face = Math.PI; player.attackPending = false; cameraRig.yaw = 0; cameraRig.pitch = 3.0; cameraRig.distance = 6.0; cameraRig.ready = false; collected.clear(); document.getElementById('experience').classList.remove('is-playing'); document.getElementById('gameControlsCard').hidden = true; document.getElementById('showControls').setAttribute('aria-expanded', 'false'); document.getElementById('showControls').querySelector('b').textContent = '+'; }
  document.getElementById('exitToGameMenu').addEventListener('click', exitToGameMenu);
  document.getElementById('openGameSettings').addEventListener('click', event => { const panel = document.getElementById('gameSettings'), isOpen = panel.hidden; panel.hidden = !isOpen; event.currentTarget.setAttribute('aria-expanded', String(isOpen)); });
  document.getElementById('lookSensitivity').addEventListener('input', event => { cameraRig.sensitivity = Number(event.target.value); document.getElementById('sensitivityValue').textContent = `${cameraRig.sensitivity.toFixed(1)}x`; });
  document.getElementById('cameraDistance').addEventListener('input', event => { cameraRig.distance = Number(event.target.value); document.getElementById('distanceValue').textContent = cameraRig.distance.toFixed(1); });
  { const sh = document.getElementById('shoulderOffset'); if (sh) sh.addEventListener('input', event => { cameraRig.shoulder = Number(event.target.value); document.getElementById('shoulderValue').textContent = cameraRig.shoulder.toFixed(2); }); }

  function attackSignal() { if (!started || modalOpen) return; const now = performance.now(); player.attackUntil = now + 560; player.attackHitAt = now + 120; player.attackPending = true; }

  // ---------------------------------------------------------------------------
  // LOADER / MENU
  // ---------------------------------------------------------------------------
  function startGame() { if (started) return; started = true; document.getElementById('experience').classList.add('is-playing'); if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); try { canvas.focus({ preventScroll: true }); } catch (e) { try { canvas.focus(); } catch (e2) {} } }
  setTimeout(() => { const status = document.getElementById('loaderStatus'); if (status) status.textContent = 'ARRANGING THE ROOMS'; }, 650);
  setTimeout(() => {
    const loader = document.getElementById('gameLoader'), status = document.getElementById('loaderStatus');
    if (status) status.textContent = 'WORLD READY';
    loader.classList.add('is-ready');
    document.getElementById('menuKicker').textContent = 'YUSUF RAYYAN DANIEL / PORTFOLIO';
    document.getElementById('menuTitle').innerHTML = 'My room,<br><em>my library.</em>';
    document.getElementById('menuCopy').textContent = 'Spawn in my bedroom for the about-me and CV, then walk the cat into the library — four genre rooms of projects. Follow the glowing gems and press E.';
    document.getElementById('loaderProgress').hidden = true;
    document.getElementById('gameMenuActions').hidden = false;
  }, 1850);
  document.getElementById('enterHouse').addEventListener('click', startGame);
  document.getElementById('showControls').addEventListener('click', e => { const panel = document.getElementById('gameControlsCard'), button = e.currentTarget; panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); button.querySelector('b').textContent = panel.hidden ? '+' : '-'; });

  // ---------------------------------------------------------------------------
  // INPUT
  // ---------------------------------------------------------------------------
  canvas.addEventListener('pointerdown', e => { try { canvas.focus({ preventScroll: true }); } catch (err) {} if (!started || e.pointerType !== 'mouse' || e.button !== 0) return; cameraRig.dragging = true; cameraRig.lastX = e.clientX; cameraRig.lastY = e.clientY; cameraRig.downX = e.clientX; cameraRig.downY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!cameraRig.dragging) return; const dx = e.clientX - cameraRig.lastX, dy = e.clientY - cameraRig.lastY; cameraRig.lastX = e.clientX; cameraRig.lastY = e.clientY; cameraRig.yaw -= dx * .007 * cameraRig.sensitivity; cameraRig.pitch = clamp(cameraRig.pitch + dy * .03 * cameraRig.sensitivity, 1.0, 9.0); });
  const stopOrbit = e => { if (!cameraRig.dragging) return; const click = Math.hypot(e.clientX - cameraRig.downX, e.clientY - cameraRig.downY) < 5; cameraRig.dragging = false; if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); if (e.type === 'pointerup' && click) attackSignal(); };
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('pointerup', stopOrbit); canvas.addEventListener('pointercancel', stopOrbit);
  canvas.addEventListener('wheel', e => { if (!started) return; e.preventDefault(); cameraRig.distance = clamp(cameraRig.distance + Math.sign(e.deltaY) * .65, 5, 13); }, { passive: false });
  addEventListener('keydown', e => {
    if (!started && e.key === 'Enter' && document.getElementById('gameLoader').classList.contains('is-ready')) { startGame(); return; }
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; // normalise so Shift/CapsLock can't desync keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k) || 'wasd'.includes(k)) e.preventDefault();
    keys[k] = true;
    if (e.repeat) return;
    if (k === ' ') jump();
    if (k === 'e') modalOpen ? closeModal() : openSignal();
    if (k === 'Escape') { if (modalOpen) closeModal(); else if (started) setPauseMenu(!paused); }
  });
  addEventListener('keyup', e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = false; });
  addEventListener('blur', () => Object.keys(keys).forEach(k => keys[k] = false));
  document.getElementById('closeModal').onclick = closeModal;
  document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  document.querySelectorAll('.touch-controls button').forEach(b => {
    b.addEventListener('pointerdown', e => { e.preventDefault(); const a = b.dataset.action; if (a === 'left') keys.a = true; if (a === 'right') keys.d = true; if (a === 'forward') keys.w = true; if (a === 'back') keys.s = true; if (a === 'jump') jump(); if (a === 'use') openSignal(); if (a === 'attack') attackSignal(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(k => b.addEventListener(k, () => { const a = b.dataset.action; if (a === 'left') keys.a = false; if (a === 'right') keys.d = false; if (a === 'forward') keys.w = false; if (a === 'back') keys.s = false; }));
  });

  // ---------------------------------------------------------------------------
  // RENDER LOOP
  // ---------------------------------------------------------------------------
  let renderStopped = false;
  function frame(t) {
    if (renderStopped) return;
    requestAnimationFrame(frame);
    try {
      const dt = Math.min((t - last) / 1000, .04) || 0; last = t;
      update(dt, t); makeScene(t);
      const data = new Float32Array(held);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      gl.clearColor(.12, .11, .13, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, data.length / 6);
    } catch (error) { renderStopped = true; showRenderError(error); console.error('World render stopped:', error); }
  }
  requestAnimationFrame(frame);
})();
