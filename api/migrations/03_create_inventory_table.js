exports.up = function(knex) {
  return knex.schema.createTable('inventory', table => {
    table.integer('user_id').references('users.user_id').onDelete('CASCADE');
    table.integer('item_id').references('item.item_id').onDelete('CASCADE');
    table.primary(['user_id', 'item_id']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory')
};
