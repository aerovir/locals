/**
 * server.js — HTTP-сервер справочника локалей
 *
 * Раздаёт статику из public/ и отдаёт /api/locales.
 * Запуск: node server.js  (по умолчанию порт 3000)
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3010;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME-типы для статики
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

// Загружаем данные локалей при старте
const localesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'locales-data.json'), 'utf-8')
);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // --- API ---
  if (url.pathname === '/api/locales') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(localesData));
    return;
  }

  // --- Статика ---
  let filePath = path.join(PUBLIC_DIR, url.pathname === '/' ? '/index.html' : url.pathname);
  const ext = path.extname(filePath);

  // Безопасность: только файлы внутри public/
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 — страница не найдена');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  console.log(`API:            http://localhost:${PORT}/api/locales`);
});
