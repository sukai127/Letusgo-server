var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

var _ = require('lodash');

router.get('/', function(req, res) {
  storage.get('categories',function(err,data){
    res.send(data);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  storage.get('categories',function(err,categories){
    var result = _.find(JSON.parse(categories),function(category){
      return category.id.toString() == id.toString();
    });
    res.send(result);
  });
});

router.post('/',function(req,res){
  var categories = [
    {id : 1, name: 'grocery'},
    {id : 2, name: 'device'}
  ];
  var newCategories =  req.body.categories || categories;
  storage.set('categories',JSON.stringify(newCategories),function(err,obj){
    res.send(obj);
  });
});

module.exports = router;
