const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const querystring = require('querystring');
require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

router.get('/login', (req, res) => {
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

router.get('/callback', authController.handleCallback);

router.post('/refresh-token', authController.handleTokenRefresh);

module.exports = router;
