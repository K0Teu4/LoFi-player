(function(){
'use strict';

var QUAL={m7:[0,3,7,10],maj7:[0,4,7,11],d7:[0,4,7,10],m9:[0,3,7,10,14],m6:[0,4,7,9]};
var ENG_NAME={tape:'TAPE',chip:'8-BIT',mine:'PIANO'};
var TRACKS=[
 {title:'night bus',engine:'tape',voice:'pluck',bpm:72,swing:.16,cutoff:2400,hiss:.012,dur:'02:47',
  prog:[[57,'m7'],[53,'maj7'],[60,'maj7'],[55,'d7']],
  bass:[[0,0,6],[8,0,4],[14,12,2]],
  mel:[[0,2,2,1,6],[0,8,1,1,4],[0,14,3,1,2],[1,4,2,1,8],[1,12,1,1,4],[2,0,0,1,6],[2,10,2,1,6],[3,6,1,1,10]],
  drums:{kick:[0,10],odd:[7],snare:[4,12],hat:'eighths',open:[],fill:4},arp:null,padlow:false},
 {title:'rainy window',engine:'mine',voice:'piano',bpm:66,swing:0,cutoff:2600,hiss:.008,dur:'03:12',rain:true,
  prog:[[50,'m9'],[46,'maj7'],[43,'m7'],[45,'d7']],
  bass:[[0,0,15]],
  mel:[[0,4,2,1,8],[0,12,3,1,4],[1,0,2,1,10],[1,10,1,1,6],[2,6,0,1,8],[2,14,2,1,2],[3,0,1,1,14]],
  drums:null,arp:null,padlow:false},
 {title:'paper moon',engine:'chip',voice:'chip',bpm:104,swing:0,cutoff:7500,hiss:.004,dur:'02:31',
  prog:[[60,'maj7'],[57,'m7'],[50,'m7'],[55,'d7']],
  bass:[[0,0,2],[2,0,2],[4,0,2],[6,12,2],[8,0,2],[10,0,2],[12,0,2],[14,12,2]],
  mel:[[0,0,0,2,2],[0,2,1,2,2],[0,4,2,2,4],[0,10,3,2,2],[0,12,2,2,4],[1,0,1,2,4],[1,8,0,2,4],[1,12,2,2,4],[2,0,2,2,4],[2,6,1,2,4],[2,12,0,2,4],[3,4,1,2,6],[3,12,0,2,4]],
  drums:{kick:[0,8],snare:[4,12],hat:'eighths',fill:8},arp:'16',padlow:false},
 {title:'static dreams',engine:'tape',voice:'mute',bpm:70,swing:.2,cutoff:1600,hiss:.02,dur:'03:05',
  prog:[[52,'m7'],[48,'maj7'],[55,'maj7'],[47,'m7']],
  bass:[[0,0,10],[10,7,4]],
  mel:[[0,6,0,1,6],[0,12,2,1,4],[1,0,1,1,8],[1,14,3,1,2],[2,4,2,1,6],[2,8,1,1,6],[3,0,0,1,12]],
  drums:{kick:[0,11],snare:[8],hat:'sixteenths',open:[14],fill:8},arp:null,padlow:true},
 {title:'last tram',engine:'chip',voice:'chip',bpm:92,swing:0,cutoff:7500,hiss:.004,dur:'02:58',
  prog:[[57,'m7'],[53,'maj7'],[48,'maj7'],[52,'d7']],
  bass:[[0,0,4],[6,12,2],[8,0,4],[14,12,2]],
  mel:[[0,0,0,1,6],[0,8,2,1,6],[1,4,1,1,8],[1,12,0,1,4],[2,0,3,0,6],[2,10,2,1,6],[3,0,1,1,12]],
  drums:{kick:[0,10],snare:[8],hat:'offbeats',fill:8},arp:null,padlow:false},
 {title:'sleep tape',engine:'mine',voice:'box',bpm:58,swing:0,cutoff:2000,hiss:.006,dur:'04:03',
  prog:[[60,'maj7'],[55,'m6'],[57,'m7'],[53,'maj7']],
  bass:[[0,0,12]],
  mel:[[0,8,0,2,10],[1,4,2,2,12],[2,0,1,3,10],[2,10,0,3,4],[3,6,2,2,16]],
  drums:null,arp:null,padlow:true}
];
function mfreq(m){return 440*Math.pow(2,(m-69)/12);}
function chordNotes(root,q){return QUAL[q].map(function(iv){return root+iv;});}
function parseDur(s){var p=s.split(':');return parseInt(p[0],10)*60+parseInt(p[1],10);}
function num(i){return String(i+1).padStart(2,'0');}

function $(s){return document.querySelector(s);}
var els={
  play:$('#playBtn'),stop:$('#stopBtn'),rew:$('#rewBtn'),ff:$('#ffBtn'),
  vol:$('#vol'),status:$('#status'),tapeLabel:$('#tapeLabel'),cassette:$('#cassette'),
  cassNum:$('#cassNum'),cassEng:$('#cassEng'),
  lcdNum:$('#lcdNum'),lcdTitle:$('#lcdTitle'),lcdTime:$('#lcdTime'),
  counter:$('#counter'),shelf:$('#shelf'),
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

var cur=0,swapLock=false;
var boxEls=[];
(function(){
  TRACKS.forEach(function(tr,i){
    var b=document.createElement('button');
    b.type='button';
    b.className='box';
    b.dataset.eng=tr.engine;
    b.title=tr.title;
    var lab=document.createElement('span');lab.className='bx-label';
    var n=document.createElement('span');n.className='bx-num';n.textContent=num(i);
    var t=document.createElement('span');t.className='bx-title';t.textContent=tr.title.toUpperCase();
    lab.appendChild(n);lab.appendChild(t);b.appendChild(lab);
    b.addEventListener('click',function(){selectTrack(i);});
    els.shelf.appendChild(b);boxEls.push(b);
  });
})();

var ctx=null,audioReady=false;
var master=null,tapeBus=null,tapeLP=null,tapeShaper=null,padBus=null,drumBus=null,revIn=null,noiseGain=null,delayNode=null,lfoGain=null;
var noiseBuf=null,crackBuf=null,holdBuf=null,hissSrc=null,crackSrc=null,analyser=null,freqBuf=null;
var pw25=null,pw50=null,CURVES=null;

function volVal(){return Math.pow(Number(els.vol.value)/100,1.6)*0.9;}
function makeCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.tanh(2.2*x)/Math.tanh(2.2);}
  return c;
}
function makeChipCurve(){
  var n=1024,c=new Float32Array(n);
  for(var i=0;i<n;i++){var x=i/(n-1)*2-1;c[i]=Math.max(-1,Math.min(1,Math.round(Math.tanh(1.6*x)*7)/7));}
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
  analyser=ctx.createAnalyser();analyser.fftSize=64;analyser.smoothingTimeConstant=.72;
  freqBuf=new Uint8Array(analyser.frequencyBinCount);
  comp.connect(analyser);
  tapeLP=ctx.createBiquadFilter();tapeLP.type='lowpass';tapeLP.frequency.value=TRACKS[cur].cutoff;
  tapeShaper=ctx.createWaveShaper();tapeShaper.curve=CURVES[TRACKS[cur].engine];tapeShaper.oversample='2x';
  tapeBus=ctx.createGain();tapeBus.connect(tapeLP);tapeLP.connect(tapeShaper);tapeShaper.connect(master);
  padBus=ctx.createGain();padBus.connect(tapeBus);
  drumBus=ctx.createGain();drumBus.gain.value=.9;drumBus.connect(tapeBus);
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
    g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.0001,t+.2);}
  else{o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(24,t+.45);
    g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.0001,t+.5);}
  o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.6);
}
function ejectSfx(){
  if(!audioReady)return;
  var t=ctx.currentTime,s=ctx.createBufferSource();s.buffer=holdBuf;
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900;
  var g=ctx.createGain();env(g,t,.002,.15,.12);
  s.connect(bp);bp.connect(g);g.connect(master);
  s.start(t);s.stop(t+.2);
}
function insertSfx(){
  if(!audioReady)return;
  var t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();
  o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(55,t+.08);
  env(g,t,.002,.25,.12);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+.2);
  var s=ctx.createBufferSource();s.buffer=holdBuf;
  var hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=2000;
  var g2=ctx.createGain();env(g2,t+.02,.001,.08,.04);
  s.connect(hp);hp.connect(g2);g2.connect(master);
  s.start(t+.02);s.stop(t+.1);
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
function bassNote(m,t,dur){
  var o=makeOsc('sine',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.01,.28,dur);
  o.connect(g);g.connect(tapeBus);o.start(t);o.stop(t+dur+.1);
}
function tapeMel(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var g=ctx.createGain();env(g,t,.005,.12,.45);
  o.connect(g);route(g,tapeBus,0,.5);
  var s=ctx.createGain();s.gain.value=.35;g.connect(s);s.connect(delayNode);
  o.start(t);o.stop(t+.6);
}
function mutePluck(m,t){
  var o=makeOsc('triangle',mfreq(m),t);
  var bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1100;bp.Q.value=1.2;
  var g=ctx.createGain();env(g,t,.004,.15,.22);
  o.connect(bp);bp.connect(g);route(g,tapeBus,.2,.35);
  o.start(t);o.stop(t+.35);
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
function rollChord(notes,t){
  notes.forEach(function(m,i){pianoNote(m,t+i*.05+Math.random()*.02,2.8,.07);});
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
    if(eng==='tape'){pad(barChord,t,stepDur*16*.98,tr.padlow);}
    if(eng==='mine'){
      if(tr.voice==='piano'){rollChord(barChord,t);if(tr.rain){rainSwell(t,stepDur*16);}}
      else if(bar%2===0){pad(barChord,t,stepDur*32*.9,true);}
      pianoNote(barRoot-12,t,stepDur*10,.3);
    }
    tr.bass.forEach(function(ev){
      var bt=t+ev[0]*stepDur+(ev[0]%2?stepDur*tr.swing:0);
      var note=barRoot+ev[1]-12;
      var len=ev[2]*stepDur;
      if(eng==='tape'){bassNote(note,bt,len);}
      else if(eng==='chip'){chipBass(note,bt,len);}
    });
    var b4=bar%4;
    tr.mel.forEach(function(ev){
      if(ev[0]!==b4)return;
      var st=ev[1];
      var mt=t+st*stepDur+(st%2?stepDur*tr.swing:0);
      var note=barChord[ev[2]%barChord.length]+12*ev[3];
      var len=ev[4]*stepDur;
      if(tr.voice==='pluck'){tapeMel(note,mt);}
      else if(tr.voice==='mute'){mutePluck(note,mt);}
      else if(tr.voice==='chip'){chipLead(note,mt,len);}
      else if(tr.voice==='box'){boxNote(note,mt,len,.22);}
      else{pianoNote(note,mt,len,.3);}
    });
  }
  if(eng==='chip'&&tr.arp==='16'){chipVoice(barChord[step%barChord.length]+12,t,stepDur*.85,.035);}
  if(!tr.drums)return;
  var d=tr.drums;
  if(eng==='tape'&&bar%16===15)return;
  if(d.kick.indexOf(s)>-1||(bar%2===1&&d.odd&&d.odd.indexOf(s)>-1)){
    if(eng==='tape'){kick(t,.85+Math.random()*.1);}else{chipKick(t);}
  }
  if(d.snare.indexOf(s)>-1){
    if(eng==='tape'){snare(t,.45);}else{chipSnare(t,.2);}
  }
  if(d.fill&&bar%d.fill===d.fill-1&&s>=12){
    if(eng==='tape'){snare(t,.12);}else{chipHat(t,.07);}
  }
  if(d.open&&d.open.indexOf(s)>-1){hat(t,.1,true);}
  if(eng==='chip'){
    if(d.hat==='eighths'&&s%2===0){chipHat(t,.04);}
    if(d.hat==='offbeats'&&s%4===2){chipHat(t,.055);}
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
  boxEls.forEach(function(b,i){b.classList.toggle('active',i===cur);});
  if(audioReady){
    tapeShaper.curve=CURVES[tr.engine];
    tapeLP.frequency.setTargetAtTime(tr.cutoff,ctx.currentTime,.3);
  }
  if(tr.rain&&playing){document.body.classList.add('is-raining');}
  else{document.body.classList.remove('is-raining');}
  refreshTitle();
}
function resumePlayback(){
  motor(true);
  startNoise();
  nextTime=ctx.currentTime+.1;
  if(timer){clearInterval(timer);}
  timer=setInterval(tickScheduler,30);
}
function haltPlayback(){
  if(timer){clearInterval(timer);timer=null;}
  stopNoise();
  motor(false);
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
      }else if(!playing&&started){
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
    var pct=Math.min(100,(playSec/dur)*100);
    els.npBar.style.width=pct+'%';
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
setStatus('выберите кассету на полке и нажмите play');
els.hint.classList.remove('hidden');
els.play.classList.add('attract');
requestAnimationFrame(frame);
})();