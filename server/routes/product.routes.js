const express = require("express");
const productController = require("../controllers/product.controller")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(productController.getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"),productController.getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin") ,productController.createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin") ,productController.updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),productController.deleteProduct)

router.route("/product/:id").get(productController.getProductDetails);

router.route("/review").put(isAuthenticatedUser,productController.createProductReview);

router.route("/reviews")
    .get(productController.getPorductReviews)
    .delete(isAuthenticatedUser,productController.deleteReview);

module.exports = router;



