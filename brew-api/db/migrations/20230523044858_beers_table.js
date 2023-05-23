/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex, Promise) {
	const query = `-- create beers table
                  CREATE TABLE IF NOT EXISTS beers (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    producer_website VARCHAR(255) NOT NULL,
                    place_consumed VARCHAR(255),
                    date_consumed DATE,
                    notes TEXT,
                    user_id INTEGER REFERENCES users(id)
                  );

            `;

	return await knex.raw(query);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	const query = ` 
                -- delete beers table
                DROP TABLE IF EXISTS beers;
                `;
	return await knex.raw(query);
}
