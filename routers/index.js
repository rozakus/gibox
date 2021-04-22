const router = require('express').Router()
const MainController = require('../controllers')

router.post('/raw', MainController.addDataRaw)
router.get('/raw', MainController.showRawData)
router.get('/converted', MainController.showConvertedData)
router.post('/converted', MainController.addConvertedData)

module.exports = router