(() => {
  const canvas = document.getElementById('world');
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const W = 960, H = 540;
  const projects = [
    { name:'Database HR Analysis', year:'2025', tag:'PROJECT / 005', x:275, y:260, color:'#aa8be9',
      description:'My colleagues and I analyzed an HR database to understand which employees stayed and which left. We cleaned the original dataset, then analyzed it with Python, pandas, NumPy, Matplotlib, Seaborn, and statistical methods including Pearson correlation and chi-squared contingency analysis. Thank you to Richard, Felix, and Filbert for their teamwork.',
      tags:['Python','pandas','NumPy','Matplotlib','Seaborn','SciPy'], link:'https://github.com/Yusuf11806/Analytics-for-HR-Database/blob/main/Code%20-%20Data%20Analytics.ipynb' },
    { name:'E-Commerce Sales and Profit Analytics', year:'2025', tag:'PROJECT / 008', x:480, y:260, color:'#60b7d5', image:'../pipeline.png',
      description:'In 2025, my colleagues and I built a data engineering pipeline for e-commerce sales and profit analytics. We used a Kaggle dataset, cleaned and prepared the data with Pentaho, then created visualizations in Power BI. Thank you to Christian, Filbert, Jovita, Felix, and Richard for your teamwork.',
      tags:['Pentaho','Power BI','Data engineering','Data cleaning'], link:'https://github.com/Yusuf11806/E-Commerce-Sales-and-Profit-Analytics-Using-Data-Engineering-Pipeline' },
    { name:'Video Game Sales Analytics', year:'2025', tag:'PROJECT / 009', x:685, y:260, color:'#f0aa62', image:'../DataVis.png',
      description:'I used Power BI to analyze video game sales across genres, release date categories, regions, and global sales. The visualizations make it easier to compare how sales vary across these categories.',
      tags:['Power BI','Data visualization','Video game sales','Regional analysis'], link:'https://github.com/Yusuf11806/Video-Game-Sales' }
  ];
  for (const p of projects) if (p.image) { p.cover = new Image(); p.cover.src = p.image; }
  const profilePhoto = new Image(); profilePhoto.src = '../image0.jpg';
  const player = { x: 720, y: 440, direction:'left', moving:false, step:0, attackUntil:0 };
  const keys = Object.create(null);
  let room = 'bedroom', started=false, paused=false, modalOpen=false, doorOpen=false, active=null, last=0, now=0;
  const block = (x,y,w,h,color) => { ctx.fillStyle=color; ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); };
  const poly = (points,color) => { ctx.fillStyle=color; ctx.beginPath(); ctx.moveTo(points[0][0],points[0][1]); for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]); ctx.closePath(); ctx.fill(); };
  const line = (x1,y1,x2,y2,color,width=2) => { ctx.strokeStyle=color; ctx.lineWidth=width; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); };
  const label = (s,x,y,color='#e4d6be',size=10) => { ctx.fillStyle=color; ctx.font=`bold ${size}px monospace`; ctx.fillText(s,Math.round(x),Math.round(y)); };
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function floorTiles() {
    poly([[180,270],[775,270],[824,469],[132,469]],'#59464a');
    // Perspective floorboards and small stone pixels.
    for(let y=286;y<465;y+=19){const t=(y-270)/199,left=180-48*t,right=775+49*t;line(left,y,right,y,'#80636a',2);}
    for(let x=190;x<780;x+=54){line(x,270,x+(x-480)*.16,469,'#493a43',2);}
    for(let row=0;row<8;row++)for(let col=0;col<12;col++){
      const yy=286+row*21, xx=181+col*52+(row%2)*24;
      if(Math.sin(col*13+row*27)>.25)block(xx,yy,5+(col%3),3,['#725a61','#8a6b6b','#66505a'][((col+row)%3)]);
    }
    poly([[132,469],[824,469],[811,495],[145,495]],'#49383c');
    line(142,476,818,476,'#b58963',5); line(150,490,804,490,'#2d262d',5);
  }
  function walls(kind) {
    block(0,0,W,H,'#080a10');
    // Raised stone room silhouette with a stepped outline like an old RPG room.
    poly([[126,72],[177,72],[177,43],[783,43],[783,72],[833,72],[833,443],[808,443],[808,485],[153,485],[153,450],[126,450]],'#382d38');
    poly([[138,83],[190,83],[190,56],[770,56],[770,83],[819,83],[819,432],[795,432],[795,472],[166,472],[166,438],[138,438]],'#796172');
    // Back wall and lower timber wainscot.
    poly([[190,57],[770,57],[770,277],[190,277]],kind==='bedroom'?'#71647f':'#626b77');
    block(190,222,580,55,'#65454d');
    for(let x=190;x<770;x+=18){block(x,228,3,44,'#8a5b61');block(x+5,234,10,3,'#49363f');}
    line(190,220,770,220,'#bb8c69',4); line(190,278,770,278,'#463540',4);
    // Side walls frame the room and angle toward the floor.
    poly([[138,83],[190,57],[190,277],[166,438],[138,438]],'#62556b');
    poly([[770,57],[819,83],[819,432],[795,432],[770,277]],'#5d5065');
    for(let y=115;y<220;y+=28){block(146,y,27,4,'#89718d');block(782,y+8,25,4,'#87718a');}
    floorTiles();
    // Small blockwork gives the back wall a hand-built pixel texture.
    for(let y=88;y<210;y+=23)for(let x=205+(y%2)*9;x<754;x+=31){if(Math.sin(x*3+y)>.35){block(x,y,12,4,'#85738d');block(x+15,y+5,6,3,'#554957');}}
    label(kind==='bedroom'?'YUSUF / BEDROOM':'YUSUF / PROJECT LIBRARY',205,78,'#ead3a3',9);
  }
  function windowArt() {
    block(359,112,222,86,'#49343c'); block(365,117,212,74,'#ba9067'); block(372,123,198,61,'#5db0c1');
    for(let x=375;x<566;x+=31){block(x,126,18,56,'#a4e4df');block(x+19,126,6,56,'#e9d28e');}
    block(372,149,198,7,'#f2d495'); block(351,109,8,94,'#69464d'); block(581,109,8,94,'#69464d');
    for(let i=0;i<7;i++){block(379+i*27,129+(i%3)*8,4,4,'#fff4b4');}
    block(354,201,231,7,'#a87559');
  }
  function drawDesk() {
    // Profile computer on a desk, screen facing into the room.
    poly([[203,325],[318,325],[351,346],[232,346]],'#aa7a53');
    poly([[232,346],[351,346],[347,385],[232,385]],'#684739');
    poly([[203,325],[232,346],[232,385],[204,364]],'#80563f');
    block(222,364,9,51,'#493738'); block(334,374,9,43,'#493738');
    block(235,256,87,69,'#292d3c'); block(241,262,75,56,'#72c2c1'); block(247,268,63,44,'#283f4a');
    label('YUSUF',254,283,'#ffe4a6',8); block(253,289,49,3,'#b3e3d3');block(253,297,43,3,'#b3e3d3');block(253,305,33,3,'#e8ad68');
    block(269,325,17,14,'#a67b57'); poly([[256,341],[299,341],[308,347],[250,347]],'#d2b17a');
    // Chair tucked under the desk so the room remains easy to cross.
    poly([[193,372],[216,372],[227,380],[204,380]],'#547b79');poly([[204,380],[227,380],[227,401],[204,401]],'#365c61');
    block(205,400,5,12,'#876044'); block(225,400,5,12,'#876044');
    // Little keyboard and mouse.
    poly([[242,350],[292,350],[303,357],[251,357]],'#e6d1a0');for(let i=0;i<5;i++)block(252+i*8,352,5,2,'#6c5960');
  }
  function drawBed() {
    // Raised timber bed, deep shadow, layered mattress and clearly quilted blanket.
    poly([[602,294],[731,294],[781,323],[651,323]],'#704a45');
    poly([[651,323],[781,323],[781,405],[651,405]],'#46343c');
    poly([[602,294],[651,323],[651,405],[602,375]],'#805548');
    poly([[611,300],[727,300],[765,322],[647,322]],'#ded2b7');
    poly([[647,322],[765,322],[765,386],[647,386]],'#e8dfc9');
    poly([[647,344],[765,344],[765,387],[647,387]],'#44899a');
    poly([[647,344],[765,344],[765,352],[647,352]],'#77b8b3');
    for(let x=660;x<755;x+=24){line(x,354,x,381,'#5ca0a3',2);block(x+5,361,7,5,'#82c4b9');}
    line(654,383,760,383,'#244d5c',3);
    // Two plump pillows with a crisp rim.
    poly([[617,303],[656,303],[674,318],[635,318]],'#f7eccd');poly([[635,318],[674,318],[674,331],[635,331]],'#d8cbb1');
    poly([[661,303],[700,303],[719,318],[679,318]],'#fff3d2');poly([[679,318],[719,318],[719,331],[679,331]],'#d8cbb1');
    poly([[605,288],[731,288],[747,299],[618,299]],'#8d5b4d');line(617,299,747,299,'#d09c68',3);
    for(const x of [618,754]){poly([[x,386],[x+12,386],[x+15,420],[x+2,420]],'#624337');block(x+1,416,14,5,'#382c32');}
    // Bedside table, lamp and small book.
    poly([[574,357],[615,357],[628,365],[586,365]],'#a36e4a');block(586,365,42,31,'#6d493c');
    block(600,344,4,13,'#bc9364');block(587,333,31,12,'#ffda8f');block(594,326,17,8,'#ffe9b1');
  }
  function drawWardrobe() {
    poly([[211,181],[251,181],[278,196],[237,196]],'#a77652');
    poly([[237,196],[278,196],[278,285],[237,285]],'#68473e');
    poly([[211,181],[237,196],[237,285],[211,270]],'#50363a');
    poly([[218,190],[249,190],[269,201],[238,201]],'#b07b4d');
    block(239,204,28,73,'#946347');line(253,205,253,277,'#69443e',2);block(244,235,3,9,'#e1bd78');block(262,235,3,9,'#e1bd78');
  }
  function drawRug() {
    poly([[324,365],[488,365],[550,402],[386,402]],'#354e83');
    poly([[334,369],[481,369],[536,401],[389,401]],'#d36945');
    line(342,372,479,372,'#f1c372',3);line(392,397,529,397,'#f1c372',3);
    for(let x=350;x<473;x+=14){block(x,375,3,3,'#ffe08a');block(x+34,389,3,3,'#9b463f');}
    poly([[410,380],[442,380],[456,386],[424,386]],'#f3bd6a');poly([[424,386],[456,386],[442,392],[410,392]],'#b94d3f');
  }
  function drawPlant(x,y,scale=1) {
    block(x-13*scale,y,26*scale,17*scale,'#9b6049');block(x-16*scale,y-3*scale,32*scale,5*scale,'#d29a67');
    line(x,y,x,y-42*scale,'#47784d',3*scale);
    for(const [dx,dy,s] of [[-15,-22,-1],[15,-29,1],[-12,-38,-1],[13,-43,1],[0,-49,0]]){
      poly([[x,y+dy*scale],[x+dx*scale,y+(dy-13)*scale],[x+(dx+s*7)*scale,y+(dy-21)*scale],[x+(s*4)*scale,y+(dy-8)*scale]],'#47784d');
      block(x+(dx/2)*scale-2*scale,y+(dy-13)*scale,5*scale,4*scale,'#76a35d');
    }
  }
  function drawBookshelf(x,y,w=100) {
    block(x,y,w,106,'#704535');block(x+6,y+6,w-12,94,'#3c303b');
    for(let shelf=0;shelf<3;shelf++){
      const sy=y+10+shelf*30;block(x+4,sy+24,w-8,5,'#bd895c');
      for(let b=0;b<7;b++){const bh=13+(b*7+shelf*5)%10;block(x+10+b*11,sy+24-bh,7,bh,['#4c8b7e','#d2654c','#e0b65d','#5a779a','#a8759c'][((b+shelf)%5)]);block(x+10+b*11,sy+24-bh,7,2,'#eed295');}
    }
  }
  function drawBedroom() {
    walls('bedroom');windowArt();
    // Wall hangings and shelf, matching the cozy pixel-room reference.
    block(234,127,44,45,'#bd9464');block(239,132,34,34,'#263a46');block(245,151,24,5,'#df9d68');block(250,141,10,11,'#57a1a8');
    block(298,188,111,7,'#a6794e');for(let i=0;i<4;i++)block(307+i*22,173+(i%2)*8,13,15,'#'+['4c7582','b45c4e','d3a65d','547768'][i]);
    drawWardrobe();drawDesk();drawBed();drawRug();drawPlant(552,300,.8);
    // Bright marker trail points left from the bed toward the bedroom exit.
    ctx.save();ctx.globalAlpha=.85;
    for(let i=0;i<5;i++){const x=585-i*82,y=411+(i%2)*4;block(x,y,20,5,'#54e0d0');block(x-5,y-5,7,5,'#54e0d0');block(x-5,y+5,7,5,'#54e0d0');}
    ctx.restore();
    // Door is on the left wall. Its prompt and light pulse guide the first route.
    poly([[133,300],[158,300],[176,310],[151,310]],'#9b704d');poly([[151,310],[176,310],[176,366],[151,366]],doorOpen?'#695044':'#865b44');
    poly([[133,300],[151,310],[151,366],[133,355]],'#523943');block(158,332,4,7,'#f4d18b');
    block(144,294,5,78,'#d3a870');block(174,307,4,62,'#c39662');
    const pulse=7+Math.sin(now*.004)*2;poly([[176,323],[176+pulse,331],[176,339]],'#77f0d9');
    label('PROJECTS',184,329,'#87eee1',8);label('GO LEFT',184,342,'#dfcca7',7);
    // Personal computer interaction point is marked with a small teal glow.
    const pcGlow=.35+Math.sin(now*.004)*.12;ctx.globalAlpha=pcGlow;block(272,246,20,5,'#72f5de');ctx.globalAlpha=1;
  }
  function drawLibrary() {
    walls('library');windowArt();
    drawBookshelf(213,157,105);drawBookshelf(644,157,105);
    drawPlant(493,269,.7);
    // Three project displays are built into the library shelving.
    projects.forEach((p,i)=>{
      const x=p.x,y=172;
      block(x-70,y-17,140,112,'#553c43');block(x-64,y-12,128,100,'#bc9164');block(x-57,y-5,114,84,'#273543');
      if(p.cover?.complete&&p.cover.naturalWidth){ctx.imageSmoothingEnabled=false;ctx.drawImage(p.cover,x-53,y,106,59);}
      else drawDashboard(x-48,y+3,p.color,i===0?0:1);
      block(x-53,y+61,106,3,p.color);label(p.year,x-52,y+78,'#f5cf8c',9);
      const title=p.name.length>19?p.name.slice(0,17)+'…':p.name;label(title,x-52,y+91,'#f2e4cc',7);
      block(x-76,y+100,152,9,'#a16d4b');block(x-71,y+109,142,5,'#463339');
      for(let b=0;b<7;b++){const bh=17+(b*9+i*5)%18;block(x-65+b*19,y+99-bh,13,bh,['#4c8b7e','#d2654c','#e0b65d','#5a779a','#a8759c'][((b+i)%5)]);}
      block(x-2,y-37,4,15,'#dfb576');block(x-17,y-25,34,7,'#ffe3a1');
    });
    drawRug();
    // The return door sits on the right edge of the project room.
    poly([[782,302],[807,302],[824,312],[799,312]],'#9b704d');poly([[799,312],[824,312],[824,369],[799,369]],doorOpen?'#695044':'#865b44');
    poly([[782,302],[799,312],[799,369],[782,357]],'#523943');block(805,333,4,7,'#f4d18b');
    block(778,298,5,78,'#d3a870');block(820,309,4,62,'#c39662');
    label('BEDROOM',731,291,'#e5c692',8);
  }
  function drawDashboard(x,y,color,variant){
    block(x,y,96,58,'#192a37');
    if(variant===0){for(let r=0;r<3;r++)for(let c=0;c<4;c++)block(x+9+c*19,y+9+r*13,14,8,(r+c)%3===0?color:'#527387');}
    else for(let b=0;b<5;b++){const h=14+(b*17%34);block(x+12+b*15,y+47-h,9,h,b%2?color:'#65c3b5');}
  }
  function drawCat() {
    const {x,y}=player,scale=clamp(.9+(y-280)/180*.12,.88,1.04),walking=player.moving;
    const stride=walking?Math.sin(player.step):Math.sin(now*.003)*.08,bob=walking?Math.abs(stride)*1.4:0;
    block(x-23*scale,y+2,46*scale,6*scale,'#302b32');
    ctx.save();ctx.translate(Math.round(x),Math.round(y-20*scale-bob));
    // This sprite faces right locally; horizontal mirroring turns the whole cat left.
    if(player.direction==='left')ctx.scale(-1,1);
    const p=(gx,gy,gw,gh,color)=>block(gx*2,gy*2,gw*2,gh*2,color);
    const fur='#ee7900',furLight='#ff9a08',furShade='#bb4d05',outline='#492a25',cream='#ffd15d',ink='#211d23';
    // Four short legs alternate in a quick, low pixel walk cycle.
    const rear=walking?Math.round(stride*2):0,front=walking?-rear:0;
    p(-8,4,4,5,outline);p(-7,4+rear,3,5,furShade);p(-5,8+rear,5,2,ink);
    p(7,4,4,5,outline);p(8,4-rear,3,5,fur);p(9,8-rear,5,2,ink);
    p(-2,4,4,5,outline);p(-1,4+front,3,5,fur);p(0,8+front,5,2,ink);
    p(10,3,4,6,outline);p(11,3-front,3,6,furShade);p(12,8-front,5,2,ink);
    // Curled-up tail, built from stair-stepped square pixels.
    p(-11,-3,4,4,outline);p(-13,-7,4,5,furShade);p(-13,-12,4,7,fur);
    p(-12,-17,4,7,furLight);p(-9,-21,5,5,fur);p(-5,-22,6,4,outline);
    p(-3,-21,6,4,fur);p(1,-18,4,5,furLight);p(3,-14,4,6,fur);p(3,-9,4,6,furShade);
    // Sturdy rounded body, shaded flank and warm chest patch.
    p(-8,-4,23,11,outline);p(-7,-4,21,9,fur);p(-3,-3,11,7,furLight);
    p(5,1,7,3,furShade);p(-6,3,8,2,cream);
    // Square head, pointed ears, pink inner ears and expressive pixel face.
    p(10,-10,13,12,outline);p(11,-9,11,10,furLight);p(11,-14,5,6,outline);p(18,-15,5,7,outline);
    p(12,-13,3,4,fur);p(19,-13,3,4,fur);p(13,-7,3,3,ink);p(18,-7,3,3,ink);
    p(20,-3,5,4,cream);p(24,-3,2,2,'#30202a');
    // Dark whisker pixels extend from the muzzle, like the reference sprite.
    p(21,-5,7,2,ink);p(23,-1,7,2,ink);p(20,1,6,2,ink);
    p(10,-2,4,3,furShade);p(15,1,4,2,'#f6b34a');
    if(now<player.attackUntil){p(26,-14,8,2,'#ffe69c');p(32,-18,2,8,'#fff0b4');}
    ctx.restore();
  }
  function distance(a,b){return Math.hypot(player.x-a.x,player.y-b.y);}
  function nearestTarget(){
    if(room==='bedroom'){
      if(distance(player,{x:158,y:335})<68)return 'door';
      if(distance(player,{x:282,y:302})<73)return 'profile';
      return null;
    }
    if(distance(player,{x:804,y:337})<70)return 'door';
    return projects.find(p=>distance(player,p)<110)||null;
  }
  function showModal(target){
    modalOpen=true;active=target;
    const gallery=document.getElementById('projectGallery'),image=document.getElementById('galleryImage'),link=document.getElementById('modalLink'),extra=document.getElementById('modalExtraLinks');
    gallery.classList.remove('pixel-profile','single-image');image.hidden=false;document.getElementById('friendPhotoEmpty').hidden=true;
    document.getElementById('galleryPrevious').hidden=true;document.getElementById('galleryNext').hidden=true;extra.hidden=true;link.hidden=true;
    if(target==='profile'){
      document.getElementById('modalEyebrow').textContent='BEDROOM / PERSONAL COMPUTER';document.getElementById('modalTitle').textContent='Yusuf Rayyan Daniel';
      document.getElementById('modalCopy').textContent='Born 11 August 2006 · Computer Science student at BINUS University @ Alam Sutera.';
      document.getElementById('modalTags').innerHTML=['BINUS UNIVERSITY','COMPUTER SCIENCE','BORN 11 AUGUST 2006'].map(v=>`<span>${v}</span>`).join('');
      gallery.hidden=false;gallery.classList.add('single-image','pixel-profile');image.src='../image0.jpg';image.alt='Yusuf Rayyan Daniel';document.getElementById('galleryCount').textContent='PROFILE PHOTO';
      extra.hidden=false;document.getElementById('modalLinkedIn').href='https://www.linkedin.com/in/yusuf-rayyan-daniel-936a35318';document.getElementById('modalGithub').href='https://github.com/Yusuf11806';
    }else if(target==='door'){
      modalOpen=false;return;
    }else{
      document.getElementById('modalEyebrow').textContent=`${target.year} / ${target.tag}`;document.getElementById('modalTitle').textContent=target.name;
      document.getElementById('modalCopy').textContent=target.description;document.getElementById('modalTags').innerHTML=target.tags.map(v=>`<span>${v}</span>`).join('');
      gallery.hidden=!target.image;if(target.image){gallery.classList.add('single-image');image.src=target.image;image.alt=`${target.name} cover`;document.getElementById('galleryCount').textContent='PROJECT COVER';}
      link.href=target.link;link.hidden=false;
    }
    document.getElementById('modal').classList.add('open');document.getElementById('modal').setAttribute('aria-hidden','false');
  }
  function closeModal(){modalOpen=false;document.getElementById('modal').classList.remove('open');document.getElementById('modal').setAttribute('aria-hidden','true');}
  function interact(){if(!started||paused)return;const target=nearestTarget();if(!target)return;if(target==='door'){room=room==='bedroom'?'library':'bedroom';doorOpen=!doorOpen;player.x=room==='library'?746:210;player.y=352;player.direction=room==='library'?'left':'right';return;}showModal(target);}
  function walkable(x,y){if(x<145||x>815||y<282||y>457)return false;const t=(y-282)/175,left=177-44*t,right=779+43*t;if(x<left||x>right)return false;
    const obstacles=room==='bedroom'?[[607,292,780,414],[202,181,280,286],[202,325,352,388],[330,365,551,405]]:[[210,157,318,265],[644,157,749,265],[210,238,352,330],[420,238,558,330],[625,238,760,330]];
    return !obstacles.some(([x1,y1,x2,y2])=>x>x1-13&&x<x2+13&&y>y1-13&&y<y2+13);
  }
  function update(dt){
    if(!started||paused||modalOpen)return;
    const dx=(keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0),dy=(keys.s||keys.ArrowDown?1:0)-(keys.w||keys.ArrowUp?1:0);
    player.moving=Boolean(dx||dy);const speed=(keys.Shift?190:138)*Number(speedSetting.value),norm=dx&&dy?.7071:1;
    // The cat sprite only has left/right facing; vertical movement keeps its last side-facing pose.
    if(dx)player.direction=dx>0?'right':'left';
    const nx=player.x+dx*speed*dt*norm,ny=player.y+dy*speed*dt*norm;
    if(walkable(nx,player.y))player.x=nx;if(walkable(player.x,ny))player.y=ny;
    if(player.moving)player.step+=dt*12;
    active=nearestTarget();const hint=document.getElementById('interactHint');
    if(hint){hint.textContent=active==='door'?(room==='bedroom'?'E / OPEN PROJECT ROOM':'E / RETURN TO BEDROOM'):active==='profile'?'E / VIEW PERSONAL INFORMATION':active?'E / VIEW PROJECT':'';hint.classList.toggle('visible',Boolean(active));}
    document.getElementById('zoneLabel').textContent=room==='bedroom'?'BEDROOM / PERSONAL SPACE':'PROJECT ROOM / LIBRARY';
    document.getElementById('coord').textContent=`${room==='bedroom'?'HOME':'WORK'} : ${String(Math.round(player.x/10)).padStart(2,'0')}`;
  }
  function draw(){if(room==='bedroom')drawBedroom();else drawLibrary();drawCat();
    if(started&&active&&!modalOpen&&!paused){const prompt=active==='door'?(room==='bedroom'?'E  OPEN PROJECT ROOM':'E  RETURN TO BEDROOM'):active==='profile'?'E  PERSONAL INFORMATION':'E  OPEN PROJECT';ctx.font='bold 12px monospace';const w=ctx.measureText(prompt).width+22;block(player.x-w/2,player.y-76,w,25,'#10141e');block(player.x-w/2,player.y-76,w,2,'#5de2d0');label(prompt,player.x-w/2+11,player.y-59,'#b8f8e9',10);}
  }
  function loop(t){const dt=Math.min((t-last)/1000||0,.035);last=t;now=t;update(dt);draw();requestAnimationFrame(loop);}
  function resize(){canvas.width=W;canvas.height=H;const s=Math.min(innerWidth/W,innerHeight/H);canvas.style.width=`${Math.floor(W*s)}px`;canvas.style.height=`${Math.floor(H*s)}px`;canvas.style.position='absolute';canvas.style.left='50%';canvas.style.top='50%';canvas.style.transform='translate(-50%,-50%)';ctx.imageSmoothingEnabled=false;}

  addEventListener('keydown',e=>{const k=e.key.length===1?e.key.toLowerCase():e.key;keys[k]=true;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))e.preventDefault();if(e.repeat)return;
    if(k==='e'){if(modalOpen)closeModal();else interact();}
    if(e.key==='Escape'){if(modalOpen)closeModal();else if(started){paused=!paused;const m=document.getElementById('escapeMenu');m.classList.toggle('open',paused);m.setAttribute('aria-hidden',String(!paused));}}
    if(e.key===' '&&started&&!modalOpen)player.attackUntil=performance.now()+320;
  });
  addEventListener('keyup',e=>keys[e.key.length===1?e.key.toLowerCase():e.key]=false);addEventListener('blur',()=>Object.keys(keys).forEach(k=>keys[k]=false));
  canvas.addEventListener('pointerdown',e=>{canvas.focus({preventScroll:true});if(e.button!==0||!started)return;player.attackUntil=performance.now()+320;const target=nearestTarget();if(target)interact();});canvas.addEventListener('contextmenu',e=>e.preventDefault());
  document.getElementById('enterHouse').addEventListener('click',()=>{started=true;document.getElementById('experience').classList.add('is-playing');canvas.focus({preventScroll:true});});
  document.getElementById('closeModal').addEventListener('click',closeModal);document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  document.getElementById('resumeGame').addEventListener('click',()=>{paused=false;document.getElementById('escapeMenu').classList.remove('open');document.getElementById('escapeMenu').setAttribute('aria-hidden','true');});
  document.getElementById('exitToGameMenu').addEventListener('click',()=>{paused=false;started=false;room='bedroom';doorOpen=false;player.x=720;player.y=440;document.getElementById('escapeMenu').classList.remove('open');document.getElementById('escapeMenu').setAttribute('aria-hidden','true');document.getElementById('experience').classList.remove('is-playing');});
  document.getElementById('openGameSettings').addEventListener('click',e=>{const p=document.getElementById('gameSettings');p.hidden=!p.hidden;e.currentTarget.setAttribute('aria-expanded',String(!p.hidden));});
  const speedSetting=document.getElementById('lookSensitivity');speedSetting.addEventListener('input',()=>document.getElementById('sensitivityValue').textContent=`${speedSetting.value}×`);
  document.querySelectorAll('.touch-controls button').forEach(b=>{const a=b.dataset.action;b.addEventListener('pointerdown',e=>{e.preventDefault();if(a==='left')keys.a=true;if(a==='right')keys.d=true;if(a==='forward')keys.w=true;if(a==='back')keys.s=true;if(a==='use')interact();if(a==='attack'||a==='jump')player.attackUntil=performance.now()+320;});['pointerup','pointerleave','pointercancel'].forEach(n=>b.addEventListener(n,()=>{if(a==='left')keys.a=false;if(a==='right')keys.d=false;if(a==='forward')keys.w=false;if(a==='back')keys.s=false;}));});
  setTimeout(()=>{document.getElementById('loaderStatus').textContent='ROOM IS READY';document.getElementById('gameLoader').classList.add('is-ready');document.getElementById('loaderProgress').hidden=true;document.getElementById('gameMenuActions').hidden=false;},650);
  resize();addEventListener('resize',resize);requestAnimationFrame(loop);
})();
