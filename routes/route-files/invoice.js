const express = require('express');
const userController = require('../../controllers/user');
var router = express();

router.route('/getInvoices')
    .post(userController.registerUser);
module.exports = router;