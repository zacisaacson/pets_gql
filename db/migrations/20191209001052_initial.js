

exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('owners', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('age').unsigned();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('pets', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('animal_type');
      table.string('breed');
      table.integer('age').unsigned();
      table.string('favorite_treat');
      table.integer('owner_id').unsigned();
      table.foreign('owner_id').references('owners.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('pets'),
    knex.schema.dropTable('owners')
  ])
};
