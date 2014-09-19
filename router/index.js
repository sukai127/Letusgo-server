module.exports = function(app) {
  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/items', require('./routes/items'));
  app.use('/api/cart',require('./routes/cart'));
};
