// // import express from 'express';
// import multer from 'multer';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import db from "../dbConnection.js";
// import dotenv from "dotenv";
// import path from 'path';
// import exp from 'constants';

// dotenv.config();

// // const app = express();
// const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
// const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: Math.max(MAX_IMAGE_SIZE, MAX_PDF_SIZE) },
//     fileFilter: (req, file, cb) => {
//         if (file.fieldname === 'image' && !['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
//             return cb(new Error('Invalid image format'));
//         }
//         if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
//             return cb(new Error('Invalid PDF format'));
//         }
//         cb(null, true);
//     }
// });

// const s3Client = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: { accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY }
// });



// const uploadToS3 = async (file, folder) => {
//     const filename = `${Date.now()}-${path.basename(file.originalname)}`;
//     const uploadParams = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${folder}/${filename}`,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: 'public-read'
//     };

//     await s3Client.send(new PutObjectCommand(uploadParams));
//     return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${folder}/${filename}`;
// };

// const saveToDatabase = async (name, description, imageUrl, pdfUrl) => {
//     const query = 'INSERT INTO submissions (name, description, image_url, pdf_url) VALUES ($1, $2, $3, $4) RETURNING id';
//     const result = await db.query(query, [name, description, imageUrl, pdfUrl]);
//     return result.rows[0].id;
// };

// // app.post('/api/submit', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {

// export const postProject = async(req,res)=>{
//     try {
//         if (!req.files?.image?.[0] || !req.files?.pdf?.[0]) {
//             return res.status(400).json({ error: 'Both image and PDF files are required' });
//         }


//         //  user type se define bhi karna hai 

//         const { name, description } = req.body;
//         const image = req.files.image[0];
//         const pdf = req.files.pdf[0];

//         const imageUrl = await uploadToS3(image, 'images');
//         const pdfUrl = await uploadToS3(pdf, 'pdfs');

//         const submissionId = await saveToDatabase(name, description, imageUrl, pdfUrl);

//         res.status(200).json({ message: 'Submission successful', submissionId, imageUrl, pdfUrl });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// export const getYourProjects = async (req, res) => {
//     const id = req.body._id; // Get user ID from the request body

//     try {
//         // Query the database for projects associated with the user ID
//         const result = await db.query(
//             `SELECT title, project_id, status, created_at, pdf_link 
//              FROM projects 
//              WHERE user_id = $1`, 
//             [id]
//         );

//         // Send the result as a JSON response
//         return res.status(200).json(result.rows);
//     } catch (error) {
//         console.error("Error fetching projects:", error);

//         // Send an error response
//         return res.status(500).json({ error: "Failed to fetch projects" });
//     }
// };