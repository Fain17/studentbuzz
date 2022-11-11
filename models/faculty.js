var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const facultySchema = new Schema({
    uuid: String,
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
    projects: [{
        type: String,
    }],
    type: {
        type: String,
        enum: ['faculty', 'hod'],
        default: 'faculty'
    },
    notifications: [{
        to: {type: Schema.Types.ObjectId, ref: 'Student'},
        content: String,
        timestamp: {
            type: Date,
            default: Date.now()
        },
        read: {
            type: Boolean,
            default: false
        }},
        {default: []}
    ]
})

module.exports = mongoose.model('Faculty', facultySchema);