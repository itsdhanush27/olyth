import { Client } from 'pg';

const connectionString = 'postgresql://postgres:theboysofficia@db.mrhpdrzwrnawvxxevmue.supabase.co:5432/postgres';

async function updateEmails() {
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    const res = await client.query(`
      UPDATE auth.users 
      SET email_confirmed_at = NOW(), 
          confirmed_at = NOW() 
      WHERE email_confirmed_at IS NULL
      RETURNING email;
    `);
    console.log(`Successfully confirmed ${res.rowCount} users:`, res.rows.map(r => r.email));
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

updateEmails();
