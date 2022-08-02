const express = require("express");
const Product = require("../models/product");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //return a json response back with all user-owned nutrition
    //in an array like { "nutritions": [...]}
    const products = await Product.listProductForStore({
      store_id: req.headers.store_id,
    });
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //accept a request body with one nutrition key maybe like
    //{"nutrition": {attributes of nutrition entry}}
    const { store } = res.locals;
    const product = await Product.createProduct({
      store,
      product: req.body,
    });
    return res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    console.log("hello");
    const products = await Product.listAllProducts();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.fetchProductById(productId);
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

router.get("/store/:storeId", async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const product = await Product.fetchProductByStoreId(storeId);
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
