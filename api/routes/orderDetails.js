const express = require("express");
const OrderDetails = require("../models/orderDetails");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

router.post(
  "/:confirmNum",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      //accept a request body with one nutrition key maybe like
      //{"nutrition": {attributes of nutrition entry}}
      const { user } = res.locals;
      const { confirmNum } = req.params;
      const order = await OrderDetails.createDetails({
        orderDetails: req.body,
        user,
        confirmNum,
      });
      return res.status(201).json({ order });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/orders/:confirmNum",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { confirmNum } = req.params;
      console.log({ confirmNum });
      const order = await OrderDetails.listDetails( confirmNum );
      return res.status(201).json({ order });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
