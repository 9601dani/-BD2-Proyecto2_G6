const { uploadFile, updateFile } = require('../helpers/uploadFile');
require('dotenv').config();

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const addImage = async (req, res) => {
    try {
        const fileName = await uploadFile(req.files
            , ['png', 'jpg', 'jpeg', 'gif']
            , 'images');
        res.json({fileName});
    } catch(error) {
        res.status(400).json({ error });
    }
}

const updateImage = async (req, res) => {
    try {
        const { image } = req.params;
        const fileName = await updateFile(req.files, image
            , ['png', 'jpg', 'jpeg', 'gif']
            , 'images');
        res.json({fileName});
    } catch(error) {
        res.status(400).json({ error });
    }
}

const getImage = (req, res) => {
    const { image } = req.params;
    
    const imageUrl = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${image}`;
    res.redirect(imageUrl);
}

module.exports = {
    addImage,
    getImage,
    updateImage
}
