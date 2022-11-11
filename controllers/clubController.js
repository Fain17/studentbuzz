const Class = require('../models/class')
const Club = require('../models/club')
const Image = require('../models/image')
const University = require('../models/university')

//student

const follow_clubs = async(req, res) => {
    console.log(req.params)
    //use club id
    res.json({
        msg: 'followed'
    })
}

const get_clubs = async(req, res) => {
    res.json({
        clubs: []
    })
}

const add_club_mem = async(req, res) => {
    console.log(req.params)
    res.json({
        msg: 'member added'
    })
}

const edit_club_admin = async(req, res) => {
    console.log(req.params)
    res.json({
        msg: 'admin changed'
    })
}

const remove_club_mem = async(req, res) => {
    console.log(req.params)
    res.json({
        msg: 'member removed'
    })
}

const readd_club_mem = async(req, res) => {
    console.log(req.params)
    res.json({
        msg: 'member re-added'
    })
}

const club_tasks = async(req, res) => {
    res.json({
        tasks: []
    })
}

const del_event = async(req, res) => {
    console.log(req.params)
    res.json({
        msg: 'event deleted'
    })
}

const task_assigned = async(req, res) => {
    //make sure only team members can be assigned tasks
    console.log(req.body)
    res.json({
        msg: 'task assigned'
    })
}

const edit_task = async(req, res) => {
    console.log(req.body)
    res.json({
        msg: 'task edited'
    })
}

const del_task = async(req, res) => {
    console.log(req.query)
    res.json({
        msg: 'task deleted'
    })
}

const task_accomp = async(req, res) => {
    console.log(req.query)
    //use club id and task id
    res.json({
        msg: 'task accomplished'
    })
}

const task_confirm = async(req, res) => {
    console.log(req.query)
    //also do something if task not completed
    //use club id and task id
    //update points
    res.json({
        msg: 'task confirmed'
    })
}

//faculty

const appr_req = async (req, res) => {
    res.json({
        clubs: []
    })
}

const appr_club = async(req, res) => {
    //add condition for not approving club
    console.log(req.body)
    res.json({
        msg: 'club approved'
    })
}




module.exports = {
    appr_req,
    appr_club,
    follow_clubs,
    get_clubs,
    add_club_mem,
    edit_club_admin,
    remove_club_mem,
    readd_club_mem,
    club_tasks,
    del_event,
    task_assigned,
    edit_task,
    del_task,
    task_accomp,
    task_confirm

}