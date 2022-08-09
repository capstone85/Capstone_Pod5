const express = require("express");
const Checkout = require("../models/checkout");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const checkout = await Checkout.createCheckoutOrder({
      productId: req.body.product_id,
      email,
      checkout: req.body,
    });
    return res.status(201).json({ checkout });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
