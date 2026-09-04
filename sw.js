const CACHE_NAME='ops-center-v2-airports-13';
const APP_FILES=['./','./index.html','./manifest.webmanifest','./ops-icon.svg','./data/airports.min.json'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const requestUrl=new URL(event.request.url);
  if(requestUrl.origin!==self.location.origin)return;

  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response;
  }).catch(async()=>{
    const hit=await caches.match(event.request);
    if(hit)return hit;
    if(event.request.mode==='navigate'){
      const appShell=await caches.match('./index.html');
      if(appShell)return appShell;
    }
    return new Response('Ressource indisponible hors connexion',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }));
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=new URL('./?open=acars',self.registration.scope).href;
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    const existing=list[0];
    if(existing){existing.navigate(target);return existing.focus();}
    return clients.openWindow(target);
  }));
});
