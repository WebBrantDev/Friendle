/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("teams", (table) => {
      table.increments("id").primary();
      table.string("daily_word", 20);
      table.string("game_type", 30).defaultTo("default");
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table
        .integer("team_id")
        .unsigned()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("avatar", 255).notNullable();
      table.string("username", 50).notNullable();
      table.string("email", 50).notNullable();
      table.string("password", 100);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("entries", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("team_id")
        .unsigned()
        .references("id")
        .inTable("teams")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("game_day", 20).notNullable();
      table.integer("num_of_guesses", 10).notNullable();
      table.string("guess_pattern", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entries").dropTable("users").dropTable("teams");
};