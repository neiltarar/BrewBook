/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	const query = `
                  -- check if 'images' column exists in 'beers' table
                  DO $$
                  BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                   WHERE table_schema = 'public' 
                                   AND table_name = 'beers' 
                                   AND column_name = 'images') 
                    THEN
                      -- add 'images' column to 'beers' table
                      ALTER TABLE beers ADD COLUMN images VARCHAR(255);
                    END IF;
                  END
                  $$;
                `;

	return await knex.raw(query);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	const query = `
                -- delete 'images' column from 'beers' table
                DO $$
                BEGIN
                  IF EXISTS (SELECT 1 FROM information_schema.columns 
                             WHERE table_schema = 'public' 
                             AND table_name = 'beers' 
                             AND column_name = 'images') 
                  THEN
                    ALTER TABLE beers DROP COLUMN images;
                  END IF;
                END
                $$;
                `;
	return await knex.raw(query);
}
