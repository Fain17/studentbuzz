const multer = require('multer');
const path  = require('path')

var maxSize = 9000000; // 9MB

var storageForTranscript = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/transcripts')
    },
    filename: function (req, file, cb) { 
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        console.log(req.file)
        cb(null, req.file)
    },
});

var storageForPosts = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/posts')
    },
    filename: function (req, file, cb) {  //name of uploaded file
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        cb(null, req.file)
    },
});

var storageForEvents = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/events')
    },
    filename: function (req, file, cb) {  //name of uploaded file
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        cb(null, req.file)
    },
});

var storageForStudentImage = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/students')
    },
    filename: function (req, file, cb) {  //name of uploaded file
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        cb(null, req.file)
    },
});

var storageForClubImage = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/clubs')
    },
    filename: function (req, file, cb) {  //name of uploaded file
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        cb(null, req.file)
    },
});

var storageForUniversityStudents = multer.diskStorage({  
    destination: function (req, file, cb) {  // Destination to store uploaded files
        cb(null, './uploads/studentscsv')
    },
    filename: function (req, file, cb) {  //name of uploaded file
        let file_extension = path.extname(file.originalname) //name of uploaded file
        req.file = file.originalname + '-' + Date.now() + file_extension
        cb(null, req.file)
    },
});

const uploadTranscript = multer({ storage: storageForTranscript, limits: {fileSize: maxSize} });
const uploadPost = multer({ storage: storageForPosts, limits: {fileSize: maxSize} });
const uploadEvent = multer({ storage: storageForEvents, limits: {fileSize: maxSize} });
const uploadAvatar = multer({ storage: storageForStudentImage, limits: {fileSize: maxSize} });
const uploadClub = multer({ storage: storageForClubImage, limits: {fileSize: maxSize} });
const uploadCSV = multer({ storage: storageForUniversityStudents, limits: {fileSize: maxSize} });

module.exports = {uploadTranscript, uploadPost, uploadEvent, uploadClub, uploadAvatar, uploadCSV};