const Class = require('../models/class')
const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')

//faculty
const edit_profile = async (req, res) => {
    console.log(req.body)
    //req.body will have what details to edit
    res.json({
        name: 'faculty',
    })
}

//uni
const edit_uni_profile = async (req, res) => {
    console.log(req.body)
    //req.body will have what details to edit
    res.json({
        name: 'university',
    })
}

//student
const edit_stud_profile = async(req, res) => {
    console.log(req.body)
    //req.body will have what details to edit
    res.json({
        name: 'student',
    })
}

module.exports = {
    edit_profile,
    edit_uni_profile,
    edit_stud_profile

}