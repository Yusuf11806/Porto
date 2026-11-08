(() => {
  const canvas = document.getElementById('world');
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const projects = [
    {
      name: 'Database HR Analysis', year: '2025', tag: 'PROJECT / 005',
      description: 'My colleagues and I analyzed an HR database to understand which employees stayed and which left. We cleaned the original dataset and saved a clean version, then analyzed it with Python, pandas, NumPy, Matplotlib, and Seaborn. We also used statistical and machine-learning methods, including Pearson correlation and chi-squared contingency analysis. Thank you to Richard, Felix, and Filbert for their teamwork.',
      tags: ['Python', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy'],
      link: 'https://github.com/Yusuf11806/Analytics-for-HR-Database/blob/main/Code%20-%20Data%20Analytics.ipynb',
      color: '#aa8be9', cover: null, x: 230
    },
    {
      name: 'E-Commerce Sales and Profit Analytics', year: '2025', tag: 'PROJECT / 008',
      description: 'In 2025, my colleagues and I built a data engineering pipeline for e-commerce sales and profit analytics. We used a Kaggle dataset, cleaned and prepared the data with Pentaho, then created visualizations in Power BI. Thank you to Christian, Filbert, Jovita, Felix, and Richard for your teamwork.',
      tags: ['Pentaho', 'Power BI', 'Data engineering', 'Data cleaning'],
      link: 'https://github.com/Yusuf11806/E-Commerce-Sales-and-Profit-Analytics-Using-Data-Engineering-Pipeline',
      color: '#60b7d5', cover: '../pipeline.png', x: 550
    },
    {
      name: 'Video Game Sales Analytics', year: '2025', tag: 'PROJECT / 009',
      description: 'I used Power BI to analyze video game sales across genres, release date categories, regions, and global sales. The visualizations make it easier to compare how sales vary across these categories.',
      tags: ['Power BI', 'Data visualization', 'Video game sales', 'Regional analysis'],
      link: 'https://github.com/Yusuf11806/Video-Game-Sales',
      color: '#f0aa62', cover: '../DataVis.png', x: 870
    }
  ];
  const profileImage = new Image(); profileImage.src = '../image0.jpg';
  const W = 960, H = 540, FLOOR = 446, CEILING = 74, WORLD_END = 2070;
  const player = { x: 1845, y: FLOOR, vy: 0, face: -1, moving: false, attacking: 0, grounded: true };
  const keys = Object.create(null);
  let cameraX = 1060, started = false, paused = false, modalOpen = false, doorOpen = false, active = null, last = 0, time = 0, walkPhase = 0, galleryIndex = 0;
  const covers = new Map();
  for (const p of projects) {
    if (p.cover) { const im = new Image(); im.src = p.cover; covers.set(p.name, im); }
  }
  const floorLine = (x, y, w, color, h = 4) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), h); };
  const block = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const text = (value, x, y, color = '#e8dfcf', size = 12, font = 'monospace') => { ctx.fillStyle = color; ctx.font = `bold ${size}px ${font}`; ctx.fillText(value, Math.round(x), Math.round(y)); };
  function paintRoom() {
    const g = ctx.createLinearGradient(0, CEILING, 0, FLOOR);
    g.addColorStop(0, '#27313e'); g.addColorStop(.54, '#58483f'); g.addColorStop(1, '#916d50');
    block(0, 0, W, H, '#10131b');
    block(0, CEILING, WORLD_END, FLOOR - CEILING, '#564b47');
    block(0, CEILING, WORLD_END, FLOOR - CEILING, g);
    // Warm ceiling boards and continuous wood flooring.
    block(0, 0, WORLD_END, CEILING, '#211e25');
    for (let x = 0; x < WORLD_END; x += 90) { block(x, 14, 3, 48, '#49302a'); block(x + 4, 0, 38, 3, '#80533b'); }
    block(0, FLOOR, WORLD_END, H - FLOOR, '#9a7450');
    for (let y = FLOOR + 15; y < H; y += 24) {
      floorLine(0, y, WORLD_END, '#c19462', 2);
      for (let x = (Math.floor(y / 24) % 2) * 64; x < WORLD_END; x += 128) block(x, y - 22, 2, 24, '#795a42');
    }
    // Paneled lower walls and a clean baseboard make both rooms feel finished.
    for (const [start, end] of [[0,1110],[1110,WORLD_END]]) {
      block(start, 363, end-start, 83, '#493a38'); block(start, 363, end-start, 5, '#c19769');
      block(start, 438, end-start, 8, '#d0a36c');
      for (let x=start+22;x<end;x+=54) { block(x,378,2,56,'#765448'); block(x+3,381,44,49,'#5b4641'); }
    }
    // The project library is on the left; the bedroom is on the right.
    block(0, CEILING, 1110, 5, '#be8b5b'); block(1110, CEILING, 3, 127, '#382b2b');
    block(1110, 446, 3, FLOOR - 446, '#382b2b');
    block(1110, CEILING, WORLD_END - 1110, 5, '#c0925b');
    for (const x of [90, 1060, 1160, 1970]) { block(x, 88, 3, 340, '#705445'); block(x + 6, 88, 2, 340, '#87654c'); }
    // Bedroom furniture now sits to the right of the project-room doorway.
    ctx.save(); ctx.translate(1110, 0);
    block(552, 407, 373, 39, '#bd9063'); block(560, 411, 357, 31, '#38656a');
    block(569, 416, 341, 2, '#d0b27d'); block(569, 436, 341, 2, '#d0b27d');
    for (let x=578;x<906;x+=24) block(x,423,12,3,'#6f9790');
    // Bedroom window with a night sky, panes and curtains.
    block(565, 135, 205, 165, '#c79562'); block(574, 144, 187, 147, '#3f7891');
    block(665, 144, 8, 147, '#e0bd88'); block(574, 211, 187, 7, '#e0bd88');
    block(552, 123, 14, 194, '#8e5549'); block(768, 123, 14, 194, '#8e5549');
    block(536, 125, 20, 180, '#ad6461'); block(778, 125, 20, 180, '#ad6461');
    for (const [sx, sy] of [[600,170],[720,184],[615,257],[733,246]]) block(sx, sy, 3, 3, '#f8d59b');
    // Wall art above the bed and a small floating book shelf.
    block(147, 168, 76, 74, '#bd9464'); block(154, 175, 62, 60, '#273944');
    block(163, 220, 43, 7, '#df9d68'); block(175, 193, 18, 27, '#4a8790'); block(180, 185, 8, 10, '#f4d292');
    block(402, 168, 76, 74, '#bd9464'); block(409, 175, 62, 60, '#273944');
    block(420, 215, 41, 6, '#83a57a'); block(430, 190, 18, 25, '#42685a'); block(434, 182, 9, 10, '#c9d28c');
    block(271, 255, 126, 10, '#a6794e'); block(278, 240, 17, 15, '#4c7582'); block(299, 232, 13, 23, '#b45c4e'); block(319, 244, 21, 11, '#d3a65d'); block(348, 236, 16, 19, '#547768');
    // Bed on the right, with layered covers, pillows, nightstand and a warm lamp.
    block(582, 347, 330, 78, '#5c3b38'); block(592, 333, 310, 49, '#e6d6bb');
    block(620, 365, 258, 49, '#477e82'); block(620, 365, 258, 8, '#6ba6a0');
    block(630, 376, 237, 3, '#75aaa0'); block(630, 405, 237, 3, '#31565b');
    for (let x=646;x<858;x+=32) { block(x,383,3,18,'#5c908d'); block(x+7,386,7,6,'#80b7a8'); }
    block(606, 416, 286, 6, '#76503e'); block(612, 423, 274, 3, '#c09161');
    block(634, 340, 100, 34, '#f1e6cd'); block(752, 340, 100, 34, '#f1e6cd');
    block(639, 344, 91, 4, '#fff4d7'); block(757, 344, 91, 4, '#fff4d7');
    block(566, 326, 355, 16, '#865e45'); block(560, 411, 18, 36, '#704b39'); block(912, 411, 18, 36, '#704b39');
    block(526, 388, 47, 54, '#855b42'); block(526, 379, 47, 11, '#bf9161');
    block(546, 340, 5, 41, '#d4a967'); block(531, 331, 35, 14, '#ffda89'); block(539, 321, 20, 10, '#ffe8ad');
    // Wardrobe and dresser.
    block(40, 213, 100, 216, '#684538'); block(50, 224, 80, 195, '#9b6848');
    block(88, 224, 5, 195, '#644136'); block(73, 312, 6, 13, '#e3bd7a'); block(111, 312, 6, 13, '#e3bd7a');
    block(436, 389, 95, 47, '#80523b'); block(428, 379, 110, 13, '#bd8653');
    for (let i=0;i<3;i++) { block(446, 396+i*11, 76, 3, '#583d32'); block(455+i*25, 398+i*11, 7, 6, '#e0b878'); }
    // A personal-profile computer station replaces the hanging portrait.
    block(207, 386, 176, 14, '#986747'); block(216, 400, 8, 46, '#654733'); block(366, 400, 8, 46, '#654733');
    block(247, 274, 84, 92, '#252b35'); block(255, 281, 68, 75, '#55a6a2');
    block(260, 288, 58, 60, '#263b43'); block(266, 295, 44, 3, '#f2d091');
    text('YUSUF', 269, 310, '#eddfa9', 9); block(266, 320, 43, 3, '#92d2c2'); block(266, 328, 43, 3, '#92d2c2');
    block(266, 336, 31, 3, '#e9ad69'); block(283, 366, 11, 15, '#a77b55');
    block(259, 382, 62, 5, '#cfac7a'); block(276, 382, 31, 3, '#30343d');
    // A tucked-in chair and small speakers leave a clear route to the bed.
    block(391, 408, 24, 29, '#4c6d70'); block(391, 406, 24, 5, '#84aaa0'); block(399, 437, 7, 9, '#684b3b');
    block(195, 370, 8, 16, '#383c42'); block(386, 370, 8, 16, '#383c42');
    ctx.restore();
    // Clear, hinged threshold between the bedroom and project room, on the left.
    block(1087, 369, 47, 77, '#563b31');
    if (!doorOpen) { block(1094, 211, 31, 235, '#986a48'); block(1099, 220, 4, 217, '#c18d5c'); block(1115, 328, 6, 6, '#ffda8a'); }
    else { block(1075, 220, 20, 226, '#986a48'); block(1078, 226, 4, 211, '#c18d5c'); }
    block(1080, 201, 12, 245, '#d3a870'); block(1134, 201, 12, 245, '#d3a870');
    block(1097, 182, 100, 19, '#49342e'); text('← PROJECT ROOM', 1102, 196, '#f4d099', 8);
    // Library flanks: substantial built-in bookcases with colorful spines.
    drawBookcase(0, 192, 165, 226);
    drawBookcase(930, 192, 165, 226);
    // A project shelf for each exhibit, with year, cover and title marker.
    projects.forEach((p, i) => {
      const x = p.x;
      block(x - 104, 117, 208, 198, '#4d342d'); block(x - 96, 125, 192, 182, '#c99d67');
      block(x - 87, 134, 174, 164, '#283545');
      const cover = covers.get(p.name);
      if (p.image?.complete && p.image.naturalWidth) { ctx.imageSmoothingEnabled = false; ctx.drawImage(p.image, x - 81, 140, 162, 106); }
      else drawDashboard(x, 145, p.color, i);
      block(x - 86, 251, 172, 4, p.color);
      text(p.year, x - 78, 274, '#ffcf8e', 13); text(p.name.length > 23 ? p.name.slice(0,21)+'…' : p.name, x - 78, 291, '#f2e4cb', 10);
      // Low book ledge beneath the artwork.
      block(x - 119, 322, 238, 17, '#9b6848'); block(x - 119, 339, 238, 7, '#583c32');
      for (let b=0;b<9;b++) { const bh=24+(b*13%25); block(x - 105 + b*24, 322-bh, 17, bh, ['#47786f','#a95346','#d09a55','#536c8b','#79608c'][b%5]); block(x - 104 + b*24, 322-bh, 15, 3, '#e0b878'); }
      // Tiny warm gallery lamp above every project display.
      block(x - 2, 91, 4, 16, '#d6b179'); block(x - 15, 106, 30, 7, '#ffe2a3');
    });
    text('BEDROOM  /  PERSONAL SPACE', 1144, 105, '#f1d4a1', 11);
    text('PROJECT LIBRARY  /  2025', 20, 105, '#f1d4a1', 11);
    // Soft floor arrows lead from the bed side toward the left-hand exit.
    for (let x=1190;x<1680;x+=78) { block(x+4,430,14,4,'#64d7ca'); block(x,425,6,4,'#64d7ca'); block(x,435,6,4,'#64d7ca'); }
    block(1665,430,14,4,'#64d7ca'); block(1661,425,6,4,'#64d7ca'); block(1661,435,6,4,'#64d7ca');
    block(1110, FLOOR, 3, H - FLOOR, '#503a30');
  }
  function drawBookcase(x, y, w, h) {
    block(x, y, w, h, '#704633'); block(x + 8, y + 8, w - 16, h - 16, '#352a2a');
    for (let shelf=0;shelf<5;shelf++) {
      const sy=y+12+shelf*42; block(x+5, sy+34, w-10, 8, '#b77b4c'); block(x+7, sy+38, w-14, 4, '#4b302a');
      for (let b=0;b<8;b++) { const bh=19+(b*9+shelf*7)%17, bw=7+(b%3); block(x+12+b*21, sy+34-bh, bw, bh, ['#527e70','#a24c43','#d29855','#4c6f8b','#76608c','#b87550'][((b+shelf)%6)]); block(x+12+b*21, sy+34-bh, bw, 3, '#dfbd82'); }
    }
  }
  function drawDashboard(x, y, color, variant) {
    block(x, y, 162, 103, '#17262e');
    if (variant === 0) {
      for (let r=0;r<4;r++) for (let c=0;c<4;c++) { block(x+14+c*31,y+15+r*18,25,12,(r+c)%3===0?color:'#486178'); }
      floorLine(x+12,y+91,137,'#6c8791',2);
    } else {
      for(let b=0;b<6;b++){const bh=20+(b*19%60);block(x+18+b*21,y+86-bh,12,bh,b%2?color:'#72c7be');}
      floorLine(x+12,y+87,137,'#6c8791',2);
    }
  }
  function drawMiniCat(x,y,scale=1,phase=0,attack=false,jump=0) {
    ctx.save(); ctx.translate(Math.round(x),Math.round(y-jump)); ctx.scale(scale,scale);
    const step=player.moving?Math.round(Math.sin(phase)*3):0, facing=player.face, tail=Math.round(Math.sin(phase*.7)*2);
    ctx.scale(facing,1);
    const c=(a,b,w,h,color)=>block(a,b,w,h,color);
    // Tail, torso and head use a dark pixel outline with warm fur highlights.
    c(-24,-8+tail,12,6,'#70452f'); c(-30,-14+tail*2,9,7,'#70452f'); c(-33,-16+tail*2,6,6,'#f0d5a7');
    c(-23,-7+tail,11,4,'#d58a45'); c(-29,-13+tail*2,8,5,'#d58a45');
    c(-17,-22,34,22,'#70452f'); c(-15,-20,30,18,'#d58a45'); c(-10,-17,19,12,'#e49b50');
    c(-12,-3,9,11,'#70452f'); c(5,-3,9,11,'#70452f');
    c(-11,5+step,8,9,'#70452f'); c(6,5-step,8,9,'#70452f');
    c(-10,6+step,7,6,'#f0d5a7'); c(7,6-step,7,6,'#f0d5a7');
    c(-11,-30,24,16,'#70452f'); c(-9,-28,20,13,'#d58a45');
    c(-9,-34,8,10,'#70452f'); c(5,-34,8,10,'#70452f');
    c(-7,-32,4,5,'#f0b0a0'); c(7,-32,4,5,'#f0b0a0');
    c(3,-25,4,5,'#17251f'); c(10,-22,8,6,'#f3d59e'); c(16,-22,3,3,'#a85556');
    c(12,-18,9,1,'#f3d59e'); c(13,-16,8,1,'#f3d59e');
    c(-7,-8,11,6,'#f0d5a7');
    c(-8,-18,3,4,'#b96b38'); c(-2,-20,3,4,'#b96b38');
    if(attack){c(18,-25,13,4,'#f3d28a');c(28,-31,4,16,'#ffe5a7');}
    ctx.restore();
  }
  function drawScene() {
    paintRoom();
    const screenX = player.x - cameraX;
    const walk = player.moving ? Math.sin(walkPhase) * 3 : Math.sin(time * .003) * .5;
    // A soft pixel shadow anchors the cat to the floor.
    block(screenX - 23, FLOOR - 2, 47, 4, '#473a35');
    drawMiniCat(screenX, player.y - 15*1.35, 1.35, player.moving?walkPhase:time*.003, time < player.attacking);
    if (started && !modalOpen && !paused && active) {
      const label = active === 'door' ? (doorOpen ? 'E  CLOSE PROJECT ROOM' : 'E  OPEN PROJECT ROOM') : active === 'profile' ? 'E  CHECK PERSONAL COMPUTER' : 'E  VIEW PROJECT';
      ctx.font = 'bold 12px monospace'; const width = ctx.measureText(label).width + 24;
      block(screenX - width/2, 88, width, 30, '#11131bea'); block(screenX - width/2, 88, width, 2, '#edbd76');
      text(label, screenX - width/2 + 12, 108, '#f1d39f', 11);
    }
  }
  function resize() {
    canvas.width = W; canvas.height = H;
    const scale = Math.min(innerWidth / W, innerHeight / H);
    canvas.style.width = `${Math.floor(W * scale)}px`; canvas.style.height = `${Math.floor(H * scale)}px`;
    canvas.style.position = 'absolute'; canvas.style.left = '50%'; canvas.style.top = '50%'; canvas.style.transform = 'translate(-50%,-50%)';
    ctx.imageSmoothingEnabled = false;
  }
  function nearest() {
    const doorDistance=Math.abs(player.x-1110), profileDistance=Math.abs(player.x-1410);
    if (player.x > 1110 && profileDistance < 72 && (profileDistance <= doorDistance || doorDistance >= 65)) return 'profile';
    if (doorDistance < 70) return 'door';
    const p = projects.find(item => Math.abs(player.x-item.x) < 100 && player.x < 1110);
    return p || null;
  }
  function showModal(kind) {
    active = kind; modalOpen = true;
    const gallery = document.getElementById('projectGallery');
    const link = document.getElementById('modalLink');
    const extra = document.getElementById('modalExtraLinks');
    const image = document.getElementById('galleryImage');
    gallery.classList.remove('pixel-profile'); gallery.classList.remove('single-image');
    image.hidden = false; document.getElementById('friendPhotoEmpty').hidden = true;
    document.getElementById('galleryPrevious').hidden = false; document.getElementById('galleryNext').hidden = false;
    extra.hidden = true; link.hidden = true; galleryIndex = 0;
    if (kind === 'profile') {
      document.getElementById('modalEyebrow').textContent = 'BEDROOM / PERSONAL COMPUTER';
      document.getElementById('modalTitle').textContent = 'Yusuf Rayyan Daniel';
      document.getElementById('modalCopy').textContent = 'Born 11 August 2006 · Computer Science student at BINUS University @ Alam Sutera.';
      document.getElementById('modalTags').innerHTML = ['BINUS UNIVERSITY','COMPUTER SCIENCE','BORN 11 AUGUST 2006'].map(t=>`<span>${t}</span>`).join('');
      gallery.hidden = false; gallery.classList.add('single-image','pixel-profile');
      document.getElementById('galleryPrevious').hidden = true; document.getElementById('galleryNext').hidden = true;
      image.src = '../image0.jpg'; image.alt = 'Yusuf Rayyan Daniel'; document.getElementById('galleryCount').textContent = 'PROFILE PHOTO';
      extra.hidden = false; document.getElementById('modalLinkedIn').href = 'https://www.linkedin.com/in/yusuf-rayyan-daniel-936a35318'; document.getElementById('modalGithub').href = 'https://github.com/Yusuf11806';
    } else if (kind && typeof kind === 'object') {
      document.getElementById('modalEyebrow').textContent = `${kind.year} / ${kind.tag}`;
      document.getElementById('modalTitle').textContent = kind.name;
      document.getElementById('modalCopy').textContent = kind.description;
      document.getElementById('modalTags').innerHTML = kind.tags.map(t=>`<span>${t}</span>`).join('');
      const imageList = kind.cover ? [kind.cover] : [];
      gallery.hidden = !imageList.length;
      if (imageList.length) { gallery.classList.add('single-image'); image.src = imageList[0]; image.alt = `${kind.name} cover`; document.getElementById('galleryPrevious').hidden = true; document.getElementById('galleryNext').hidden = true; document.getElementById('galleryCount').textContent = 'PROJECT COVER'; }
      link.href = kind.link; link.hidden = !kind.link;
    }
    document.getElementById('modal').classList.add('open'); document.getElementById('modal').setAttribute('aria-hidden','false');
  }
  function closeModal() { modalOpen = false; document.getElementById('modal').classList.remove('open'); document.getElementById('modal').setAttribute('aria-hidden','true'); }
  function interact() {
    if (!started || paused) return;
    const target = nearest();
    if (!target) return;
    if (target === 'door') { doorOpen = !doorOpen; return; }
    showModal(target);
  }
  function pause(show) {
    paused = show; const menu=document.getElementById('escapeMenu');
    menu.classList.toggle('open',show); menu.setAttribute('aria-hidden',String(!show));
  }
  function start() { if (started) return; started = true; document.getElementById('experience').classList.add('is-playing'); canvas.focus({ preventScroll: true }); }
  function update(dt) {
    if (!started || paused || modalOpen) return;
    const left = keys.a || keys.A || keys.ArrowLeft, right = keys.d || keys.D || keys.ArrowRight;
    const speed = (keys.Shift ? 290 : 205) * Number(movementSetting.value);
    player.moving = Boolean(left || right);
    if (left) { player.x -= speed*dt; player.face=-1; }
    if (right) { player.x += speed*dt; player.face=1; }
    player.x = Math.max(34, Math.min(WORLD_END-34, player.x));
    if (!doorOpen && player.x > 1075 && player.x < 1145) {
      if (left) doorOpen = true; // Walk left into the doorway to enter the project room.
      else player.x = 1075;
    }
    if ((keys[' '] || keys.ArrowUp || keys.w || keys.W) && player.grounded) { player.vy = -440; player.grounded=false; }
    player.vy += 1150*dt; player.y += player.vy*dt;
    if (player.y >= FLOOR) { player.y=FLOOR; player.vy=0; player.grounded=true; }
    if (player.moving) walkPhase += dt*12;
    cameraX = player.x > 1500 ? 1060 : Math.max(0, Math.min(WORLD_END-W, player.x-440));
    const target=nearest(); active=target;
    const hint=document.getElementById('interactHint');
    if (hint) { hint.textContent=target==='door'?(doorOpen?'E  CLOSE PROJECT ROOM DOOR':'E  OPEN PROJECT ROOM DOOR'):target==='profile'?'E  CHECK PERSONAL COMPUTER':target?'E  VIEW PROJECT':''; hint.classList.toggle('visible',Boolean(target)); }
    document.getElementById('zoneLabel').textContent=player.x>=1110?'BEDROOM / PERSONAL SPACE':'PROJECT ROOM / LIBRARY';
    document.getElementById('coord').textContent=`${String(Math.floor(player.x/100)).padStart(2,'0')} : 00`;
  }
  function frame(now) { const dt=Math.min((now-last)/1000||0,.04); last=now; time=now; update(dt); drawScene(); requestAnimationFrame(frame); }
  addEventListener('keydown', e=>{
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
    keys[e.key.length===1?e.key.toLowerCase():e.key]=true;
    if (e.repeat) return;
    if (e.key.toLowerCase()==='e') { if(modalOpen) closeModal(); else interact(); }
    if (e.key==='Escape') { if(modalOpen) closeModal(); else if(started) pause(!paused); }
  });
  addEventListener('keyup',e=>keys[e.key.length===1?e.key.toLowerCase():e.key]=false);
  addEventListener('blur',()=>Object.keys(keys).forEach(k=>keys[k]=false));
  canvas.addEventListener('pointerdown',e=>{canvas.focus({preventScroll:true});if(e.button!==0||!started)return; player.attacking=performance.now()+360; interact();});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  document.getElementById('enterHouse').addEventListener('click',start);
  document.getElementById('closeModal').addEventListener('click',closeModal);
  document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
  document.getElementById('resumeGame').addEventListener('click',()=>pause(false));
  document.getElementById('exitToGameMenu').addEventListener('click',()=>{pause(false);started=false;player.x=1845;player.y=FLOOR;player.vy=0;doorOpen=false;cameraX=1060;document.getElementById('experience').classList.remove('is-playing')});
  document.getElementById('openGameSettings').addEventListener('click',e=>{const panel=document.getElementById('gameSettings');panel.hidden=!panel.hidden;e.currentTarget.setAttribute('aria-expanded',String(!panel.hidden));});
  const movementSetting=document.getElementById('lookSensitivity');
  movementSetting.addEventListener('input',e=>{movementSetting.dataset.speed=e.target.value;document.getElementById('sensitivityValue').textContent=`${e.target.value}×`;});
  document.querySelectorAll('.touch-controls button').forEach(button=>{
    const action=button.dataset.action;
    button.addEventListener('pointerdown',e=>{e.preventDefault();if(action==='left')keys.a=true;if(action==='right')keys.d=true;if(action==='jump'||action==='forward')keys[' ']=true;if(action==='use')interact();if(action==='attack'){player.attacking=performance.now()+360;interact();}});
    ['pointerup','pointerleave','pointercancel'].forEach(type=>button.addEventListener(type,()=>{if(action==='left')keys.a=false;if(action==='right')keys.d=false;if(action==='jump'||action==='forward')keys[' ']=false;}));
  });
  setTimeout(()=>{
    const loader=document.getElementById('gameLoader');
    document.getElementById('loaderStatus').textContent='HOME IS READY';
    loader.classList.add('is-ready'); document.getElementById('loaderProgress').hidden=true;
    document.getElementById('gameMenuActions').hidden=false;
  },700);
  resize(); addEventListener('resize',resize); requestAnimationFrame(frame);
})();
