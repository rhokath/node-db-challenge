const db = require('../data/db-config');

module.exports = {
    get, 
    getById,
    add, addTask, superGetbyId

}

function get(){
    return db('projects')

}

function getById(id){
    return db('projects').where({id}).first()
}

function add(project){
    return db('projects')
        .insert(project, 'id')
        .then(([id])=> getById(id))

}

function addTask(taskData, project_id){
    // return getByProjectId(id)
    //     .then()
    //     .insert(task, 'id').where({"tasks.project_id": id})
    //     .then(([id])=> getById(id))

    // return db('tasks').where({project_id: id}).insert(task)

    return db('tasks').where({project_id}).insert({project_id: project_id, ...taskData})
    
}

function superGetbyId(id){
    const projectQuery = getById(id)
    const resourceQuery = getResources(id)
    const taskQuery = getTasks().where({project_id: id}).first()
    return Promise.all([projectQuery, resourceQuery, taskQuery])
        .then(([project, resource, task])=>{
            project.resources = resource;
            project.tasks = task;
            return project;
        })
    

}

function getResources(id){
    return db('project_resources as pr')
    .select(['r.resource_name as resource', 'r.resource_description as description'])
    .join('resources as r','pr.resource_id', 'r.id' )
    .where({project_id : id})
}
//all tasks
function getTasks(){
    return db('tasks')
    .select([
        'p.project_name',
        'p.project_description', 
        'tasks.task_description', 
        'tasks.task_notes', 
        'tasks.id', 
        'tasks.completed' ])
        .join('projects as p', 'tasks.project_id', 'p.id')
}

