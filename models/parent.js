//test model


var mongoose = require('mongoose');
const child = require('./child');
var Schema = mongoose.Schema;

var ParentSchema = new Schema({
    name: String,
    children: [{type: Schema.Types.ObjectId, ref: 'Child'}]
});

module.exports = mongoose.model('Parent', ParentSchema);