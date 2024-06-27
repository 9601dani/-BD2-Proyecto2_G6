require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3')
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})


const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        //console.log(files);
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed, valid extensions are: ${validExtensions}`);
        }

        //const temporalName = uuidv4() + '.' + extension;
        // const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        // file.mv(uploadPath, (err) => {
        //     if (err) {
        //         return reject(err);
        //     }

        //     resolve(temporalName);
        // });
        const temporalName = uuidv4() + '.' + extension;
        const stream = fs.createReadStream(file.tempFilePath);

        uploadFileToS3(temporalName, extension, stream)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        
    });
}

const updateFile = (files, fileName, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed, valid extensions are: ${validExtensions}`);
        }

        const temporalName = fileName.split('.')[0] + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(temporalName);
        });
    });
}

async function uploadFileToS3(name, type, file){

    const uploadParam = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${name}`,
        Body: file,
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }
    const command = new PutObjectCommand(uploadParam)
    await client.send(command)
    //return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${name}`;
    return name;

}

module.exports = { uploadFile, updateFile, uploadFileToS3 };
