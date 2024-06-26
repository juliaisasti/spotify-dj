// const spotifyService = require('../services/spotifyServices');
const axios = require('axios');
const qs = require('qs');

const handleCallback = async (req, res) => {
  const code = req.query.code;

  try {
    // Serializa los datos en formato application/x-www-form-urlencoded
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    // Realiza la solicitud POST a Spotify para obtener tokens de acceso
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Maneja la respuesta de Spotify y almacena los tokens de acceso y actualización según sea necesario
    const { access_token, refresh_token } = response.data;

    // Puedes almacenar los tokens en la sesión del usuario, base de datos, etc.

    // Redirige o responde al cliente según sea necesario
    res.send('Autorización exitosa! Tokens obtenidos.');
  } catch (error) {
    console.error('Error al intercambiar el código de autorización por tokens:', error);
    res.status(500).send('Error al autorizar la aplicación.');
  }
};

async function handleTokenRefresh(req, res) {
  const refreshToken = req.body.refreshToken;

  try {
    const newAccessToken = await spotifyService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh access token' });
  }
}

module.exports = {
  handleCallback,
  handleTokenRefresh
};
