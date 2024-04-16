exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table.string('name_first').notNullable();
    table.string('name_last').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
