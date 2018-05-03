
exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
   table.increments();
   table.string('title');
   table.string('description');
   table.string('created_at');
   table.string('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
