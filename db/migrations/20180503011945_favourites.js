exports.up = function(knex, Promise) {
  return knex.schema.createTable('favourites', function (table) {
   table.increments();
   table.string('favourited_at');
   table.string('user_id');
   table.string('map_id');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favourites')
};
