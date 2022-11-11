const express = require('express')
const {getCurrentStudent} = require('../middleware/auth')
const Student = require('../models/student')
const University = require('../models/university')
const Club = require('../models/club')
const { uploadEvent, uploadClub, uploadPost } = require('../middleware/upload')
const fs = require('fs')
var mime = require('mime-types')

const storage = require('../firebase.js')
const { getDownloadURL, ref :storageRef, uploadString } = require('firebase/storage')

const pCont = require('../controllers/postsController')
const sCont = require('../controllers/searchController')
const uCont = require('../controllers/userController')
const pfCont = require('../controllers/profileController')
const cCont = require('../controllers/clubController')
const clCont = require('../controllers/classController')

const router = express.Router()

router.use(getCurrentStudent)

//posts
router.get('/posts', pCont.get_posts)

router.post('/create-post',uploadPost.single('banner'), async (req, res) => {
    console.log(process.cwd())
        
    let mimeType = mime.contentType(req.file.filename)
    let imageRef = storageRef(storage, `posts/` + req.file.filename);
    
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
})

router.delete('/delete-post/:pid', pCont.del_posts)

//search
router.get('/search', sCont.gen_search)

router.get('/find-partner',sCont.find_partner )

//messages
router.post('/sendMessage/:sid', pCont.msg_post)


//profile
router.patch('/editProfile',pfCont.edit_stud_profile)

//classes
router.get('/getClasses/:cid', clCont.get_classes)


//clubs
router.patch('/follow-manage/:cid',cCont.follow_clubs )

router.get('/clubs',cCont.get_clubs )

router.post('/add-club-member/:sid',cCont.add_club_mem )

router.patch('/change-club-admin/:sid',cCont.edit_club_admin )

router.delete('/remove-club-member/:sid',cCont.remove_club_mem )

router.patch('/re-add-club-member/:sid',cCont.readd_club_mem )

router.get('/getTasks',cCont.club_tasks )

router.post('/create-club', uploadClub.single('club'), async (req, res) => {
    try{

        
        
        let mimeType = mime.contentType(req.file.filename)
        let imageRef = storageRef(storage, `clubs/` + req.file.filename);
        let imageData = fs.readFileSync(`${process.cwd()}/uploads/clubs/${req.file.filename}`, {encoding: 'base64'})
        let snapshot = await uploadString(imageRef, imageData, 'base64', {contentType: mimeType})
        let urlImage = await getDownloadURL(imageRef)

        const uni = await University.findOne({name: "MSRIT"})
        const students = await Student.find({university: uni._id})
        const club = await Club.create({
            name: "GDSCS",
            description: "GooglSe Developer Student Club",
            avatar: urlImage,
            admin: students[0]._id,
            members: [],
            university: uni._id,
            followers: students.map(s => s._id),
            events: [],
            tasks: [],
        })
        fs.unlinkSync(`${process.cwd()}/uploads/clubs/${req.file.filename}`)

        res.json({
            msg: 'club created',
            club
        })
    }
    catch(err){
        res.status(400).json({
            msg: err.message
        })
        return
    }
    // console.log(req.body)
})

router.post('/add-event', uploadEvent.single('event'), (req, res) => {
    console.log(req.body)
    res.json({
        msg: 'event added'
    })
})

router.delete('/delete-event/:eid',cCont.del_event )

router.post('/assign-task',cCont.task_assigned )

router.patch('/edit-task',cCont.edit_task )

router.delete('/delete-task',cCont.del_task )

router.patch('/task-accomplish',cCont.task_accomp )

router.patch('/task-confirm',cCont.task_confirm )


module.exports = router