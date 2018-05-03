
exports.seed = function(knex, Promise) {
  return knex('pins').del()
    .then(function () {
      return Promise.all([
        knex('pins').insert({id: 1, title: 'Test pin', info: 'test', description: 'who cares', image: 'id', map_id: '', location_lat: '-25.35', location_long: '131.044'})
      ]);
    });
};
