// Drop old table if exists and recreate with correct schema
async function main() {
  const sql = [
    'DROP TABLE IF EXISTS public.user_progress CASCADE;',
    'CREATE TABLE public.user_progress (',
    '  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,',
    '  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,',
    '  phase_id integer NOT NULL,',
    '  mission_id integer NOT NULL,',
    '  completed_at timestamptz DEFAULT now() NOT NULL,',
    '  UNIQUE(user_id, phase_id, mission_id)',
    ');',
    'ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;',
    "CREATE POLICY \"up_sel\" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);",
    "CREATE POLICY \"up_ins\" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);",
    "CREATE POLICY \"up_del\" ON public.user_progress FOR DELETE USING (auth.uid() = user_id);",
  ].join('\n');

  const url = 'https://api.supabase.com/v1/projects/erufanulgdvulyonpanm/database/query';
  const token = process.env.SUPABASE_ACCESS_TOKEN;

  console.log('Dropping and recreating user_progress table...');
  
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
