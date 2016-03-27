var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    name: {
        type: String,
        default:''
    },
    price: {
        type: Number,
        default:0
    }
});
