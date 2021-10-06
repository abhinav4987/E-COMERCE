const express = require('express');
const orderController = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(orderController)
router.route("/order/:id").get(orderController)
router.route("/orders/me").get(orderController)
router.route("/admin/orders").get(orderController)
router.route("/admin/order/:id")
    .put(orderController)
    .delete(orderController)

module.exports = router;