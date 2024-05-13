const express = require('express');
const formidableMiddleware = require('express-formidable');
const fs = require('fs');
const path = require('path');
const { saveImageToMongoDB } = require('../mongodb/Gridfs');


const path1 = 'Path_TO_YOUR_DIRECTORY';
const app = express();
const port = 3000;
app.use(formidableMiddleware());
const uploadDir = path.join(__dirname, 'uploads');

const staticDir = path.join(path1, 'profile');
app.use(express.static(staticDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticDir, 'Templates', 'index.html'));
});

app.post('/storeData', async (req, res) => {
    try {
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            const imagePath = imageFile.path;
            const fileName = imageFile.name;
            const fileId = await saveImageToMongoDB(imagePath, fileName);
            res.status(200).json({ message: 'Image uploaded and saved to MongoDB', fileId });
        } else {
            res.status(400).json({ error: 'No image uploaded' });
        }
    } catch (error) {
        console.error('Error handling image upload request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






