const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/track', async (req, res) => {
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

    // Obtener el primer resultado
    const track = searchResponse.data.tracks.items[0];

    if (!track) {
      return res.status(404).send('No se encontró ninguna canción con ese nombre.');
    }

    // Obtener las características de la canción
    const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${track.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const audioFeatures = audioFeaturesResponse.data;

    // Obtener el análisis de audio detallado
    const audioAnalysisResponse = await axios.get(audioFeatures.analysis_url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const audioAnalysis = audioAnalysisResponse.data;

    const albumImageUrl = track.album.images.length > 0 ? track.album.images[0].url : null;
    // Devolver los detalles de la canción, sus características y análisis detallado
    res.json({
      track: {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        id: track.id,
        albumImageUrl: albumImageUrl
      },
      audioFeatures: {
        tempo: audioFeatures.tempo,
        analysis_url: audioFeatures.analysis_url
      },
      audioAnalysis: audioAnalysis
    });
  } catch (error) {
    console.error('Error al buscar la canción o sus características:', error.response ? error.response.data : error.message);
    res.status(500).send('Error al buscar la canción o sus características.');
  }
});

module.exports = router;
