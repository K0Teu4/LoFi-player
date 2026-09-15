(function(){
'use strict';

/* ═══════ 1. КАССЕТА КАК ДАННЫЕ ═══════ */
var QUAL={m7:[0,3,7,10],maj7:[0,4,7,11],d7:[0,4,7,10],m9:[0,3,7,10,14],m6:[0,4,7,9]};
var ENG_NAME={tape:'TAPE',chip:'8-BIT',mine:'PIANO'};
var TRACKS=[
 {side:'A',title:'night bus',    engine:'tape',bpm:72, swing:.16,cutoff:2400,drums:'boom',hiss:.012,dur:'02:47',prog:[[57,'m7'],[53,'maj7'],[60,'maj7'],[55,'d7']]},
 {side:'A',title:'rainy window', engine:'mine',bpm:66, swing:0,  cutoff:2600,drums:'none',hiss:.008,dur:'03:12',rain:true,prog:[[50,'m9'],[46,'maj7'],[43,'m7'],[45,'d7']]},
 {side:'A',title:'paper moon',   engine:'chip',bpm:104,swing:0,  cutoff:9000,drums:'chip',hiss:.005,dur:'02:31',prog:[[60,'maj7'],[57,'m7'],[50,'m7'],[55,'d7']]},
 {side:'B',title:'static dreams',engine:'tape',bpm:70, swing:.18,cutoff:1600,drums:'soft',hiss:.020,dur:'03:05',prog:[[53,'maj7'],[55,'d7'],[52,'m7'],[57,'m7']]},
 {side:'B',title:'last tram',    engine:'chip',bpm:92, swing:0,  cutoff:9000,drums:'chip',hiss:.005,dur:'02:58',prog:[[46,'maj7'],[43,'m7'],[48,'m7'],[53,'d7']]},
 {side:'B',title:'sleep tape',   engine:'mine',bpm:54, swing:0,  cutoff:1800,drums:'none',hiss:.010,dur:'04:03',rain:true,prog:[[57,'m7'],[55,'m6'],[53,'maj7'],[52,'d7']]}
];
function mfreq(m){return 440*Math.pow(2,(m-69)/12);}
function chordNotes(root,q){return QUAL[q].map(function(iv){return root+iv;});}
function parseDur(s){var p=s.split(':');return parseInt(p[0])*60+parseInt(p[1]);}

/* ═══════ 2. DOM ═══════ */
function $(s){return document.querySelector(s);}
var els={
  play:$('#playBtn'),stop:$('#stopBtn'),rew:$('#rewBtn'),ff:$('#ffBtn'),flip:$('#flipBtn'),
  vol:$('#vol'),status:$('#status'),tapeLabel:$('#tapeLabel'),cassette:$('#cassette'),
  lcdSide:$('#lcdSide'),lcdTitle:$('#lcdTitle'),lcdTime:$('#lcdTime'),
  counter:$('#counter'),listA:$('#listA'),listB:$('#listB'),
  reelL:$('#reelL'),reelR:$('#reelR'),spectrum:$('#spectrum'),led:$('#led'),rain:$('#rain')
};
function setStatus(t){els.status.textContent=t;}
window.addEventListener('error',function(ev){setStatus('ошибка скрипта: '+ev.message);});

/* создаём 8 полос спектра */
var bars=[];
(function(){
  for(var i=0;i<8;i++){
    var bar=document.createElement('div');bar.className='bar';bar.style.height='2px';
    els.spectrum.appendChild(bar);bars.push(bar);
  }
})();

/* дождь */
(function(){
  for(var i=0;i<40;i++){
    var drop=document.createElement('div');drop.className='raindrop';
    drop.style.left=Math.random()*100+'%';
    drop.style.animationDuration=(1+Math.random()*2)+'s';
    drop.style.animationDelay=(-Math.random()*3)+'s';
    drop.style.opacity=0.3+Math.random()*0.4;
    els.rain.appendChild(drop);
  }
})();

/* ripple-эффект */
function addRipple(e,btn){
  var rect=btn.getBoundingClientRect();
  var size=Math.max(rect.width,rect.height);
  var x=e.clientX-rect.left-size/2;
  var y=e.clientY-rect.top-size/2;
  var ripple=document.createElement('span');
  ripple.className='ripple';
  ripple.style.width=ripple.style.height=size+'px';
  ripple.style.left=x+'px';
  ripple.style.top=y+'px';
  btn.appendChild(ripple);
  setTimeout(function(){ripple.remove();},600);
}
[els.play,els.stop,els.rew,els.ff,els.flip].forEach(function(btn){
  btn.addEventListener('click',function(e){addRipple(e,btn);});
});

var segsL=[],segsR=[];

var strips=[];
(function(){
  for(var d=0;d<4;d++){
    var digit=document.createElement('span');digit.className='digit';
    var strip=document.createElement('span');strip.className='strip';
    for(var n=0;n<10;n++){var cell=document.createElement('i');cell.textContent=n;strip.appendChild(cell);}
    digit.appendChild(strip);els.counter.appendChild(digit);strips.push(strip);
  }
})();

var cur=0;
var trackStartTimes={};
function renderList(){
  [['A',els.listA],['B',els.listB]].forEach(function(pair){
    var box=pair[1];box.innerHTML='';
    TRACKS.forEach(function(tr,i){
      if(tr.side!==pair[0])return;
      var b=document.createElement('button');
      b.type='button';
      b.className='track'+(i===cur?' active':'');
      var num=document.createElement('span');num.className='num';num.textContent=String(i+1).padStart(2,'0');
      var ttl=document.createElement('span');ttl.className='ttl';ttl.textContent=tr.title;
      var eng=document.createElement('span');eng.className='eng eng-'+tr.engine;eng.textContent=ENG_NAME[tr.engine];
      var dur=document.createElement('span');dur.className='dur';dur.textContent=tr.dur;
      var prog=document.createElement('div');prog.className='track-progress';
      var progBar=document.createElement('div');progBar.className='track-progress-bar';
      prog.appendChild(progBar);
      b.appendChild(num);b.appendChild(ttl);b.appendChild(eng);b.appendChild(dur);b.appendChild(prog);
      b.addEventListener('click',function(){selectTrack(i);});
      box.appendChild(b);
    });
  });
}

/* ═══════ 3. АУДИО-ТРАКТ ═══════ */
var ctx=null,audioReady=false;
var master=null,tapeBus=null,tapeLP=null,tapeShaper=null,padBus=null,drumBus=null,revIn=null,noiseGain=null,delayNode=null,lfoGain=null;
var noiseBuf=null,crackBuf=null,holdBuf=null,hissSrc=null,crackSrc=null,analyser=null,analyserBuf=null;
var pw25=null,pw50=null,CURVES=null;

function volVal(){return Math.pow(Number(els.vol.value)/100,1.6)*0.9;}

function makeCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.tanh(2.2*x)/Math.tanh(2.2);}
  return c;
}
function makeChipCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;
    var y=Math.round(Math.tanh(1.6*x)*7)/7;
    c[i]=Math.max(-1,Math.min(1,y));}
  return c;
}
function makeMineCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.tanh(1.3*x)/Math.tanh(1.3);}
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
  CURVES={tape:makeCurve(),chip:makeChipCurve(),mine:makeMineCurve()};
  pw25=pulseWave(.25);pw50=pulseWave(.5);
  master=ctx.createGain();master.gain.value=volVal();
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=35;
  var comp=ctx.createDynamicsCompressor();
  comp.threshold.value=-18;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.18;
  master.connect(hp);hp.connect(comp);comp.connect(ctx.destination);
  
  /* анализатор спектра */
  analyser=ctx.createAnalyser();analyser.fftSize=64;analyser.smoothingTimeConstant=.7;
  analyserBuf=new Uint8Array(analyser.frequencyBinCount);
  comp.connect(analyser);

  tapeLP=ctx.createBiquadFilter();tapeLP.type='lowpass';tapeLP.frequency.value=TRACKS[cur].cutoff;
  tapeShaper=ctx.createWaveShaper();tapeShaper.curve=CURVES[TRACKS[cur].engine];tapeShaper.oversample='2x';
  tapeBus=ctx.createGain();tapeBus.connect(tapeLP);tapeLP.connect(tapeShaper);tapeShaper.connect(master);
  padBus=ctx.createGain();padBus.connect(tapeBus);
  drumBus=ctx.createGain();drumBus.gain.value=.95;drumBus.connect(tapeBus);

  var lfo=ctx.createOscillator();lfo.frequency.value=.7;
  lfoGain=ctx.createGain();lfoGain.gain.value=4;lfo.connect(lfoGain);lfo.start();

  delayNode=ctx.createDelay(1);delayNode.delayTime.value=.31;
  var fb=ctx.createGain();fb.gain.value=.22;delayNode.connect(fb);fb.connect(delayNode);
  var dO=ctx.createGain();dO.gain.value=.5;delayNode.connect(dO);dO.connect(master);

  revIn=ctx.createGain();
  var conv=ctx.createConvolver();conv.buffer=makeIR();
  var revO=ctx.createGain();revO.gain.value=.9;
  revIn.connect(conv);conv.connect(revO);revO.connect(master);

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
function startNoise(){
  var tr=TRACKS[cur];
  hissSrc=ctx.createBufferSource();hissSrc.buffer=noiseBuf;hissSrc.loop=true;
  var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=6000;
  var hg=ctx.createGain();hg.gain.value=tr.hiss;
  hissSrc.connect(lp);lp.connect(hg);hg.connect(noiseGain);
  crackSrc=ctx.createBufferSource();crackSrc.buffer=crackBuf;crackSrc.loop=true;
  var cg=ctx.createGain();cg.gain.value=tr.engine==='tape'?.5:.15;
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
    g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.2);}
  else{o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(24,t+.5);
    g.gain.setValueAtTime(.22,t);g.gain.exponentialRampToValueAtTime(.0001,t+.55);}
  o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.6);
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

/* ── движок TAPE ── */
function pad(notes,t,dur){
  notes.forEach(function(m,i){
    [-4,4].forEach(function(det){
      var o=makeOsc('triangle',mfreq(m),t);
      o.detune.value=det+(Math.random()*6-3);lfoGain.connect(o.detune);
      var g=ctx.createGain();env(g,t,.05,.05,dur*.9);
      o.connect(g);route(g,padBus,i%2?-0.25:0.25,i===0?0.12:0);
      o.start(t);o.stop(t+dur+.1);
    });
  });
}
function bassNote(root,t,dur){
  var o=makeOsc('sine',mfreq(root-12),t);
  var g=ctx.createGain();env(g,t,.01,.3,dur);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+dur+.1);
}
function pluck(m,t,p){
  var o=makeOsc('triangle',mfreq(m+12),t);
  var g=ctx.createGain();env(g,t,.005,.12,.4);
  o.connect(g);route(g,tapeBus,p,.5);
  var s=ctx.createGain();s.gain.value=.35;g.connect(s);s.connect(delayNode);
  o.start(t);o.stop(t+.6);
}
function kick(t,vel){
  var o=makeOsc('sine',120,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);
  var g=ctx.createGain();env(g,t,.005,vel,.28);
  o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.4);
  padBus.gain.setValueAtTime(1,t);
  padBus.gain.linearRampToValueAtTime(.78,t+.02);
  padBus.gain.linearRampToValueAtTime(1,t+.3);
  /* beat для LED */
  els.led.classList.add('beat');
  setTimeout(function(){els.led.classList.remove('beat');},80);
}
function snare(t,vel){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800;
  var g=ctx.createGain();env(g,t,.005,vel,.18);
  s.connect(bp);bp.connect(g);route(g,drumBus,0,.25);
  s.start(t);s.stop(t+.3);
}
function hat(t,vel,open){
  var s=ctx.createBufferSource();s.buffer=noiseBuf;
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=6500;
  var g=ctx.createGain();env(g,t,.002,vel,open?.22:.045);
  s.connect(hp);hp.connect(g);route(g,drumBus,.3,0);
  s.start(t);s.stop(t+(open?.3:.08));
}

/* ── движок 8-BIT ── */
function chipVoice(m,t,dur,vel){
  var o=ctx.createOscillator();o.setPeriodicWave(pw25);o.frequency.value=mfreq(m);
  var g=ctx.createGain();env(g,t,.004,vel,dur);
  o.connect(g);route(g,tapeBus,0,.12);
  o.start(t);o.stop(t+dur+.05);
}
function chipLead(m,t,dur){
  var f=mfreq(m);
  var o=ctx.createOscillator();o.setPeriodicWave(pw50);
  o.frequency.setValueAtTime(f*0.891,t);
  o.frequency.exponentialRampToValueAtTime(f,t+.06);
  var g=ctx.createGain();env(g,t,.006,.09,dur);
  o.connect(g);route(g,tapeBus,0,.18);
  o.start(t);o.stop(t+dur+.1);
}
function chipBass(m,t,dur){
  var o=makeOsc('triangle',mfreq(m-12),t);
  var g=ctx.createGain();env(g,t,.006,.24,dur);
  o.connect(g);g.connect(tapeBus);
  o.start(t);o.stop(t+dur+.05);
}
function chipKick(t){
  var o=makeOsc('square',300,t);o.frequency.exponentialRampToValueAtTime(50,t+.07);
  var g=ctx.createGain();env(g,t,.003,.4,.12);
  o.connect(g);g.connect(drumBus);o.start(t);o.stop(t+.2);
  els.led.classList.add('beat');
  setTimeout(function(){els.led.classList.remove('beat');},60);
}
function chipSnare(t,vel){
  var s=ctx.createBufferSource();s.buffer=holdBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2600;
  var g=ctx.createGain();env(g,t,.002,vel||.28,.1);
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

/* ── движок PIANO ── */
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
  notes.forEach(function(m,i){pianoNote(m,t+i*.05+Math.random()*.02,2.8,.075);});
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

/* ═══════ 4. СЕКВЕНСОР ═══════ */
var playing=false,step=0,bar=0,nextTime=0,timer=null,stepDur=.2,playSec=0,flipping=false;
var barChord=chordNotes(TRACKS[0].prog[0][0],TRACKS[0].prog[0][1]);
var barRoot=TRACKS[0].prog[0][0];
function rndNote(){return barChord[Math.floor(Math.random()*barChord.length)];}

function scheduleStep(s,t){
  var tr=TRACKS[cur],eng=tr.engine;
  if(s===0){
    var pr=tr.prog[bar%tr.prog.length];
    barRoot=pr[0];barChord=chordNotes(pr[0],pr[1]);
    if(eng==='tape'){pad(barChord,t,stepDur*16*.98);bassNote(barRoot,t,stepDur*6);}
    else if(eng==='mine'){rollChord(barChord,t);pianoNote(barRoot-12,t,stepDur*15,.35);
      if(tr.rain){rainSwell(t,stepDur*16);}}
    else{chipBass(barRoot,t,stepDur*7);}
  }
  if(eng==='tape'){
    if(s===8){bassNote(barRoot,t,stepDur*4);}
    if(s===14&&Math.random()<.35){bassNote(barRoot,t,stepDur*2);}
    if(tr.drums==='boom'){
      if(s===0||s===10||(bar%2===1&&s===7)){kick(t,.85+Math.random()*.1);}
      if(s===4||s===12){snare(t,.45);}
      if(s===14&&bar%4===3){snare(t,.12);}
      if(s%2===0&&Math.random()>.12){hat(t,.08+Math.random()*.06,false);}
      if(s===14&&bar%4===1){hat(t,.1,true);}
    }else if(tr.drums==='soft'){
      if(s===0||s===11){kick(t,.7);}
      if(s===8){snare(t,.4);}
      if(s%2===0){hat(t,.05+Math.random()*.04,false);}
      if(s===14&&bar%2===1){hat(t,.09,true);}
    }
    if(Math.random()<.16){pluck(rndNote(),t,bar%2?.25:-.25);}
  }else if(eng==='chip'){
    chipVoice(barChord[step%barChord.length]+12,t,stepDur*.85,.055);
    if(s===0||s===8){chipKick(t);}
    if(s===4||s===12){chipSnare(t,.28);}
    if(s%2===0){chipHat(t,.05);}
    if(bar%4===3&&s>=12){chipHat(t,.09);}
    if(s%4===2&&Math.random()<.5){chipLead(rndNote()+12,t,stepDur*3);}
  }else{
    if(s===8&&Math.random()<.5){pianoNote(rndNote()+12,t+(Math.random()*.04-.02),stepDur*8,.3);}
    if(s===4&&bar%2===1&&Math.random()<.4){pianoNote(rndNote()+12,t+(Math.random()*.03-.015),stepDur*10,.2);}
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

/* ═══════ 5. УПРАВЛЕНИЕ ═══════ */
function fmt(sec){
  var m=Math.floor(sec/60),s=Math.floor(sec%60);
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function nowPlayingMsg(){
  var tr=TRACKS[cur];
  return '▸ '+ENG_NAME[tr.engine]+' · side '+tr.side+' · «'+tr.title+'» · лента крутится';
}
function playTape(){
  if(!ensureAudio())return;
  if(ctx.state==='suspended'){ctx.resume();}
  stepDur=60/TRACKS[cur].bpm/4;
  nextTime=ctx.currentTime+.1;
  if(timer){clearInterval(timer);}
  timer=setInterval(tickScheduler,30);
  startNoise();motor(true);
  playing=true;
  trackStartTimes[cur]=Date.now()-playSec*1000;
  document.body.classList.add('is-playing');
  if(TRACKS[cur].rain){document.body.classList.add('is-raining');}
  els.play.classList.add('pressed');
  setStatus(nowPlayingMsg());
}
function pauseTape(msg){
  playing=false;
  if(timer){clearInterval(timer);timer=null;}
  stopNoise();
  document.body.classList.remove('is-playing');
  document.body.classList.remove('is-raining');
  els.play.classList.remove('pressed');
  setStatus(msg);
}
function stopTape(){
  step=0;bar=0;playSec=0;
  motor(false);
  pauseTape('■ стоп. но счётчик продолжает тикать: лента пишет ваше время здесь.');
  els.lcdTime.textContent='00:00';
  updateProgress();
}
function selectTrack(i){
  cur=((i%TRACKS.length)+TRACKS.length)%TRACKS.length;
  step=0;bar=0;playSec=0;
  stepDur=60/TRACKS[cur].bpm/4;
  var tr=TRACKS[cur];
  if(audioReady){
    tapeShaper.curve=CURVES[tr.engine];
    tapeLP.frequency.setTargetAtTime(tr.cutoff,ctx.currentTime,.3);
    if(playing){nextTime=ctx.currentTime+.06;}
  }
  var inSide=0;
  for(var k=0;k<TRACKS.length;k++){if(TRACKS[k].side===tr.side){if(k===cur)break;inSide++;}}
  els.tapeLabel.textContent=tr.title.toUpperCase();
  els.lcdSide.textContent=tr.side+(inSide+1);
  els.lcdTitle.textContent=tr.title.toUpperCase();
  els.lcdTime.textContent='00:00';
  
  /* меняем цвет кассеты */
  els.cassette.className='cassette cassette-'+tr.engine;
  
  /* дождь */
  if(playing&&tr.rain){document.body.classList.add('is-raining');}
  else{document.body.classList.remove('is-raining');}
  
  if(playing){trackStartTimes[cur]=Date.now();}
  renderList();
  updateProgress();
  if(playing){setStatus(nowPlayingMsg());}
}
function flipSide(){
  if(flipping)return;
  flipping=true;
  els.cassette.classList.add('flip');
  var target=TRACKS[cur].side==='A'?'B':'A';
  var first=-1;
  for(var i=0;i<TRACKS.length;i++){if(TRACKS[i].side===target){first=i;break;}}
  setTimeout(function(){selectTrack(first);},450);
  setTimeout(function(){
    els.cassette.classList.remove('flip');
    flipping=false;
    setStatus('⇄ кассета перевёрнута. сторона '+target+'.');
  },950);
}
function applyVol(){
  if(master&&ctx){master.gain.setTargetAtTime(volVal(),ctx.currentTime,.05);}
}

els.play.addEventListener('click',function(){
  if(playing){pauseTape('‖ пауза. катушки докручиваются по инерции…');}
  else{playTape();}
});
els.stop.addEventListener('click',stopTape);
els.rew.addEventListener('click',function(){selectTrack(cur-1);});
els.ff.addEventListener('click',function(){selectTrack(cur+1);});
els.flip.addEventListener('click',flipSide);
els.vol.addEventListener('input',applyVol);
document.addEventListener('keydown',function(e){
  if(e.target&&e.target.tagName==='INPUT')return;
  if(e.code==='Space'){e.preventDefault();els.play.click();}
  else if(e.code==='KeyS'){stopTape();}
  else if(e.code==='ArrowLeft'){selectTrack(cur-1);}
  else if(e.code==='ArrowRight'){selectTrack(cur+1);}
  else if(e.code==='KeyF'){flipSide();}
  else if(e.code==='ArrowUp'){e.preventDefault();els.vol.value=String(Math.min(100,Number(els.vol.value)+5));applyVol();}
  else if(e.code==='ArrowDown'){e.preventDefault();els.vol.value=String(Math.max(0,Number(els.vol.value)-5));applyVol();}
});

/* ═══════ 6. ОДОМЕТР ═══════ */
var siteSec=0;
setInterval(function(){
  siteSec++;
  var ds=String(siteSec%10000).padStart(4,'0');
  for(var i=0;i<4;i++){strips[i].style.transform='translateY(-'+Number(ds[i])+'em)';}
},1000);

/* ═══════ 7. ГЛАВНЫЙ ЦИКЛ: катушки + спектр + прогресс ═══════ */
var aL=0,aR=0,v=0,last=performance.now();
function updateProgress(){
  var dur=parseDur(TRACKS[cur].dur);
  var pct=Math.min(100,(playSec/dur)*100);
  var bars=document.querySelectorAll('.track-progress-bar');
  bars.forEach(function(bar,idx){
    bar.style.width=(idx===cur&&playing)?pct+'%':'0%';
  });
}
function frame(now){
  var dt=Math.min(.05,(now-last)/1000);last=now;
  v+=((playing?1:0)-v)*.04;
  aL+=v*3.2;aR+=v*4.1;
  els.reelL.style.transform='rotate('+aL+'deg)';
  els.reelR.style.transform='rotate('+aR+'deg)';
  if(playing){
    playSec+=dt;
    els.lcdTime.textContent=fmt(playSec);
    updateProgress();
  }
  
  /* спектр */
  if(audioReady&&analyser&&playing){
    analyser.getByteFrequencyData(analyserBuf);
    for(var i=0;i<8;i++){
      var idx=Math.floor(i*analyserBuf.length/8);
      var val=analyserBuf[idx]/255;
      var h=Math.max(2,val*28);
      bars[i].style.height=h+'px';
    }
  }else{
    for(var j=0;j<8;j++){bars[j].style.height='2px';}
  }
  
  requestAnimationFrame(frame);
}

/* ═══════ СТАРТ ═══════ */
renderList();
selectTrack(0);
setStatus('стоп. но счётчик уже тикает: лента записывает ваше время здесь.');
requestAnimationFrame(frame);
})();