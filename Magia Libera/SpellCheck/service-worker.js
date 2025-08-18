const RUNTIME_CACHE = 'runtime-cache-v1';
const CACHE_PREFIX = 'runtime-cache-';

/** Install: attiva subito la nuova versione */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

/** Activate: pulizia totale delle cache legacy + presa in carico immediata dei client */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX)).map(k => caches.delete(k))); // wipe totale, evita collisioni con cache precedenti
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  // Pagine HTML / navigazioni → network-first
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(new Request(req.url, { cache: 'reload' })); // forza round-trip
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          // fallback cache (offline/errore rete)
          const cached = await caches.match(req) || await caches.match(new Request('./')) || await caches.match('/index.html');
          if (cached) return cached;
          // fallback minimale a una pagina vuota per non rompere la UX
          return new Response('<!doctype html><title>Offline</title><h1>Offline</h1>', {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
            status: 200,
          });
        }
      })()
    );
    return;
  }

  // Asset first-party → Stale-While-Revalidate
  if (isSameOrigin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(req);

        // lanciamosubito la richiesta in parallelo per aggiornare
        const networkPromise = (async () => {
          try {
            // no-store: evita che il browser serva una copia dallo store HTTP interno
            const fresh = await fetch(req, { cache: 'no-store' });
            // Solo se risposta OK mettiamo in cache
            if (fresh && fresh.ok) {
              await cache.put(req, fresh.clone());
            }
            return fresh;
          } catch {
            // network failure → ritorna nulla, lasceremo il cached come fallback
            return null;
          }
        })();

        // se abbiamo cache, serviamola subito e aggiorniamo dietro le quinte
        if (cached) {
          // Aggiorno in background ma ritorno subito la cache
          networkPromise.catch(() => {});
          return cached;
        }

        // altrimenti attendiamo rete; se rete fallisce… stop
        const fresh = await networkPromise;
        if (fresh) return fresh;

        // ultimo fallback (asset mancante/offline duraturo)
        return new Response('', { status: 504 });
      })()
    );
  }
  // Per terze parti lasciamo pass-through
});
