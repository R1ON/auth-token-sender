require('dotenv').config();

const http = require('http');
const httpProxy = require('http-proxy');
const { proxyLogger } = require('./logger');

// ---

const PROXY_PORT = process.env.PROXY_PORT;
const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;

const AUTH_COOKIE_NANE = process.env.AUTH_COOKIE_NANE;
const TEMP_AUTH_COOKIE_NAME = process.env.TEMP_AUTH_COOKIE_NAME;

// ---

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const cookies = req.headers.cookie || '';

  if (cookies && cookies.includes(TEMP_AUTH_COOKIE_NAME)) {
    req.headers.cookie = cookies.replace(TEMP_AUTH_COOKIE_NAME, AUTH_COOKIE_NANE);
  }

  proxy.web(req, res, { target: BACKEND_SERVER_URL });
});

// ---

proxyLogger('Запускаю прокси сервер...');

server.listen(PROXY_PORT, () => {
  proxyLogger(`Прокси запущено на порту ${PROXY_PORT}`);
});
