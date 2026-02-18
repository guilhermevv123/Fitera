-- WARNING: This will DELETE all existing posts and profiles!
-- Use this if you are getting "column does not exist" errors.

-- 1. Drop old tables (with CASCADE to remove dependencies)
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Create Profiles Table (Correct Schema)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  city TEXT,
  phone TEXT,
  xp INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  modalities TEXT[],
  experience TEXT,
  goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 5. Create Posts Table (Correct Schema)
CREATE TABLE public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  text TEXT,
  image_url TEXT,
  city TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  type TEXT DEFAULT 'user_post',
  meta JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable RLS for Posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users insert own posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);

-- 7. Storage Setup (Safe to run multiple times)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('feed_images', 'feed_images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies (Drop old ones first to avoid duplicates)
DROP POLICY IF EXISTS "Public Images" ON storage.objects;
DROP POLICY IF EXISTS "Upload Images" ON storage.objects;

CREATE POLICY "Public Images" ON storage.objects FOR SELECT USING (bucket_id = 'feed_images');
CREATE POLICY "Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'feed_images' AND auth.role() = 'authenticated');
