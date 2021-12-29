const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");
const { Rental } = require("../../models/rental");

router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    if (!req.body.customerId) {
      res.status(400).send("Customer ID has not been provided.");
    }

    if (!req.body.movieId) {
      res.status(400).send("Movie ID has not been provided.");
    }

    let rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) {
      res.status(404).send("Rental not found.");
    }

    res.status(200).send("Api end point building in progress...");
  })
);

module.exports = router;
