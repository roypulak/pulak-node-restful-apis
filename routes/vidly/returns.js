const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");
const { Rental } = require("../../models/rental");
const { Movie } = require("../../models/movie");
const moment = require("moment");

router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    if (!req.body.customerId) {
      return res.status(400).send("Customer ID has not been provided.");
    }

    if (!req.body.movieId) {
      return res.status(400).send("Movie ID has not been provided.");
    }

    let rental = await Rental.findOne({
      "customer._id": req.body.customerId,
      "movie._id": req.body.movieId,
    });

    if (!rental) {
      return res.status(404).send("Rental not found.");
    }

    if (rental.dateReturned) {
      return res.status(400).send("Return already processed.");
    }

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, "days");
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.findByIdAndUpdate(rental.movie._id, { $inc: { numberInStock: 1 } });

    return res.status(200).send();
  })
);

module.exports = router;
