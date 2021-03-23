var express = require('express');
var router = express();
const userController = require('../../controllers/user');

router.route('/registerUser')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.logUserIn);

module.exports = router;
