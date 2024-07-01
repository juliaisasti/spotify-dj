const express = require('express');
const axios = require('axios');
const router = express.Router();

// Función para obtener las audio features de una canción por su ID
async function getAudioFeatures(trackId, accessToken) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las audio features:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Ruta para obtener detalles de una canción y recomendaciones basadas en ella
router.get('/details', async (req, res) => {
  const { q } = req.query;
  const accessToken = req.session.access_token;

  if (!accessToken) {
    return res.status(401).send('No se encontró el token de acceso en la sesión.');
  }

  try {
    // Buscar la canción
    const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: q,
        type: 'track'
      }
    });

    // Obtener el primer resultado de la búsqueda
    const track = searchResponse.data.tracks.items[0];

    if (!track) {
      return res.status(404).send('No se encontró ninguna canción con ese nombre.');
    }

    // Obtener las características de la canción
    const audioFeatures = await getAudioFeatures(track.id, accessToken);

    // Obtener recomendaciones basadas en el tempo de la canción
    const baseTempo = audioFeatures.tempo;
    const minTempo = baseTempo - 2;
    const maxTempo = baseTempo + 2;

    const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        seed_tracks: track.id,
        min_tempo: minTempo,
        max_tempo: maxTempo
      }
    });

    const recommendations = await Promise.all(recommendationsResponse.data.tracks.map(async (recommendation) => {
      const audioFeatures = await getAudioFeatures(recommendation.id, accessToken);
      return {
        name: recommendation.name,
        artist: recommendation.artists.map(artist => artist.name).join(', '),
        album: recommendation.album.name,
        id: recommendation.id,
        albumImageUrl: recommendation.album.images.length > 0 ? recommendation.album.images[0].url : null,
        tempo: audioFeatures.tempo
      };
    }));

    // Devolver los detalles de la canción, sus características y las recomendaciones
    res.json({
      track: {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        id: track.id,
        albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : null
      },
      audioFeatures: {
        tempo: audioFeatures.tempo,
        analysis_url: audioFeatures.analysis_url
      },
      recommendations: recommendations
    });
  } catch (error) {
    console.error('Error al buscar la canción o sus características:', error.response ? error.response.data : error.message);
    res.status(500).send('Error al buscar la canción o sus características.');
  }
});

module.exports = router;
