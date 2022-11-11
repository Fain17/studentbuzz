var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: String,
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
    faculty: {type: Schema.Types.ObjectId, ref: 'Faculty'},
    university: {type: Schema.Types.ObjectId, ref: 'University'}
})

module.exports = mongoose.model('Class', ClassSchema);