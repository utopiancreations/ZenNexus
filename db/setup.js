import postgres from 'postgres';
import 'dotenv/config';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function createSchema() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS pillars (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt VARCHAR(500),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Table "pillars" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    if (sql) {
      await sql.end();
    }
  }
}

createSchema();
