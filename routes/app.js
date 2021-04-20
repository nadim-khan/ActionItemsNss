const router = require('express').Router()
const appCtrl = require('../controllers/appCtrl.js')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', appCtrl.register)


module.exports = router