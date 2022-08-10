const express = require("express");
const ShoppingCart = require("../models/shoppingCart");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const shoppingCart = await ShoppingCart.createShoppingCart({
      productId: req.body.product_id,
      email,
    });
    return res.status(201).json({ shoppingCart });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/product/:productId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      console.log(res.locals.user);
      console.log("Hey this is reqparams", req.params.productId);
      const { productId } = req.params;
      console.log("PRODUCT ID", productId);

      const isInShoppingCart = await ShoppingCart.checkIfInShoppingCart(
        id,
        productId
      );
      return res.status(200).json({ isInShoppingCart });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const products = await ShoppingCart.fetchShoppingCartByUserId(userId);
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:userId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const products = await ShoppingCart.deleteShoppingCart(userId);
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/delete/:productId",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const products = await ShoppingCart.deleteShoppingCartByProductId(
        productId
      );
      return res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
