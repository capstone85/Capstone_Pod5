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
      confirmation: req.body.confirmation,
    });
    return res.status(201).json({ checkout });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:orderId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const products = await Checkout.fetchCheckoutByOrderId(orderId);
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { id } = res.locals.user;
    console.log(res.locals.user);
    const orders = await Checkout.fetchCheckoutByUserId(id);
    console.log({ orders });
    return res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
