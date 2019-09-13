const express = require('express');

const Projects = require('./projects-model');

const router = express.Router()

router.get('/', (req,res)=> {
    res.send('working in projects router')
})

module.exports = router;