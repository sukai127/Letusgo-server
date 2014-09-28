var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();
var _ = require('lodash');

router.get('/', function(req, res) {
  storage.get('cartItems',function(err,data){
    res.send(data);
  });
});

router.post('/',function(req,res){
  var cartItem =  req.body.cartItem;
  storage.get('cartItems',function(err,data){
    var cartItems = JSON.parse(data);
    cartItems.push(cartItem);
    storage.set('cartItems',JSON.stringify(cartItems),function(err,obj){
      res.send(obj);
    });
  });
});

router.delete('/',function(req,res){
  storage.del('cartItems',function(err,obj){
    res.sendStatus(200);
    res.send(obj);
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  storage.get('cartItems',function(err,data){
    var cartItems = JSON.parse(data);
    _.remove(cartItems,function(cartitem){
      return cartitem.id.toString() === id.toString();
    });
    storage.set('cartItems',JSON.stringify(cartItems),function(err,obj){
      res.send(obj);
    });
  });
});

router.put('/:id', function(req, res) {
  var cartItem = req.body.cartItem;
  var id = req.params.id;
  storage.get('cart',function(err,data){
    var cart = JSON.parse(data);
    _.find(cart.cartItems,function(item,index){
      if(item.id === id){
        cart.cartItems[index] = cartItem;
      }
    });
    storage.set('cart',JSON.stringify(cart),function(err,obj){
      res.send(obj);
    });
  })
});

module.exports = router;
