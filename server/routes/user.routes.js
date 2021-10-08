const express = require('express');
const userController  = require('../controllers/user.controller.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

router.route("/logout").get(userController.logout);

router.route("/me").get(userController.getUserDetails);

router.route("/password/update").put(userController.updatePassword);

router.route("/me/update").put(userController.updateProfile);

router.route("/admin/users").get();


router.route("/admin/user/:id")
    .get()
    .put()
    .delete()

module.exports = router;