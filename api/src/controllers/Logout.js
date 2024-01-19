function logout(req, res) {
  req.session.destroy();
  res.status(200).json({acces: false});
}
module.exports = logout;
