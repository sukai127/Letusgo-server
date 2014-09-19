var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

router.get('/', function(req, res) {
  storage.get('categories',function(err,data){
    res.send(data);
  });
});

router.post('/',function(req,res){
  var categories = [
    {id : 1, name: 'grocery'},
    {id : 2, name: 'device'}
  ];
  var newCategories =  req.param('categories') || categories;
  storage.set('categories',JSON.stringify(newCategories),function(err,obj){
    res.send(obj);
  });
});

module.exports = router;
