exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('bio');
    table.string('prof_pic');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
