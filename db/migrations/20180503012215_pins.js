exports.up = function(knex, Promise) {
 return knex.schema.createTable('pins', function (table) {
   table.increments();
   table.string('title');
   table.string('info');
   table.string('description');
   table.decimal("location_long");
   table.decimal("location_lat");
   table.string('image');
   table.integer('map_id');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins')
};
