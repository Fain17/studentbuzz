//test model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChildSchema = new Schema({
    name: String,
})

module.exports = mongoose.model('Child', ChildSchema);