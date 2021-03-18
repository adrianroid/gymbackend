const express = require('express');
const userController = require('../../controllers/user');
var router = express();

router.route('/registerUser')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.logUserIn);

router.route('/verifyUserToken')
    .post(userController.verifyUserToken);

module.exports = router;
