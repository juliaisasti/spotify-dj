const axios = require('axios');
const qs = require('qs');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const tokenUrl = 'https://accounts.spotify.com/api/token';

async function getTokens(authorizationCode, redirectUri) {
  const data = qs.stringify({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUri
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error('Error getting tokens:', error);
    throw error;
  }
}

async function refreshAccessToken(refreshToken) {
  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers: headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

module.exports = {
  getTokens,
  refreshAccessToken
};
