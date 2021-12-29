const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const asyncMiddleware = require("../../middleware/async");

router.post(
  "/",
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    res.status(200).send("Api end point building in progress...");
  })
);

module.exports = router;
