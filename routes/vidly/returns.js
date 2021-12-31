const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");
const validate = require("../../middleware/validate");
const { Rental } = require("../../models/rental");
const { Movie } = require("../../models/movie");
const Joi = require("joi");

router.post(
  "/",
  [authMiddleware, validate(validateReturn)],
  asyncMiddleware(async (req, res) => {
    let rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) {
      return res.status(404).send("Rental not found.");
    }

    if (rental.dateReturned) {
      return res.status(400).send("Return already processed.");
    }

    rental.return();
    await rental.save();

    await Movie.findByIdAndUpdate(rental.movie._id, {
      $inc: { numberInStock: 1 },
    });

    return res.send(rental);
  })
);

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
}

module.exports = router;
