const { Router } = require('express');
const router = Router();
const { addImage, getImage } = require('../controllers/uploads.controller');
const { validateFile } = require('../middlewares/validateFile');

const api = '/api/v1/upload';

router.post(`${api}/add`, validateFile, addImage);
router.get(`${api}/find/:image`, getImage);


module.exports = router;
