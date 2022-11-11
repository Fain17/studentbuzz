const Student = require('../models/student')
const Class = require('../models/class')
const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')

//common

const getUni = async (req, res) => {
    const studentUni = await Student.findOne({name: "Owais"}).populate('university')
    res.json({msg: 'University fetched',
    studentUni: studentUni})
    // studUni = student.university.
}

const getStud = async (req, res) => {
    const classStud = await Class.findOne({name: "CSE 1"}).populate('students').populate('university')
    res.json({msg: 'Students fetched',
    classStud})
    // studUni = student.university.
}

const getStudclub = async (req, res) => {
    const studClub = await Club.findOne({name: "GDSC"}).populate('members._id')
    res.json({msg: 'Students fetched',
    studClub})
}

//faculty/student
//----------------------
const gen_search = async (req, res) => {
    //req.query.search
    //name and category
    res.json({
        req: req.query
    })
}

const club_search = async (req, res) => {
    //req.query.search
    //name and category
    res.json({
        req: req.query
    })
}

const student_search = async (req, res) => {
    //req.query.search
    //name and category
    res.json({
        req: req.query
    })
}

const faculty_search = async (req, res) => {
    //req.query.search
    //name and category
    res.json({
        req: req.query
    })
}

const uni_search = async (req, res) => {
    //req.query.search
    //name and category
    
    
    res.json({
       
    })
}

//------------------------



const all_clubs = async (req, res) => {
    var uni = await University.findOne({name:"MSRIT"})
    var clubs = await Club.find({university:uni.id}).select('name')
    console.log(uni.id)
    res.json({
        clubs
    })
}

//student

const find_partner = async(req, res) => {
    console.log(req.body)
    //only in student collection
    res.json({
        req: req.body
    })
}



module.exports = {
    getUni,
    getStud,
    getStudclub,
    all_clubs,
    gen_search,
    find_partner,
    club_search,
    student_search,
    uni_search,
    faculty_search
}