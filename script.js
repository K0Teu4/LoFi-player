(function(){
'use strict';

var QUAL={m7:[0,3,7,10],maj7:[0,4,7,11],d7:[0,4,7,10],m9:[0,3,7,10,14],m6:[0,4,7,9]};
var ENG_NAME={tape:'TAPE',piano:'PIANO',chip:'8-BIT',dub:'DUB',wave:'WAVE',bossa:'BOSSA',box:'BOX',phonk:'PHONK',jazz:'JAZZ',techno:'TECHNO'};
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
 {x:2,y:40,r:-8},
 {x:30,y:2,r:6},
 {x:45,y:1,r:-5},
 {x:58,y:5,r:9},
 {x:64,y:24,r:-7},
 {x:62,y:48,r:4},
 {x:68,y:72,r:-6},
 {x:46,y:80,r:5},
 {x:26,y:82,r:-4},
 {x:4,y:74,r:7}
];
function mfreq(m){return 440*Math.pow(2,(m-69)/12);}
function chordNotes(root,q){return QUAL[q].map(function(iv){return root+iv;});}
function parseDur(s){var p=s.split(':');return parseInt(p[0],10)*60+parseInt(p[1],10);}
function num(i){return String(i+1).padStart(2,'0');}
function mobile(){return window.matchMedia('(max-width:1080px)').matches;}

function $(s){return document.querySelector(s);}
var els={
  table:$('#table'),
  play:$('#playBtn'),stop:$('#stopBtn'),rew:$('#rewBtn'),ff:$('#ffBtn'),
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
  [els.play,els.stop,els.rew,els.ff].forEach(function(btn){
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
  var minX=70-w,maxX=W-70,minY=46-h,maxY=H-46;
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
(function(){
  TRACKS.forEach(function(tr,i){
    var spot=document.createElement('div');
    spot.className='spot';
    spot.style.left=POS[i].x+'%';
    spot.style.top=POS[i].y+'%';
    spot.style.setProperty('--r',POS[i].r+'deg');
    var b=document.createElement('button');
    b.type='button';
    b.className='box';
    b.dataset.eng=tr.engine;
    b.title=tr.title;
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
    spotEls.push(spot);
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
  });
})();

function grow(r,p){return {l:r.left-p,t:r.top-p,r:r.right+p,b:r.bottom+p};}
function zoneRects(){
  return [
    grow(wrapWalk.getBoundingClientRect(),26),
    grow(wrapCard.getBoundingClientRect(),26),
    grow(wrapPhones.getBoundingClientRect(),18)
  ];
}
function settleItems(items){
  var W=window.innerWidth,H=window.innerHeight;
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
  return spotEls.map(function(sp){
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
  var items=spotEls.map(function(sp){
    var r=sp.getBoundingClientRect();
    return {
      el:sp,
      l:8+Math.random()*Math.max(40,W-r.width-16),
      t:8+Math.random()*Math.max(40,H-r.height-40),
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
    localStorage.setItem('orbita-desk',JSON.stringify({
      spots:spotEls.map(function(sp){return {l:parseFloat(sp.style.left)||0,t:parseFloat(sp.style.top)||0};}),
      wraps:wraps.map(function(w){return w.style.left===''?null:{l:parseFloat(w.style.left)||0,t:parseFloat(w.style.top)||0};}),
      vol:els.vol.value,
      cur:cur
    }));
  }catch(e){}
}
function loadDesk(){
  try{
    var raw=localStorage.getItem('orbita-desk');
    if(!raw)return null;
    return JSON.parse(raw);
  }catch(e){return null;}
}
var saved=loadDesk();
if(saved&&saved.spots&&saved.spots.length===spotEls.length){
  saved.spots.forEach(function(p,i){
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

var ctx=null,audioReady=false;
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
function makeIR(){
  var len=Math.floor(ctx.sampleRate*1.8),ir=ctx.createBuffer(2,len,ctx.sampleRate);
  for(var ch=0;ch<2;ch++){var d=ir.getChannelData(ch);
    for(var i=0;i<len;i++){d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}}
  return ir;
}
function pulseWave(duty){
  var n=24,real=new Float32Array(n),imag=new Float32Array(n);
  for(var i=1;i<n;i++){imag[i]=(2/(i*Math.PI))*Math.sin(i*Math.PI*duty);}
  return ctx.createPeriodicWave(real,imag);
}
function initAudio(){
  var AC=window.AudioContext||window.webkitAudioContext;
  ctx=new AC();
  CURVES={tape:makeCurve(2.2),piano:makeCurve(1.3),chip:makeChipCurve(),dub:makeCurve(1.8),wave:makeCurve(3),bossa:makeCurve(1.5),box:makeCurve(1.2),phonk:makeCurve(2.5),jazz:makeCurve(1.6),techno:makeCurve(2.8)};
  pw25=pulseWave(.25);pw50=pulseWave(.5);
  master=ctx.createGain();master.gain.value=volVal();
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=35;
  var comp=ctx.createDynamicsCompressor();
  comp.threshold.value=-18;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.18;
  master.connect(hp);hp.connect(comp);comp.connect(ctx.destination);
  analyser=ctx.createAnalyser();analyser.fftSize=64;analyser.smoothingTimeConstant=.72;
  freqBuf=new Uint8Array(analyser.frequencyBinCount);
  comp.connect(analyser);
  tapeLP=ctx.createBiquadFilter();tapeLP.type='lowpass';tapeLP.frequency.value=TRACKS[cur].cutoff;
  tapeShaper=ctx.createWaveShaper();tapeShaper.curve=CURVES[TRACKS[cur].engine];tapeShaper.oversample='2x';
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
  var conv=ctx.createConvolver();conv.buffer=makeIR();
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
}
function ensureAudio(){
  if(audioReady)return true;
  if(ctx){try{ctx.close();}catch(e){}ctx=null;}
  try{initAudio();audioReady=true;return true;}
  catch(e){setStatus('звук недоступен: '+e.message);return false;}
}
function sendRev(node,amt){var g=ctx.createGain();g.gain.value=amt;node.connect(g);g.connect(revIn);}
function sendDly(node,amt){var g=ctx.createGain();g.gain.value=amt;node.connect(g);g.connect(delayNode);}
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
function makeOsc(type,freq,t){var o=ctx.createOscillator();o.type=type;o.frequency.value=freq;return o;}
function env(g,t,a,peak,dec){
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(peak,t+a);
  g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);
}
function makePan(v){
  if(typeof ctx.createStereoPanner==='function'){var p=ctx.createStereoPanner();p.pan.value=v;return p;}
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
      o.detune.value=det+(Math.random()*6-3);lfoGain.connect(o.detune);
      var g=ctx.createGain();env(g,t,.05,.045,dur*.9);
      o.connect(g);route(g,padBus,i%2?-0.25:0.25,i===0?0.12:0);
      o.start(t);o.stop(t+dur+.1);
    });
    if(low&&i===0){
      var s=makeOsc('sine',mfreq(m-12),t);
      var sg=ctx.createGain();
      sg.gain.setValueAtTime(.0001,t);
      sg.gain.linearRampToValueAtTime(.055,t+dur*.4);
      sg.gain.exponentialRampToValueAtTime(.0001,t+dur);
      s.connect(sg);sg.connect(padBus);
      s.start(t);s.stop(t+dur+.1);
    }
  });
}
function sawPad(notes,t,dur){
  var f=ctx.createBiquadFilter();f.type='lowpass';f.Q.value=6;
  f.frequency.setValueAtTime(350,t);
  f.frequency.linearRampToValueAtTime(1600,t+dur*.5);
  f.frequency.linearRampToValueAtTime(500,t+dur);
  var g=ctx.createGain();env(g,t,.08,.05,dur*.95);
  f.connect(g);route(g,tapeBus,0,.2);
  notes.forEach(function(m){
    [-8,8].forEach(function(det){
      var o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=mfreq(m);o.detune.value=det;
      o.connect(f);o.start(t);o.stop(t+dur+.1);
    });
  });
}
function technoStab(notes,t){
  notes.forEach(function(m,i){
    var o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=mfreq(m);
    var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;
    var g=ctx.createGain();env(g,t,.01,.05,.25);
    o.connect(lp);lp.connect(g);route(g,tapeBus,i%2?-.3:.3,.2);
    o.start(t);o.stop(t+.4);
  });
}
function sweep(t,dur){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;s.loop=true;
  var lp=ctx.createBiquadFilter();lp.type='lowpass';
  lp.frequency.setValueAtTime(300,t);
  lp.frequency.linearRampToValueAtTime(5500,t+dur*.8);
  lp.frequency.linearRampToValueAtTime(400,t+dur);
  var g=ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(.04,t+dur*.7);
  g.gain.linearRampToValueAtTime(.0001,t+dur);
  s.connect(lp);lp.connect(g);g.connect(tapeBus);
  s.start(t);s.stop(t+dur+.1);
}
function bassNote(m,t,dur){
  var o=makeOsc('sine',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.01,.28,dur);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+dur+.1);
}
function technoBass(m,t){
  var o=ctx.createOscillator();o.type='square';o.frequency.value=mfreq(m);
  var g=ctx.createGain();env(g,t,.004,.11,.1);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+.18);
}
function dubBass(m,t,dur){
  var o=makeOsc('sine',mfreq(m),t);
  o.frequency.setValueAtTime(mfreq(m)*0.93,t);
  o.frequency.exponentialRampToValueAtTime(mfreq(m),t+.09);
  var g=ctx.createGain();env(g,t,.01,.32,dur);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+dur+.1);
}
function waveBass(m,t){
  var o=ctx.createOscillator();o.type='square';o.frequency.value=mfreq(m);
  var g=ctx.createGain();env(g,t,.005,.15,.16);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+.25);
}
function tapeMel(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.005,.12,.45);
  o.connect(g);route(g,tapeBus,0,.5);
  sendDly(g,.35);
  o.start(t);o.stop(t+.6);
}
function dubMel(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.005,.1,.4);
  o.connect(g);route(g,tapeBus,.15,.4);
  sendDly(g,.8);
  o.start(t);o.stop(t+.5);
}
function cowbell(m,t){
  var o=makeOsc('square',mfreq(m),t);
  var o2=makeOsc('square',mfreq(m)*1.47,t);
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1100;bp.Q.value=2.5;
  var g=ctx.createGain();env(g,t,.002,.09,.16);
  o.connect(bp);o2.connect(bp);bp.connect(g);
  route(g,tapeBus,0,.25);
  sendDly(g,.3);
  o.start(t);o2.start(t);o.stop(t+.3);o2.stop(t+.3);
}
function nylon(m,t,dur,vel){
  var o=makeOsc('sine',mfreq(m),t);
  var o2=makeOsc('triangle',mfreq(m)*2,t);
  var g2=ctx.createGain();g2.gain.value=.2;
  var g=ctx.createGain();env(g,t,.004,vel,dur);
  o.connect(g);o2.connect(g2);g2.connect(g);
  route(g,tapeBus,(Math.random()-.5)*.4,.35);
  o.start(t);o2.start(t);o.stop(t+dur+.1);o2.stop(t+dur+.1);
}
function boxNote(m,t,dur,vel){
  var f=mfreq(m);
  var g=ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(vel,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  var o1=makeOsc('sine',f,t);
  var o2=makeOsc('sine',f*2,t);var g2=ctx.createGain();g2.gain.value=.5;
  var o3=makeOsc('sine',f*4,t);var g3=ctx.createGain();g3.gain.value=.15;
  o1.connect(g);o2.connect(g2);g2.connect(g);o3.connect(g3);g3.connect(g);
  route(g,tapeBus,(Math.random()-.5)*.4,.85);
  o1.start(t);o2.start(t);o3.start(t);
  o1.stop(t+dur+.1);o2.stop(t+dur+.1);o3.stop(t+dur+.1);
}
function pianoNote(m,t,dur,vel){
  var f=mfreq(m);
  var g=ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(vel,t+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  var o1=makeOsc('sine',f,t);
  var o2=makeOsc('sine',f*2,t);var g2=ctx.createGain();g2.gain.value=.28;
  var o3=makeOsc('sine',f*3,t);var g3=ctx.createGain();g3.gain.value=.07;
  o1.connect(g);o2.connect(g2);g2.connect(g);o3.connect(g3);g3.connect(g);
  route(g,tapeBus,(Math.random()-.5)*.3,.75);
  o1.start(t);o2.start(t);o3.start(t);
  o1.stop(t+dur+.1);o2.stop(t+dur+.1);o3.stop(t+dur+.1);
}
function rollChord(notes,t){
  notes.forEach(function(m,i){pianoNote(m,t+i*.05+Math.random()*.02,2.8,.07);});
}
function stab(notes,t){
  notes.forEach(function(m,i){
    var o=makeOsc('triangle',mfreq(m),t);
    var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900;bp.Q.value=.8;
    var g=ctx.createGain();env(g,t,.004,.06,.14);
    o.connect(bp);bp.connect(g);route(g,tapeBus,i%2?-.3:.3,.5);
    sendDly(g,.6);
    o.start(t);o.stop(t+.25);
  });
}
function chipVoice(m,t,dur,vel){
  var o=ctx.createOscillator();o.setPeriodicWave(pw25);o.frequency.value=mfreq(m);
  var g=ctx.createGain();env(g,t,.004,vel,dur);
  o.connect(g);route(g,tapeBus,0,.1);
  o.start(t);o.stop(t+dur+.05);
}
function chipLead(m,t,dur){
  var f=mfreq(m);
  var o=ctx.createOscillator();o.setPeriodicWave(pw50);
  o.frequency.setValueAtTime(f*0.891,t);
  o.frequency.exponentialRampToValueAtTime(f,t+.06);
  var g=ctx.createGain();env(g,t,.006,.065,dur);
  o.connect(g);route(g,tapeBus,0,.16);
  o.start(t);o.stop(t+dur+.1);
}
function chipBass(m,t,dur){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.006,.18,dur);
  o.connect(g);g.connect(tapeBus);
  o.start(t);o.stop(t+dur+.05);
}
function waveLead(m,t,dur){
  var o=ctx.createOscillator();o.setPeriodicWave(pw50);o.frequency.value=mfreq(m);
  var vib=ctx.createOscillator();vib.frequency.value=5.5;
  var vg=ctx.createGain();vg.gain.value=10;
  vib.connect(vg);vg.connect(o.detune);
  var g=ctx.createGain();env(g,t,.01,.075,dur);
  o.connect(g);route(g,tapeBus,0,.3);
  o.start(t);vib.start(t);
  o.stop(t+dur+.1);vib.stop(t+dur+.1);
}
function kick(t,vel){
  var o=makeOsc('sine',120,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);
  var g=ctx.createGain();env(g,t,.005,vel,.28);
  o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.4);
  padBus.gain.setValueAtTime(1,t);
  padBus.gain.linearRampToValueAtTime(.78,t+.02);
  padBus.gain.linearRampToValueAtTime(1,t+.3);
  beat();
}
function snare(t,vel,rev){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800;
  var g=ctx.createGain();env(g,t,.005,vel,.18);
  s.connect(bp);bp.connect(g);route(g,drumBus,0,rev||.25);
  s.start(t);s.stop(t+.3);
}
function trapSnare(t){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2800;
  var g=ctx.createGain();env(g,t,.002,.3,.12);
  s.connect(bp);bp.connect(g);g.connect(drumBus);
  s.start(t);s.stop(t+.2);
  var o=makeOsc('sine',200,t);
  var g2=ctx.createGain();env(g2,t,.002,.15,.08);
  o.connect(g2);g2.connect(drumBus);o.start(t);o.stop(t+.12);
}
function hat(t,vel,open){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=6500;
  var g=ctx.createGain();env(g,t,.002,vel,open?.22:.045);
  s.connect(hp);hp.connect(g);route(g,drumBus,.3,0);
  s.start(t);s.stop(t+(open?.3:.08));
}
function trapHat(t,vel){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=8000;
  var g=ctx.createGain();env(g,t,.001,vel,.03);
  s.connect(hp);hp.connect(g);g.connect(drumBus);
  s.start(t);s.stop(t+.06);
}
function brush(t,vel){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=3500;bp.Q.value=.6;
  var g=ctx.createGain();env(g,t,.004,vel,.12);
  s.connect(bp);bp.connect(g);route(g,drumBus,0,.2);
  s.start(t);s.stop(t+.2);
}
function chipKick(t){
  var o=makeOsc('square',300,t);o.frequency.exponentialRampToValueAtTime(50,t+.07);
  var g=ctx.createGain();env(g,t,.003,.3,.12);
  o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.2);
  beat();
}
function chipSnare(t,vel){
  var s=ctx.createBufferSource();s.buffer=holdBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2600;
  var g=ctx.createGain();env(g,t,.002,vel,.1);
  s.connect(bp);bp.connect(g);g.connect(drumBus);
  s.start(t);s.stop(t+.15);
}
function chipHat(t,vel){
  var s=ctx.createBufferSource();s.buffer=holdBuf;
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=6000;
  var g=ctx.createGain();env(g,t,.001,vel,.03);
  s.connect(hp);hp.connect(g);g.connect(drumBus);
  s.start(t);s.stop(t+.06);
}
function rim(t,vel){
  var o=makeOsc('square',1200,t);
  var g=ctx.createGain();env(g,t,.001,vel,.03);
  o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.06);
}
function rainSwell(t,dur){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;s.loop=true;
  var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;
  var g=ctx.createGain();
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(.035,t+dur*.35);
  g.gain.linearRampToValueAtTime(.0001,t+dur);
  s.connect(lp);lp.connect(g);route(g,tapeBus,0,.5);
  s.start(t);s.stop(t+dur+.1);
}
function beat(){
  els.led.classList.add('beat');
  setTimeout(function(){els.led.classList.remove('beat');},70);
}

var playing=false,started=false,step=0,bar=0,nextTime=0,timer=null,stepDur=.2,playSec=0;
var barChord=chordNotes(TRACKS[0].prog[0][0],TRACKS[0].prog[0][1]);
var barRoot=TRACKS[0].prog[0][0];

function scheduleStep(s,t){
  var tr=TRACKS[cur],eng=tr.engine;
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
    if(tr.drums.clave.indexOf(s)>-1){rim(t,.09);}
    if(tr.drums.stab.indexOf(s)>-1){stab(barChord,t);}
    if(s%2===0){hat(t,.03,false);}
    return;
  }
  if(eng==='jazz'&&tr.drums){
    if(tr.drums.brush.indexOf(s)>-1){brush(t,s%8===4?.07:.045);}
    if(s===14&&bar%2===1){brush(t,.06);}
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
    if(d.hat==='eighths'&&s%2===0){chipHat(t,.04);}
  }else if(eng==='wave'){
    if(d.hat==='offbeats'&&s%4===2){chipHat(t,.05);}
  }else if(eng==='dub'){
    if(s%2===0){hat(t,.045,false);}
  }else if(eng==='phonk'){
    trapHat(t,s%4===0?.06:.04);
  }else{
    if(d.hat==='eighths'&&s%2===0&&Math.random()>.1){hat(t,.08+Math.random()*.06,false);}
    if(d.hat==='sixteenths'){hat(t,.035+Math.random()*.03,false);}
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
  els.cassEng.textContent=ENG_NAME[tr.engine];
  els.cassette.dataset.eng=tr.engine;
  els.lcdNum.textContent=num(cur);
  els.lcdTitle.textContent=tr.title.toUpperCase();
  els.lcdTime.textContent='00:00';
  els.npTitle.textContent=tr.title;
  els.npEng.textContent=ENG_NAME[tr.engine];
  els.npEng.className='eng eng-'+tr.engine;
  els.npBar.style.width='0%';
  els.npTime.textContent='00:00 / '+tr.dur;
  document.body.dataset.eng=tr.engine;
  spotEls.forEach(function(sp,i){
    sp.classList.toggle('active',i===cur);
    if(i===cur&&homes[i]){
      sp.style.left=homes[i].l+'px';
      sp.style.top=homes[i].t+'px';
    }
  });
  if(audioReady){
    tapeShaper.curve=CURVES[tr.engine];
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
  else if(e.code.indexOf('Digit')===0){
    var n=parseInt(e.code.slice(5),10);
    if(n===0){selectTrack(9);}
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
    if(playSec>=dur){selectTrack(cur+1);}
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
  requestAnimationFrame(frame);
}

applyTrackMeta();
setStatus('выберите кассету со стола и нажмите play');
els.hint.classList.remove('hidden');
els.play.classList.add('attract');
requestAnimationFrame(frame);
})();