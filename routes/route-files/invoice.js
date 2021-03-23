const invoiceController = require('../../controllers/invoice');
var express = require('express');
var router = express();

router.route('/getInvoices')
    .post(invoiceController.getInvoices);

module.exports = router;