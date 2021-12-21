const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID.");
  }

  next();
};
