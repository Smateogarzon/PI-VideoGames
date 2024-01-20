function logout(req, res) {
  req.session.destroy();
  res.status(200).json({access: false});
}
module.exports = logout;
