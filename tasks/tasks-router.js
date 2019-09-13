const express = require('express');

const Tasks = require('./tasks-model');

const router = express.Router();

router.get('/', (req,res) => {
    Tasks.get()
        .then(tasks => {
            tasks.forEach(task => task.completed ? task.completed = true: task.completed = false)
            res.status(200).json(tasks)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'trouble retrieving tasks'})
        })
})
//get task by specific id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Tasks.getById(id)
        .then(task => {
            if(task){
                res.status(200).json(task)
            } else {
                res.status(404).json({message: 'the task with the given Id does not exist'})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'there was an error retrieving the task'})
        })
})
//get task by project id
router.get('/:id/project', (req, res) => {
    const {id} = req.params;
    Tasks.getByProjectId(id)
    .then(projectTasks => {
        if(projectTasks){
            res.status(200).json(projectTasks)
        } else {
            res.status(404).json({message: 'no project with that id exists'})
        }
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).json({message: 'failed to retrieve project tasks'})
    })
})
//add task to project
router.post('/:id/project', (req, res) => {
    const id = req.params.id;
    const taskData = req.body;
    Tasks.addTask(taskData, id)
        .then(taskedProject => {
            if(taskedProject){
                res.status(201).json(taskedProject)
            } else {
                res.status(404).json({message: 'could not add task to project that does not exist'})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({message: 'error adding new task to db'})
        })
})

module.exports = router;