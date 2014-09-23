var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

router.get('/', function(req, res) {
  storage.get('products',function(err,data){
    res.send(data);
  });
});

router.post('/:product', function(req, res) {
  var product = req.params.product;
  storage.get('products',function(err,data){
    var products = JSON.parse(data);
    products.push(product);
    storage.set('products',JSON.stringify(products));
  })
});

router.post('/',function(req,res){
  var products = [
    {id:1, name: 'Instant_noodles', unit: 'bag', categoryId: '1', price: 1},
    {id:2, name: 'apple', unit: 'kg', categoryId: '1', price: 2.5},
    {id:3, name: 'coca_cola', unit: 'bottle', categoryId: '1', price: 0.5},
    {id:4, name: 'kettle', unit: 'piece', categoryId: '2', price: 43.5},
    {id:5, name: 'fan', unit: 'piece', categoryId: '2', price: 30}
  ];
  var newProducts =  req.body.products || products;
  storage.set('products',JSON.stringify(newProducts),function(err,obj){
    res.send(obj);
  });
});

module.exports = router;
