const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        console.log(files);
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed, valid extensions are: ${validExtensions}`);
        }

        const temporalName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(temporalName);
        });
    });
}

module.exports = { uploadFile };
