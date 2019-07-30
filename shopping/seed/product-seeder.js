module.exports = function() {
    var Product = require('../models/products.model');
    require('dotenv').config();
    var mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

    var products = [
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '1',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '2',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '3',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '4',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '5',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '6',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        }),
        new Product({
            imagePath: 'http://www.titikshapublicschool.com/wp-content/uploads/2018/11/developer-api.jpg',
            title: '7',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
            price: 20
        })
    ];
    var done = 0;
    for(var i = 0; i < products.length; i++) {
        Product.create(products[i])
            .then(function(err, small) {
                done += 1;
                if(done === products.length) {
                    exit();
                }
            });
    }
    function exit() {
        mongoose.disconnect();
    }
}