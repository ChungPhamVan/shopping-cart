var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});
var Product = mongoose.model('Product', schema, 'products');
module.exports = Product;