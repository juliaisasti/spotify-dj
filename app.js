const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); // Ajusta las rutas según tu estructura
const searchRoutes = require('./routes/searchRoutes'); // Ajusta las rutas según tu estructura
const checkSession = require('./routes/checkSession'); // Ajusta las rutas según tu estructura
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Asegúrate de tener SESSION_SECRET definido en tu archivo .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use('/auth', authRoutes); // Ajusta según tus rutas
app.use('/search', searchRoutes); // Ajusta según tus rutas
app.use('/check-session', checkSession); // Ajusta según tus rutas

app.get('/', (req, res) => {
  res.send('Welcome to Spotify Auth App');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
