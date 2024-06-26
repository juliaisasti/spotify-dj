const express = require('express');
const router = express.Router();
const checkSession = require('../controllers/checkSession');

// Ruta para verificar el contenido de la sesión
router.get('/', checkSession.checkSession);

module.exports = router;
