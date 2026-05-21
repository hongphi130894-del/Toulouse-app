{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // M\uc0\u7894 I KHI B\u7840 N S\u7916 A GIAO DI\u7878 N, H\'c3Y \u272 \u7892 I S\u7888  VERSION \u7902  \u272 \'c2Y (VD: v2, v3...)\
const CACHE_NAME = 'toulouse-v1'; \
\
const ASSETS_TO_CACHE = [\
  './',\
  './index.html',\
  './manifest.json'\
];\
\
self.addEventListener('install', event => \{\
  self.skipWaiting(); \
  event.waitUntil(\
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))\
  );\
\});\
\
self.addEventListener('activate', event => \{\
  event.waitUntil(\
    caches.keys().then(cacheNames => \{\
      return Promise.all(\
        cacheNames.map(cache => \{\
          if (cache !== CACHE_NAME) \{\
            console.log('[SW] X\'f3a cache c\uc0\u361 :', cache);\
            return caches.delete(cache);\
          \}\
        \})\
      );\
    \})\
  );\
  self.clients.claim(); \
\});\
\
self.addEventListener('fetch', event => \{\
  if (event.request.url.includes('script.google.com')) return;\
\
  event.respondWith(\
    fetch(event.request).catch(() => caches.match(event.request))\
  );\
\});}