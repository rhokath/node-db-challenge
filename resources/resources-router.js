const express = require('express');

const Resources = require('./resources-model')

const router = express.Router()
//get all resources
router.get('/', (req,res) => {
    Resources.get()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'trouble retrieving resources'})
        })
})
//get a resource by it's id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Resources.getById(id)
        .then(resource => {
            if(resource){
                res.status(200).json(resource)
            } else {
                res.status(404).json({message: 'the resource with the given Id does not exist'})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'there was an error retrieving the resource'})
        })
})
//add a resource
router.post('/', (req, res) => {
    const resourceData = req.body;
    Resources.add(resourceData)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'failed to add the resource to the db'})
        })

})

module.exports = router;