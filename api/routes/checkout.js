const express = require("express");
const Checkout = require("../models/checkout");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const checkout = await Checkout.checkout(req.body);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
