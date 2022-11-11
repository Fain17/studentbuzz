const Student = require('../models/student')
const Class = require('../models/class')
const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')

const create_class = async (req, res) => {
    try{
        const faculty = await Faculty.findOne({name: "Lincy"})
        const uni = await University.findOne({name: "MSRIT"})
        const students = await Student.find({university: uni._id})
        const classroom = await Class.create({
            name: "CSE 1",
            faculty: faculty._id,
            students: students.map(s => s._id),
            university: uni._id
        })

    } catch(error) {
        res.status(400).json({error: error.message})
        return
    }
    // console.log(req.body)
    res.json({
        msg: 'class created'
    })
}

const edit_class = async(req, res) => {
    console.log(req.params.cid, req.body)
    res.json({
        msg: 'class edited'
    })
}

const delete_class = async(req, res) => {
    console.log(req.params.cid)
    res.json({
        msg: 'class deleted'
    })
}


const get_classes = async(req, res) => {
    console.log(req.params.cid)
    res.json({
        classes: []
    })
}

const get_all_classes = async(req, res) => {
    res.json({
        classes: []
    })
}

module.exports = {

    get_classes,
    get_all_classes,
    delete_class,
    create_class,
    edit_class,
}