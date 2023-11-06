require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { authTokenLogger } = require('./logger');

// ---

const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;
const AUTH_COOKIE_NANE = process.env.AUTH_COOKIE_NANE;

if (!BACKEND_SERVER_URL) {
  authTokenLogger('BACKEND_SERVER_URL не установлен', 'error');
  process.exit();
}

// Тут нужно описать актуальный curl запрос для авторизации
const curlCommand = `
  curl -i --location '${BACKEND_SERVER_URL}' \
    --form 'USER_LOGIN="admin"' \
    --form 'USER_PASSWORD="admin"' | grep -iE '^(Set-Cookie): (${AUTH_COOKIE_NANE}=)'
`;

authTokenLogger('Получаю dev токен авторизации...');

exec(curlCommand, (error, stdout) => {
  if (error) {
    authTokenLogger(`Токен не был получен: ${error.message}`, 'error');
    return process.exit();
  }

  const regex = new RegExp(`${AUTH_COOKIE_NANE}=([^;]+)`);
  const match = regex.exec(stdout);

  if (!match || match.length === 0) {
    authTokenLogger(`Токен не был получен: ${stdout}`, 'error');
    return process.exit();
  }

  process.env.REACT_APP_AUTH_DEV_TOKEN = match[1];

  authTokenLogger('Токен успешно сохранен.');
  authTokenLogger('Запускаю админку...');

  // Запускаем react-scripts или другой ваш код
  require('react-scripts/scripts/start');
});
