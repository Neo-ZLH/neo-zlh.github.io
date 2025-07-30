/**
 * Service Worker for 极客风格学术个人网站
 * 提供离线访问和缓存功能
 */

// 缓存名称和版本
const CACHE_NAME = 'geek-academic-cache-v1';

// 需要缓存的资源列表
const CACHE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/ascii-art.js',
  './js/terminal.js',
  './js/publications.js',
  './js/projects.js',
  './js/blogs.js',
  './js/gallery.js',
  './manifest.json',
  // 字体文件
  'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap',
  // 占位图像（实际应用中替换为真实图像路径）
  './images/icon-192.png',
  './images/icon-512.png'
];

// 安装事件 - 预缓存核心资源
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  // 跳过等待，直接激活
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(CACHE_ASSETS);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  // 立即接管所有页面
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', event => {
  // 只处理GET请求
  if (event.request.method !== 'GET') return;
  
  // 排除第三方请求（可根据需要调整）
  const url = new URL(event.request.url);
  const isThirdParty = 
    !url.origin.includes(self.location.origin) && 
    !url.hostname.includes('fonts.googleapis.com') && 
    !url.hostname.includes('fonts.gstatic.com');
  
  // 对API请求使用网络优先策略
  if (url.pathname.includes('/api/')) {
    return networkFirst(event);
  }
  
  // 特殊处理.md文件请求，确保它们作为文本返回而不是下载
  if (url.pathname.endsWith('.md')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 创建一个新的响应，将Content-Type设置为text/plain
          return response.blob().then(blob => {
            return new Response(blob, {
              headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
                'Content-Disposition': 'inline'
              }
            });
          });
        })
        .catch(() => {
          // 如果网络请求失败，尝试从缓存获取
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // 对静态资源使用缓存优先策略
  event.respondWith(cacheFirst(event.request));
});

/**
 * 缓存优先策略
 * 先尝试从缓存获取，如果没有则从网络获取并缓存
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // 检查响应是否有效
    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
      return networkResponse;
    }
    
    // 缓存响应的副本（因为响应流只能使用一次）
    const responseToCache = networkResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    // 如果网络请求失败且没有缓存，返回404页面
    const cache = await caches.open(CACHE_NAME);
    const notFoundResponse = await cache.match('./404.html');
    return notFoundResponse || new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * 网络优先策略
 * 先尝试从网络获取，如果失败则从缓存获取
 */
async function networkFirst(event) {
  try {
    const networkResponse = await fetch(event.request);
    
    // 缓存响应的副本
    const responseToCache = networkResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// 推送通知事件
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body || '有新的内容更新',
    icon: './images/icon-192.png',
    badge: './images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || './index.html'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || '极客学术网站更新',
      options
    )
  );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});