import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Utility function to ensure the directory exists
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Create a single multer upload configuration
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = file.fieldname === 'pdf' 
                ? 'uploads/pdfs' 
                : 'uploads/images';
            
            ensureDirectoryExists(uploadDir);
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const prefix = file.fieldname === 'pdf' ? 'pdf' : 'img';
            cb(null, `${prefix}_${Date.now()}${path.extname(file.originalname)}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (file.fieldname === 'pdf' && ext !== '.pdf') {
            return cb(new Error('Only PDFs are allowed'), false);
        }
        
        if (file.fieldname === 'image' && !ext.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only images are allowed'), false);
        }
        
        cb(null, true);
    }
});

// Middleware for handling both PDF and image uploads
export const uploadProjectFiles = upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);