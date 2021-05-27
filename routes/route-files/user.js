var express = require("express");
var router = express();
const userController = require("../../controllers/user");

router.route("/registerUser").post(userController.registerUser);

router.route("/login").post(userController.logUserIn);

router.route("/getAllUsers").get(userController.getAllUsers);

router.route("/getCurrUser").get(userController.getCurrUser);

module.exports = router;
