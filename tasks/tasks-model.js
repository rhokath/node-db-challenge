const db = require('../data/db-config');

module.exports = {
    get, 
    getById,
    getByProjectId,
    addTask

}
//all tasks
function get(){
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
//a specific task by the task id
function getById(id){
    return get().where({"tasks.id": id}).first()
}

function getByProjectId(id){
    return get().where({'tasks.project_id': id})
   
}

function addTask(taskData, project_id){
    // return getByProjectId(id)
    //     .then()
    //     .insert(task, 'id').where({"tasks.project_id": id})
    //     .then(([id])=> getById(id))

    // return db('tasks').where({project_id: id}).insert(task)

    return db('tasks').where({project_id}).insert({project_id: project_id, ...taskData})
    .then(([id])=> getById(id))
        


}