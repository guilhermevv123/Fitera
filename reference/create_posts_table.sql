-- Create Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  text TEXT,
  image_url TEXT,
  city TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  type TEXT DEFAULT 'user_post', -- 'user_post', 'achievement_streak', 'achievement_challenge'
  meta JSONB, -- For extra data like streak days, challenge info, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create Policy: Everyone can view posts
CREATE POLICY "Public posts are viewable by everyone" ON public.posts
  FOR SELECT USING (true);

-- Create Policy: Authenticated users can create posts
CREATE POLICY "Users can create their own posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Policy: Users can update their own posts (e.g. likes - technically likes should be a separate table but for simplicity we might update the counter here or use a function)
-- For now, let's keep it simple. Real 'likes' usually require a separate table `post_likes` to prevent double-liking.
-- But to follow the current simple structure, we might need a function to increment likes safely.
-- Let's just allow users to update their own posts for now.
CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Storage for Feed Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('feed_images', 'feed_images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Everyone can view images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'feed_images');

-- Storage Policy: Users can upload images
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'feed_images' AND auth.role() = 'authenticated');
