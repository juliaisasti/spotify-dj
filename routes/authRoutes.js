const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const scopes = 'user-read-private user-read-email';

router.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authUrl);
});

router.get('/callback', authController.handleCallback);

router.post('/refresh-token', authController.handleTokenRefresh);

module.exports = router;
