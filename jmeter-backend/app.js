// const express = require('express');
// const AWS = require('aws-sdk');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(cors()); // to handle CORS

// // Initialize S3 client
// const s3 = new AWS.S3({
//     // accessKeyId: 'YOUR_ACCESS_KEY',
//     // secretAccessKey: 'YOUR_SECRET_KEY',
//     region: 'eu-west-1'
// });

// app.get('/reports', async (req, res) => {
//     try {
//         const result = await s3.listObjectsV2({ Bucket: 'YOUR_BUCKET_NAME' }).promise();
//         res.send(result.Contents);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });