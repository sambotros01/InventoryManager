exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments('item_id');
    table.string('item_name').notNullable();
    table.string('item_description');
    table.integer('quantity');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item')
};