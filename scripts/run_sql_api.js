import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = 'erufanulgdvulyonpanm';

async function runSQL() {
    try {
        const sqlPath = path.join(__dirname, '../reference/create_user_progress.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        const url = `https://api.supabase.com/v1/projects/${PROJECT_REF.trim()}/queries`;
        console.log('URL:', url);
        console.log('Sending SQL to Supabase Management API...');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN.trim()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: sql
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('API Error:', JSON.stringify(result, null, 2));
        } else {
            console.log('SQL Executed Successfully!');
            console.log('Result:', JSON.stringify(result, null, 2));
        }
    } catch (err) {
        console.error('Execution Error:', err);
    }
}

runSQL();
