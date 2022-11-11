const express = require('express')
// const Parent = require('../models/parent')
// const Child = require('../models/child')
const Image = require('../models/image')
const University = require('../models/university')
const Student = require('../models/student')
const {uploadTranscript} = require('../middleware/upload')
const fs = require('fs')
const student = require('../models/student')
const Class = require('../models/class')
const Club = require('../models/club')

const uCont = require('../controllers/userController')
const sCont = require('../controllers/searchController')
const nodemailer = require('nodemailer')
const {CreatingUserFirebase, LoginFirebaseUser, auth} = require('../firebase.js')
const { signInWithEmailAndPassword } = require('firebase/auth')
// const LoginFirebaseUser = require('../firebase.js')


const router = express.Router()

router.post('/create-student', uCont.create_student)

router.post('/create-uni', uploadTranscript.single('transcript'), async (req, res) => {
    // console.log(req.file.filename)
    let data = req.body
    try{
        
        let user = await CreatingUserFirebase(data.email, '12345678')
        const uni = University.create({
            name: data.name,
            uuid: user.uid,
            email: data.email,
            location: data.location,
            description: data.description,
            transcript: ""
        })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'assassinumz@gmail.com',
              pass: 'bwwmhajplpozrhvw'
            }
          });
          
          var mailOptions = {
            from: 'assassinumz@gmail.com',
            to: data.email,
            subject: 'Studentbuzz University Created!',
            text: `University Login:\nEmail: ${data.email}\n Password: 12345678`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch(error) {
        res.status(400).json({error: error.message})
        return 
    }
    // console.log(req.body)
    res.json({msg: 'University created'})
})

router.post('/login-uni', async (req, res) => {
    
    try {
        let data = req.body
        console.log(req.body)
        
        let user = await LoginFirebaseUser(data.email, data.password)
        return res.json({uid:user.uid})
    } catch(e) {
        res.status(400).json({error:e.message})
    }
    
    //let user = await LoginFirebaseUser()
})
router.post('/login-stu', async (req, res) => {
    
    try {
        let data = req.body
        console.log(data.email)
        console.log(data.password)
        let user = await LoginFirebaseUser(data.email, data.password)

       
        return res.json({uid:user.uid})
    } catch(e) {
        console.log(e.message)
        res.status(400).json({error:e.message})
    }
    
    //let user = await LoginFirebaseUser()
})

//dummy tests
router.get('/getUnis',uCont.all_uni)

router.get('/getUni',sCont.getUni )

router.get('/getStud',sCont.getStud )

router.get('/getstudclub', sCont.getStudclub )

router.post('/testFile', uploadTranscript.single('image'), async (req, res) => {
    // console.log(req.file.filename)
    var imgData = {
        name: req.file.filename,
        desc: "testImage",
        img: {
            data: fs.readFileSync(`${process.cwd()}/uploads/transcripts/${req.file.filename}`, {encoding: 'base64'}),
            contentType: 'image/jpeg'
        }
    }
    // console.log(imgData.img.data)
    // console.log(imgData)
    var mongoOB = await Image.create(imgData, (err, item) => {
        if (err) {
            console.log(err);
        }
        else{
            // console.log(item)
            fs.unlinkSync(`${process.cwd()}/uploads/transcripts/${req.file.filename}`)
            res.json({msg: 'image saved',
            mongoOB: item})
        }
    });
    
})

router.get('/testFile', async (req, res) => {
    // var img = await Image.findOne()
    var uni = await University.findOne()
    // console.log(uni.transcript.data)
    // fs.writeFileSync(`${process.cwd()}/uploads/transcripts/test.png`, img.img.data, {encoding: 'base64'});
    fs.writeFileSync(`${process.cwd()}/uploads/transcripts/test.png`, uni.transcript.data);
    res.json({uni})
})

router.get('/test1', async (req, res) => {
    const parent1 = await Parent.create({
        name: 'parent1'
    })

    const parent2 = await Parent.create({
        name: 'parent2'
    })

    const child1 = await Child.create({
        name: 'child1',
        parent: parent1._id
    })

    const child2 = await Child.create({
        name: 'child2',
        parent: parent1._id
    })

    const child3 = await Child.create({
        name: 'child3',
        parent: parent2._id
    })

    var child1_parent = await Child.findById(child1._id).populate('parent')
    var child2_parent = await Child.findById(child2._id).populate('parent')
    var child3_parent = await Child.findById(child3._id).populate('parent')

    res.json({
        child1_parent,
        child2_parent,
        child3_parent
    })
})

router.get('/test2', async (req, res) => {
    const child1 = await Child.create({
        name: 'child1'
    })

    const child2 = await Child.create({
        name: 'child2'
    })

    const parent1 = await Parent.create({
        name: 'parent1',
    })

    parent1.children.push(child1._id)
    parent1.save()

    res.json({
        parent1
    })
})

router.delete('/',uCont.delete_docs )

////

module.exports = router