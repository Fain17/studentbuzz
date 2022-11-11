const Student = require('../models/student')
//const Class = require('../models/class')
//const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')
const {CreatingUserFirebase, LoginFirebaseUser} = require('../firebase.js')
//common

const create_student = async (req, res) => {
    console.log(req.body)
    try{
        const uni = await University.findOne({_id:req.body.university })
        console.log(uni._id)

        let user = await CreatingUserFirebase(req.body.email, req.body.password)
        const student = await Student.create({
            uuid: user.uid,
            usn: req.body.usn,
            name: req.body.name,
            email: req.body.email,
            university: uni._id,
            department: req.body.department,
        })
        res.json({msg: 'student created',
        student: student})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
        return
    }
     
   
}

const all_uni = async (req, res) => {
    var uni = await University.find({}).select('name')
    console.log(uni)
    res.json({
       uni
     })
 }

const delete_docs =  async (req, res) => {
    await Student.deleteMany()
    // await Parent.deleteMany()
    // await Child.deleteMany()
    await Image.deleteMany()
    res.json({msg: 'deleted'})
}

//uni
const create_faculty = async (req, res) => {
    // console.log(req.body)
    try{
        const uni = await University.findOne({name: "MSRIT"})
        const faculty = await Faculty.create({
            uuid: "123",
            name: "Lincy",
            email: "lincy@gmail.com",
            university: uni._id,
            department: "CSE",
            type: "hod"
        })
    } catch(error) {
        res.status(400).json({error: error.message})
        return
    }
    res.json({msg: 'faculty created'})
}

const add_stud_file = async(req, res) => {
    console.log(req.body)
    res.json({
        msg: 'students added'
    })
} 

const edit_stud_file = async(req, res) => {
    //empty all dbs except college
    res.json({
        msg: 'student file edited'
    })
}

module.exports = {
    create_student,
    delete_docs,
    create_faculty,
    add_stud_file,
    edit_stud_file,
    all_uni
    
}