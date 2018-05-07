
exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex('maps').insert({id: 1, title: 'MAP 2', description: 'THIS IS A MAP', created_at: '', user_id: 0}),
        knex('maps').insert({id: 2, title: 'MAP 1', description: 'THIS IS A MAP', created_at: '', user_id: 0})
      ]);
    });
};
