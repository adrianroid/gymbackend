var express = require('express');

var router = express.Router();

router.get('/', function(request, response, next) {
  index.default(response);
});

module.exports = router;
