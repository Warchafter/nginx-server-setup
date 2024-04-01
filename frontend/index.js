const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first')
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const meRoute = require('./routes/auth/me');
const verifyRoute = require('./routes/auth/verify');
const refreshRoute = require('./routes/auth/refresh');
const uiRoute = require('./routes/ui/ui');
const weeklyAnimeRoute = require('./routes/jikanAnime/weeklyAnime');
const favoriteAnimeRoute = require('./routes/jikanAnime/favoriteAnime');
const todoRoute = require('./routes/todo/todo');
const wordleCloneRoute = require('./routes/wordleClone/randomWord');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(registerRoute);
app.use(verifyRoute);
app.use(refreshRoute);
app.use(uiRoute);
app.use(weeklyAnimeRoute);
app.use(favoriteAnimeRoute);
app.use(todoRoute);
app.use(wordleCloneRoute);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));