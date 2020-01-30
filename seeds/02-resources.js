
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, resource_name: 'cable'},
        {id: 2, resource_name: 'internet'},
        {id: 3, resource_name: 'friends'},
        {id: 4, resource_name: 'kitchen'},
        {id: 5, resource_name: 'television' },
        {id: 6, resource_name: 'computer'}
      ]);
    });
};
