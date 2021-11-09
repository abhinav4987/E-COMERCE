const express = require('express');
const userController  = require('../controllers/user.controller.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

router.route("/logout").get(userController.logout);

router.route("/me/:id").get(userController.getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, userController.updatePassword);

router.route("/me/update").put(isAuthenticatedUser, userController.updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),userController.getAllUser);


router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"),userController.getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"),userController.updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),userController.delteUser)

module.exports = router;