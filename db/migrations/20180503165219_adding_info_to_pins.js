
exports.up = function(knex, Promise) {
  return knex.schema.table("pins", function (table) {
    table.dropColumn("location");
    table.string("location_lat");
    table.string("location_long");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("pins", function (table) {
    table.string("location");
    table.dropColumn("location_lat");
    table.dropColumn("location_long");
  })
};
