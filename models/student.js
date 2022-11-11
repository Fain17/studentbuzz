var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const StudentSchema = new Schema({
    uuid: String,
    usn: String,
    name: String,
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/reva-hack-e99dd.appspot.com/o/boiler-pic.png?alt=media&token=6200673e-96a6-45b1-981f-3ed98bd7cebd"
    },
    email: String,
    university: {type: Schema.Types.ObjectId, ref: 'University'},
    department: String,
    description: {
        type: String,
        default: 'No description'
    },
    skills: [{
        type: String,
    }],
    projects: [{
        type: String,
    }],
    clubs: [{type: Schema.Types.ObjectId, ref: 'Club', default: []}],   
    admin_clubs: [{type: Schema.Types.ObjectId, ref: 'Club', default: []}],
    clubs_following: [{type: Schema.Types.ObjectId, ref: 'Club', default: []}],
    class: {type: Schema.Types.ObjectId, ref: 'Class', default: null},
    notifications: [{
        sent:[{
            to: {type: Schema.Types.ObjectId, ref: 'Student'},
            content: String,
            read: {type: Boolean, default: false},
            timestamp: {type: Date, default: Date.now()},
        }],
        received: [{
            from: {type: Schema.Types.ObjectId, ref: 'Student'},
            content: String,
            read: {type: Boolean, default: false},
            timestamp: {type: Date, default: Date.now()},
            default: []
        }]
    }]
})

module.exports = mongoose.model('Student', StudentSchema);