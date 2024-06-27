const { uploadFile, updateFile } = require('../helpers/uploadFile');
const path  = require('path');


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
    console.log(image);
    const pathImage = path.join(__dirname, '../uploads/images', image);
    res.sendFile(pathImage);
}

module.exports = {
    addImage,
    getImage,
    updateImage
}
