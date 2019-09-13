const express = require('express');

const Tasks = require('./tasks-model');

const router = express.Router();

router.get('/', (req,res)=> {
    res.send('working in tasks')
})

module.exports = router;