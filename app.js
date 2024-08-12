const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); // Ajusta las rutas según tu estructura
const searchRoutes = require('./routes/searchRoutes'); // Ajusta las rutas según tu estructura
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

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

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/auth', authRoutes); 
app.use('/search', searchRoutes); 

app.get('/', (req, res) => {
  res.send('Welcome to Spotify Auth App!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
