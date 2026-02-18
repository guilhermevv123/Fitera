import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  console.log('Checking Profiles...');
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
  if (pError) console.error('Profile Error:', pError);
  else console.log('Profiles found:', profiles.length, profiles);

  console.log('Checking Posts...');
  const { data: posts, error: postError } = await supabase.from('posts').select('*');
  if (postError) console.error('Post Error:', postError);
  else console.log('Posts found:', posts.length, posts);
}

check();
