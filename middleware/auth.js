const University = require("../models/university")

const getCurrentStudent = async (req, res, next) => {
    console.log('student authenticated')
    //check details of header
    //req.user  = {}
    next()
}

const getCurrentUni = async (req, res, next) => {

    //check details of header
    //req.user  = {}
    const{authorization} = req.headers
    if(!authorization){
        
        return res.status(401).json({error:'Authorization token required'})
    }
    
    req.user = await University.findOne({uuid:authorization})

    next()
}

const getCurrentFaculty = async (req, res, next) => {
    console.log('faculty authenticated')
    //check details of header
    //req.user  = {}
    next()
}



module.exports = {
    getCurrentStudent,
    getCurrentUni,
    getCurrentFaculty
}