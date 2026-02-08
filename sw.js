// اسم النسخة - تم تحديثه لضمان تحميل التعديلات الجديدة
const cacheName = 'hanani-store-v2';

// الملفات التي سيتم حفظها
// استخدام ./ يضمن العمل داخل المجلد الفرعي github.io/hanani-store/
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap'
];

// تثبيت ملف الخدمة
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة وحذف الكاش القديم
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== cacheName) return caches.delete(key);
      }));
    })
  );
});

// جلب البيانات (Offline Strategy)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
