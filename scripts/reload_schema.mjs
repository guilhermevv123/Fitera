// Force PostgREST schema cache reload on Supabase
async function main() {
  const sql = "NOTIFY pgrst, 'reload schema';";

  const url = 'https://api.supabase.com/v1/projects/erufanulgdvulyonpanm/database/query';
  const token = process.env.SUPABASE_ACCESS_TOKEN;

  console.log('Reloading PostgREST schema cache...');
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
