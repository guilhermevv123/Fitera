import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Credentials provided by user
const DB_HOST = 'db.erufanulgdvulyonpanm.supabase.co'; 
const DB_PORT = 5432;
const DB_USER = 'postgres';
const DB_PASS = process.env.DB_PASS; 
const DB_NAME = 'postgres';

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  ssl: { rejectUnauthorized: false } 
});

async function runSchema() {
  try {
    console.log('Connecting to database:', DB_HOST);
    await client.connect();
    console.log('Connected successfully!');

    // Read SQL file
    const sqlPath = path.join(__dirname, '../reference/reset_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing schema setup...');
    await client.query(sql);
    
    console.log('Schema executed successfully! Tables created.');
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

runSchema();
