exports.up = function(knex, Promise) {
 return knex.schema.createTable('pins', function (table) {
   table.increments();
   table.string('title');
   table.string('info');
   table.string('description');
   table.string('location');
   table.string('image');
   table.string('map_id');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins')
};
