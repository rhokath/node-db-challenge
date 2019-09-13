const express = require('express');

const Projects = require('./projects-model');

const router = express.Router()

router.get('/', (req,res) => {
    Projects.get()
        .then(projects => {
            projects.forEach(project => project.completed ? project.completed = true: project.completed = false)
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'trouble retrieving projects'})
        })
})
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Projects.getById(id)
        .then(project => {
            if(project){
                res.status(200).json(project)
            } else {
                res.status(404).json({message: 'the project with the given Id does not exist'})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'there was an error retrieving the project'})
        })
})
//super get
router.get('/:id/super', (req, res)=> {
    const id = req.params.id;
    Projects.superGetbyId(id)
        .then(project => {
            if(project){
                res.status(200).json(project)
            } else {
                res.status(404).json({message: 'the project with that id does not exist'})
            }
        })
        .catch(err =>{
            console.log(err.message)
            res.status(500).json({message: 'could not retrieve project'})
        })
})

router.post('/', (req, res) => {
    const projectData = req.body;
    Projects.add(projectData)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'failed to add the project to the db'})
        })

})
router.post('/:id/tasks', (req,res)=> {
    const id = req.params.id
    const taskData = req.body;
    Projects.addTask(taskData, id)
    .then(task => {
        res.status(201).json(task)
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).json({message: 'failed to add task'})
    })
})

module.exports = router;