var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

var _ =  require('lodash');

var initProducts = function(){
  return [
    {id:1, name: 'Instant_noodles', unit: 'bag', categoryId: '1', price: 1},
    {id:2, name: 'apple', unit: 'kg', categoryId: '1', price: 2.5},
    {id:3, name: 'coca_cola', unit: 'bottle', categoryId: '1', price: 0.5},
    {id:4, name: 'kettle', unit: 'piece', categoryId: '2', price: 43.5},
    {id:5, name: 'fan', unit: 'piece', categoryId: '2', price: 30}
  ];
};

storage.get('products',function(err,data){
  if(!data){
    storage.set('products',JSON.stringify(initProducts()));
  }
});

router.get('/', function(req, res) {
  storage.get('products',function(err,data){
    res.send(data);
  });
});

router.get('/:id', function(req, res) {

  var id = req.params.id;

  storage.get('products',function(err,data){

    var result = _.find(JSON.parse(data),function(product){
      return product.id.toString() === id.toString();
    });

    res.send(result);
  });
});

router.delete('/:id', function(req, res) {

  var id = req.params.id;

  storage.get('products',function(err,data){

    var products = JSON.parse(data);

    _.remove(products,function(product){
      return product.id.toString() === id.toString();
    });

    storage.set('products',JSON.stringify(products),function(err,obj){
      res.send(obj);
    });
  });
});

router.post('/',function(req,res){

  var product = req.body.product;

  storage.get('products',function(err,data){

    var newProducts = JSON.parse(data);
    var id = newProducts[newProducts.length-1].id + 1;
    product.id = id;
    newProducts.push(product);

    storage.set('products',JSON.stringify(newProducts),function(err,obj){
      res.send(obj);
    });
  });
});

router.put('/:id', function(req, res) {

  var product = req.body.product;
  var id = req.params.id;

  storage.get('products',function(err,data){

    var products = JSON.parse(data);

    _.find(products,function(item,index){
      if(item.id.toString() === id.toString()){
        products[index] = product;
      }
    });

    storage.set('products',JSON.stringify(products),function(err,obj){
      res.send(obj);
    });
  })
});

module.exports = router;
