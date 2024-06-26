const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const scopes = 'user-read-private user-read-email';

console.log(`Client ID: ${process.env.SPOTIFY_CLIENT_ID}`);
console.log(`Redirect URI: ${process.env.REDIRECT_URI}`);

// Ruta para redirigir a los usuarios a la página de autenticación de Spotify
router.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authUrl);
});

// Ruta para manejar la redirección después de la autorización
router.get('/callback', authController.handleCallback);

// Ruta para manejar la renovación del token
router.post('/refresh-token', authController.handleTokenRefresh);

module.exports = router;
