var express = require('express');
var router = express.Router();
var redis = require("redis");
var storage = redis.createClient();

router.post('/', function (req, res) {
  storage.del('cartItems', function () {
    res.sendStatus(200);
  });
});

module.exports = router;
