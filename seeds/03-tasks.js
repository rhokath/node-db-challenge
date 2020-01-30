
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, task_description: 'fix internet', project_id: 1, completed: false},
        {id: 2, task_description: 'grocery shopping', project_id: 3, completed: false},
        {id: 3, task_description: 'clean apartment', project_id: 2, completed: false},
        {id: 4, task_description: 'cook food', project_id: 3, completed: false},
        {id: 5, task_description: 'do research', project_id: 2, completed: true},
        {id: 6, task_description: 'call friends', project_id: 1, completed: true},
      ]);
    });
};
