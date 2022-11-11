const Student = require('../models/student')
const Class = require('../models/class')
const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')
const Post = require('../models/post')
const UploadPost = require('../middleware/upload')
const fs = require('fs')
var mime = require('mime-types')
const storage = require('../firebase.js')
const { getDownloadURL, ref, uploadString } = require('firebase/storage')

//common

//faculty/common/student ---- 

const get_posts = async(req, res) => {
    //global posts
    // const hodPosts = await Post.find({'category':'hod'})
    // const facultyPosts = await Post.find({'category':'faculty'})
    // const clubPosts = await Post.find({'category':'club'})
    const posts = await Post.find({})

    res.json({
        // hodPosts,
        // facultyPosts,
        // clubPosts
        posts
    })
}

const create_posts = async (req, res) => {
    console.log(process.cwd())
        
    let mimeType = mime.contentType(req.file.filename)
    let imageRef = ref(storage, `posts/` + req.file.filename);
    
    let imageData = fs.readFileSync(`${process.cwd()}/uploads/posts/${req.file.filename}`, {encoding: 'base64'})
    let snapshot = await uploadString(imageRef, imageData, 'base64', {contentType: mimeType})
    let urlImage = await getDownloadURL(imageRef)
    const val = await Student.findOne({_id})
    let data = req.body
    //for a club
    const c_posts = await Post.create({
    
        author:val._id,
        authorName:data.authorName,
        content:data.content,
        image:{
            url:urlImage,
            imageName:req.file.filename
        },
        university:"eraad",
        category:"hod"

    })
    console.log(req.body)
    res.json({
        msg: 'post created'
    })
}

const del_posts = async (req, res) => {
    console.log(req.params.pid)
    res.json({
        msg: 'post deleted'
    })
}


const msg_post = async(req, res) => {
    console.log(req.body)
    res.json({
        msg: 'message sent',
        sid: req.params.sid
    })
}
//-------------------------
//Student




module.exports = {
    get_posts,
    del_posts,
    msg_post,
    create_posts
}