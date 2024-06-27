const { Router } = require('express');
const router = Router();
const UploadsController = require('../controllers/uploads.controller');
const { validateFile } = require('../middlewares/validateFile');

const api = '/api/v1/upload';

router.post(`${api}/add`, validateFile, UploadsController.addImage);
router.get(`${api}/find/:image`, UploadsController.getImage);
router.put(`${api}/update/:image`, validateFile, UploadsController.updateImage);


module.exports = router;
