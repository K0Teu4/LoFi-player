(function(){
'use strict';

var QUAL={m7:[0,3,7,10],maj7:[0,4,7,11],d7:[0,4,7,10],m9:[0,3,7,10,14],m6:[0,4,7,9],min:[0,3,7,10],maj:[0,4,7,11]};
var ENG_NAME={tape:'TAPE',piano:'PIANO',chip:'8-BIT',dub:'DUB',wave:'WAVE',bossa:'BOSSA',box:'BOX',phonk:'PHONK',jazz:'JAZZ',techno:'TECHNO',user:'MY SIDE',generated:'GENERATIVE'};
var PENT={min:[0,3,5,7,10],maj:[0,4,7,9,12]};
var ROOTS=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

var TRACKS=[
 {title:'night bus',engine:'tape',bpm:72,swing:.16,cutoff:2400,hiss:.012,dly:.31,dfb:.22,dur:'02:47',
  prog:[[57,'m7'],[53,'maj7'],[60,'maj7'],[55,'d7']],
  bass:[[0,0,6],[8,0,4],[14,12,2]],
  mel:[[0,2,2,1,6],[0,8,1,1,4],[0,14,3,1,2],[1,4,2,1,8],[1,12,1,1,4],[2,0,0,1,6],[2,10,2,1,6],[3,6,1,1,10]],
  drums:{kick:[0,10],odd:[7],snare:[4,12],hat:'eighths',open:[],fill:4}},
 {title:'rainy window',engine:'piano',bpm:66,swing:0,cutoff:2600,hiss:.008,dly:.34,dfb:.18,dur:'03:12',rain:true,
  prog:[[50,'m9'],[46,'maj7'],[43,'m7'],[45,'d7']],
  bass:[[0,0,15]],
  mel:[[0,4,2,1,8],[0,12,3,1,4],[1,0,2,1,10],[1,10,1,1,6],[2,6,0,1,8],[2,14,2,1,2],[3,0,1,1,14]],
  drums:null},
 {title:'paper moon',engine:'chip',bpm:104,swing:0,cutoff:7500,hiss:.004,dly:.19,dfb:.14,dur:'02:31',
  prog:[[60,'maj7'],[57,'m7'],[50,'m7'],[55,'d7']],
  bass:[[0,0,2],[2,0,2],[4,0,2],[6,12,2],[8,0,2],[10,0,2],[12,0,2],[14,12,2]],
  mel:[[0,0,0,2,2],[0,2,1,2,2],[0,4,2,2,4],[0,10,3,2,2],[0,12,2,2,4],[1,0,1,2,4],[1,8,0,2,4],[1,12,2,2,4],[2,0,2,2,4],[2,6,1,2,4],[2,12,0,2,4],[3,4,1,2,6],[3,12,0,2,4]],
  drums:{kick:[0,8],snare:[4,12],hat:'eighths',fill:8},arp:'16'},
 {title:'echo park',engine:'dub',bpm:74,swing:0,cutoff:2200,hiss:.014,dly:.405,dfb:.45,dur:'03:05',
  prog:[[52,'m7'],[48,'maj7'],[55,'maj7'],[47,'m7']],
  bass:[[0,0,6],[7,3,5],[12,7,3]],
  mel:[[0,10,0,1,4],[1,6,2,1,6],[2,0,1,1,8],[3,10,3,1,4]],
  drums:{kick:[8],snare:[8],hat:'eighths',open:[14],fill:0}},
 {title:'neon tram',engine:'wave',bpm:96,swing:0,cutoff:4500,hiss:.006,dly:.25,dfb:.3,dur:'02:58',
  prog:[[57,'m7'],[53,'maj7'],[48,'maj7'],[55,'d7']],
  bass:[],
  mel:[[0,0,0,2,4],[0,8,2,2,4],[1,4,1,2,6],[1,12,0,2,2],[2,0,3,1,4],[2,6,2,2,4],[3,0,1,2,8]],
  drums:{kick:[0,4,8,12],snare:[4,12],hat:'offbeats',fill:8}},
 {title:'bossa corner',engine:'bossa',bpm:92,swing:0,cutoff:3000,hiss:.008,dly:.3,dfb:.2,dur:'02:40',
  prog:[[50,'m9'],[55,'d7'],[48,'maj7'],[57,'m7']],
  bass:[[0,0,6],[8,7,6]],
  mel:[[0,6,2,1,4],[0,11,1,1,4],[1,3,0,1,6],[1,14,2,1,2],[2,0,1,1,6],[2,8,3,1,4],[3,6,0,1,8]],
  drums:{clave:[0,3,6,10,12],stab:[3,6,11,14],shaker:true}},
 {title:'sleep tape',engine:'box',bpm:58,swing:0,cutoff:2000,hiss:.006,dly:.45,dfb:.3,dur:'04:03',
  prog:[[60,'maj7'],[55,'m6'],[57,'m7'],[53,'maj7']],
  bass:[[0,0,12]],
  mel:[[0,8,0,2,10],[1,4,2,2,12],[2,0,1,3,10],[2,10,0,3,4],[3,6,2,2,16]],
  drums:null},
 {title:'midnight cowbell',engine:'phonk',bpm:138,swing:0,cutoff:3500,hiss:.006,dly:.22,dfb:.25,dur:'02:52',
  prog:[[57,'m7'],[53,'maj7'],[52,'d7'],[52,'d7']],
  bass:[[0,0,8],[10,0,4],[12,3,4]],
  mel:[[0,4,0,1,2],[0,8,0,1,2],[1,6,2,1,4],[2,0,0,1,2],[2,4,1,1,2],[3,8,2,1,4]],
  drums:{kick:[0,10],snare:[8],hat:'sixteenths',open:[],fill:4}},
 {title:'smoke ring',engine:'jazz',bpm:100,swing:.33,cutoff:2800,hiss:.01,dly:.28,dfb:.2,dur:'03:20',
  prog:[[50,'m7'],[55,'d7'],[48,'maj7'],[52,'d7']],
  bass:[],
  mel:[[0,8,2,1,4],[1,4,1,1,6],[2,0,0,1,4],[2,8,2,1,4],[3,6,1,1,6]],
  drums:{brush:[0,4,8,12]}},
 {title:'glass floor',engine:'techno',bpm:124,swing:0,cutoff:5000,hiss:.004,dly:.24,dfb:.3,dur:'03:33',
  prog:[[57,'m7'],[57,'m7'],[53,'maj7'],[55,'d7']],
  bass:[],
  mel:[],
  drums:{kick:[0,4,8,12],open:[2,6,10,14]}}
];

var POS=[
 {x:2,y:40,r:-8},{x:30,y:2,r:6},{x:45,y:1,r:-5},{x:58,y:5,r:9},{x:64,y:24,r:-7},
 {x:62,y:48,r:4},{x:68,y:72,r:-6},{x:46,y:80,r:5},{x:26,y:82,r:-4},{x:4,y:74,r:7}
];

function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
function hashSeed(str){
  var h = 2166136261;
  for(var i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function newRandomSeed(){
  var chars = 'abcdefghijkmnopqrstuvwxyz23456789';
  var s = '';
  for(var i=0;i<6;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return s;
}

var PROGRESSIONS = [
  [[0,'m7'],[5,'maj7'],[3,'maj7'],[7,'d7']],
  [[0,'m7'],[3,'maj7'],[5,'maj7'],[7,'d7']],
  [[0,'maj7'],[5,'maj7'],[3,'m7'],[7,'d7']],
  [[0,'m7'],[7,'maj7'],[5,'maj7'],[3,'m7']],
  [[0,'m9'],[5,'d7'],[3,'maj7'],[7,'m7']],
  [[0,'m7'],[5,'d7'],[1,'maj7'],[7,'m7']],
  [[0,'maj7'],[4,'m7'],[5,'m7'],[7,'d7']],
  [[0,'m7'],[0,'m7'],[5,'maj7'],[7,'d7']],
  [[0,'m7'],[5,'maj7'],[5,'maj7'],[7,'d7']],
  [[0,'maj7'],[5,'m7'],[3,'m7'],[7,'d7']],
  [[0,'m7'],[5,'maj7'],[1,'maj7'],[6,'d7']],
  [[0,'m7'],[3,'m7'],[5,'maj7'],[7,'d7']]
];

var MEL_POOL = [
  [[0,2,2,1,6],[0,8,1,1,4],[0,14,3,1,2],[1,4,2,1,8],[1,12,1,1,4],[2,0,0,1,6],[2,10,2,1,6],[3,6,1,1,10]],
  [[0,4,2,1,8],[0,12,3,1,4],[1,0,2,1,10],[1,10,1,1,6],[2,6,0,1,8],[2,14,2,1,2],[3,0,1,1,14]],
  [[0,0,0,2,2],[0,2,1,2,2],[0,4,2,2,4],[0,10,3,2,2],[0,12,2,2,4],[1,0,1,2,4],[1,8,0,2,4],[1,12,2,2,4],[2,0,2,2,4],[2,6,1,2,4],[2,12,0,2,4],[3,4,1,2,6],[3,12,0,2,4]],
  [[0,10,0,1,4],[1,6,2,1,6],[2,0,1,1,8],[3,10,3,1,4]],
  [[0,0,0,2,4],[0,8,2,2,4],[1,4,1,2,6],[1,12,0,2,2],[2,0,3,1,4],[2,6,2,2,4],[3,0,1,2,8]],
  [[0,6,2,1,4],[0,11,1,1,4],[1,3,0,1,6],[1,14,2,1,2],[2,0,1,1,6],[2,8,3,1,4],[3,6,0,1,8]],
  [[0,8,0,2,10],[1,4,2,2,12],[2,0,1,3,10],[2,10,0,3,4],[3,6,2,2,16]],
  [[0,4,0,1,2],[0,8,0,1,2],[1,6,2,1,4],[2,0,0,1,2],[2,4,1,1,2],[3,8,2,1,4]],
  [[0,8,2,1,4],[1,4,1,1,6],[2,0,0,1,4],[2,8,2,1,4],[3,6,1,1,6]]
];

var ENGINE_PARAMS = {
  tape:{bpmRange:[65,82],cutoff:2400,hiss:0.012,dly:0.31,dfb:0.22,weight:3},
  piano:{bpmRange:[60,78],cutoff:2600,hiss:0.008,dly:0.34,dfb:0.18,weight:2},
  chip:{bpmRange:[95,118],cutoff:7500,hiss:0.004,dly:0.19,dfb:0.14,weight:1},
  dub:{bpmRange:[65,85],cutoff:2200,hiss:0.014,dly:0.405,dfb:0.45,weight:2},
  wave:{bpmRange:[85,108],cutoff:4500,hiss:0.006,dly:0.25,dfb:0.3,weight:2},
  bossa:{bpmRange:[85,102],cutoff:3000,hiss:0.008,dly:0.3,dfb:0.2,weight:1},
  box:{bpmRange:[52,66],cutoff:2000,hiss:0.006,dly:0.45,dfb:0.3,weight:1},
  phonk:{bpmRange:[125,145],cutoff:3500,hiss:0.006,dly:0.22,dfb:0.25,weight:1},
  jazz:{bpmRange:[88,112],cutoff:2800,hiss:0.01,dly:0.28,dfb:0.2,weight:1},
  techno:{bpmRange:[115,132],cutoff:5000,hiss:0.004,dly:0.24,dfb:0.3,weight:2}
};

var ADJS = ['neon','rainy','night','paper','echo','glass','midnight','smoke','silent','lonely','quiet','warm','cold','blue','green','dusty','broken','faded','silver','golden','crystal','velvet','cosmic','urban','distant','hidden','soft','heavy','ancient','electric'];
var NOUNS = ['bus','window','moon','park','tram','corner','tape','bell','ring','floor','light','rain','road','station','bridge','room','door','street','clock','letter','dream','river','garden','signal','shadow','voice','mirror','ocean','forest','market'];

function generateTitle(rand){
  var a = ADJS[Math.floor(rand()*ADJS.length)];
  var n = NOUNS[Math.floor(rand()*NOUNS.length)];
  return a + ' ' + n;
}

function pickWeightedEngine(rand){
  var list = Object.keys(ENGINE_PARAMS);
  var total = 0;
  list.forEach(function(k){total += ENGINE_PARAMS[k].weight;});
  var r = rand() * total;
  for(var i=0;i<list.length;i++){
    r -= ENGINE_PARAMS[list[i]].weight;
    if(r<=0) return list[i];
  }
  return list[list.length-1];
}

function deepCloneDrums(d){
  if(!d) return null;
  var out = {};
  for(var k in d){
    if(Array.isArray(d[k])) out[k] = d[k].slice();
    else out[k] = d[k];
  }
  return out;
}

function generateTrack(seed){
  var rand = mulberry32(hashSeed(seed));
  var engine = pickWeightedEngine(rand);
  var params = ENGINE_PARAMS[engine];
  var bpmRange = params.bpmRange;
  var bpm = Math.floor(bpmRange[0] + rand()*(bpmRange[1]-bpmRange[0]));
  var root = 48 + Math.floor(rand()*12);
  var scale = rand() < 0.65 ? 'min' : 'maj';
  var baseProg = PROGRESSIONS[Math.floor(rand()*PROGRESSIONS.length)];
  var prog = baseProg.map(function(c){
    var q = c[1];
    if(scale==='maj'){
      if(q==='m7') q='maj7';
      else if(q==='m9') q='maj7';
      else if(q==='m6') q='maj7';
    } else {
      if(q==='maj7' && rand()<0.3) q='m7';
    }
    return [root + c[0], q];
  });
  var melTemplate = MEL_POOL[Math.floor(rand()*MEL_POOL.length)];
  var mel = melTemplate.map(function(ev){return ev.slice();});
  var source = null;
  for(var i=0;i<TRACKS.length;i++){
    if(TRACKS[i].engine===engine && !TRACKS[i].generated && !TRACKS[i].user){
      source = TRACKS[i]; break;
    }
  }
  var bass = source && source.bass ? source.bass.map(function(e){return e.slice();}) : [];
  var drums = deepCloneDrums(source ? source.drums : null);
  var swing = engine==='tape' ? 0.12+rand()*0.08 : (engine==='jazz' ? 0.25+rand()*0.15 : 0);
  var durSec = Math.floor(140 + rand()*130);
  var mm = String(Math.floor(durSec/60)).padStart(2,'0');
  var ss = String(durSec%60).padStart(2,'0');
  var dur = mm+':'+ss;
  var title = generateTitle(rand);
  return {
    title:title, engine:engine, bpm:bpm, swing:swing,
    cutoff:params.cutoff, hiss:params.hiss, dly:params.dly, dfb:params.dfb,
    dur:dur, prog:prog, bass:bass, mel:mel, drums:drums,
    generated:true, seed:seed
  };
}

function mfreq(m){return 440*Math.pow(2,(m-69)/12);}
function chordNotes(root,q){var iv=QUAL[q]||QUAL.m7;return iv.map(function(x){return root+x;});}
function parseDur(s){var p=s.split(':');return parseInt(p[0],10)*60+parseInt(p[1],10);}
function num(i){return String(i+1).padStart(2,'0');}
function mobile(){return window.matchMedia('(max-width:1080px)').matches;}

function loadDesk(){
  try{
    var raw=localStorage.getItem('orbita-desk');
    if(!raw)return null;
    return JSON.parse(raw);
  }catch(e){return null;}
}
var saved=loadDesk();
if(saved&&saved.user&&saved.user.cells){
  TRACKS.push({
    title:saved.user.title||'my side',engine:'user',base:saved.user.base||'tape',
    root:saved.user.root||57,qual:saved.user.qual||'min',
    bpm:saved.user.bpm||90,swing:0,cutoff:3200,hiss:.01,dly:.3,dfb:.25,dur:'01:36',
    cells:saved.user.cells,prog:[],bass:[],mel:[],drums:null
  });
}
var USER_IDX=-1;
for(var ui=0;ui<TRACKS.length;ui++){
  if(TRACKS[ui].engine==='user'){USER_IDX=ui;break;}
}

function $(s){return document.querySelector(s);}
var els={
  table:$('#table'),
  play:$('#playBtn'),stop:$('#stopBtn'),rew:$('#rewBtn'),ff:$('#ffBtn'),rec:$('#recBtn'),
  radio:$('#radioBtn'),seedValue:$('#seedValue'),seedCopy:$('#seedCopy'),seedNew:$('#seedNew'),
  vol:$('#vol'),status:$('#status'),tapeLabel:$('#tapeLabel'),cassette:$('#cassette'),
  cassNum:$('#cassNum'),cassEng:$('#cassEng'),
  lcdNum:$('#lcdNum'),lcdTitle:$('#lcdTitle'),lcdTime:$('#lcdTime'),
  counter:$('#counter'),spots:$('#spots'),drop:$('#dropZone'),
  walkman:$('#walkman'),jcard:$('#jcard'),phones:$('#phones'),
  reelL:$('#reelL'),reelR:$('#reelR'),spectrum:$('#spectrum'),led:$('#led'),
  rain:$('#rain'),hint:$('#playHint'),
  npTitle:$('#npTitle'),npEng:$('#npEng'),npBar:$('#npBar'),npTime:$('#npTime')
};
function setStatus(t){els.status.textContent=t;}
window.addEventListener('error',function(ev){setStatus('ошибка: '+ev.message);});

var installPrompt=null;
var installBtn=document.createElement('button');
installBtn.className='install';
installBtn.textContent='УСТАНОВИТЬ';
installBtn.title='установить как приложение';
installBtn.setAttribute('aria-label','Установить ORBITA как приложение');
installBtn.addEventListener('click',function(){
  if(!installPrompt)return;
  installPrompt.prompt();
  installPrompt.userChoice.finally(function(){installPrompt=null;installBtn.classList.remove('show');});
});
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  installPrompt=e;
  installBtn.classList.add('show');
  els.table.appendChild(installBtn);
});
var offlineBadge=document.createElement('div');
offlineBadge.className='offline';
offlineBadge.textContent='OFFLINE · КЭШ';
function refreshOffline(){
  offlineBadge.classList.toggle('show',!navigator.onLine);
  if(!navigator.onLine&&offlineBadge.parentNode!==els.table){els.table.appendChild(offlineBadge);}
}
window.addEventListener('online',refreshOffline);
window.addEventListener('offline',refreshOffline);
refreshOffline();

var bars=[];
(function(){
  for(var i=0;i<12;i++){
    var bar=document.createElement('div');bar.className='bar';
    els.spectrum.appendChild(bar);bars.push(bar);
  }
})();
(function(){
  for(var i=0;i<30;i++){
    var d=document.createElement('div');d.className='raindrop';
    d.style.left=Math.random()*100+'%';
    d.style.animationDuration=(1.2+Math.random()*1.8)+'s';
    d.style.animationDelay=(-Math.random()*3)+'s';
    d.style.opacity=0.25+Math.random()*0.35;
    els.rain.appendChild(d);
  }
})();
(function(){
  [els.play,els.stop,els.rew,els.ff,els.rec,els.radio,els.seedCopy,els.seedNew].forEach(function(btn){
    btn.addEventListener('click',function(e){
      var r=btn.getBoundingClientRect();
      var size=Math.max(r.width,r.height);
      var rip=document.createElement('span');
      rip.className='ripple';
      rip.style.width=rip.style.height=size+'px';
      rip.style.left=(e.clientX-r.left-size/2)+'px';
      rip.style.top=(e.clientY-r.top-size/2)+'px';
      btn.appendChild(rip);
      setTimeout(function(){rip.remove();},600);
    });
  });
})();
var strips=[];
(function(){
  for(var d=0;d<4;d++){
    var digit=document.createElement('span');digit.className='digit';
    var strip=document.createElement('span');strip.className='strip';
    for(var n=0;n<10;n++){var cell=document.createElement('i');cell.textContent=n;strip.appendChild(cell);}
    digit.appendChild(strip);els.counter.appendChild(digit);strips.push(strip);
  }
})();

function clampPos(x,y,w,h){
  var W=window.innerWidth,H=window.innerHeight;
  var minX=8,maxX=W-w-8,minY=8,maxY=H-h-44;
  var cx=maxX<minX?(W-w)/2:Math.max(minX,Math.min(maxX,x));
  var cy=maxY<minY?(H-h)/2:Math.max(minY,Math.min(maxY,y));
  return {x:cx,y:cy};
}
function wrapForDrag(el,key){
  var w=document.createElement('div');
  w.className='dragwrap';
  w.dataset.w=key;
  el.parentNode.insertBefore(w,el);
  w.appendChild(el);
  return w;
}
var wrapWalk=wrapForDrag(els.walkman,'walk');
var wrapCard=wrapForDrag(els.jcard,'card');
var wrapPhones=wrapForDrag(els.phones,'phones');
var wraps=[wrapWalk,wrapCard,wrapPhones];

var suppressClick=false;
function makeDraggable(w,ignoreSel){
  var st=null;
  w.addEventListener('pointerdown',function(e){
    if(mobile())return;
    if(ignoreSel&&e.target.closest(ignoreSel))return;
    var r=w.getBoundingClientRect();
    w.style.left=r.left+'px';
    w.style.top=r.top+'px';
    w.style.right='auto';
    st={sx:e.clientX,sy:e.clientY,bl:r.left,bt:r.top,drag:false,id:e.pointerId};
  });
  window.addEventListener('pointermove',function(e){
    if(!st||e.pointerId!==st.id)return;
    var dx=e.clientX-st.sx,dy=e.clientY-st.sy;
    if(!st.drag&&Math.abs(dx)+Math.abs(dy)<5)return;
    if(!st.drag){st.drag=true;w.classList.add('lift');}
    var p=clampPos(st.bl+dx,st.bt+dy,w.offsetWidth,w.offsetHeight);
    w.style.left=p.x+'px';
    w.style.top=p.y+'px';
  });
  window.addEventListener('pointerup',function(e){
    if(!st||e.pointerId!==st.id)return;
    var was=st.drag;
    st=null;
    w.classList.remove('lift');
    if(was){suppressClick=true;saveDesk();}
  });
  window.addEventListener('pointercancel',function(){
    if(!st)return;
    st=null;
    w.classList.remove('lift');
  });
}
makeDraggable(wrapWalk,'button, input');
makeDraggable(wrapCard,null);
makeDraggable(wrapPhones,null);

var cur=0,swapLock=false,anyDragged=false;
var spotEls=[],homes=[];
function intersects(a,b){
  return !(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom);
}
function buildSpot(i){
  var tr=TRACKS[i];
  var spot=document.createElement('div');
  spot.className='spot';
  if(POS[i]){
    spot.style.left=POS[i].x+'%';
    spot.style.top=POS[i].y+'%';
    spot.style.setProperty('--r',POS[i].r+'deg');
  } else {
    var W=Math.max(200,window.innerWidth-240);
    var H=Math.max(160,window.innerHeight-180);
    spot.style.left=(20+Math.random()*W)+'px';
    spot.style.top=(20+Math.random()*H)+'px';
    spot.style.setProperty('--r',(Math.random()*16-8)+'deg');
  }
  var b=document.createElement('button');
  b.type='button';
  b.className='box';
  b.dataset.eng=tr.engine;
  if(tr.generated) b.dataset.generated='true';
  b.title=tr.title+(tr.seed?' · seed: '+tr.seed:'');
  b.setAttribute('aria-label','Кассета '+num(i)+': '+tr.title);
  var rl=document.createElement('span');rl.className='bx-reel l';
  var rr=document.createElement('span');rr.className='bx-reel r';
  var lab=document.createElement('span');lab.className='bx-label';
  var n=document.createElement('span');n.className='bx-num';n.textContent=num(i);
  var t=document.createElement('span');t.className='bx-title';t.textContent=tr.title.toUpperCase();
  lab.appendChild(n);lab.appendChild(t);
  var gone=document.createElement('span');gone.className='bx-gone';gone.textContent='В ПЛЕЕРЕ';
  b.appendChild(rl);b.appendChild(rr);b.appendChild(lab);b.appendChild(gone);
  spot.appendChild(b);
  els.spots.appendChild(spot);
  spotEls[i]=spot;
  var st=null;
  b.addEventListener('pointerdown',function(e){
    if(mobile())return;
    if(spot.classList.contains('active'))return;
    st={
      sx:e.clientX,sy:e.clientY,
      bl:parseFloat(spot.style.left)||0,
      bt:parseFloat(spot.style.top)||0,
      drag:false,id:e.pointerId
    };
  });
  window.addEventListener('pointermove',function(e){
    if(!st||e.pointerId!==st.id)return;
    var dx=e.clientX-st.sx,dy=e.clientY-st.sy;
    if(!st.drag&&Math.abs(dx)+Math.abs(dy)<6)return;
    if(!st.drag){st.drag=true;anyDragged=true;spot.classList.add('lift');}
    var p=clampPos(st.bl+dx,st.bt+dy,180,110);
    spot.style.left=p.x+'px';
    spot.style.top=p.y+'px';
    els.drop.classList.toggle('drop-hover',intersects(spot.getBoundingClientRect(),els.drop.getBoundingClientRect()));
  });
  window.addEventListener('pointerup',function(e){
    if(!st||e.pointerId!==st.id)return;
    var wasDrag=st.drag;
    st=null;
    var r=spot.getBoundingClientRect();
    var over=intersects(r,els.drop.getBoundingClientRect());
    var onPlayer=intersects(r,wrapWalk.getBoundingClientRect());
    els.drop.classList.remove('drop-hover');
    spot.classList.remove('lift');
    if(!wasDrag){
      selectTrack(i);
      return;
    }
    suppressClick=true;
    anyDragged=true;
    if(over){
      selectTrack(i);
    }else if(onPlayer&&homes[i]){
      spot.style.left=homes[i].l+'px';
      spot.style.top=homes[i].t+'px';
    }
    saveDesk();
  });
  window.addEventListener('pointercancel',function(){
    if(!st)return;
    st=null;
    els.drop.classList.remove('drop-hover');
    spot.classList.remove('lift');
  });
  b.addEventListener('click',function(){
    if(suppressClick){suppressClick=false;return;}
    if(mobile()){selectTrack(i);}
  });
}
TRACKS.forEach(function(tr,i){buildSpot(i);});

function grow(r,p){return {l:r.left-p,t:r.top-p,r:r.right+p,b:r.bottom+p};}
function zoneRects(){
  return [
    grow(wrapWalk.getBoundingClientRect(),26),
    grow(wrapCard.getBoundingClientRect(),26),
    grow(wrapPhones.getBoundingClientRect(),18)
  ];
}
function settleItems(items){
  var zones=zoneRects();
  for(var it=0;it<180;it++){
    var moved=false;
    items.forEach(function(a){
      zones.forEach(function(z){
        var ox=Math.min(a.l+a.w,z.r)-Math.max(a.l,z.l);
        var oy=Math.min(a.t+a.h,z.b)-Math.max(a.t,z.t);
        if(ox>0&&oy>0){
          moved=true;
          if(ox<oy){a.l+=(a.l+a.w/2<(z.l+z.r)/2)?-ox-2:ox+2;}
          else{a.t+=(a.t+a.h/2<(z.t+z.b)/2)?-oy-2:oy+2;}
        }
      });
      items.forEach(function(c){
        if(c===a)return;
        var ox=Math.min(a.l+a.w,c.l+c.w)-Math.max(a.l,c.l);
        var oy=Math.min(a.t+a.h,c.t+c.h)-Math.max(a.t,c.t);
        if(ox>0&&oy>0){
          moved=true;
          if(ox<oy){var s=(a.l+a.w/2<c.l+c.w/2)?-1:1;a.l+=s*(ox/2+1);}
          else{var s2=(a.t+a.h/2<c.t+c.h/2)?-1:1;a.t+=s2*(oy/2+1);}
        }
      });
      var c2=clampPos(a.l,a.t,a.w,a.h);
      a.l=c2.x;a.t=c2.y;
    });
    if(!moved)break;
  }
}
function applyItems(items){
  items.forEach(function(a){
    a.el.style.left=a.l+'px';
    a.el.style.top=a.t+'px';
  });
  homes=items.map(function(a){return {l:a.l,t:a.t};});
}
function currentItems(){
  return spotEls.filter(Boolean).map(function(sp){
    var r=sp.getBoundingClientRect();
    return {el:sp,l:r.left,t:r.top,w:r.width,h:r.height};
  });
}
function initialLayout(){
  els.spots.classList.add('boot');
  var items=currentItems();
  settleItems(items);
  applyItems(items);
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){els.spots.classList.remove('boot');});
  });
}
function scatter(){
  var W=window.innerWidth,H=window.innerHeight;
  var items=spotEls.filter(Boolean).map(function(sp){
    var r=sp.getBoundingClientRect();
    return {
      el:sp,
      l:8+Math.random()*Math.max(40,W-r.width-16),
      t:8+Math.random()*Math.max(40,H-r.height-60),
      w:r.width,h:r.height
    };
  });
  settleItems(items);
  applyItems(items);
  anyDragged=true;
  saveDesk();
}
els.table.addEventListener('dblclick',function(e){
  if(mobile())return;
  if(e.target.closest('.spot, .dragwrap, button, input'))return;
  scatter();
});
function clampAll(){
  if(mobile())return;
  spotEls.forEach(function(sp){
    if(!sp)return;
    var l=parseFloat(sp.style.left),t=parseFloat(sp.style.top);
    if(isNaN(l)||isNaN(t))return;
    var p=clampPos(l,t,180,110);
    sp.style.left=p.x+'px';
    sp.style.top=p.y+'px';
  });
  wraps.forEach(function(w){
    if(w.style.left==='')return;
    var l=parseFloat(w.style.left),t=parseFloat(w.style.top);
    var p=clampPos(l,t,w.offsetWidth,w.offsetHeight);
    w.style.left=p.x+'px';
    w.style.top=p.y+'px';
  });
}

function saveDesk(){
  try{
    var userData=null;
    if(USER_IDX>-1&&TRACKS[USER_IDX].cells){
      userData={
        title:TRACKS[USER_IDX].title,
        base:TRACKS[USER_IDX].base,root:TRACKS[USER_IDX].root,
        qual:TRACKS[USER_IDX].qual,bpm:TRACKS[USER_IDX].bpm,
        cells:TRACKS[USER_IDX].cells
      };
    }
    localStorage.setItem('orbita-desk',JSON.stringify({
      spots:spotEls.filter(Boolean).map(function(sp){return {l:parseFloat(sp.style.left)||0,t:parseFloat(sp.style.top)||0};}),
      wraps:wraps.map(function(w){return w.style.left===''?null:{l:parseFloat(w.style.left)||0,t:parseFloat(w.style.top)||0};}),
      vol:els.vol.value,
      cur:cur,
      user:userData
    }));
  }catch(e){}
}
if(saved&&saved.spots&&saved.spots.length===spotEls.length){
  saved.spots.forEach(function(p,i){
    if(!spotEls[i])return;
    spotEls[i].style.left=p.l+'px';
    spotEls[i].style.top=p.t+'px';
  });
  homes=saved.spots.map(function(p){return {l:p.l,t:p.t};});
  if(saved.wraps&&saved.wraps.length===wraps.length){
    saved.wraps.forEach(function(p,i){
      if(!p)return;
      wraps[i].style.left=p.l+'px';
      wraps[i].style.top=p.t+'px';
      wraps[i].style.right='auto';
    });
  }
  if(saved.vol){els.vol.value=saved.vol;}
  if(typeof saved.cur==='number'&&saved.cur>=0&&saved.cur<TRACKS.length){cur=saved.cur;}
  anyDragged=true;
  clampAll();
}else{
  initialLayout();
}
window.addEventListener('resize',function(){
  if(mobile())return;
  if(!anyDragged){initialLayout();}
  clampAll();
});

var ctx=null,audioReady=false,RT=null;
var master=null,tapeBus=null,fxBus=null,tapeLP=null,tapeShaper=null,padBus=null,drumBus=null,revIn=null,noiseGain=null,delayNode=null,fbGain=null,lfoGain=null;
var noiseBuf=null,crackBuf=null,holdBuf=null,hissSrc=null,crackSrc=null,analyser=null,freqBuf=null;
var pw25=null,pw50=null,CURVES=null;

function volVal(){return Math.pow(Number(els.vol.value)/100,1.6)*0.9;}
function makeCurve(k){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.tanh(k*x)/Math.tanh(k);}
  return c;
}
function makeChipCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.max(-1,Math.min(1,Math.round(Math.tanh(1.6*x)*7)/7));}
  return c;
}
function makeIRFor(c){
  var len=Math.floor(c.sampleRate*1.8),ir=c.createBuffer(2,len,c.sampleRate);
  for(var ch=0;ch<2;ch++){var d=ir.getChannelData(ch);
    for(var i=0;i<len;i++){d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}}
  return ir;
}
function pulseWaveFor(c,duty){
  var n=24,real=new Float32Array(n),imag=new Float32Array(n);
  for(var i=1;i<n;i++){imag[i]=(2/(i*Math.PI))*Math.sin(i*Math.PI*duty);}
  return c.createPeriodicWave(real,imag);
}
function initAudio(){
  var AC=window.AudioContext||window.webkitAudioContext;
  ctx=new AC();
  CURVES={tape:makeCurve(2.2),piano:makeCurve(1.3),chip:makeChipCurve(),dub:makeCurve(1.8),wave:makeCurve(3),bossa:makeCurve(1.5),box:makeCurve(1.2),phonk:makeCurve(2.5),jazz:makeCurve(1.6),techno:makeCurve(2.8),user:makeCurve(2)};
  pw25=pulseWaveFor(ctx,.25);pw50=pulseWaveFor(ctx,.5);
  master=ctx.createGain();master.gain.value=volVal();
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=35;
  var comp=ctx.createDynamicsCompressor();
  comp.threshold.value=-18;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.18;
  master.connect(hp);hp.connect(comp);comp.connect(ctx.destination);
  analyser=ctx.createAnalyser();analyser.fftSize=64;analyser.smoothingTimeConstant=.72;
  freqBuf=new Uint8Array(analyser.frequencyBinCount);
  comp.connect(analyser);
  tapeLP=ctx.createBiquadFilter();tapeLP.type='lowpass';tapeLP.frequency.value=TRACKS[cur].cutoff;
  tapeShaper=ctx.createWaveShaper();tapeShaper.curve=CURVES[TRACKS[cur].engine]||CURVES.tape;tapeShaper.oversample='2x';
  tapeBus=ctx.createGain();tapeBus.connect(tapeLP);tapeLP.connect(tapeShaper);tapeShaper.connect(master);
  fxBus=ctx.createGain();fxBus.connect(master);
  padBus=ctx.createGain();padBus.connect(tapeBus);
  drumBus=ctx.createGain();drumBus.gain.value=.9;drumBus.connect(tapeBus);
  var lfo=ctx.createOscillator();lfo.frequency.value=.7;
  lfoGain=ctx.createGain();lfoGain.gain.value=4;lfo.connect(lfoGain);lfo.start();
  delayNode=ctx.createDelay(1);delayNode.delayTime.value=TRACKS[cur].dly;
  fbGain=ctx.createGain();fbGain.gain.value=TRACKS[cur].dfb;
  delayNode.connect(fbGain);fbGain.connect(delayNode);
  var dO=ctx.createGain();dO.gain.value=.5;delayNode.connect(dO);dO.connect(fxBus);
  revIn=ctx.createGain();
  var conv=ctx.createConvolver();conv.buffer=makeIRFor(ctx);
  var revO=ctx.createGain();revO.gain.value=.9;
  revIn.connect(conv);conv.connect(revO);revO.connect(fxBus);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);
  var nd=noiseBuf.getChannelData(0);
  for(var i2=0;i2<nd.length;i2++){nd[i2]=Math.random()*2-1;}
  crackBuf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  var cd=crackBuf.getChannelData(0);
  for(var j=0;j<cd.length;j++){var r=Math.random();
    cd[j]=r<.0004?(Math.random()*2-1)*.9:r<.002?(Math.random()*2-1)*.25:(Math.random()*2-1)*.008;}
  holdBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);
  var hd=holdBuf.getChannelData(0),hv=0;
  for(var k=0;k<hd.length;k++){if(k%24===0){hv=Math.random()*2-1;}hd[k]=hv;}
  noiseGain=ctx.createGain();noiseGain.gain.value=0;noiseGain.connect(master);
  RT={ctx:ctx,tape:tapeBus,pad:padBus,drum:drumBus,rev:revIn,dly:delayNode,lfo:lfoGain,pw25:pw25,pw50:pw50,offline:false};
}
function ensureAudio(){
  if(audioReady)return true;
  if(ctx){try{ctx.close();}catch(e){}ctx=null;}
  try{initAudio();audioReady=true;return true;}
  catch(e){setStatus('звук недоступен: '+e.message);return false;}
}
function sendRev(node,amt){var g=RT.ctx.createGain();g.gain.value=amt;node.connect(g);g.connect(RT.rev);}
function sendDly(node,amt){var g=RT.ctx.createGain();g.gain.value=amt;node.connect(g);g.connect(RT.dly);}
function haltBuses(){
  if(!audioReady)return;
  var t=ctx.currentTime;
  tapeBus.gain.setTargetAtTime(0,t,.03);
  fxBus.gain.setTargetAtTime(0,t,.03);
  fbGain.gain.cancelScheduledValues(t);
  fbGain.gain.setValueAtTime(0,t);
}
function resumeBuses(){
  if(!audioReady)return;
  var t=ctx.currentTime;
  tapeBus.gain.setTargetAtTime(1,t,.05);
  fxBus.gain.setTargetAtTime(1,t,.05);
  fbGain.gain.setTargetAtTime(TRACKS[cur].dfb,t,.05);
}
function resumeBusesFixed(fb){
  if(!audioReady)return;
  var t=ctx.currentTime;
  tapeBus.gain.setTargetAtTime(1,t,.05);
  fxBus.gain.setTargetAtTime(1,t,.05);
  fbGain.gain.setTargetAtTime(fb,t,.05);
}
function ensureStudioBuses(){
  if(!audioReady)return;
  resumeBusesFixed(.25);
}
function startNoise(){
  var tr=TRACKS[cur];
  hissSrc=ctx.createBufferSource();hissSrc.buffer=noiseBuf;hissSrc.loop=true;
  var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=6000;
  var hg=ctx.createGain();hg.gain.value=tr.hiss;
  hissSrc.connect(lp);lp.connect(hg);hg.connect(noiseGain);
  crackSrc=ctx.createBufferSource();crackSrc.buffer=crackBuf;crackSrc.loop=true;
  var cg=ctx.createGain();cg.gain.value=tr.engine==='tape'?.5:.1;
  crackSrc.connect(cg);cg.connect(noiseGain);
  hissSrc.start();crackSrc.start();
  noiseGain.gain.setTargetAtTime(1,ctx.currentTime,.1);
}
function stopNoise(){
  if(!hissSrc)return;
  var t=ctx.currentTime;
  noiseGain.gain.setTargetAtTime(0,t,.08);
  hissSrc.stop(t+.3);crackSrc.stop(t+.3);
  hissSrc=null;crackSrc=null;
}
function motor(up){
  if(!audioReady)return;
  var t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
  o.type='sawtooth';f.type='lowpass';f.frequency.value=800;
  if(up){o.frequency.setValueAtTime(28,t);o.frequency.exponentialRampToValueAtTime(95,t+.14);
    g.gain.setValueAtTime(.09,t);g.gain.exponentialRampToValueAtTime(.0001,t+.2);}
  else{o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(24,t+.45);
    g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.0001,t+.5);}
  o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.6);
}
function ejectSfx(){
  if(!audioReady)return;
  var t=ctx.currentTime,s=ctx.createBufferSource();s.buffer=holdBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900;
  var g=ctx.createGain();env(g,t,.002,.09,.12);
  s.connect(bp);bp.connect(g);g.connect(master);
  s.start(t);s.stop(t+.2);
}
function insertSfx(){
  if(!audioReady)return;
  var t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
  o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(55,t+.08);
  env(g,t,.002,.16,.12);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+.2);
}
function makeOsc(type,freq,t){var o=RT.ctx.createOscillator();o.type=type;o.frequency.value=freq;return o;}
function env(g,t,a,peak,dec){
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(peak,t+a);
  g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);
}
function makePan(v){
  if(typeof RT.ctx.createStereoPanner==='function'){var p=RT.ctx.createStereoPanner();p.pan.value=v;return p;}
  return null;
}
function route(node,out,p,rev){
  var tail=node;
  if(p){var pn=makePan(p);if(pn){node.connect(pn);tail=pn;}}
  tail.connect(out);
  if(rev){sendRev(tail,rev);}
}
function pad(notes,t,dur,low){
  notes.forEach(function(m,i){
    [-4,4].forEach(function(det){
      var o=makeOsc('triangle',mfreq(m),t);
      o.detune.value=det+(Math.random()*6-3);RT.lfo.connect(o.detune);
      var g=RT.ctx.createGain();env(g,t,.05,.045,dur*.9);
      o.connect(g);route(g,RT.pad,i%2?-0.25:0.25,i===0?0.12:0);
      o.start(t);o.stop(t+dur+.1);
    });
    if(low&&i===0){
      var s=makeOsc('sine',mfreq(m-12),t);
      var sg=RT.ctx.createGain();
      sg.gain.setValueAtTime(.0001,t);
      sg.gain.linearRampToValueAtTime(.055,t+dur*.4);
      sg.gain.exponentialRampToValueAtTime(.0001,t+dur);
      s.connect(sg);sg.connect(RT.pad);
      s.start(t);s.stop(t+dur+.1);
    }
  });
}
function sawPad(notes,t,dur){
  var f=RT.ctx.createBiquadFilter();f.type='lowpass';f.Q.value=6;
  f.frequency.setValueAtTime(350,t);
  f.frequency.linearRampToValueAtTime(1600,t+dur*.5);
  f.frequency.linearRampToValueAtTime(500,t+dur);
  var g=RT.ctx.createGain();env(g,t,.08,.05,dur*.95);
  f.connect(g);route(g,RT.tape,0,.2);
  notes.forEach(function(m){
    [-8,8].forEach(function(det){
      var o=RT.ctx.createOscillator();o.type='sawtooth';o.frequency.value=mfreq(m);o.detune.value=det;
      o.connect(f);o.start(t);o.stop(t+dur+.1);
    });
  });
}
function technoStab(notes,t){
  notes.forEach(function(m,i){
    var o=RT.ctx.createOscillator();o.type='sawtooth';o.frequency.value=mfreq(m);
    var lp=RT.ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;
    var g=RT.ctx.createGain();env(g,t,.01,.05,.25);
    o.connect(lp);lp.connect(g);route(g,RT.tape,i%2?-.3:.3,.2);
    o.start(t);o.stop(t+.4);
  });
}
function sweep(t,dur){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;s.loop=true;
  var lp=RT.ctx.createBiquadFilter();lp.type='lowpass';
  lp.frequency.setValueAtTime(300,t);
  lp.frequency.linearRampToValueAtTime(5500,t+dur*.8);
  lp.frequency.linearRampToValueAtTime(400,t+dur);
  var g=RT.ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(.04,t+dur*.7);
  g.gain.linearRampToValueAtTime(.0001,t+dur);
  s.connect(lp);lp.connect(g);g.connect(RT.tape);
  s.start(t);s.stop(t+dur+.1);
}
function bassNote(m,t,dur){
  var o=makeOsc('sine',mfreq(m),t);
  var g=RT.ctx.createGain();env(g,t,.01,.28,dur);
  o.connect(g);g.connect(RT.tape);o.start(t);o.stop(t+dur+.1);
}
function technoBass(m,t){
  var o=RT.ctx.createOscillator();o.type='square';o.frequency.value=mfreq(m);
  var g=RT.ctx.createGain();env(g,t,.004,.11,.1);
  o.connect(g);g.connect(RT.tape);o.start(t);o.stop(t+.18);
}
function dubBass(m,t,dur){
  var o=makeOsc('sine',mfreq(m),t);
  o.frequency.setValueAtTime(mfreq(m)*0.93,t);
  o.frequency.exponentialRampToValueAtTime(mfreq(m),t+.09);
  var g=RT.ctx.createGain();env(g,t,.01,.32,dur);
  o.connect(g);g.connect(RT.tape);o.start(t);o.stop(t+dur+.1);
}
function waveBass(m,t){
  var o=RT.ctx.createOscillator();o.type='square';o.frequency.value=mfreq(m);
  var g=RT.ctx.createGain();env(g,t,.005,.15,.16);
  o.connect(g);g.connect(RT.tape);o.start(t);o.stop(t+.25);
}
function tapeMel(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=RT.ctx.createGain();env(g,t,.005,.12,.45);
  o.connect(g);route(g,RT.tape,0,.5);
  sendDly(g,.35);
  o.start(t);o.stop(t+.6);
}
function dubMel(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=RT.ctx.createGain();env(g,t,.005,.1,.4);
  o.connect(g);route(g,RT.tape,.15,.4);
  sendDly(g,.8);
  o.start(t);o.stop(t+.5);
}
function cowbell(m,t){
  var o=makeOsc('square',mfreq(m),t);
  var o2=makeOsc('square',mfreq(m)*1.47,t);
  var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1100;bp.Q.value=2.5;
  var g=RT.ctx.createGain();env(g,t,.002,.09,.16);
  o.connect(bp);o2.connect(bp);bp.connect(g);
  route(g,RT.tape,0,.25);
  sendDly(g,.3);
  o.start(t);o2.start(t);o.stop(t+.3);o2.stop(t+.3);
}
function nylon(m,t,dur,vel){
  var o=makeOsc('sine',mfreq(m),t);
  var o2=makeOsc('triangle',mfreq(m)*2,t);
  var g2=RT.ctx.createGain();g2.gain.value=.2;
  var g=RT.ctx.createGain();env(g,t,.004,vel,dur);
  o.connect(g);o2.connect(g2);g2.connect(g);
  route(g,RT.tape,(Math.random()-.5)*.4,.35);
  o.start(t);o2.start(t);o.stop(t+dur+.1);o2.stop(t+dur+.1);
}
function boxNote(m,t,dur,vel){
  var f=mfreq(m);
  var g=RT.ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(vel,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  var o1=makeOsc('sine',f,t);
  var o2=makeOsc('sine',f*2,t);var g2=RT.ctx.createGain();g2.gain.value=.5;
  var o3=makeOsc('sine',f*4,t);var g3=RT.ctx.createGain();g3.gain.value=.15;
  o1.connect(g);o2.connect(g2);g2.connect(g);o3.connect(g3);g3.connect(g);
  route(g,RT.tape,(Math.random()-.5)*.4,.85);
  o1.start(t);o2.start(t);o3.start(t);
  o1.stop(t+dur+.1);o2.stop(t+dur+.1);o3.stop(t+dur+.1);
}
function pianoNote(m,t,dur,vel){
  var f=mfreq(m);
  var g=RT.ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(vel,t+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  var o1=makeOsc('sine',f,t);
  var o2=makeOsc('sine',f*2,t);var g2=RT.ctx.createGain();g2.gain.value=.28;
  var o3=makeOsc('sine',f*3,t);var g3=RT.ctx.createGain();g3.gain.value=.07;
  o1.connect(g);o2.connect(g2);g2.connect(g);o3.connect(g3);g3.connect(g);
  route(g,RT.tape,(Math.random()-.5)*.3,.75);
  o1.start(t);o2.start(t);o3.start(t);
  o1.stop(t+dur+.1);o2.stop(t+dur+.1);o3.stop(t+dur+.1);
}
function rollChord(notes,t){
  notes.forEach(function(m,i){pianoNote(m,t+i*.05+Math.random()*.02,2.8,.07);});
}
function stab(notes,t){
  notes.forEach(function(m,i){
    var o=makeOsc('triangle',mfreq(m),t);
    var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900;bp.Q.value=.8;
    var g=RT.ctx.createGain();env(g,t,.004,.06,.14);
    o.connect(bp);bp.connect(g);route(g,RT.tape,i%2?-.3:.3,.5);
    sendDly(g,.6);
    o.start(t);o.stop(t+.25);
  });
}
function chipVoice(m,t,dur,vel){
  var o=RT.ctx.createOscillator();o.setPeriodicWave(RT.pw25);o.frequency.value=mfreq(m);
  var g=RT.ctx.createGain();env(g,t,.004,vel,dur);
  o.connect(g);route(g,RT.tape,0,.1);
  o.start(t);o.stop(t+dur+.05);
}
function chipLead(m,t,dur){
  var f=mfreq(m);
  var o=RT.ctx.createOscillator();o.setPeriodicWave(RT.pw50);
  o.frequency.setValueAtTime(f*0.891,t);
  o.frequency.exponentialRampToValueAtTime(f,t+.06);
  var g=RT.ctx.createGain();env(g,t,.006,.065,dur);
  o.connect(g);route(g,RT.tape,0,.16);
  o.start(t);o.stop(t+dur+.1);
}
function chipBass(m,t,dur){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=RT.ctx.createGain();env(g,t,.006,.18,dur);
  o.connect(g);g.connect(RT.tape);
  o.start(t);o.stop(t+dur+.05);
}
function waveLead(m,t,dur){
  var o=RT.ctx.createOscillator();o.setPeriodicWave(RT.pw50);o.frequency.value=mfreq(m);
  var vib=RT.ctx.createOscillator();vib.frequency.value=5.5;
  var vg=RT.ctx.createGain();vg.gain.value=10;
  vib.connect(vg);vg.connect(o.detune);
  var g=RT.ctx.createGain();env(g,t,.01,.075,dur);
  o.connect(g);route(g,RT.tape,0,.3);
  o.start(t);vib.start(t);
  o.stop(t+dur+.1);vib.stop(t+dur+.1);
}
function kick(t,vel){
  var o=makeOsc('sine',120,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);
  var g=RT.ctx.createGain();env(g,t,.005,vel,.28);
  o.connect(g);g.connect(RT.drum);o.start(t);o.stop(t+.4);
  RT.pad.gain.setValueAtTime(1,t);
  RT.pad.gain.linearRampToValueAtTime(.78,t+.02);
  RT.pad.gain.linearRampToValueAtTime(1,t+.3);
  beat();
}
function snare(t,vel,rev){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800;
  var g=RT.ctx.createGain();env(g,t,.005,vel,.18);
  s.connect(bp);bp.connect(g);route(g,RT.drum,0,rev||.25);
  s.start(t);s.stop(t+.3);
}
function trapSnare(t){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2800;
  var g=RT.ctx.createGain();env(g,t,.002,.3,.12);
  s.connect(bp);bp.connect(g);g.connect(RT.drum);
  s.start(t);s.stop(t+.2);
  var o=makeOsc('sine',200,t);
  var g2=RT.ctx.createGain();env(g2,t,.002,.15,.08);
  o.connect(g2);g2.connect(RT.drum);o.start(t);o.stop(t+.12);
}
function hat(t,vel,open){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;
  var hp=RT.ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=6500;
  var g=RT.ctx.createGain();env(g,t,.002,vel,open?.22:.045);
  s.connect(hp);hp.connect(g);route(g,RT.drum,.3,0);
  s.start(t);s.stop(t+(open?.3:.08));
}
function trapHat(t,vel){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;
  var hp=RT.ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=8000;
  var g=RT.ctx.createGain();env(g,t,.001,vel,.03);
  s.connect(hp);hp.connect(g);g.connect(RT.drum);
  s.start(t);s.stop(t+.06);
}
function brush(t,vel){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=3500;bp.Q.value=.6;
  var g=RT.ctx.createGain();env(g,t,.004,vel,.12);
  s.connect(bp);bp.connect(g);route(g,RT.drum,0,.2);
  s.start(t);s.stop(t+.2);
}
function chipKick(t){
  var o=makeOsc('square',300,t);o.frequency.exponentialRampToValueAtTime(50,t+.07);
  var g=RT.ctx.createGain();env(g,t,.003,.3,.12);
  o.connect(g);g.connect(RT.drum);o.start(t);o.stop(t+.2);
  beat();
}
function chipSnare(t,vel){
  var s=RT.ctx.createBufferSource();s.buffer=holdBuf;
  var bp=RT.ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2600;
  var g=RT.ctx.createGain();env(g,t,.002,vel,.1);
  s.connect(bp);bp.connect(g);g.connect(RT.drum);
  s.start(t);s.stop(t+.15);
}
function chipHat(t,vel){
  var s=RT.ctx.createBufferSource();s.buffer=holdBuf;
  var hp=RT.ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=6000;
  var g=RT.ctx.createGain();env(g,t,.001,vel,.03);
  s.connect(hp);hp.connect(g);g.connect(RT.drum);
  s.start(t);s.stop(t+.06);
}
function rim(t,vel){
  var o=makeOsc('square',1200,t);
  var g=RT.ctx.createGain();env(g,t,.001,vel,.03);
  o.connect(g);g.connect(RT.drum);o.start(t);o.stop(t+.06);
}
function rainSwell(t,dur){
  var s=RT.ctx.createBufferSource();s.buffer=noiseBuf;s.loop=true;
  var lp=RT.ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;
  var g=RT.ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(.035,t+dur*.35);
  g.gain.linearRampToValueAtTime(.0001,t+dur);
  s.connect(lp);lp.connect(g);route(g,RT.tape,0,.5);
  s.start(t);s.stop(t+dur+.1);
}
function beat(){
  if(RT&&RT.offline)return;
  els.led.classList.add('beat');
  setTimeout(function(){els.led.classList.remove('beat');},70);
}
function melVoiceFor(b,note,t,len){
  if(b==='tape'){tapeMel(note,t);}
  else if(b==='dub'){dubMel(note,t);}
  else if(b==='chip'){chipLead(note,t,len);}
  else if(b==='wave'){waveLead(note,t,len);}
  else if(b==='bossa'){nylon(note,t,len,.14);}
  else if(b==='box'){boxNote(note,t,len,.22);}
  else if(b==='phonk'){cowbell(note,t);}
  else if(b==='techno'){chipVoice(note,t,len,.05);}
  else{pianoNote(note,t,len,.3);}
}
function auditionNote(idx){
  if(!ensureAudio())return;
  if(ctx.state==='suspended'){ctx.resume();}
  ensureStudioBuses();
  melVoiceFor(rec.base,rec.root+PENT[rec.qual][idx],ctx.currentTime,stepDurRec()*3);
}
function playBaseDrums(b,s,t,root,qual){
  var ch=chordNotes(root,qual);
  if(b==='tape'){
    if(s===0||s===10)kick(t,.85);
    if(s===4||s===12)snare(t,.45);
    if(s%2===0)hat(t,.08,false);
  }else if(b==='chip'){
    if(s===0||s===8)chipKick(t);
    if(s===4||s===12)chipSnare(t,.2);
    if(s%2===0)chipHat(t,.04);
  }else if(b==='dub'){
    if(s===8){kick(t,.8);rim(t,.14);}
    if(s%2===0)hat(t,.045,false);
    if(s===2||s===6||s===10||s===14)stab(ch,t);
  }else if(b==='wave'){
    if(s%4===0)kick(t,.95);
    if(s%4===2)hat(t,.09,true);
    trapHat(t,.028);
  }else if(b==='bossa'){
    if([0,3,6,10,12].indexOf(s)>-1)rim(t,.09);
    if(s%2===0)hat(t,.03,false);
    if(s===3||s===6||s===11||s===14)stab(ch,t);
  }else if(b==='phonk'){
    if(s===0||s===10)kick(t,.9);
    if(s===8)trapSnare(t);
    trapHat(t,s%4===0?.06:.04);
  }else if(b==='jazz'){
    if(s%4===0)brush(t,s%8===4?.07:.045);
  }else if(b==='techno'){
    if(s%4===0)kick(t,.95);
    if(s%4===2)hat(t,.09,true);
    trapHat(t,.028);
    technoBass(root-24,t);
  }else{
    if(s%4===0)hat(t,.03,false);
  }
}

var playing=false,started=false,step=0,bar=0,nextTime=0,timer=null,stepDur=.2,playSec=0;
var barChord=chordNotes(TRACKS[0].prog[0][0],TRACKS[0].prog[0][1]);
var barRoot=TRACKS[0].prog[0][0];

function tourEvent(name){
  if(window.CustomEvent){window.dispatchEvent(new CustomEvent(name));}
}

function scheduleStep(s,t){
  var tr=TRACKS[cur],eng=tr.engine;
  if(eng==='user'){
    var b=tr.base;
    if(s===0){
      barRoot=tr.root;barChord=chordNotes(tr.root,tr.qual);
      pad(barChord,t,stepDur*16*.98,b==='box'||b==='wave');
      bassNote(tr.root-12,t,stepDur*6);
    }
    if(s===8){bassNote(tr.root-12,t,stepDur*4);}
    playBaseDrums(b,s,t,tr.root,tr.qual);
    var pos=(bar%2)*16+s;
    tr.cells.forEach(function(c){
      if(c.s===pos){
        melVoiceFor(b,tr.root+PENT[tr.qual][c.i],t,stepDur*3);
      }
    });
    return;
  }
  if(s===0){
    var pr=tr.prog[bar%tr.prog.length];
    barRoot=pr[0];barChord=chordNotes(pr[0],pr[1]);
    if(eng==='tape'){pad(barChord,t,stepDur*16*.98,false);}
    if(eng==='wave'){sawPad(barChord,t,stepDur*16*.98);}
    if(eng==='piano'){rollChord(barChord,t);if(tr.rain){rainSwell(t,stepDur*16);}}
    if(eng==='box'&&bar%2===0){pad(barChord,t,stepDur*32*.9,true);}
    if(eng==='techno'&&bar%2===0){technoStab(barChord,t);}
    if(eng==='techno'&&bar%8===6){sweep(t,stepDur*32);}
    if(eng==='piano'||eng==='box'||eng==='bossa'){pianoNote(barRoot-12,t,stepDur*10,.3);}
    if(eng==='jazz'){
      var offs=(pr[1]==='m7'||pr[1]==='m9')?[0,3,7,10]:[0,4,7,9];
      [0,4,8,12].forEach(function(st,ix){
        var off=offs[ix];
        if(st===12){
          var nq=tr.prog[(bar+1)%tr.prog.length];
          off=nq[0]-pr[0];
          if(off>6){off-=12;}
          if(off<-6){off+=12;}
        }
        bassNote(barRoot+off-12,t+st*stepDur+(st%2?stepDur*tr.swing:0),stepDur*3.4);
      });
      [3,6,10,14].forEach(function(st){
        if(Math.random()<.35){pianoNote(barChord[Math.floor(Math.random()*barChord.length)]+12,t+st*stepDur,.6,.1);}
      });
    }
    tr.bass.forEach(function(ev){
      var bt=t+ev[0]*stepDur+(ev[0]%2?stepDur*tr.swing:0);
      var note=barRoot+ev[1]-12;
      var len=ev[2]*stepDur;
      if(eng==='dub'||eng==='phonk'){dubBass(note,bt,len);}
      else if(eng==='chip'){chipBass(note,bt,len);}
      else if(eng==='tape'||eng==='bossa'){bassNote(note,bt,len);}
    });
    var b4=bar%4;
    tr.mel.forEach(function(ev){
      if(ev[0]!==b4)return;
      var st=ev[1];
      var mt=t+st*stepDur+(st%2?stepDur*tr.swing:0);
      var note=barChord[ev[2]%barChord.length]+12*ev[3];
      var len=ev[4]*stepDur;
      if(eng==='tape'){tapeMel(note,mt);}
      else if(eng==='dub'){dubMel(note,mt);}
      else if(eng==='chip'){chipLead(note,mt,len);}
      else if(eng==='wave'){waveLead(note,mt,len);}
      else if(eng==='bossa'){nylon(note,mt,len,.14);}
      else if(eng==='box'){boxNote(note,mt,len,.22);}
      else if(eng==='phonk'){cowbell(note,mt);}
      else{pianoNote(note,mt,len,.3);}
    });
  }
  if(eng==='chip'&&tr.arp==='16'){chipVoice(barChord[step%barChord.length]+12,t,stepDur*.85,.035);}
  if(eng==='wave'&&s%2===0){waveBass(barRoot+(s%8===0?-24:-12),t);}
  if(eng==='techno'){
    if(s%4===0){kick(t,.95);}
    if(s%4===2){hat(t,.09,true);}
    trapHat(t,.028);
    technoBass(barRoot+(s%8===6?-12:-24),t);
    return;
  }
  if(eng==='dub'&&(s===2||s===6||s===10||s===14)){stab(barChord,t);}
  if(eng==='bossa'&&tr.drums){
    if(tr.drums.clave.indexOf(s)>-1)rim(t,.09);
    if(tr.drums.stab.indexOf(s)>-1)stab(barChord,t);
    if(s%2===0)hat(t,.03,false);
    return;
  }
  if(eng==='jazz'&&tr.drums){
    if(tr.drums.brush.indexOf(s)>-1)brush(t,s%8===4?.07:.045);
    if(s===14&&bar%2===1)brush(t,.06);
    return;
  }
  if(!tr.drums)return;
  var d=tr.drums;
  if(eng==='tape'&&bar%16===15)return;
  if(d.kick.indexOf(s)>-1||(bar%2===1&&d.odd&&d.odd.indexOf(s)>-1)){
    if(eng==='tape'){kick(t,.85+Math.random()*.1);}
    else if(eng==='chip'){chipKick(t);}
    else if(eng==='phonk'){kick(t,.9);}
  }
  if(d.snare.indexOf(s)>-1){
    if(eng==='tape'){snare(t,.45);}
    else if(eng==='chip'){chipSnare(t,.2);}
    else if(eng==='dub'){rim(t,.14);snare(t,.2,.5);}
    else if(eng==='wave'){snare(t,.3,.4);}
    else if(eng==='phonk'){trapSnare(t);}
  }
  if(d.fill&&bar%d.fill===d.fill-1&&s>=12){
    if(eng==='tape'){snare(t,.12);}
    else if(eng==='chip'){chipHat(t,.07);}
    else if(eng==='phonk'){trapHat(t+stepDur*.5,.05);}
  }
  if(d.open&&d.open.indexOf(s)>-1&&(eng==='dub'?bar%2===1:true)){hat(t,.1,true);}
  if(eng==='chip'){
    if(d.hat==='eighths'&&s%2===0)chipHat(t,.04);
  }else if(eng==='wave'){
    if(d.hat==='offbeats'&&s%4===2)chipHat(t,.05);
  }else if(eng==='dub'){
    if(s%2===0)hat(t,.045,false);
  }else if(eng==='phonk'){
    trapHat(t,s%4===0?.06:.04);
  }else{
    if(d.hat==='eighths'&&s%2===0&&Math.random()>.1)hat(t,.08+Math.random()*.06,false);
    if(d.hat==='sixteenths')hat(t,.035+Math.random()*.03,false);
  }
}
function tickScheduler(){
  if(!audioReady)return;
  var sw=TRACKS[cur].swing;
  while(nextTime<ctx.currentTime+.15){
    scheduleStep(step,nextTime+(step%2?stepDur*sw:0));
    nextTime+=stepDur;step++;
    if(step===16){step=0;bar++;}
  }
}

var rec={mode:'off',arm:false,base:'tape',root:57,qual:'min',bpm:90,cells:[],timer:null,next:0,loopStep:0,t0:0};
var studio=null,gridCells=[],gridLabs=[],padEls=[],stUI={};
function stepDurRec(){return 60/rec.bpm/4;}
function cellAt(s,i){
  for(var k=0;k<rec.cells.length;k++){
    if(rec.cells[k].s===s&&rec.cells[k].i===i){return k;}
  }
  return -1;
}
function refreshGrid(){
  for(var i=0;i<5;i++){
    for(var s=0;s<32;s++){
      gridCells[i][s].classList.toggle('on',cellAt(s,i)>-1);
    }
  }
}
function flashCell(i,s){
  var c=gridCells[i][s];
  c.classList.add('flash');
  setTimeout(function(){c.classList.remove('flash');},160);
}
function padNames(){
  for(var i=0;i<5;i++){
    var name=ROOTS[(rec.root-48+PENT[rec.qual][i])%12];
    padEls[i].querySelector('span').textContent=name;
    gridLabs[i].textContent=name;
  }
}
function syncStudioChips(){
  stUI.eng.querySelectorAll('.st-chip').forEach(function(c){
    c.classList.toggle('on',c.dataset.k===rec.base);
  });
  stUI.root.querySelectorAll('.st-chip').forEach(function(c){
    c.classList.toggle('on',Number(c.dataset.k)===rec.root);
  });
  stUI.qual.querySelectorAll('.st-chip').forEach(function(c){
    c.classList.toggle('on',c.dataset.k===rec.qual);
  });
  stUI.bpm.value=rec.bpm;
  stUI.bpmVal.textContent=rec.bpm+' bpm';
  stUI.title.value=(USER_IDX>-1&&TRACKS[USER_IDX].engine==='user')?TRACKS[USER_IDX].title:'my side';
}
function syncStudioTransport(){
  var looping=rec.mode==='play'||rec.mode==='rec'||rec.mode==='count';
  stUI.loop.textContent=looping?'LOOP · СТОП':'LOOP · СЛУШАТЬ';
  stUI.recBtn.textContent=rec.mode==='rec'?'REC · СТОП':(rec.mode==='count'?'REC · ОТМЕНА':'REC · ЗАПИСЬ');
  stUI.count.textContent=rec.mode==='count'?'счётчик…':(rec.mode==='rec'?'идёт запись':(rec.arm?'rec с нового такта':''));
  stUI.undo.textContent='UNDO ('+rec.cells.length+')';
  els.rec.classList.toggle('on',rec.mode==='rec'||rec.mode==='count');
}
function recStopTransport(){
  rec.mode='off';
  rec.arm=false;
  if(rec.timer){clearInterval(rec.timer);rec.timer=null;}
  haltBuses();
  clearHead();
  syncStudioTransport();
}
function recStart(mode){
  if(!ensureAudio())return;
  if(ctx.state==='suspended'){ctx.resume();}
  rec.mode=mode;
  rec.arm=false;
  rec.loopStep=0;
  rec.t0=ctx.currentTime+.15;
  rec.next=rec.t0;
  resumeBusesFixed(.25);
  if(rec.timer){clearInterval(rec.timer);}
  rec.timer=setInterval(recTick,30);
  syncStudioTransport();
  setStatus(mode==='count'?'счётчик · и запись':'петля играет · правьте сетку и пэды');
}
function recTick(){
  if(!audioReady)return;
  var sd=stepDurRec();
  while(rec.next<ctx.currentTime+.15){
    var t=rec.next;
    var s=rec.loopStep%16;
    var pos=(Math.floor(rec.loopStep/16)%2)*16+s;
    if(rec.mode==='count'){
      if(s%4===0){rim(t,.3);hat(t,.05,false);}
    }else{
      if(s===0){
        pad(chordNotes(rec.root,rec.qual),t,sd*16*.98,false);
        bassNote(rec.root-12,t,sd*6);
      }
      if(s===8){bassNote(rec.root-12,t,sd*4);}
      playBaseDrums(rec.base,s,t,rec.root,rec.qual);
      rec.cells.forEach(function(c){
        if(c.s===pos){melVoiceFor(rec.base,rec.root+PENT[rec.qual][c.i],t,sd*3);}
      });
    }
    rec.loopStep++;
    rec.next+=sd;
    if(rec.mode==='count'&&rec.loopStep===16){
      rec.mode='rec';
      rec.loopStep=0;
      rec.t0=rec.next;
      syncStudioTransport();
      setStatus('идёт запись · играйте на пэдах');
    }
    if(rec.mode==='play'&&rec.arm&&s===15){
      rec.mode='rec';
      rec.loopStep=0;
      rec.t0=rec.next;
      rec.arm=false;
      syncStudioTransport();
      setStatus('идёт запись · играйте на пэдах');
    }
  }
}
var headCol=-1;
function clearHead(){
  if(headCol<0)return;
  for(var i=0;i<5;i++){gridCells[i][headCol].classList.remove('head');}
  headCol=-1;
}
function buildStudio(){
  studio=document.createElement('div');
  studio.className='studio';
  studio.setAttribute('role','dialog');
  studio.setAttribute('aria-modal','true');
  studio.setAttribute('aria-label','Студия записи своей стороны');
  var card=document.createElement('div');
  card.className='studio-card';
  card.innerHTML=
   '<h2>STUDIO · MY SIDE</h2>'+
   '<p class="st-sub">петля-аккомпанемент плюс ваша мелодия: слушайте луп, включайте REC после счётчика и играйте на пэдах или кликайте по сетке нот — каждая нота озвучивается сразу</p>'+
   '<input class="st-title" id="stTitle" maxlength="18" placeholder="название стороны">'+
   '<div class="st-cap">АКОМПАНЕМЕНТ</div><div class="st-row" id="stEng"></div>'+
   '<div class="st-cap">ТОНАЛЬНОСТЬ</div><div class="st-row" id="stRoot"></div>'+
   '<div class="st-row" id="stQual"></div>'+
   '<div class="st-cap">ТЕМП</div><div class="st-bpm"><input type="range" id="stBpm" min="60" max="140" value="90"><span id="stBpmVal">90 bpm</span></div>'+
   '<div class="st-cap">СЕТКА НОТ · 2 ТАКТА</div><div class="st-grid" id="stGrid"></div>'+
   '<div class="st-cap">ПЭДЫ ПЕНТАТОНИКИ</div><div class="pads" id="stPads"></div>'+
   '<div class="st-transport">'+
     '<button class="st-action" id="stLoop">LOOP · СЛУШАТЬ</button>'+
     '<button class="st-action red" id="stRec">REC · ЗАПИСЬ</button>'+
     '<span class="st-count" id="stCount"></span>'+
   '</div>'+
   '<div class="st-actions">'+
     '<button class="st-action" id="stUndo">UNDO (0)</button>'+
     '<button class="st-action" id="stSave">СОХРАНИТЬ СТОРОНУ</button>'+
     '<button class="st-action" id="stWav">СКАЧАТЬ WAV</button>'+
     '<button class="st-action ghost" id="stClear">ОЧИСТИТЬ</button>'+
     '<button class="st-action ghost" id="stDel">УДАЛИТЬ MY SIDE</button>'+
     '<button class="st-action ghost" id="stClose">ЗАКРЫТЬ (ESC)</button>'+
   '</div>';
  studio.appendChild(card);
  document.body.appendChild(studio);
  stUI.eng=card.querySelector('#stEng');
  stUI.root=card.querySelector('#stRoot');
  stUI.qual=card.querySelector('#stQual');
  stUI.bpm=card.querySelector('#stBpm');
  stUI.bpmVal=card.querySelector('#stBpmVal');
  stUI.title=card.querySelector('#stTitle');
  stUI.loop=card.querySelector('#stLoop');
  stUI.recBtn=card.querySelector('#stRec');
  stUI.count=card.querySelector('#stCount');
  stUI.undo=card.querySelector('#stUndo');
  stUI.wav=card.querySelector('#stWav');
  Object.keys(ENG_NAME).forEach(function(k){
    if(k==='user'||k==='generated')return;
    var c=document.createElement('button');
    c.type='button';c.className='st-chip';c.textContent=ENG_NAME[k];c.dataset.k=k;
    c.addEventListener('click',function(){
      rec.base=k;
      syncStudioChips();
    });
    stUI.eng.appendChild(c);
  });
  ROOTS.forEach(function(name,ix){
    var c=document.createElement('button');
    c.type='button';c.className='st-chip';c.textContent=name;c.dataset.k=String(48+ix);
    c.addEventListener('click',function(){
      rec.root=48+ix;
      syncStudioChips();
      padNames();
    });
    stUI.root.appendChild(c);
  });
  [['min','МИНОР'],['maj','МАЖОР']].forEach(function(q){
    var c=document.createElement('button');
    c.type='button';c.className='st-chip';c.textContent=q[1];c.dataset.k=q[0];
    c.addEventListener('click',function(){
      rec.qual=q[0];
      syncStudioChips();
      padNames();
    });
    stUI.qual.appendChild(c);
  });
  stUI.bpm.addEventListener('input',function(){
    rec.bpm=Number(stUI.bpm.value);
    stUI.bpmVal.textContent=rec.bpm+' bpm';
  });
  var gridBox=card.querySelector('#stGrid');
  for(var i=4;i>=0;i--){
    (function(idx){
      var line=document.createElement('div');
      line.className='st-rowline';
      var lab=document.createElement('span');
      lab.className='lab';
      line.appendChild(lab);
      gridLabs[idx]=lab;
      gridCells[idx]=[];
      for(var s=0;s<32;s++){
        (function(ss){
          var c=document.createElement('button');
          c.type='button';
          c.className='st-cell'+(ss%4===0?' b4':'');
          c.setAttribute('aria-label','нота ряда '+(idx+1)+' на шаге '+(ss+1));
          c.addEventListener('click',function(){
            var k=cellAt(ss,idx);
            if(k>-1){
              rec.cells.splice(k,1);
            }else{
              rec.cells.push({s:ss,i:idx});
              auditionNote(idx);
              flashCell(idx,ss);
            }
            refreshGrid();
            syncStudioTransport();
          });
          line.appendChild(c);
          gridCells[idx][ss]=c;
        })(s);
      }
      gridBox.appendChild(line);
    })(i);
  }
  var padBox=card.querySelector('#stPads');
  for(var p=0;p<5;p++){
    (function(idx){
      var b=document.createElement('button');
      b.type='button';b.className='pad';
      b.innerHTML='<b>'+(idx+1)+'</b><span></span>';
      b.addEventListener('pointerdown',function(){
        var sd=stepDurRec();
        if(rec.mode==='rec'&&audioReady){
          var col=Math.floor((ctx.currentTime-rec.t0)/sd)%32;
          if(col<0){col+=32;}
          if(cellAt(col,idx)===-1){
            rec.cells.push({s:col,i:idx});
            refreshGrid();
            syncStudioTransport();
          }
          flashCell(idx,col);
        }
        auditionNote(idx);
      });
      padBox.appendChild(b);
      padEls[idx]=b;
    })(p);
  }
  stUI.loop.addEventListener('click',function(){
    if(rec.mode==='off'){recStart('play');}
    else{recStopTransport();setStatus('петля остановлена');}
  });
  stUI.recBtn.addEventListener('click',function(){
    if(rec.mode==='off'){recStart('count');}
    else if(rec.mode==='count'){recStopTransport();setStatus('запись отменена');}
    else if(rec.mode==='play'){rec.arm=true;syncStudioTransport();setStatus('rec включится с нового такта');}
    else{rec.mode='play';syncStudioTransport();setStatus('запись остановлена · петля играет');}
  });
  stUI.undo.addEventListener('click',function(){
    rec.cells.pop();
    refreshGrid();
    syncStudioTransport();
  });
  stUI.wav.addEventListener('click',function(){
    if(USER_IDX<0||TRACKS[USER_IDX].engine!=='user'){
      setStatus('сначала запишите сторону: REC → играйте → СОХРАНИТЬ');
      return;
    }
    if(rec.mode!=='off'){recStopTransport();}
    setStatus('рендерю WAV… это займёт пару секунд');
    setTimeout(function(){
      renderUserTrack(TRACKS[USER_IDX],function(blob){
        var fname='orbita-my-side-'+(TRACKS[USER_IDX].title||'my-side').replace(/[^a-zа-я0-9]+/gi,'-').toLowerCase()+'.wav';
        var url=URL.createObjectURL(blob);
        var a=document.createElement('a');
        a.href=url;
        a.download=fname;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function(){URL.revokeObjectURL(url);},5000);
        setStatus('WAV сохранён: '+fname);
      });
    },60);
  });
  card.querySelector('#stClear').addEventListener('click',function(){
    rec.cells=[];
    refreshGrid();
    syncStudioTransport();
    setStatus('сетка очищена');
  });
  card.querySelector('#stSave').addEventListener('click',function(){
    if(rec.mode!=='off'){recStopTransport();}
    if(!rec.cells.length){
      setStatus('пусто: наиграйте на пэдах или расставьте ноты в сетке');
      return;
    }
    saveUserTrack();
    studio.classList.remove('open');
    cur=USER_IDX;
    applyTrackMeta();
    if(playing){
      haltPlayback();
      resumePlayback();
      setStatus('играет · '+TRACKS[cur].title);
    }else{
      playTape();
    }
    setStatus('сторона записана: '+TRACKS[cur].title);
  });
  card.querySelector('#stDel').addEventListener('click',function(){
    if(rec.mode!=='off'){recStopTransport();}
    deleteUserTrack();
    studio.classList.remove('open');
  });
  card.querySelector('#stClose').addEventListener('click',function(){
    closeStudio();
  });
}
function openStudio(){
  if(playing){pauseTape();}
  if(USER_IDX>-1&&TRACKS[USER_IDX].engine==='user'){
    var tr=TRACKS[USER_IDX];
    rec.base=tr.base;rec.root=tr.root;rec.qual=tr.qual;rec.bpm=tr.bpm;
    rec.cells=tr.cells.slice();
  }
  refreshGrid();
  syncStudioChips();
  padNames();
  syncStudioTransport();
  ensureStudioBuses();
  studio.classList.add('open');
  setStatus('студия открыта · основная лента на паузе');
  tourEvent('orbita:studio');
}
function closeStudio(){
  if(rec.mode!=='off'){recStopTransport();}
  studio.classList.remove('open');
  setStatus(started?(playing?'играет · '+TRACKS[cur].title:'пауза'):'выберите кассету со стола и нажмите play');
}
function saveUserTrack(){
  var title=(stUI.title.value||'').trim()||'my side';
  var data={
    title:title,engine:'user',base:rec.base,root:rec.root,qual:rec.qual,
    bpm:rec.bpm,swing:0,cutoff:3200,hiss:.01,dly:.3,dfb:.25,dur:'01:36',
    cells:rec.cells.slice(),prog:[],bass:[],mel:[],drums:null
  };
  if(USER_IDX>-1&&TRACKS[USER_IDX].engine==='user'){
    TRACKS[USER_IDX]=data;
  }else{
    TRACKS.push(data);
    USER_IDX=TRACKS.length-1;
    buildSpot(USER_IDX);
    var items=currentItems();
    settleItems(items);
    applyItems(items);
  }
  saveDesk();
}
function deleteUserTrack(){
  if(USER_IDX<0||TRACKS[USER_IDX].engine!=='user')return;
  if(cur===USER_IDX){cur=0;}
  TRACKS.splice(USER_IDX,1);
  if(spotEls[USER_IDX]){spotEls[USER_IDX].remove();}
  spotEls.splice(USER_IDX,1);
  homes.splice(USER_IDX,1);
  USER_IDX=-1;
  rec.cells=[];
  saveDesk();
  applyTrackMeta();
  setStatus('сторона my side удалена');
}
buildStudio();
els.rec.addEventListener('click',function(){
  if(studio.classList.contains('open')){closeStudio();}
  else{openStudio();}
});
document.addEventListener('keydown',function(e){
  if(e.code==='Escape'&&studio.classList.contains('open')){
    closeStudio();
  }
});

function buildOfflineTarget(oc,tr){
  var master=oc.createGain();master.gain.value=0.9;
  var hp=oc.createBiquadFilter();hp.type='highpass';hp.frequency.value=35;
  var comp=oc.createDynamicsCompressor();
  comp.threshold.value=-18;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.18;
  master.connect(hp);hp.connect(comp);comp.connect(oc.destination);
  var tapeLP=oc.createBiquadFilter();tapeLP.type='lowpass';tapeLP.frequency.value=tr.cutoff||3200;
  var shaper=oc.createWaveShaper();shaper.curve=makeCurve(2);shaper.oversample='2x';
  var tape=oc.createGain();tape.connect(tapeLP);tapeLP.connect(shaper);shaper.connect(master);
  var fxBus=oc.createGain();fxBus.connect(master);
  var padB=oc.createGain();padB.connect(tape);
  var drumB=oc.createGain();drumB.gain.value=.9;drumB.connect(tape);
  var lfo=oc.createOscillator();lfo.frequency.value=.7;
  var lfoG=oc.createGain();lfoG.gain.value=4;lfo.connect(lfoG);lfo.start(0);
  var dly=oc.createDelay(1);dly.delayTime.value=tr.dly||.3;
  var fb=oc.createGain();fb.gain.value=tr.dfb||.25;
  dly.connect(fb);fb.connect(dly);
  var dO=oc.createGain();dO.gain.value=.5;dly.connect(dO);dO.connect(fxBus);
  var rev=oc.createGain();
  var conv=oc.createConvolver();conv.buffer=makeIRFor(oc);
  var revO=oc.createGain();revO.gain.value=.9;
  rev.connect(conv);conv.connect(revO);revO.connect(fxBus);
  return {
    ctx:oc,tape:tape,pad:padB,drum:drumB,rev:rev,dly:dly,lfo:lfoG,
    pw25:pulseWaveFor(oc,.25),pw50:pulseWaveFor(oc,.5),offline:true
  };
}
function postProcess(buffer){
  var chs=[];
  for(var c=0;c<buffer.numberOfChannels;c++)chs.push(buffer.getChannelData(c));
  var peak=0;
  for(var c2=0;c2<chs.length;c2++){
    var d=chs[c2];
    for(var i=0;i<d.length;i++){var a=Math.abs(d[i]);if(a>peak)peak=a;}
  }
  var g=peak>0?0.89/peak:1;
  var sr=buffer.sampleRate;
  var fi=Math.floor(sr*0.01),fo=Math.floor(sr*0.4);
  for(var c3=0;c3<chs.length;c3++){
    var dd=chs[c3];
    for(var j=0;j<dd.length;j++){
      var v=dd[j]*g;
      if(j<fi)v*=j/fi;
      var r=dd.length-1-j;
      if(r<fo)v*=r/fo;
      dd[j]=v;
    }
  }
}
function audioBufferToWav(buffer){
  var numCh=buffer.numberOfChannels;
  var len=buffer.length;
  var sr=buffer.sampleRate;
  var bytes=44+len*numCh*2;
  var ab=new ArrayBuffer(bytes);
  var view=new DataView(ab);
  function ws(off,str){for(var i=0;i<str.length;i++)view.setUint8(off+i,str.charCodeAt(i));}
  ws(0,'RIFF');view.setUint32(4,bytes-8,true);ws(8,'WAVE');
  ws(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,numCh,true);
  view.setUint32(24,sr,true);view.setUint32(28,sr*numCh*2,true);view.setUint16(32,numCh*2,true);view.setUint16(34,16,true);
  ws(36,'data');view.setUint32(40,len*numCh*2,true);
  var chs=[];
  for(var c=0;c<numCh;c++)chs.push(buffer.getChannelData(c));
  var off=44;
  for(var i=0;i<len;i++){
    for(var c2=0;c2<numCh;c2++){
      var s=Math.max(-1,Math.min(1,chs[c2][i]));
      view.setInt16(off,s<0?s*0x8000:s*0x7FFF,true);
      off+=2;
    }
  }
  return new Blob([ab],{type:'audio/wav'});
}
function renderUserTrack(tr,cb){
  var sr=44100;
  var durSec=parseDur(tr.dur);
  var total=durSec+1.5;
  var OC=window.OfflineAudioContext||window.webkitOfflineAudioContext;
  if(!OC){setStatus('браузер не поддерживает OfflineAudioContext');return;}
  var oc=new OC(2,Math.ceil(sr*total),sr);
  var rt=buildOfflineTarget(oc,tr);
  var prevRT=RT;
  RT=rt;
  try{
    var sd=60/tr.bpm/4;
    var totalSteps=Math.floor(durSec/sd);
    var bar=0;
    var chord=chordNotes(tr.root,tr.qual);
    for(var s=0;s<totalSteps;s++){
      var t=s*sd;
      var ss=s%16;
      if(ss===0){
        bar=Math.floor(s/16);
        pad(chord,t,sd*16*.98,tr.base==='box'||tr.base==='wave');
        bassNote(tr.root-12,t,sd*6);
      }
      if(ss===8){bassNote(tr.root-12,t,sd*4);}
      playBaseDrums(tr.base,ss,t,tr.root,tr.qual);
      var pos=(bar%2)*16+ss;
      for(var ci=0;ci<tr.cells.length;ci++){
        var c=tr.cells[ci];
        if(c.s===pos){melVoiceFor(tr.base,tr.root+PENT[tr.qual][c.i],t,sd*3);}
      }
    }
  }catch(e){
    RT=prevRT;
    setStatus('ошибка рендера: '+e.message);
    return;
  }
  oc.startRendering().then(function(buf){
    RT=prevRT;
    postProcess(buf);
    cb(audioBufferToWav(buf));
  }).catch(function(e){
    RT=prevRT;
    setStatus('ошибка рендера: '+e.message);
  });
}

var radioMode=false;
var currentSeed=null;

function addGeneratedTrack(seed){
  var tr=generateTrack(seed);
  TRACKS.push(tr);
  var idx=TRACKS.length-1;
  buildSpot(idx);
  var items=currentItems();
  settleItems(items);
  applyItems(items);
  return idx;
}

function updateSeedUI(){
  if(!currentSeed){
    els.seedValue.textContent='—';
    els.seedCopy.classList.remove('show');
  } else {
    els.seedValue.textContent=currentSeed;
    els.seedCopy.classList.add('show');
  }
}

function updateURL(){
  try{
    var url=new URL(location.href);
    if(currentSeed){
      url.searchParams.set('seed',currentSeed);
    } else {
      url.searchParams.delete('seed');
    }
    history.replaceState({},'',url.toString());
  }catch(e){}
}

function activateRadio(initialSeed){
  radioMode=true;
  els.radio.classList.add('on');
  var seed=initialSeed||newRandomSeed();
  var idx=addGeneratedTrack(seed);
  currentSeed=seed;
  updateSeedUI();
  updateURL();
  selectTrack(idx);
  setStatus('RADIO · бесконечный поток сгенерированных треков');
}

function deactivateRadio(){
  radioMode=false;
  els.radio.classList.remove('on');
  currentSeed=null;
  updateSeedUI();
  updateURL();
  setStatus('радио выключено');
}

els.radio.addEventListener('click',function(){
  if(radioMode){deactivateRadio();}
  else{activateRadio();}
});

els.seedNew.addEventListener('click',function(){
  var seed=newRandomSeed();
  var idx=addGeneratedTrack(seed);
  currentSeed=seed;
  updateSeedUI();
  updateURL();
  selectTrack(idx);
  setStatus('новый сгенерированный трек: '+TRACKS[idx].title);
});

els.seedCopy.addEventListener('click',function(){
  if(!currentSeed)return;
  var url;
  try{
    var u=new URL(location.href);
    u.searchParams.set('seed',currentSeed);
    url=u.toString();
  }catch(e){
    url=location.origin+location.pathname+'?seed='+currentSeed;
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(function(){
      setStatus('ссылка скопирована: '+currentSeed);
    }).catch(function(){
      prompt('скопируйте ссылку:',url);
    });
  } else {
    prompt('скопируйте ссылку:',url);
  }
});

var urlSeed=null;
try{
  urlSeed=new URLSearchParams(location.search).get('seed');
}catch(e){}
if(urlSeed && /^[a-z0-9]{4,10}$/i.test(urlSeed)){
  setTimeout(function(){
    activateRadio(urlSeed);
    setTimeout(function(){
      if(!playing){playTape();}
    },400);
  },200);
}

function fmt(sec){
  var m=Math.floor(sec/60),s=Math.floor(sec%60);
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function refreshTitle(){
  document.title=(playing?'▶ '+TRACKS[cur].title+' — ':'')+'ORBITA';
}
function applyTrackMeta(){
  var tr=TRACKS[cur];
  step=0;bar=0;playSec=0;
  stepDur=60/tr.bpm/4;
  els.tapeLabel.textContent=tr.title.toUpperCase();
  els.cassNum.textContent=num(cur);
  els.cassEng.textContent=ENG_NAME[tr.engine]||tr.engine.toUpperCase();
  els.cassette.dataset.eng=tr.engine;
  els.lcdNum.textContent=num(cur);
  els.lcdTitle.textContent=tr.title.toUpperCase();
  els.lcdTime.textContent='00:00';
  els.npTitle.textContent=tr.title;
  els.npEng.textContent=ENG_NAME[tr.engine]||tr.engine.toUpperCase();
  els.npEng.className='eng eng-'+tr.engine;
  els.npBar.style.width='0%';
  els.npTime.textContent='00:00 / '+tr.dur;
  document.body.dataset.eng=tr.engine;
  spotEls.forEach(function(sp,i){
    if(!sp)return;
    sp.classList.toggle('active',i===cur);
    if(i===cur&&homes[i]){
      sp.style.left=homes[i].l+'px';
      sp.style.top=homes[i].t+'px';
    }
  });
  if(audioReady){
    var curve=CURVES[tr.engine]||CURVES.tape;
    tapeShaper.curve=curve;
    tapeLP.frequency.setTargetAtTime(tr.cutoff,ctx.currentTime,.3);
    delayNode.delayTime.setTargetAtTime(tr.dly,ctx.currentTime,.2);
    if(playing){fbGain.gain.setTargetAtTime(tr.dfb,ctx.currentTime,.2);}
  }
  if(tr.rain&&playing){document.body.classList.add('is-raining');}
  else{document.body.classList.remove('is-raining');}
  refreshTitle();
  saveDesk();
}
function resumePlayback(){
  motor(true);
  startNoise();
  resumeBuses();
  nextTime=ctx.currentTime+.1;
  if(timer){clearInterval(timer);}
  timer=setInterval(tickScheduler,30);
  tourEvent('orbita:play');
}
function haltPlayback(){
  if(timer){clearInterval(timer);timer=null;}
  stopNoise();
  motor(false);
  haltBuses();
}
function selectTrack(i){
  if(swapLock)return;
  var target=((i%TRACKS.length)+TRACKS.length)%TRACKS.length;
  if(target===cur)return;
  swapLock=true;
  var wasPlaying=playing;
  if(wasPlaying){haltPlayback();}
  ejectSfx();
  els.cassette.classList.add('out');
  setTimeout(function(){
    cur=target;
    applyTrackMeta();
    els.cassette.classList.remove('out');
    els.cassette.classList.add('pre-in');
    void els.cassette.offsetWidth;
    els.cassette.classList.remove('pre-in');
    els.cassette.classList.add('in');
    insertSfx();
    setTimeout(function(){
      els.cassette.classList.remove('in');
      swapLock=false;
      tourEvent('orbita:select');
      if(wasPlaying&&playing){
        resumePlayback();
        setStatus('играет · '+TRACKS[cur].title);
      }else if(started&&!playing){
        setStatus('загружена кассета: '+TRACKS[cur].title);
      }
    },430);
  },430);
}
function playTape(){
  if(!ensureAudio())return;
  if(ctx.state==='suspended'){ctx.resume();}
  started=true;
  stepDur=60/TRACKS[cur].bpm/4;
  resumeBuses();
  resumePlayback();
  playing=true;
  document.body.classList.add('is-playing');
  if(TRACKS[cur].rain){document.body.classList.add('is-raining');}
  els.play.classList.add('pressed');
  els.play.classList.remove('attract');
  els.hint.classList.add('hidden');
  setStatus('играет · '+TRACKS[cur].title);
  refreshTitle();
}
function pauseTape(){
  playing=false;
  if(timer){clearInterval(timer);timer=null;}
  stopNoise();
  haltBuses();
  document.body.classList.remove('is-playing');
  document.body.classList.remove('is-raining');
  els.play.classList.remove('pressed');
  setStatus('пауза');
  refreshTitle();
}
function stopTape(){
  playing=false;
  if(timer){clearInterval(timer);timer=null;}
  stopNoise();
  motor(false);
  haltBuses();
  step=0;bar=0;playSec=0;
  document.body.classList.remove('is-playing');
  document.body.classList.remove('is-raining');
  els.play.classList.remove('pressed');
  els.lcdTime.textContent='00:00';
  els.npBar.style.width='0%';
  els.npTime.textContent='00:00 / '+TRACKS[cur].dur;
  setStatus('остановлено');
  refreshTitle();
}
function applyVol(){
  if(master&&ctx){master.gain.setTargetAtTime(volVal(),ctx.currentTime,.05);}
  saveDesk();
}

els.play.addEventListener('click',function(){
  if(playing){pauseTape();}else{playTape();}
});
els.stop.addEventListener('click',stopTape);
els.rew.addEventListener('click',function(){selectTrack(cur-1);});
els.ff.addEventListener('click',function(){selectTrack(cur+1);});
els.vol.addEventListener('input',applyVol);
document.addEventListener('keydown',function(e){
  if(e.target&&e.target.tagName==='INPUT')return;
  if(e.code==='Space'){e.preventDefault();els.play.click();}
  else if(e.code==='KeyS'){stopTape();}
  else if(e.code==='ArrowLeft'){selectTrack(cur-1);}
  else if(e.code==='ArrowRight'){selectTrack(cur+1);}
  else if(e.code==='KeyR'){els.radio.click();}
  else if(e.code.indexOf('Digit')===0){
    var n=parseInt(e.code.slice(5),10);
    if(n===0){selectTrack(Math.min(9,TRACKS.length-1));}
    else if(n>=1&&n<=TRACKS.length){selectTrack(n-1);}
  }
  else if(e.code==='ArrowUp'){e.preventDefault();els.vol.value=String(Math.min(100,Number(els.vol.value)+5));applyVol();}
  else if(e.code==='ArrowDown'){e.preventDefault();els.vol.value=String(Math.max(0,Number(els.vol.value)-5));applyVol();}
});

var siteSec=0;
setInterval(function(){
  siteSec++;
  var ds=String(siteSec%10000).padStart(4,'0');
  for(var i=0;i<4;i++){strips[i].style.transform='translateY(-'+Number(ds[i])+'em)';}
},1000);

var aL=0,aR=0,v=0,last=performance.now();
function frame(now){
  var dt=Math.min(.05,(now-last)/1000);last=now;
  v+=((playing?1:0)-v)*.04;
  aL+=v*3.2;aR+=v*4.1;
  els.reelL.style.transform='rotate('+aL+'deg)';
  els.reelR.style.transform='rotate('+aR+'deg)';
  if(playing){
    playSec+=dt;
    els.lcdTime.textContent=fmt(playSec);
    var dur=parseDur(TRACKS[cur].dur);
    els.npBar.style.width=Math.min(100,(playSec/dur)*100)+'%';
    els.npTime.textContent=fmt(playSec)+' / '+TRACKS[cur].dur;
    if(playSec>=dur){
      if(radioMode){
        var seed=newRandomSeed();
        var idx=addGeneratedTrack(seed);
        currentSeed=seed;
        updateSeedUI();
        updateURL();
        selectTrack(idx);
      } else {
        selectTrack(cur+1);
      }
    }
  }
  if(audioReady&&playing){
    analyser.getByteFrequencyData(freqBuf);
    for(var i=0;i<12;i++){
      var idx=1+Math.floor(Math.pow(i/12,1.6)*(freqBuf.length-2));
      var val=freqBuf[idx]/255;
      bars[i].style.height=Math.max(3,val*26)+'px';
      bars[i].classList.toggle('lit',val>.08);
    }
  }else{
    for(var j=0;j<12;j++){bars[j].style.height='3px';bars[j].classList.remove('lit');}
  }
  if(studio&&studio.classList.contains('open')&&audioReady&&rec.mode!=='off'){
    var sd=stepDurRec();
    var col=Math.floor((ctx.currentTime-rec.t0)/sd)%32;
    if(col<0){col+=32;}
    if(col!==headCol){
      clearHead();
      headCol=col;
      for(var g=0;g<5;g++){gridCells[g][headCol].classList.add('head');}
    }
  }else if(headCol>-1&&!(rec.mode!=='off')){
    clearHead();
  }
  requestAnimationFrame(frame);
}

applyTrackMeta();
setStatus('выберите кассету со стола и нажмите play · или RADIO для бесконечного потока');
requestAnimationFrame(frame);

var ART_PAL={
  tape:['#8a7a63','#0b1a30','#ef5b3a'],
  piano:['#4f8577','#0b1a30','#e6d5c8'],
  chip:['#ef5b3a','#0b1a30','#8d939c'],
  dub:['#7a5ca8','#0b1a30','#f3e6dc'],
  wave:['#d4527a','#0b1a30','#ffb45e'],
  bossa:['#3f7fae','#0b1a30','#f3e6dc'],
  box:['#b08968','#0b1a30','#e6d5c8'],
  phonk:['#3f8f5f','#0b1a30','#ffb45e'],
  jazz:['#c2892e','#0b1a30','#f3e6dc'],
  techno:['#1f9e9e','#0b1a30','#f3e6dc'],
  user:['#b0503c','#0b1a30','#ffb45e']
};
function artSVG(key,engine){
  var rand=mulberry32(hashSeed(key||'orbita'));
  var type=Math.floor(rand()*6);
  var pal=ART_PAL[engine]||ART_PAL.tape;
  var c1=pal[Math.floor(rand()*pal.length)];
  var c2=pal[Math.floor(rand()*pal.length)];
  var s='';
  if(type===0){
    s='<path d="M0 20 L20 0" stroke="'+c1+'" stroke-width="3" opacity=".22"/>'+
      '<path d="M-6 26 L26 -6" stroke="'+c2+'" stroke-width="2" opacity=".18"/>'+
      '<path d="M10 32 L32 10" stroke="'+c1+'" stroke-width="2" opacity=".16"/>';
  }else if(type===1){
    s='<circle cx="6" cy="6" r="2" fill="'+c1+'" opacity=".22"/>'+
      '<circle cx="18" cy="12" r="2.5" fill="'+c2+'" opacity=".18"/>'+
      '<circle cx="10" cy="20" r="1.8" fill="'+c1+'" opacity=".2"/>'+
      '<circle cx="24" cy="24" r="2" fill="'+c2+'" opacity=".16"/>';
  }else if(type===2){
    s='<path d="M0 16 L6 10 L12 16 L18 10 L24 16 L30 10" fill="none" stroke="'+c1+'" stroke-width="2" opacity=".22"/>'+
      '<path d="M0 24 L6 18 L12 24 L18 18 L24 24 L30 18" fill="none" stroke="'+c2+'" stroke-width="1.5" opacity=".18"/>';
  }else if(type===3){
    s='<circle cx="12" cy="12" r="8" fill="none" stroke="'+c1+'" stroke-width="2" opacity=".2"/>'+
      '<circle cx="12" cy="12" r="4" fill="none" stroke="'+c2+'" stroke-width="1.5" opacity=".22"/>'+
      '<circle cx="26" cy="24" r="5" fill="none" stroke="'+c1+'" stroke-width="1.5" opacity=".16"/>';
  }else if(type===4){
    s='<path d="M6 20 L12 8 L18 20 Z" fill="'+c1+'" opacity=".18"/>'+
      '<path d="M18 26 L23 16 L28 26 Z" fill="'+c2+'" opacity=".16"/>';
  }else{
    s='<path d="M0 10 Q7 4 15 10 T30 10" fill="none" stroke="'+c1+'" stroke-width="2" opacity=".2"/>'+
      '<path d="M0 20 Q7 14 15 20 T30 20" fill="none" stroke="'+c2+'" stroke-width="2" opacity=".18"/>';
  }
  var svg='<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">'+s+'</svg>';
  return 'url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
}
function paintSpotArt(){
  spotEls.forEach(function(sp,i){
    if(!sp)return;
    var lab=sp.querySelector('.bx-label');
    var box=sp.querySelector('.box');
    if(!lab||!box)return;
    lab.style.backgroundImage=artSVG(box.title+':'+i, box.dataset.eng);
  });
}
var cassLabelEl=els.cassette.querySelector('.label');
function paintCassetteArt(){
  var tr=TRACKS[cur];
  if(!tr||!cassLabelEl)return;
  cassLabelEl.style.backgroundImage=artSVG(tr.title+':'+cur, tr.engine);
}
new MutationObserver(function(){paintCassetteArt();})
  .observe(els.tapeLabel,{childList:true,characterData:true,subtree:true});
new MutationObserver(function(){paintSpotArt();})
  .observe(els.spots,{childList:true});
paintSpotArt();
paintCassetteArt();

(function(){
  var TOUR_KEY='orbita-tour';
  var done=false;
  try{done=!!localStorage.getItem(TOUR_KEY);}catch(e){}
  if(done)return;
  var css=
   '.tour{position:fixed;inset:0;z-index:200;display:none;}'+
   '.tour.open{display:block;}'+
   '.tour-spot{position:fixed;border-radius:14px;box-shadow:0 0 0 9999px rgba(11,26,48,.55);pointer-events:none;transition:left .35s,top .35s,width .35s,height .35s;}'+
   '.tour-tip{position:fixed;max-width:290px;background:var(--paper);border-radius:10px;padding:14px 16px;box-shadow:0 18px 40px rgba(0,0,0,.35);pointer-events:auto;}'+
   '.tour-tip.center{left:50%!important;top:50%!important;transform:translate(-50%,-50%);}'+
   '.tour-text{font:600 13px/1.55 var(--body);color:var(--ink);}'+
   '.tour-dots{display:flex;gap:5px;margin:12px 0 10px;}'+
   '.tour-dots i{width:7px;height:7px;border-radius:50%;background:rgba(0,0,0,.15);}'+
   '.tour-dots i.on{background:var(--orange);}'+
   '.tour-btns{display:flex;justify-content:space-between;align-items:center;gap:10px;}'+
   '.tour-skip{border:none;background:none;cursor:pointer;font:700 11px var(--mono);color:#8b8070;letter-spacing:.08em;}'+
   '.tour-next{border:none;border-radius:8px;background:var(--ink);color:var(--paper);cursor:pointer;padding:8px 14px;font:700 11px var(--mono);letter-spacing:.1em;}';
  var styleTag=document.createElement('style');
  styleTag.id='tour-css';
  styleTag.textContent=css;
  document.head.appendChild(styleTag);
  var overlay=document.createElement('div');
  overlay.className='tour';
  overlay.innerHTML=
   '<div class="tour-spot"></div>'+
   '<div class="tour-tip">'+
     '<div class="tour-text"></div>'+
     '<div class="tour-dots"></div>'+
     '<div class="tour-btns">'+
       '<button type="button" class="tour-skip">пропустить</button>'+
       '<button type="button" class="tour-next">далее</button>'+
     '</div>'+
   '</div>';
  document.body.appendChild(overlay);
  var spotEl=overlay.querySelector('.tour-spot');
  var tipEl=overlay.querySelector('.tour-tip');
  var textEl=overlay.querySelector('.tour-text');
  var dotsEl=overlay.querySelector('.tour-dots');
  var skipBtn=overlay.querySelector('.tour-skip');
  var nextBtn=overlay.querySelector('.tour-next');
  var steps=[
    {target:function(){var sp=spotEls[0];return sp?sp.querySelector('.box'):null;},
     text:'Кассеты лежат на столе, как настоящие. Кликните любую — она загрузится в плеер.',
     on:'orbita:select'},
    {target:function(){return els.play;},
     text:'Нажмите PLAY. ORBITA синтезирует музыку прямо в браузере: ни одного аудиофайла, только математика и плёнка.',
     on:'orbita:play'},
    {target:function(){return els.rec;},
     text:'REC — это студия. Запишите свою мелодию поверх аккомпанемента, сохраните сторону и скачайте её в WAV.',
     on:'orbita:studio'},
    {target:null,
     text:'Стол ваш: перетаскивайте кассеты и плеер, двойной клик по пустому месту пересыпает кассеты, R включает бесконечное радио.',
     on:null}
  ];
  var ti=-1;
  function active(){return ti>=0&&ti<steps.length;}
  function endTour(){
    ti=steps.length;
    overlay.classList.remove('open');
    try{localStorage.setItem(TOUR_KEY,'1');}catch(e){}
  }
  function position(){
    if(!active())return;
    var s=steps[ti];
    var el=s.target?s.target():null;
    if(el){
      var r=el.getBoundingClientRect();
      spotEl.style.display='block';
      spotEl.style.left=(r.left-8)+'px';
      spotEl.style.top=(r.top-8)+'px';
      spotEl.style.width=(r.width+16)+'px';
      spotEl.style.height=(r.height+16)+'px';
      tipEl.classList.remove('center');
      tipEl.style.transform='none';
      var vh=window.innerHeight,vw=window.innerWidth;
      var tw=tipEl.offsetWidth,th=tipEl.offsetHeight;
      var below=r.bottom+22;
      var top=(below+th<vh-12)?below:Math.max(12,r.top-th-22);
      var left=Math.max(12,Math.min(vw-tw-12,r.left+r.width/2-tw/2));
      tipEl.style.left=left+'px';
      tipEl.style.top=top+'px';
    } else {
      spotEl.style.display='none';
      tipEl.classList.add('center');
      tipEl.style.left='';
      tipEl.style.top='';
    }
  }
  function renderDots(){
    dotsEl.innerHTML='';
    for(var i=0;i<steps.length;i++){
      var d=document.createElement('i');
      if(i===ti)d.className='on';
      dotsEl.appendChild(d);
    }
  }
  function showStep(i){
    ti=i;
    if(i>=steps.length){endTour();return;}
    overlay.classList.add('open');
    textEl.textContent=steps[i].text;
    nextBtn.textContent=(i===steps.length-1)?'понятно, поехали':'далее';
    renderDots();
    var el=steps[i].target?steps[i].target():null;
    if(el&&el.scrollIntoView){
      try{el.scrollIntoView({block:'center',behavior:'smooth'});}catch(e){}
    }
    setTimeout(position,60);
    setTimeout(position,380);
  }
  nextBtn.addEventListener('click',function(){showStep(ti+1);});
  skipBtn.addEventListener('click',endTour);
  document.addEventListener('keydown',function(e){
    if(e.code==='Escape'&&active()){endTour();}
  });
  window.addEventListener('resize',function(){if(active())position();});
  window.addEventListener('scroll',function(){if(active())position();},true);
  ['orbita:select','orbita:play','orbita:studio'].forEach(function(name){
    window.addEventListener(name,function(){
      if(active()&&steps[ti].on===name){showStep(ti+1);}
    });
  });
  setTimeout(function(){showStep(0);},700);
})();
})();