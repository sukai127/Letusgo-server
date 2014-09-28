module.exports = function(app) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/products', require('./routes/products'));
  app.use('/api/cartItems',require('./routes/cartItems'));
};
