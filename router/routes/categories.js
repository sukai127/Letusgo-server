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


router.put('/:id', function(req, res) {

  var category = req.body.category;
  var id = req.params.id;

  storage.get('categories',function(err,data){

    var categories = JSON.parse(data);

    _.find(categories,function(item,index){
      if(item.id.toString() === id.toString()){
        categories[index] = category;
      }
    });

    storage.set('categories',JSON.stringify(categories),function(err,obj){
      res.send(obj);
    });
  })
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  storage.get('categories',function(err,data){

    var categories = JSON.parse(data);
    _.remove(categories,function(category){
      return category.id.toString() === id.toString();
    });

    storage.set('categories',JSON.stringify(categories),function(err,obj){
      res.send(obj);
    });
  });
});

router.post('/',function(req,res){
  var initCategories = function(){
    return [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];
  };
  var newCategories = initCategories();
  var category = req.body.category;

  storage.get('categories',function(err,data){

    if(category){
      newCategories = JSON.parse(data);
      var id = newCategories[newCategories.length-1].id + 1;
      category.id = id;
      newCategories.push(category);
    }
    
    storage.set('categories',JSON.stringify(newCategories),function(err,obj){
      res.send(obj);
    });
  });

});

module.exports = router;
