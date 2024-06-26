const checkSession = (req, res) => {
  console.log('Contenido de la sesión:', req.session);
  res.send('Verifica la consola del servidor para ver el contenido de la sesión');
};

module.exports = {
  checkSession,
};
