(function(){
'use strict';

var CACHE='orbita-v5';
var APP_SHELL=[
  './',
  './index.html',
  './style.css?v=5',
  './script.js?v=5',
  './manifest.json',
  './icon.svg',
  './favicon.svg'
];

self.addEventListener('install', function(ev){
  self.skipWaiting();
  ev.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(APP_SHELL.map(function(url){
        return c.add(url).catch(function(){});
      }));
    })
  );
});

self.addEventListener('activate', function(ev){
  ev.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});

self.addEventListener('fetch', function(ev){
  var req=ev.request;
  if(req.method!=='GET')return;
  var url;
  try{url=new URL(req.url);}catch(e){return;}
  if(url.origin!==location.origin)return;

  if(req.mode==='navigate'){
    ev.respondWith(
      fetch(req).then(function(netRes){
        var copy=netRes.clone();
        caches.open(CACHE).then(function(c){c.put('./index.html',copy);});
        return netRes;
      }).catch(function(){
        return caches.match('./index.html').then(function(r){return r||caches.match('./');});
      })
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(function(cached){
      var netFetch=fetch(req).then(function(netRes){
        if(netRes&&netRes.status===200){
          var copy=netRes.clone();
          caches.open(CACHE).then(function(c){c.put(req,copy);});
        }
        return netRes;
      }).catch(function(){return cached;});
      return cached||netFetch;
    })
  );
});

self.addEventListener('message', function(ev){
  if(ev.data&&ev.data.type==='ping'){ev.ports[0].postMessage({ok:true});}
});
})();