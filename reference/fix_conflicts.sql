-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Profiles Table if not exists
CREATE TABLE IF NOT EXISTS public.profiles (
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

-- Safely Drop Existing Policies to Avoid Conflicts
DROP POLICY IF EXISTS "Public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Enable RLS and Re-create Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- Create Posts Table if not exists
CREATE TABLE IF NOT EXISTS public.posts (
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

-- Safely Drop Existing Policies for Posts
DROP POLICY IF EXISTS "Public posts" ON public.posts;
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Users insert own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can create their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users update own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;

-- Enable RLS and Re-create Policies for Posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users insert own posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);

-- Storage Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('feed_images', 'feed_images', true)
ON CONFLICT (id) DO NOTHING;

-- Safely Drop Existing Storage Policies
DROP POLICY IF EXISTS "Public Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Feed Images" ON storage.objects;
DROP POLICY IF EXISTS "Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload feed images" ON storage.objects;

-- Re-create Storage Policies
CREATE POLICY "Public Images" ON storage.objects FOR SELECT USING (bucket_id = 'feed_images');
CREATE POLICY "Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'feed_images' AND auth.role() = 'authenticated');
