const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); // Ajusta las rutas según tu estructura
const searchRoutes = require('./routes/searchRoutes'); // Ajusta las rutas según tu estructura
const checkSession = require('./routes/checkSession'); // Ajusta las rutas según tu estructura
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const http = require('http')
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(`Hello ${process.env.HELLO}`)
})

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use('/auth', authRoutes); 
app.use('/search', searchRoutes); 
app.use('/check-session', checkSession); 

app.get('/', (req, res) => {
  res.send('Welcome to Spotify Auth App');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
