const express = require("express");
const productController = require("../controllers/product.controller")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("products").get()

router.route("admin/product/new").post();

router.route("/admin/product/:id")
    .put()
    .delete()

router.route("/product/:id").get();

router.route("/review").put();

router.route("/reviews")
    .get()
    .delete();

module.exports = router;
