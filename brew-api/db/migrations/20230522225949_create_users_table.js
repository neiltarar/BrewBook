/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex, Promise) {
	const query = `-- create user table
                CREATE TABLE IF NOT EXISTS users 
                (
                  id SERIAL PRIMARY KEY,
                  first_name VARCHAR(255),
                  last_name VARCHAR(255),
                  email VARCHAR(255) UNIQUE NOT NULL,
                  password_hash VARCHAR(255) NOT NULL,
                  is_activated BOOLEAN DEFAULT false
                );

                -- create refresh tokens table
                CREATE TABLE IF NOT EXISTS refresh_tokens (
                  id SERIAL PRIMARY KEY,
                  user_id INTEGER REFERENCES users(id),
                  refresh_token TEXT NOT NULL,
                  created_at TIMESTAMPTZ DEFAULT NOW()
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
                -- delete refresh tokens table
                DROP TABLE IF EXISTS refresh_tokens;
                -- delete users table 
                DROP TABLE IF EXISTS users;
                `;
	return await knex.raw(query);
}
