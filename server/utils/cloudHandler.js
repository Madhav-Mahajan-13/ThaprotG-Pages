// services/cloudStorage.js

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

class CloudStorageService {
    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        });
        this.bucketName = process.env.AWS_BUCKET_NAME;
    }

    /**
     * Upload a file to cloud storage
     * @param {Buffer} fileBuffer - The file buffer to upload
     * @param {string} originalName - Original filename
     * @param {string} mimeType - File mime type
     * @param {string} folder - Destination folder in bucket
     * @returns {Promise<string>} - Returns the public URL of the uploaded file
     */
    async uploadFile(fileBuffer, originalName, mimeType, folder) {
        try {
            const filename = `${Date.now()}-${path.basename(originalName)}`;
            const uploadParams = {
                Bucket: this.bucketName,
                Key: `${folder}/${filename}`,
                Body: fileBuffer,
                ContentType: mimeType,
                ACL: 'public-read'
            };

            await this.s3Client.send(new PutObjectCommand(uploadParams));
            return `https://${this.bucketName}.s3.amazonaws.com/${folder}/${filename}`;
        } catch (error) {
            console.error('Cloud storage upload error:', error);
            throw new Error(`Failed to upload file to cloud storage: ${error.message}`);
        }
    }

    /**
     * Upload multiple files to cloud storage
     * @param {Array<{buffer: Buffer, originalName: string, mimeType: string, folder: string}>} files 
     * @returns {Promise<Array<string>>} - Returns array of public URLs
     */
    async uploadMultipleFiles(files) {
        try {
            const uploadPromises = files.map(file => 
                this.uploadFile(file.buffer, file.originalName, file.mimeType, file.folder)
            );
            return await Promise.all(uploadPromises);
        } catch (error) {
            console.error('Multiple files upload error:', error);
            throw new Error(`Failed to upload multiple files: ${error.message}`);
        }
    }

    /**
     * Get the public URL for a file
     * @param {string} folder - Folder name in bucket
     * @param {string} filename - File name
     * @returns {string} - Public URL
     */
    getPublicUrl(folder, filename) {
        return `https://${this.bucketName}.s3.amazonaws.com/${folder}/${filename}`;
    }
}

module.exports = new CloudStorageService();