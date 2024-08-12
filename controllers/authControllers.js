const axios = require('axios');
const qs = require('qs');
const spotifyService = require('../services/spotifyServices');

const handleCallback = async (req, res) => {
  const { code } = req.query;
  console.log('Authorization Code:', code);

  try {
    const data = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    };

    const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Verifica la estructura de la respuesta
    console.log('Response Data:', response.data);

    const { access_token, refresh_token } = response.data; // Accede a los tokens en la propiedad data

    if (access_token && refresh_token) {
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      res.redirect(`https://spotifybpm-beta.vercel.app/?access_token=${access_token}&refresh_token=${refresh_token}`);
    } else {
      console.error('Tokens no encontrados en la respuesta:', response.data);
      res.status(500).send('Error al autorizar la aplicación. Tokens no encontrados.');
    }
  } catch (error) {
    console.error('Error al intercambiar el código de autorización por tokens:', error.response ? error.response.data : error.message);
    res.status(500).send('Error al autorizar la aplicación.');
  }
};

const handleTokenRefresh = async (refreshToken) => {
  try {
    const newAccessToken = await spotifyService.refreshAccessToken(refreshToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error al refrescar el token de acceso:', error);
    throw error;
  }
};

module.exports = {
  handleCallback,
  handleTokenRefresh
};
