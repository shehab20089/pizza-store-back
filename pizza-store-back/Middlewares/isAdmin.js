function isAdmin(req, res, next) {
  if (!req.user.IsAdmin)
    return res.status(404).json({
      error: "sorry you are not authorized to do this action"
    });
  next();
}

module.exports = isAdmin;
