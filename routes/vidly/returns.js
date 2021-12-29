const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");

router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    if (!req.params.customerId) {
      res.status(400).send("Customer ID has not been provided.");
    }

    if (!req.params.movieId) {
      res.status(400).send("Movie ID has not been provided.");
    }

    res.status(200).send("Api end point building in progress...");
  })
);

module.exports = router;
