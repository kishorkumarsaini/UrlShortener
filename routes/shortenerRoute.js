const urlController = require('../controller/shortenerController');
const router = require('express').Router();


// get method

router.get('/:shortid', urlController.RedirectUrl);

//post method
router.post('/addUrl', urlController.AddUrl);

module.exports = router;