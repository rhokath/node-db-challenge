const express = require('express');

const Resources = require('./resources-model')

const router = express.Router()

router.get('/', (req,res)=> {
    res.send('working in resources router')
})

module.exports = router;