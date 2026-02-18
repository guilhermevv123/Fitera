import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
  console.log('Fetching active users...');
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError || !users || users.length === 0) {
    console.error('No users found in auth.users. Please register a user first or check credentials.');
    return;
  }

  const REAL_USER_ID = users[0].id;
  console.log('Using User ID:', REAL_USER_ID);

  const MOCK_PROFILES = [
    {
      id: REAL_USER_ID,
      full_name: 'Alex Treinos (Seeded)',
      avatar_url: 'https://picsum.photos/id/64/200/200',
      city: 'São Paulo',
      xp: 450,
      coins: 450,
      level: 3
    }
  ];

  const MOCK_POSTS = [
    {
      user_id: REAL_USER_ID,
      text: 'Acabei de terminar minha corrida matinal! 🏃‍♂️ (Seeded)',
      image_url: 'https://picsum.photos/id/29/600/300',
      city: 'São Paulo',
      likes: 12,
      comments: 2,
      type: 'user_post'
    }
  ];

  console.log('Seeding profiles...');
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(MOCK_PROFILES);

  if (profileError) {
    console.error('Error seeding profiles:', profileError);
  } else {
    console.log('Profiles seeded!');
  }

  console.log('Seeding posts...');
  const { error: postError } = await supabase
    .from('posts')
    .insert(MOCK_POSTS);

  if (postError) {
    console.error('Error seeding posts:', postError);
  } else {
    console.log('Posts seeded!');
  }
}

seed().then(() => {
  console.log('Seeding process finished.');
}).catch(err => {
  console.error('Seeding process failed:', err);
});
