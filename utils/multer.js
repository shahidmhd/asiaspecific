// const multer = require('multer');
// const path = require('path');

// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//             cb(new Error('Unsupported file type'), false);
//             return;
//         }
//         cb(null, true);
//     },
// });

const multer = require('multer');
const path = require('path');

// Set up the destination for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 'uploads/' is the folder where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('Unsupported file type'), false);
            return;
        }
        cb(null, true);
    },
});
