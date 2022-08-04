const express = require("express");
const Wishlist = require("../models/wishlist");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const wishlist = await Wishlist.createWishlist({
      productId: req.body.product_id,
      email,
    });
    return res.status(201).json({ wishlist });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
