const express = require('express');
const userController = require('../../controllers/user');
var router = express();

router.route('/registerUser')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.registerUser);

router.route('/logout')
    .post(userController.registerUser);

module.exports = router;
