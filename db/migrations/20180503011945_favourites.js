exports.up = function(knex, Promise) {
  return knex.schema.createTable('favourites', function (table) {
   table.increments();
   // this column can probably also have an automatic date property -- like
  // "created_at" for the maps table 
   table.string('favourited_at');
   table.integer('user_id');
   table.integer('map_id');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favourites')
};
