const express = require("express");
const Store = require("../models/store");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //return a json response back with all user-owned nutrition
    //in an array like { "nutritions": [...]}
    const stores = await Store.listStoreForUser({
      user_id: req.headers.user_id,
    });
    return res.status(200).json({ stores });
  } catch (err) {
    next(err);
  }
});

// router.get("/", async (req, res, next) => {
//   try {
//     console.log("headers", req.headers);
//     const nutritions = await Nutrition.listNutritionForUser({
//       user_id: req.headers.user_id,
//     });
//     return res.status(200).json({ nutritions });
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    //accept a request body with one nutrition key maybe like
    //{"nutrition": {attributes of nutrition entry}}
    const { user } = res.locals;
    const store = await Store.createStore({
      user,
      store: req.body,
    });
    return res.status(201).json({ store });
  } catch (err) {
    next(err);
  }
});
router.get("/stores", async (req, res, next) => {
  try {
    console.log("hello");
    //return a json response back with one user-owned nutrition
    //in an oject like { "nutrition": {...}}
    const stores = await Store.listAllStores();
    return res.status(200).json({ stores });
  } catch (err) {
    next(err);
  }
});

router.get("/:storeId", async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const store = await Store.fetchStoreById(storeId);
    return res.status(200).json({ store });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
