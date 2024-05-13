const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'your_database_name';

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoURL);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Function to save image to MongoDB using GridFS
async function saveImageToMongoDB(imagePath, fileName) {
    try {
        const db = await connectToMongoDB();
        const bucket = new GridFSBucket(db);
        const readableStream = fs.createReadStream(imagePath);
        const uploadStream = bucket.openUploadStream(fileName);
        await new Promise((resolve, reject) => {
            readableStream.pipe(uploadStream)
                .on('error', reject)
                .on('finish', resolve);
        });

        console.log('Image saved to MongoDB');
        return uploadStream.id;
    } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        throw error;
    }
}

module.exports = {
    saveImageToMongoDB
};
