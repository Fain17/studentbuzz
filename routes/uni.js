const express = require('express')

const fs = require('fs')
const csv = require('fast-csv');
const pCont = require('../controllers/postsController')
const pfCont = require('../controllers/profileController')
const uCont = require('../controllers/userController')
const {uploadCSV} = require('../middleware/upload')
const { getCurrentUni } = require('../middleware/auth')
const Faculty = require('../models/faculty')
const University = require('../models/university');
const sCont = require('../controllers/searchController');


const router = express.Router()

router.use(getCurrentUni)

router.get('/getUni', async (req, res) => {
    let uid = req.params.uid
    try {
        const uniObj = await University.findOne({uuid:uid})
        res.json({uniiversity:uniObj})
    } catch(e) {
        res.status(400).json({"error":e.error})
    }
    
})
//faculty
router.post('/create-faculty',uCont.create_faculty )

router.get('/get-all-unis',uCont.all_uni)

//posts
router.get('/posts', pCont.get_posts)


//profile
router.patch('/editProfile', pfCont.edit_uni_profile)



//students
router.post('/add-student-file', uploadCSV.single('studentscsv'), async (req, res) => {
    let data = req.body
    try{
        
        var usns = []
        fs.createReadStream(`${process.cwd()}/uploads/studentscsv/${req.file.filename}`)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            usns.push(row.USN)
        })
        .on('end', async (rowCount) => {
            //console.log(data.uid)
            var all_ussns = await University.findOne({uuid:data.uid})
            
            var temp = all_ussns.students
            temp.push(...usns)
            await University.findOneAndUpdate({uuid:data.uid}, {students:temp})
            fs.unlinkSync(`${process.cwd()}/uploads/studentscsv/${req.file.filename}`)
        });
        
        
        
    } catch(e) {
        console.log(e.message)
    }
    res.json({'msg':'added'})
    
})

router.patch('/edit-student-file',uCont.edit_stud_file )

module.exports = router