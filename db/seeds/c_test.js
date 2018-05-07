
exports.seed = function(knex, Promise) {
  return knex('pins').del()
    .then(function () {
      return Promise.all([
        knex('pins').insert({title: 'Test pin', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -20.35, location_long: 131.044}),
        knex('pins').insert({title: 'Test pin2', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -40.15, location_long: 129.044}),
        knex('pins').insert({title: 'Test pin3', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -30.35, location_long: 125.044}),
        knex('pins').insert({title: 'Test pin4', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -50.15, location_long: 120.044}),
        knex('pins').insert({title: 'Test pin4', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -50.15, location_long: 120.044}),
        knex('pins').insert({title: 'Test pin4', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -50.15, location_long: 120.044}),
        knex('pins').insert({title: 'Test pin4', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -50.15, location_long: 120.044}),
        knex('pins').insert({title: 'Test pin4', info: 'test', description: 'who cares', image: 'id', map_id: 1, location_lat: -50.15, location_long: 120.044}),
      ]);
    });
};
