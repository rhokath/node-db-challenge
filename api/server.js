const express = require('express');
const ResourcesRouter = require('../resources/resources-router');
const TasksRouter = require('../tasks/tasks-router');
const ProjectsRouter = require('../projects/projects-router');

const server = express();

server.use(express.json());
server.use('/api/resources', ResourcesRouter);
server.use('/api/tasks', TasksRouter);
server.use('/api/projects', ProjectsRouter);

//sanity check
server.get('/', (req, res)=> {
    res.send('it/s workinnnnng')
})

module.exports = server;