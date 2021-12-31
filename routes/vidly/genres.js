const validateObjectId = require("../../middleware/validateObjectId");
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");
const adminMiddleware = require("../../middleware/admin");
const validate = require("../../middleware/validate");
const { Genre } = require("../../models/genre");
const express = require("express");
const { request } = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post(
  "/",
  [authMiddleware, validate(validateGenre)],
  asyncMiddleware(async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
 
    res.send(genre);
  })
);

router.put(
  "/:id",
  [authMiddleware, validate(validateGenre)],
  asyncMiddleware(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(404).send("The genre with the given ID was not valid.");
    }

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  })
);

router.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  asyncMiddleware(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(404).send("The genre with the given ID was not valid.");
    }

    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  })
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
      name: Joi.string().min(5).max(100).required()
  });

  return schema.validate(genre);
}

module.exports = router;
