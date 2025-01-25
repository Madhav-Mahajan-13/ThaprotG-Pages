// import fs from 'fs';
// import db from "../dbConnection.js";
import multer from 'multer';
import path from 'path';

// Ensure directories exist
// const ensureDirExists = (dir) => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// };
// ensureDirExists('uploads/pdfs');
// ensureDirExists('uploads/images');


// pdf storage
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pdfs');
    },
    filename: (req, file, cb) => {
        cb(null, `pdf_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadPDF = multer({ 
    storage: pdfStorage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.pdf') {
            return cb(new Error('Only PDFs are allowed'), false);
        }
        cb(null, true);
    }
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, `img_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Image upload middleware
const uploadImage = multer({ 
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ext.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    }
});

// Middleware exports for route configuration
export const uploadProjectFiles = {
    pdf: uploadPDF.single('pdf'),
    image: uploadImage.single('image')
};
