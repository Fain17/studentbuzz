var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name: String,
    projects: [{
        type: String,
        default: ''
    }],
    description: {
        type: String,
        default: 'No description'
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/reva-hack-e99dd.appspot.com/o/boiler-pic.png?alt=media&token=6200673e-96a6-45b1-981f-3ed98bd7cebd"
    },
    admin: {type: Schema.Types.ObjectId, ref: 'Student'},
    members: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Student'},
        points: {type: Number, default: 0},
        current_member: {type: Boolean, default: true}},
        {default: []}
    ],
    university: {type: Schema.Types.ObjectId, ref: 'University'},
    followers: [{type: Schema.Types.ObjectId, ref: 'Student', default: []}],
    events: [{
        id: {type: Schema.Types.ObjectId},
        name: String,
        description: String,
        image: {
            url: {type: String, default: null},
            imageName: {type: String, default: null},
        },
    }, {default: []}],
    tasks: [{
        description: String,
        id: {type: Schema.Types.ObjectId, auto: true },
        assigned_to: {type: Schema.Types.ObjectId, ref: 'Student'},
        status: {
            type: String,
            enum: ['pending', 'claimed', 'completed'],
            default: 'pending'
        }
    }, {default: []}],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Club', ClubSchema);