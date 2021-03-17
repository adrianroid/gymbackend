const express = require('express');
const userController = require('../../controllers/user');
var router = express();

router.route('/registerUser')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.logUserIn);

router.route('/logout')
    .post(userController.logUserOut);

module.exports = router;
