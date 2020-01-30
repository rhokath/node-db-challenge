
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, project_name: 'tv watching', project_description: 'watch all fav shows', completed: false},
        {id: 2, project_name: 'homework doing', project_description: 'finish sprint challenge', completed: false},
        {id: 3, project_name: 'cooking dinner', project_description: 'what it sounds like', completed: false}
      ]);
    });
};
