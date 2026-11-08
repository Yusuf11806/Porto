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
  // PORTFOLIO DATA — every project is a reachable exhibit in the room.
  // ---------------------------------------------------------------------------
  const allProjects = [
    { name: 'WeGoGym', tag: 'PROJECT / 001', year: '2024', description: 'In 2024, my colleagues and I were assigned to create a simple app prototype in Figma. Nicho and I designed WeGoGym, an app where users could log meals, plan gym routines, and watch workout videos from instructors. It was our first app, and although the design had plenty of room to improve, it was an important first step for us. A big thank you to Bernhard, Geronimo, Oliver, and Nicholas Carlen for helping bring the project to life.', tags: ['Figma', 'UI/UX prototype', 'Fitness app', 'Team project'], images: Array.from({ length: 10 }, (_, i) => `../${i + 1}.png`), link: '#', showLink: false, c: [.93, .65, .3] },
    { name: 'ShippDecKk', tag: 'PROJECT / 002', year: '2024', description: 'In 2024, I created ShippDecKk as a solo website project where visitors can browse ships at a range of prices, from affordable options to more premium vessels. I built the site myself using basic HTML, CSS, and JavaScript.', tags: ['HTML', 'CSS', 'JavaScript', 'Solo project'], images: ['../shipdeckk.png'], link: 'https://shipdeckk.vercel.app/', c: [1, .62, .32] },
    { name: 'SmartBaby', tag: 'PROJECT / 003', year: '2024', description: 'In 2024, my colleagues and I created SmartBaby, a prototype app for parents. Families could contact doctors who specialize in baby care, shop for baby products, and have their orders delivered to their homes. This project was my first introduction to business concepts in computer science. Thank you, Bryan, Silva, Patrick, and Ayundini, for helping make it happen. You are amazing.', tags: ['App prototype', 'Baby care', 'E-commerce', 'Team project'], images: Array.from({ length: 5 }, (_, i) => `../${i + 20}.png`), link: '#', showLink: false, c: [.52, .72, 1] },
    { name: 'Face Mask Detector', tag: 'PROJECT / 004', year: '2025', description: 'In 2025, I took my first artificial intelligence course, where I learned foundational concepts such as intelligent agents. For the course project, I built a face mask detector that identifies whether a person is wearing a mask. I prepared a dataset and trained a YOLOv8 model with PyTorch; the trained weights are saved as best.pt.', tags: ['Artificial intelligence', 'Computer vision', 'YOLOv8', 'PyTorch'], images: ['../67.png'], link: 'https://facemask-keav-j342p68sv-yusuf-rayyan-daniel-portofolio.vercel.app/', c: [.25, .62, .95] },
    { name: 'Database HR Analysis', tag: 'PROJECT / 005', year: '2025', description: 'My colleagues and I analyzed an HR database to understand which employees stayed and which left. We cleaned the original dataset and saved a clean version, then analyzed it with Python, pandas, NumPy, Matplotlib, and Seaborn. We also used statistical and machine-learning methods, including Pearson correlation (pearsonr) and chi-squared contingency analysis. Thank you to Richard, Felix, and Filbert for their teamwork and help completing this project.', tags: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'Machine learning'], link: 'https://github.com/Yusuf11806/Analytics-for-HR-Database/blob/main/Code%20-%20Data%20Analytics.ipynb', c: [.68, .48, 1] },
    { name: 'matK Gene Alignment', tag: 'PROJECT / 006', year: '2025', description: 'My colleagues and I compared matK gene DNA sequences from the Venus flytrap and sundew using global and local sequence alignment. We implemented the analysis with Biopython, including the Needleman-Wunsch method for global alignment. Thank you to Filbert, Felix, and Atiqah for their collaboration and help with this project.', tags: ['Bioinformatics', 'Biopython', 'DNA sequence analysis', 'Needleman-Wunsch'], images: ['../69.png'], link: 'https://github.com/Yusuf11806/Global-Alignment-Study', c: [.25, .62, .95] },
    { name: 'BINUS Network (Floors 4-6)', tag: 'PROJECT / 007', year: '2025', description: 'My team and I designed a network system for floors 4 through 6 at BINUS. Using Cisco Packet Tracer, we planned the IP addresses, subnet masks, default gateways, Wi-Fi network, and cable types for the floor network.', tags: ['Cisco Packet Tracer', 'Network design', 'IP addressing', 'Team project'], images: ['../11.jpg', '../12.jpg', '../13.jpg'], link: 'https://github.com/Yusuf11806/binus-network-4-6-floor', c: [.31, .67, .9] },
    { name: 'E-Commerce Analytics Pipeline', tag: 'PROJECT / 008', year: '2025', description: 'In 2025, my colleagues and I built a data engineering pipeline for an e-commerce sales and profit analytics project. We used a Kaggle dataset, cleaned and prepared the data with Pentaho, then created visualizations in Power BI. Thank you to Christian, Filbert, Jovita, Felix, and Richard for your teamwork.', tags: ['Pentaho', 'Power BI', 'Data engineering', 'Data cleaning', 'Team project'], images: ['../pipeline.png'], link: 'https://github.com/Yusuf11806/E-Commerce-Sales-and-Profit-Analytics-Using-Data-Engineering-Pipeline', c: [.36, .68, .91] },
    { name: 'Video Game Sales Analytics', tag: 'PROJECT / 009', year: '2025', description: 'I used Power BI to analyze video game sales across genres, release date categories, and regions, as well as global sales. The visualizations make it easier to compare how sales vary across these categories.', tags: ['Power BI', 'Data visualization', 'Video game sales', 'Regional analysis'], images: ['../DataVis.png'], link: 'https://github.com/Yusuf11806/Video-Game-Sales', c: [.69, .48, .91] }
  ];

  // Room bounds (single self-contained bedroom gallery).
  const ROOM = { minX: -13.35, maxX: 13.35, minZ: 17.35, maxZ: 40.65, floorY: 0, ceilY: 7.8 };

  // Place each project as a painting on a wall. `wall` tells which surface it hangs on,
  // `pos` is the position along that wall; x/y/z are the player-interaction anchor point.
  // Back wall (z~17.3) faces +z toward the entering player. Right wall (x~13.4) faces -x.
  const EXHIBIT_Y = 4.2;
  const backWallZ = 17.62, backArtZ = 17.42;         // painting hangs just in front of z=17 wall
  const frontWallZ = 40.38, frontArtZ = 40.58;        // front wall z=41
  // Positions chosen so every painting has clear floor in front of it (no furniture
  // blocking the walk-up) and no two frames overlap. Validated against the furniture layout.
  const placements = [
    // Back wall — the wall you face when you walk in.
    { wall: 'back', along: -8 }, { wall: 'back', along: -5 }, { wall: 'back', along: -2 }, { wall: 'back', along: 8 }, { wall: 'back', along: 10.8 },
    // Front wall — four across the clear centre span.
    { wall: 'front', along: -6 }, { wall: 'front', along: -2 }, { wall: 'front', along: 2 }, { wall: 'front', along: 6 }
  ];
  allProjects.forEach((p, i) => {
    const pl = placements[i];
    if (pl.wall === 'back') { p.wall = 'back'; p.x = pl.along; p.y = EXHIBIT_Y; p.z = backWallZ; p.angle = 0; }
    else { p.wall = 'front'; p.x = pl.along; p.y = EXHIBIT_Y; p.z = frontWallZ; p.angle = Math.PI; }
  });
  const projects = allProjects;

  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const keys = {}, collected = new Set();
  let nearby = -1, nearbySpecial = '', last = 0, toastTimer, modalOpen = false, started = false, paused = false, galleryIndex = 0;

  // ---------------------------------------------------------------------------
  // FURNITURE COLLISION BLOCKS (bedroom layout)
  // ---------------------------------------------------------------------------
  const furnitureBlocks = [
    { x: 10.6, z: 37.25, hx: 3.1, hz: 2.6, top: 1.0 },   // bed
    { x: -11.7, z: 22.7, hx: 1.7, hz: 1.5, top: 5.2 },   // wardrobe
    { x: 3.2, z: 19.8, hx: 1.9, hz: .85, top: 1.7 },     // tv dresser
    { x: 3.2, z: 25.8, hx: 1.05, hz: 1.0, top: 1.5 },    // reading chair
    { x: -11.5, z: 19.6, hx: .6, hz: .6, top: .9 },      // side table
    { x: 10.6, z: 31.75, hx: 1.95, hz: .6, top: .9 },    // bench
    { x: -11.3, z: 39.15, hx: 2.2, hz: .75, top: 1.9 },  // desk
    { x: -11.3, z: 36.35, hx: .75, hz: .75, top: 1.2 },  // desk chair
    { x: 9.45, z: 27.4, hx: .7, hz: .7, top: 2.4 }       // bedside lamp
  ];

  const PLAYER_R = .42;
  function insideRoom(x, z) { return x >= ROOM.minX && x <= ROOM.maxX && z >= ROOM.minZ && z <= ROOM.maxZ; }
  function furniturePenetration(x, z, y) { let depth = 0; for (const o of furnitureBlocks) { const ox = o.hx + PLAYER_R - Math.abs(x - o.x), oz = o.hz + PLAYER_R - Math.abs(z - o.z); if (y < o.top - .08 && ox > 0 && oz > 0) depth += Math.min(ox, oz); } return depth; }
  function hitsFurniture(x, z, y) { return furniturePenetration(x, z, y) > .001; }
  function canMoveTo(fromX, fromZ, toX, toZ, y) { if (!insideRoom(toX, toZ)) return false; for (const o of furnitureBlocks) { if (y >= o.top - .08) continue; const overlap = (x, z) => Math.max(0, o.hx + PLAYER_R - Math.abs(x - o.x)) * Math.max(0, o.hz + PLAYER_R - Math.abs(z - o.z)); if (overlap(toX, toZ) > .0001 && overlap(toX, toZ) > overlap(fromX, fromZ) + .0001) return false; } return true; }
  function recoverPlayer() { if (insideRoom(player.x, player.z) && !hitsFurniture(player.x, player.z, player.y)) return; for (let r = .2; r <= 8; r += .2) { for (let n = 0; n < 24; n++) { const a = n * Math.PI / 12, x = player.x + Math.cos(a) * r, z = player.z + Math.sin(a) * r; if (insideRoom(x, z) && !hitsFurniture(x, z, player.y)) { player.x = x; player.z = z; player.vx = 0; player.vz = 0; return; } } } }
  function furnitureLanding(x, z, fromY, toY) { if (player.vy >= 0) return 0; let top = 0; for (const o of furnitureBlocks) { if (o.top > top && fromY >= o.top && toY <= o.top && Math.abs(x - o.x) < o.hx && Math.abs(z - o.z) < o.hz) top = o.top; } return top; }

  // face/yaw 0 => cat looks toward -z (the main back gallery wall), camera sits behind at +z.
  const player = { x: 0, y: 0, z: 31, vx: 0, vy: 0, vz: 0, face: 0, attackUntil: 0, attackHitAt: 0, attackPending: false };
  const cameraRig = { x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0, yaw: 0, pitch: 4.1, distance: 7.2, sensitivity: 1, dragging: false, lastX: 0, lastY: 0, ready: false };

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
  function prism(points, zFront, zBack, color) { for (let i = 0; i < points.length; i++) { const p = points[i], q = points[(i + 1) % points.length]; quad([p[0], p[1], zFront], [q[0], q[1], zFront], [q[0], q[1], zBack], [p[0], p[1], zBack], color, .75); } const front = points[0]; for (let i = 1; i < points.length - 1; i++) tri([front[0], front[1], zFront], [points[i][0], points[i][1], zFront], [points[i + 1][0], points[i + 1][1], zFront], color, 1.15); }
  function ring(cx, cy, cz, r, color, time) { const points = []; for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI * 2 + time; points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, cz]); } for (let i = 0; i < 32; i++) quad(points[i], points[i + 1], [points[i + 1][0], points[i + 1][1], cz + .12], [points[i][0], points[i][1], cz + .12], color, .95); }

  // A framed painting that faces along -z (angle 0) or +z (angle PI).
  function galleryArt(x, y, z, w, h, angle, index, interactive = false) {
    const palette = [[0x405b69, 0xe7aa65, 0xe9d7b7], [0x604c7c, 0x9de5dc, 0xe8b77d], [0x344e4b, 0xef9b79, 0xf4dca9], [0x4d536d, 0xd3a2e8, 0xf4c871], [0x6d493f, 0x9ed8d0, 0xf4e3c4], [0x343f5d, 0xffb86b, 0x9de5dc], [0x62534a, 0xec8d9d, 0xe5cb91], [0x3e594e, 0xd8b4f4, 0xffd27d], [0x554665, 0xf4a76c, 0xb6e7db]][index % 9];
    const frame = interactive ? 0xc59b64 : 0x85775f, normal = .19, c = Math.cos(angle), s = Math.sin(angle);
    const part = (u, v, d, sx, sy, sz, color) => box(x + u * c + d * s, y + v, z - u * s + d * c, sx, sy, sz, color, angle);
    part(0, 0, 0, w, h, .3, frame); part(0, 0, normal, w - .22, h - .22, .08, 0xe8dfce); part(0, 0, normal + .055, w - .48, h - .48, .04, palette[0]);
    const face = (u, v, sx, sy, color) => part(u, v, normal + .09, sx, sy, .035, color);
    face(-w * .19, -h * .22, w * .52, .11, palette[1]); face(w * .19, h * .08, w * .25, .2, palette[2]); face(-w * .08, h * .24, w * .12, .12, palette[2]); face(w * .29, -h * .25, w * .09, .09, palette[1]);
    if (index % 3 === 0) face(-w * .24, h * .06, .1, h * .5, palette[2]);
    if (interactive) { part(0, -h * .5 - .25, .02, w * .56, .22, .1, 0x252631); part(0, -h * .5 - .25, .09, w * .28, .035, .03, palette[1]); }
  }
  // A seven-segment year plaque mounted under a painting.
  function yearPlaque(x, y, z, year, angle = 0) { const c = Math.cos(angle), s = Math.sin(angle), stamp = (dx, dy, dz, sx, sy, sz, color) => box(x + dx * c + dz * s, y + dy, z - dx * s + dz * c, sx, sy, sz, color, angle); stamp(0, 0, 0, 1.42, .52, .12, 0x353641); const segments = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgecd', 7: 'abc', 8: 'abcdefg', 9: 'abfgcd' }, digitW = .24, start = -.48; for (let i = 0; i < 4; i++) { const cx = start + i * digitW, pattern = segments[Number(year[i])] || segments[0], horizontal = (name, dx, dy) => { if (pattern.includes(name)) stamp(cx + dx, dy, .09, .13, .035, .035, 0xffd895); }, vertical = (name, dx, dy) => { if (pattern.includes(name)) stamp(cx + dx, dy, .09, .035, .12, .035, 0xffd895); }; horizontal('a', 0, .17); horizontal('g', 0, 0); horizontal('d', 0, -.17); vertical('f', -.075, .085); vertical('b', .075, .085); vertical('e', -.075, -.085); vertical('c', .075, -.085); } }

  // ---------------------------------------------------------------------------
  // THE COMPANION CAT (third-person player character)
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
  // THE ROOM
  // ---------------------------------------------------------------------------
  function drawRoom(t) {
    // Shift the whole static bedroom to room coordinates (centred near z=29).
    box(0, -.45, 29, 28, .6, 24, 0xa9825d); box(0, 9.5, 29, 28, .45, 24, 0x443d3a);
    box(-14, 4.5, 29, .6, 9.5, 24, 0x8c7669); box(14, 4.5, 29, .6, 9.5, 24, 0x8c7669);
    for (const x of [-12, 0, 12]) box(x, 9.18, 29, .18, .18, 23.6, 0x927655);
    box(0, -.132, 30, 7.4, .036, 5.4, 0x71816e); // rug
    box(0, 4.5, 17, 28, 9.5, .6, 0x647b8b);  // back wall (the gallery wall you face on entry)
    box(0, 4.5, 41, 28, 9.5, .6, 0x927783);  // front wall
    // Wainscoting + trim.
    box(0, .72, 17.34, 27.27, 1.45, .1, 0x684b3d); box(0, .72, 40.66, 27.27, 1.45, .1, 0x684b3d); box(-13.64, .72, 29, .1, 1.45, 23.5, 0x684b3d); box(13.64, .72, 29, .1, 1.45, 23.5, 0x684b3d);
    box(0, 1.48, 17.27, 27.4, .12, .18, 0xc49a68); box(0, 1.48, 40.73, 27.4, .12, .18, 0xc49a68); box(-13.73, 1.48, 29, .18, .12, 23.6, 0xc49a68); box(13.73, 1.48, 29, .18, .12, 23.6, 0xc49a68);
    for (let z = 18; z < 40; z += 2.5) box(0, -.127, z, 27, .012, .03, 0xc1b6a4);
    for (let x = -12; x <= 12; x += 4) box(x, -.127, 29, .025, .012, 23, 0xc1b6a4);
    box(-13.58, .04, 29, .18, .22, 23.5, 0x9a7958); box(13.58, .04, 29, .18, .22, 23.5, 0x9a7958); box(0, .04, 40.58, 27.4, .22, .16, 0x9a7958);
    // Bed.
    for (const x of [7.85, 13.35]) for (const z of [35.15, 39.35]) box(x, .04, z, .42, .48, .42, 0x76513c);
    box(10.6, .28, 37.25, 6, .55, 4.8, 0x684b42); box(10.6, .72, 37.25, 5.8, .46, 4.6, 0xe8d8bf);
    box(10.6, .94, 36.8, 5.55, .24, 3.27, 0xe8c9a8); box(10.6, 1.075, 35.3, 5.55, .055, .12, 0xd29b7c);
    for (const x of [8.15, 10.6, 12.45]) box(x, 1.09, 36.3, .08, .027, 2.27, 0xf4e8d3);
    box(10.6, 1.04, 35.7, 5.1, .16, 1.35, 0x6583a7);
    box(9.1, 1.18, 38.75, 1.8, .27, 1.1, 0xf7e7d0); box(12.1, 1.18, 38.75, 1.8, .27, 1.1, 0xf7e7d0);
    box(10.6, 1.02, 40.45, 5.5, 1.85, .22, 0x795a48); for (let x = 8; x <= 13.2; x += .65) box(x, 1.06, 40.31, .12, 1.55, .12, 0xc4935e); box(10.6, 2.02, 40.45, 5.5, .2, .28, 0xc4935e);
    box(7.85, .38, 34.95, .24, .72, .24, 0x795a48); box(13.35, .38, 34.95, .24, .72, .24, 0x795a48);
    // Wardrobe.
    box(-11.7, 2.5, 22.7, 3.1, 5, 2.7, 0x8b674f); box(-11.7, 2.5, 21.3, 2.9, 4.8, .13, 0xb68b66); box(-11.7, 2.5, 21.18, .08, 4.3, .08, 0x57483c); box(-11.7, 2.5, 21.16, .13, .18, .08, 0xe5c893);
    // TV dresser.
    box(3.2, .67, 19.8, 3.6, 1.64, 1.45, 0x8e684d); box(3.2, 1.51, 20.52, 3.72, .16, 1.6, 0xb88d66); for (const y of [.33, .75, 1.15]) { box(3.2, y, 20.555, 3.25, .027, .027, 0x624b3b); for (const x of [2.25, 3.2, 4.15]) box(x, y + .14, 20.6, .12, .12, .08, 0xe7c58c); } box(3.2, 1.67, 20.55, .22, .2, .12, 0x33333a); box(3.2, 2.43, 20.58, 2.5, 1.3, .14, 0x24252b); box(3.2, 2.43, 20.48, 2.24, 1.04, .07, 0x5b7880); box(3.2, 2.43, 20.42, 1.88, .72, .025, 0x66818a); box(4.16, 1.95, 20.42, .08, .08, .03, 0xe4c783);
    // Reading chair + bench.
    box(3.2, .32, 25.8, 1.8, .34, 1.55, 0x9b5f58); box(3.2, .94, 26.42, 1.8, 1.08, .3, 0xb87970); box(2.28, .65, 25.8, .24, .7, 1.35, 0x916052); box(4.12, .65, 25.8, .24, .7, 1.35, 0x916052); for (const x of [2.52, 3.88]) for (const z of [25.25, 26.32]) box(x, .075, z, .12, .45, .12, 0x684b42);
    box(-11.5, .34, 19.6, .92, .68, .92, 0x9d7659); box(-11.5, .7, 19.6, 1, .12, 1, 0xc49b72); box(-11.65, .92, 19.6, .5, .16, .5, 0xe0c291);
    box(10.6, .38, 31.75, 3.6, .58, .82, 0x79563f); box(10.6, .78, 31.75, 3.75, .18, .9, 0xc08d67); box(9, .3, 31.75, .16, .6, .75, 0x694b3a); box(12.2, .3, 31.75, .16, .6, .75, 0x694b3a);
    // Computer desk.
    box(-11.3, .98, 39.15, 4.2, .22, 1.25, 0x76533f); box(-12.8, .36, 39.15, .2, 1.02, .2, 0x72553e); box(-9.8, .36, 39.15, .2, 1.02, .2, 0x72553e);
    box(-11.3, 1.8, 38.72, 2.05, 1.2, .12, 0x24252b); box(-11.3, 1.8, 38.64, 1.8, .94, .055, 0x79aeb4); box(-11.3, 1.35, 38.98, .16, .42, .16, 0x333741); box(-11.3, 1.13, 38.95, 1.2, .08, .62, 0x333741);
    box(-11.3, .42, 36.35, 1.05, .18, .9, 0x8b684e); box(-11.3, .91, 36.72, 1.02, .82, .18, 0x765743); box(-11.3, .26, 36.35, .14, .14, .14, 0x34333a); box(-11.3, -.1, 36.35, .72, .1, .72, 0x34333a); for (const x of [-11.72, -10.88]) for (const z of [36.02, 36.68]) box(x, .095, z, .09, .49, .09, 0x624834);
    // Bedside lamp + window.
    box(9.45, .48, 27.4, 1.05, .92, .95, 0x8b674f); box(9.45, 1.12, 27.4, .72, .12, .66, 0xc6a37c); box(9.45, 1.57, 27.4, .12, .82, .12, 0x9a7958); box(9.45, 2.08, 27.4, .62, .38, .62, 0xffd58b);
    box(13.48, 5.45, 26.8, .12, 3.2, 5.2, 0x9bd8e7); box(13.34, 5.45, 24.18, .2, 3.55, .2, 0xc89c69); box(13.34, 5.45, 29.42, .2, 3.55, .2, 0xc89c69); box(13.34, 7.14, 26.8, .2, .18, 5.4, 0xc89c69); box(13.34, 3.76, 26.8, .2, .18, 5.4, 0xc89c69); box(13.28, 5.45, 26.8, .22, .12, 5.1, 0xf0d4a2); box(13.25, 5.45, 26.8, .23, 3.25, .12, 0xf0d4a2); box(13.16, 5.45, 23.75, .3, 3.65, .65, 0x668aa4); box(13.16, 5.45, 29.85, .3, 3.65, .65, 0x668aa4);
    // Pixel self-portrait (interactable profile) on the left wall.
    box(-13.58, 5.1, 30, .18, 3.2, 2.55, 0x735841); box(-13.43, 5.1, 30, .12, 2.96, 2.31, 0xe4d2ad);
    if (profilePixels) { const cell = .08; for (let py = 0; py < 32; py++) for (let px = 0; px < 24; px++) { const o = (py * 24 + px) * 4, a = profilePixels[o + 3] / 255; if (a < .1) continue; const color = (profilePixels[o] << 16) | (profilePixels[o + 1] << 8) | profilePixels[o + 2]; quad([-13.28, 6.34 - py * cell, 29.04 + px * cell], [-13.28, 6.34 - py * cell, 29.04 + (px + 1) * cell], [-13.28, 6.34 - (py + 1) * cell, 29.04 + (px + 1) * cell], [-13.28, 6.34 - (py + 1) * cell, 29.04 + px * cell], color); } }
    // Ceiling light.
    box(-.7, 8.55, 29, .27, .15, .27, 0xffe3a8); box(-.7, 8.4, 29, .18, .08, .18, 0xfff5d8);

    // -------------------------------------------------------------------------
    // PROJECT EXHIBITS — all nine projects as paintings, with year plaques.
    // -------------------------------------------------------------------------
    projects.forEach((p, i) => {
      if (p.wall === 'back') {
        galleryArt(p.x, EXHIBIT_Y, backArtZ, 2.6, 2.0, 0, i, true);
        yearPlaque(p.x, EXHIBIT_Y + 1.55, 17.35, p.year, 0);
      } else {
        galleryArt(p.x, EXHIBIT_Y, frontArtZ, 2.6, 2.0, Math.PI, i, true);
        yearPlaque(p.x, EXHIBIT_Y + 1.55, 40.65, p.year, Math.PI);
      }
    });

    // Glowing guide markers (small floating diamonds) above each exhibit.
    projects.forEach(p => { const gy = EXHIBIT_Y + 1.6 + Math.sin(t * .002 + p.x) * .08, gz = p.wall === 'back' ? 17.9 : 40.1; prism([[-.14, gy], [0, gy + .22], [.14, gy], [0, gy - .22]], gz - .05, gz + .05, 0x79e99a); });
  }

  function makeScene(t) { held.length = 0; drawRoom(t); drawCat(t); }

  // ---------------------------------------------------------------------------
  // CAMERA MATH
  // ---------------------------------------------------------------------------
  function perspective(fov, aspect, near, far) { const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far); return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]); }
  function lookAt(eye, center) { let zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2], l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l; let xx = zz, xy = 0, xz = -zx; l = Math.hypot(xx, xz) || 1; xx /= l; xz /= l; const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx; return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * eye[0] + xy * eye[1] + xz * eye[2]), -(yx * eye[0] + yy * eye[1] + yz * eye[2]), -(zx * eye[0] + zy * eye[1] + zz * eye[2]), 1]); }
  function resize() { const d = 3, w = Math.max(320, Math.floor(innerWidth / d)), h = Math.max(180, Math.floor(innerHeight / d)); canvas.width = w; canvas.height = h; canvas.style.width = '100%'; canvas.style.height = '100%'; gl.viewport(0, 0, w, h); gl.uniformMatrix4fv(projLoc, false, perspective(58 * Math.PI / 180, w / h, .1, 130)); }
  addEventListener('resize', resize); resize();

  function showToast(s) { const e = document.getElementById('toast'); e.textContent = s; e.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => e.classList.remove('show'), 1450); }

  function jump() { const onFloor = player.y <= .08, onFurniture = furnitureBlocks.some(o => Math.abs(player.y - o.top) < .08 && Math.abs(player.x - o.x) < o.hx && Math.abs(player.z - o.z) < o.hz); if (!onFloor && !onFurniture) return; player.vy = 15.5; }

  // ---------------------------------------------------------------------------
  // GAME UPDATE
  // ---------------------------------------------------------------------------
  function update(dt, t) {
    const smooth = 1 - Math.exp(-6.5 * dt);
    if (!started) {
      if (!cameraRig.ready) { cameraRig.x = player.x - Math.sin(cameraRig.yaw) * cameraRig.distance; cameraRig.y = player.y + cameraRig.pitch; cameraRig.z = player.z + Math.cos(cameraRig.yaw) * cameraRig.distance; cameraRig.tx = player.x; cameraRig.ty = player.y + 1.15; cameraRig.tz = player.z - 2.5; cameraRig.ready = true; }
      gl.uniformMatrix4fv(viewLoc, false, lookAt([cameraRig.x, cameraRig.y, cameraRig.z], [cameraRig.tx, cameraRig.ty, cameraRig.tz]));
      return;
    }
    if (paused) return;
    recoverPlayer();

    let dx = Number(Boolean(keys.d || keys.D || keys.ArrowRight)) - Number(Boolean(keys.a || keys.A || keys.ArrowLeft));
    let dz = Number(Boolean(keys.s || keys.S || keys.ArrowDown)) - Number(Boolean(keys.w || keys.W || keys.ArrowUp));
    if (dx && dz) { dx *= .707; dz *= .707; }
    const forward = -dz;
    const moveX = dx * Math.cos(cameraRig.yaw) + forward * Math.sin(cameraRig.yaw);
    const moveZ = dx * Math.sin(cameraRig.yaw) - forward * Math.cos(cameraRig.yaw);
    const sprint = keys.Shift ? 1.6 : 1, speed = 7.2 * sprint, blend = 1 - Math.exp(-13 * dt);
    player.vx += (moveX * speed - player.vx) * blend;
    player.vz += (moveZ * speed - player.vz) * blend;
    player.vy -= 32 * dt; // gravity
    player.vx = clamp(player.vx, -24, 24); player.vy = clamp(player.vy, -30, 30); player.vz = clamp(player.vz, -24, 24);

    const previousX = player.x, previousY = player.y, previousZ = player.z;
    const nextX = clamp(player.x + player.vx * dt, ROOM.minX, ROOM.maxX);
    const nextZ = clamp(player.z + player.vz * dt, ROOM.minZ, ROOM.maxZ);
    let nextY = clamp(player.y + player.vy * dt, 0, ROOM.ceilY), landing = furnitureLanding(nextX, nextZ, previousY, nextY);
    if (landing) { nextY = landing; player.vy = 0; }
    player.y = nextY;
    if (player.y <= 0) { player.y = 0; if (player.vy < 0) player.vy = 0; }
    if (canMoveTo(player.x, previousZ, nextX, previousZ, player.y)) player.x = nextX; else player.vx = 0;
    if (canMoveTo(player.x, player.z, player.x, nextZ, player.y)) player.z = nextZ; else player.vz = 0;

    const hasMove = Math.hypot(moveX, moveZ) > .08, wanted = hasMove ? Math.atan2(-moveX, -moveZ) : player.face;
    const turn = Math.atan2(Math.sin(wanted - player.face), Math.cos(wanted - player.face));
    player.face += turn * (1 - Math.exp(-(hasMove ? 10 : 7) * dt));

    const cameraHeight = cameraRig.pitch;
    const eye = [player.x - Math.sin(cameraRig.yaw) * cameraRig.distance, player.y + cameraHeight, player.z + Math.cos(cameraRig.yaw) * cameraRig.distance];
    const target = [player.x + Math.sin(cameraRig.yaw) * 1.6, player.y + 1.15, player.z - Math.cos(cameraRig.yaw) * 2.5];
    cameraRig.x += (eye[0] - cameraRig.x) * smooth; cameraRig.y += (eye[1] - cameraRig.y) * smooth; cameraRig.z += (eye[2] - cameraRig.z) * smooth;
    cameraRig.x = clamp(cameraRig.x, ROOM.minX + .25, ROOM.maxX - .25); cameraRig.y = clamp(cameraRig.y, .65, 9.4); cameraRig.z = clamp(cameraRig.z, ROOM.minZ + .25, ROOM.maxZ - .25);
    const aim = 1 - Math.exp(-8 * dt);
    cameraRig.tx += (target[0] - cameraRig.tx) * aim; cameraRig.ty += (target[1] - cameraRig.ty) * aim; cameraRig.tz += (target[2] - cameraRig.tz) * aim;
    gl.uniformMatrix4fv(viewLoc, false, lookAt([cameraRig.x, cameraRig.y, cameraRig.z], [cameraRig.tx, cameraRig.ty, cameraRig.tz]));

    // Proximity detection — nearest project painting or the profile portrait.
    nearby = -1; nearbySpecial = '';
    let closest = 4.4;
    projects.forEach((p, i) => { const d = Math.hypot(player.x - p.x, player.y + 1.1 - p.y, player.z - p.z); if (d < closest) { closest = d; nearby = i; } });
    const profileDist = Math.hypot(player.x - (-13.2), player.y + 1 - 5.1, player.z - 30);
    if (profileDist < closest) { closest = profileDist; nearby = -1; nearbySpecial = 'profile'; }

    const hint = document.getElementById('interactHint');
    if (hint) { const prompt = nearbySpecial === 'profile' ? 'CLICK OR PRESS E  /  ABOUT ME' : nearby >= 0 ? 'CLICK OR PRESS E  /  VIEW PROJECT' : ''; hint.textContent = prompt; hint.classList.toggle('visible', Boolean(prompt)); }
    if (player.attackPending && t >= player.attackHitAt) { player.attackPending = false; if (nearby >= 0 || nearbySpecial) openSignal(); }

    document.getElementById('zoneLabel').textContent = nearby >= 0 ? `EXHIBIT / ${projects[nearby].tag}` : nearbySpecial === 'profile' ? 'ABOUT / YUSUF RAYYAN DANIEL' : 'BEDROOM GALLERY';
    document.getElementById('coord').textContent = `${String(Math.round(player.x + 14)).padStart(2, '0')} : ${String(Math.round(player.z - 17)).padStart(2, '0')}`;
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
    document.getElementById('galleryImage').hidden = false;
    document.getElementById('friendPhotoEmpty').hidden = true;
    document.getElementById('galleryPrevious').hidden = false;
    document.getElementById('galleryNext').hidden = false;
    projectLink.hidden = true; extra.hidden = true;

    if (nearbySpecial === 'profile') {
      document.getElementById('modalEyebrow').textContent = 'ABOUT / YUSUF RAYYAN DANIEL';
      document.getElementById('modalTitle').textContent = 'Yusuf Rayyan Daniel';
      document.getElementById('modalCopy').textContent = 'Computer Science student at BINUS University @ Alam Sutera (born 11 August 2006). This room is my portfolio — walk the cat up to each framed artwork and press E to open the project behind it.';
      document.getElementById('modalTags').innerHTML = ['BINUS UNIVERSITY', 'COMPUTER SCIENCE', 'BORN 11 AUGUST 2006'].map(x => `<span>${x}</span>`).join('');
      gallery.hidden = !profilePixelUrl; gallery.classList.add('pixel-profile', 'single-image');
      document.getElementById('galleryPrevious').hidden = true; document.getElementById('galleryNext').hidden = true;
      if (profilePixelUrl) { document.getElementById('galleryImage').src = profilePixelUrl; document.getElementById('galleryImage').alt = 'Pixelated portrait of Yusuf Rayyan Daniel'; document.getElementById('galleryCount').textContent = 'PROFILE PHOTO'; }
      extra.hidden = false;
      document.getElementById('modalLinkedIn').href = 'https://www.linkedin.com/in/yusuf-rayyan-daniel-936a35318';
      document.getElementById('modalGithub').href = 'https://github.com/Yusuf11806';
      openModal();
      return;
    }

    if (nearby < 0) { showToast('MOVE CLOSER TO AN ARTWORK'); return; }
    const p = projects[nearby];
    document.getElementById('modalEyebrow').textContent = `${p.year} / ${p.tag}`;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalCopy').textContent = p.description;
    document.getElementById('modalTags').innerHTML = p.tags.map(x => `<span>${x}</span>`).join('');
    gallery.hidden = !p.images?.length;
    if (p.images?.length) { galleryIndex = 0; const single = p.images.length === 1; gallery.classList.toggle('single-image', single); document.getElementById('galleryPrevious').hidden = single; document.getElementById('galleryNext').hidden = single; showGalleryImage(p.images); }
    projectLink.href = p.link || '#';
    projectLink.hidden = p.showLink === false || !p.link || p.link === '#';
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
  function exitToGameMenu() { closeModal(); setPauseMenu(false); started = false; player.x = 0; player.y = 0; player.z = 31; player.vx = 0; player.vy = 0; player.vz = 0; player.face = 0; player.attackPending = false; cameraRig.yaw = 0; cameraRig.pitch = 4.1; cameraRig.ready = false; collected.clear(); document.getElementById('experience').classList.remove('is-playing'); document.getElementById('gameControlsCard').hidden = true; document.getElementById('showControls').setAttribute('aria-expanded', 'false'); document.getElementById('showControls').querySelector('b').textContent = '+'; }
  document.getElementById('exitToGameMenu').addEventListener('click', exitToGameMenu);
  document.getElementById('openGameSettings').addEventListener('click', event => { const panel = document.getElementById('gameSettings'), isOpen = panel.hidden; panel.hidden = !isOpen; event.currentTarget.setAttribute('aria-expanded', String(isOpen)); });
  document.getElementById('lookSensitivity').addEventListener('input', event => { cameraRig.sensitivity = Number(event.target.value); document.getElementById('sensitivityValue').textContent = `${cameraRig.sensitivity.toFixed(1)}x`; });
  document.getElementById('cameraDistance').addEventListener('input', event => { cameraRig.distance = Number(event.target.value); document.getElementById('distanceValue').textContent = cameraRig.distance.toFixed(1); });

  function attackSignal() { if (!started || modalOpen) return; const now = performance.now(); player.attackUntil = now + 560; player.attackHitAt = now + 120; player.attackPending = true; }

  // ---------------------------------------------------------------------------
  // LOADER / MENU
  // ---------------------------------------------------------------------------
  function startGame() { if (started) return; started = true; document.getElementById('experience').classList.add('is-playing'); }
  setTimeout(() => { const status = document.getElementById('loaderStatus'); if (status) status.textContent = 'HANGING THE ART'; }, 650);
  setTimeout(() => {
    const loader = document.getElementById('gameLoader'), status = document.getElementById('loaderStatus');
    if (status) status.textContent = 'GALLERY READY';
    loader.classList.add('is-ready');
    document.getElementById('menuKicker').textContent = 'YUSUF RAYYAN DANIEL / PORTFOLIO';
    document.getElementById('menuTitle').innerHTML = 'A room of<br><em>my own.</em>';
    document.getElementById('menuCopy').textContent = 'Play as the cat and explore my bedroom gallery. Nine framed artworks, one per project — walk up and press E to open each.';
    document.getElementById('loaderProgress').hidden = true;
    document.getElementById('gameMenuActions').hidden = false;
  }, 1850);
  document.getElementById('enterHouse').addEventListener('click', startGame);
  document.getElementById('showControls').addEventListener('click', e => { const panel = document.getElementById('gameControlsCard'), button = e.currentTarget; panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); button.querySelector('b').textContent = panel.hidden ? '+' : '-'; });

  // ---------------------------------------------------------------------------
  // INPUT
  // ---------------------------------------------------------------------------
  canvas.addEventListener('pointerdown', e => { if (!started || e.pointerType !== 'mouse' || e.button !== 0) return; cameraRig.dragging = true; cameraRig.lastX = e.clientX; cameraRig.lastY = e.clientY; cameraRig.downX = e.clientX; cameraRig.downY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!cameraRig.dragging) return; const dx = e.clientX - cameraRig.lastX, dy = e.clientY - cameraRig.lastY; cameraRig.lastX = e.clientX; cameraRig.lastY = e.clientY; cameraRig.yaw -= dx * .006 * cameraRig.sensitivity; cameraRig.pitch = clamp(cameraRig.pitch + dy * .025 * cameraRig.sensitivity, 2.2, 8.2); });
  const stopOrbit = e => { if (!cameraRig.dragging) return; const click = Math.hypot(e.clientX - cameraRig.downX, e.clientY - cameraRig.downY) < 5; cameraRig.dragging = false; if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); if (e.type === 'pointerup' && click) attackSignal(); };
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('pointerup', stopOrbit); canvas.addEventListener('pointercancel', stopOrbit);
  canvas.addEventListener('wheel', e => { if (!started) return; e.preventDefault(); cameraRig.distance = clamp(cameraRig.distance + Math.sign(e.deltaY) * .65, 5, 13); }, { passive: false });
  addEventListener('keydown', e => {
    if (!started && e.key === 'Enter' && document.getElementById('gameLoader').classList.contains('is-ready')) { startGame(); return; }
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) e.preventDefault();
    keys[e.key] = true;
    if (e.repeat) return;
    if (e.key === ' ') jump();
    if (e.key.toLowerCase() === 'e') modalOpen ? closeModal() : openSignal();
    if (e.key === 'Escape') { if (modalOpen) closeModal(); else if (started) setPauseMenu(!paused); }
  });
  addEventListener('keyup', e => keys[e.key] = false);
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
      gl.clearColor(.56, .73, .88, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, data.length / 6);
    } catch (error) { renderStopped = true; showRenderError(error); console.error('Gallery render stopped:', error); }
  }
  requestAnimationFrame(frame);
})();
