const express = require('express');
const userController  = require('../controllers/user.controller.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/register").post(userController);
router.route("/login").post();

router.route("/password/forgot").post();

router.route("/password/reset/:token").put();

router.route("/logout").get();

router.route("/me").get();

router.route("/password/update").put();

router.route("/me/update").put();

router.route("/admin/users").get();


router.route("/admin/user/:id")
    .get()
    .put()
    .delete()

module.exports = router;