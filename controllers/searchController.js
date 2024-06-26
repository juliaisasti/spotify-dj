const axios = require('axios');
const authController = require('../controllers/authControllers');

const searchSongs = async (req, res) => {
  const { query } = req.query;

  try {
    let accessToken = req.session.access_token;
    console.log('Access Token:', accessToken);

    if (!accessToken) {
      const refreshToken = req.session.refresh_token;
      console.log('Refresh Token:', refreshToken);

      if (refreshToken) {
        accessToken = await authController.handleTokenRefresh(refreshToken);
        console.log('Nuevo Access Token:', accessToken);
        req.session.access_token = accessToken;
      } else {
        throw new Error('No se encontró el refresh token en la sesión');
      }
    }

    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track',
        market: 'US'
      },
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al buscar canciones:', error);
    res.status(500).json({ error: 'Error al buscar canciones' });
  }
};


module.exports = {
  searchSongs,
};
