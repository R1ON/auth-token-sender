// Ваш React код должен быть тут
// Тут мы устанавливаем куку, которая пришла из get-auth-token.js

require('dotenv').config();

const TEMP_AUTH_COOKIE_NAME = process.env.TEMP_AUTH_COOKIE_NAME;

if (process.env.REACT_APP_AUTH_DEV_TOKEN) {
    document.cookie = `${TEMP_AUTH_COOKIE_NAME}=${process.env.REACT_APP_AUTH_DEV_TOKEN}`;
}

// render(<App />)