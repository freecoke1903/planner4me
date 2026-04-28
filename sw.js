const CACHE_NAME = 'braindump-v10';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap'
];

// 설치: 핵심 파일 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 이전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 요청 가로채기: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API 요청(OpenAI, Firebase)은 캐시하지 않음
  if (
    url.hostname === 'api.openai.com' ||
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('firebase')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 성공 시 캐시 업데이트
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
