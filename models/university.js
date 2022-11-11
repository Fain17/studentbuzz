var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UniversitySchema =  new Schema({
    name: String,
    uuid: String,
    email: String,
    location: String,
    description: {
        type: String,
        default: 'No description'
    },
    achievements: [{
        type: String,
    }, {default: []}],
    students: [{type: String, default: []}],
    deparments: [{type: String, default: []}],
    transcript: {
        data: {type: Buffer, default: null},
        file_name: {type: String, default: null}
    },
    latestNews: [{
        type: String,
    }, {default: []}],
    latestEvents: [{
        type: String,
    }, {default: []}],
})

module.exports = mongoose.model('University', UniversitySchema);