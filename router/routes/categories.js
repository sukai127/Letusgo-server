var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

router.get('/', function(req, res) {
  storage.get('categories',function(err,data){
    res.send(data);
  });
});

module.exports = router;
