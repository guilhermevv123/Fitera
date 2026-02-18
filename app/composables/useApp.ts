import type { User, Challenge, Post, WorkoutRoutine, Exercise } from '~/types';
import { MOCK_USER, MOCK_CHALLENGES, MOCK_POSTS, MOCK_WORKOUTS } from '~/utils/mockData';
import { getPhaseInfo } from '~/utils/levelsSystem';

export const useApp = () => {
  const user = useState<User>('user', () => MOCK_USER);
  const challenges = useState<Challenge[]>('challenges', () => MOCK_CHALLENGES);
  const posts = useState<Post[]>('posts', () => []);
  const workouts = useState<WorkoutRoutine[]>('workouts', () => MOCK_WORKOUTS);
  const suggestedUsers = useState<any[]>('suggestedUsers', () => []);
  const followingIds = useState<string[]>('followingIds', () => []);
  
  const supabase = useSupabaseClient();

  // ─── User Profile ───────────────────────────────────────

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) {
      const totalXp = data.xp ?? user.value.xp;
      // Level is stored in DB, synced from phase completions
      const currentLevel = data.level ?? 1;
      const phaseInfo = getPhaseInfo(currentLevel);
      user.value = {
        ...user.value,
        id: data.id,
        name: data.full_name || user.value.name,
        phone: data.phone || user.value.phone,
        xp: totalXp,
        coins: data.coins ?? user.value.coins,
        level: currentLevel,
        levelName: phaseInfo.name,
        maxLevelXp: 10, // 10 missions per phase
        streak: data.streak ?? user.value.streak,
        avatar: data.avatar_url || user.value.avatar,
        city: data.city || user.value.city,
      };
    }
    return data;
  };

  const updateProfile = async (profileData: {
    full_name?: string;
    avatar_url?: string;
    city?: string;
    phone?: string;
  }) => {
    if (!user.value.id) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update(profileData as any)
      .eq('id', user.value.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }

    // Update local state
    if (profileData.full_name) user.value.name = profileData.full_name;
    if (profileData.avatar_url) user.value.avatar = profileData.avatar_url;
    if (profileData.city) user.value.city = profileData.city;
    if (profileData.phone) user.value.phone = profileData.phone;

    return data;
  };

  // ─── R2 Upload Helper ────────────────────────────────

  const uploadToR2 = async (file: File, folder: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await $fetch<{ success: boolean; url: string }>('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.success && response.url) {
        return response.url;
      }
      console.error('R2 upload failed:', response);
      return null;
    } catch (err) {
      console.error('R2 upload error:', err);
      return null;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user.value.id) return null;
    return await uploadToR2(file, `avatars/${user.value.id}`);
  };

  // ─── Follow System ──────────────────────────────────────

  const fetchFollowing = async () => {
    if (!user.value.id) return;

    const { data, error } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.value.id);

    if (data && !error) {
      followingIds.value = data.map((f: any) => f.following_id);
    }
  };

  const followUser = async (targetUserId: string) => {
    if (!user.value.id) return false;

    const { error } = await supabase
      .from('follows')
      .insert({ follower_id: user.value.id, following_id: targetUserId } as any);

    if (error) {
      console.error('Error following user:', error);
      return false;
    }

    // Update local state
    followingIds.value = [...followingIds.value, targetUserId];
    // Remove from suggested
    suggestedUsers.value = suggestedUsers.value.filter(u => u.id !== targetUserId);
    return true;
  };

  const unfollowUser = async (targetUserId: string) => {
    if (!user.value.id) return false;

    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.value.id)
      .eq('following_id', targetUserId);

    if (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }

    followingIds.value = followingIds.value.filter(id => id !== targetUserId);
    return true;
  };

  const fetchSuggestedUsers = async () => {
    if (!user.value.id) return;

    // Get users from same city that current user is NOT following
    const { data: allProfiles, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, city')
      .neq('id', user.value.id)
      .limit(20);

    if (error || !allProfiles) {
      console.error('Error fetching suggested users:', error);
      return;
    }

    // Filter: same city first, then others, exclude already following
    await fetchFollowing();

    const filtered = allProfiles
      .filter((p: any) => !followingIds.value.includes(p.id))
      .filter((p: any) => p.full_name) // only show users with a name
      .sort((a: any, b: any) => {
        // Same city first
        const aCity = a.city?.toLowerCase() === user.value.city?.toLowerCase();
        const bCity = b.city?.toLowerCase() === user.value.city?.toLowerCase();
        if (aCity && !bCity) return -1;
        if (!aCity && bCity) return 1;
        return 0;
      });

    suggestedUsers.value = filtered.slice(0, 10);
  };

  // ─── Workouts ───────────────────────────────────────────

  const fetchWorkouts = async () => {
    if (!user.value.id) return;
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      workouts.value = data.map(w => ({
        id: w.id,
        name: w.name,
        assignedBy: w.assigned_by as any,
        isCompleted: w.is_completed,
        exercises: w.exercises
      }));
    }
  };

  const saveWorkout = async (workout: Omit<WorkoutRoutine, 'id'> & { id?: string }) => {
    if (!user.value.id) return;
    
    const workoutData = {
      user_id: user.value.id,
      name: workout.name,
      assigned_by: workout.assignedBy || 'user',
      is_completed: workout.isCompleted || false,
      exercises: workout.exercises
    };

    let result;
    if (workout.id) {
      result = await (supabase
        .from('workouts')
        .update(workoutData as any)
        .eq('id', workout.id)
        .select()
        .single() as any);
    } else {
      result = await (supabase
        .from('workouts')
        .insert(workoutData as any)
        .select()
        .single() as any);
    }

    if (result.data && !result.error) {
       await fetchWorkouts();
       return result.data.id;
    }
    return null;
  };

  const deleteWorkout = async (id: string) => {
    if (!user.value.id) return;
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);
    
    if (!error) {
      workouts.value = workouts.value.filter(w => w.id !== id);
    }
  };

  // ─── Auth State Change ──────────────────────────────────

  if (process.client) {
    onMounted(() => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          user.value = {
            ...user.value,
            id: session.user.id,
            name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email || '',
            avatar: session.user.user_metadata.avatar_url || user.value.avatar,
          };
          
          await fetchUserProfile(session.user.id);
          await fetchWorkouts();
          await fetchFollowing();
        } else if (event === 'SIGNED_OUT') {
          user.value = MOCK_USER;
          workouts.value = MOCK_WORKOUTS;
          followingIds.value = [];
          suggestedUsers.value = [];
        }
      });
    });
  }

  // ─── Challenges ─────────────────────────────────────────

  const completeChallenge = async (id: string) => {
    let xpGained = 0;
    const updatedChallenges = challenges.value.map(c => {
      if (c.id === id && c.state === 'current') {
        xpGained = c.xp;
        return { ...c, state: 'completed' as const };
      }
      return c;
    });

    const currentIndex = updatedChallenges.findIndex(c => c.id === id);
    if (currentIndex >= 0 && currentIndex < updatedChallenges.length - 1) {
       if (updatedChallenges[currentIndex + 1].state === 'locked') {
         updatedChallenges[currentIndex + 1].state = 'current';
       }
    }

    challenges.value = updatedChallenges;

    if (xpGained > 0 && user.value.id) {
      const newXp = Math.min(user.value.xp + xpGained, user.value.maxLevelXp);
      const newCoins = user.value.coins + Math.floor(xpGained / 2);

      user.value = {
        ...user.value,
        xp: newXp,
        coins: newCoins
      };

      await (supabase
        .from('profiles')
        .update({ xp: newXp, coins: newCoins } as any)
        .eq('id', user.value.id) as any);
    }
  };

  // ─── Posts & Feed ───────────────────────────────────────

  const fetchPosts = async (filter?: 'my_city' | 'global') => {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by city if "my_city" tab
    if (filter === 'my_city' && user.value.city) {
      query = query.eq('city', user.value.city);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    const postsData = data as any[];
    if (!postsData) return;

    // Get unique user IDs to fetch profiles
    const userIds = [...new Set(postsData.map(p => p.user_id))];

    let profilesData: any[] = [];
    if (userIds.length > 0) {
      try {
        const { data: profilesDataResult, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, city')
          .in('id', userIds);

        if (!profilesError && profilesDataResult) {
          profilesData = profilesDataResult;
        }
      } catch (err) {
        console.error('Exception fetching profiles:', err);
      }
    }
    
    const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

    const mappedPosts = postsData.map(p => {
      const profile = profilesMap.get(p.user_id);
      return {
        id: p.id,
        user_id: p.user_id,
        user: {
          id: p.user_id,
          name: profile?.full_name || 'Usuário',
          avatar: profile?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
          city: profile?.city || p.city || 'Global',
          isCurrentUser: user.value.id === p.user_id,
          xp: 0,
          level: 1
        },
        text: p.text,
        image: p.image_url,
        video: p.video_url || null,
        created_at: p.created_at,
        timeAgo: formatTimeAgo(p.created_at),
        likes: p.likes || 0,
        comments: p.comments || 0,
        type: p.type || 'user_post',
        city: p.city || profile?.city,
        meta: p.meta
      };
    });

    posts.value = mappedPosts;
  };

  const createPost = async (text: string, imageFile: File | null, videoFile?: File | null) => {
    if (!user.value.id) {
      console.error('User ID not found');
      return null;
    }

    let imageUrl = null;
    let videoUrl = null;

    // 1. Upload Image to R2 if exists
    if (imageFile) {
      imageUrl = await uploadToR2(imageFile, `feed/${user.value.id}`);
      if (!imageUrl) {
        console.error('Failed to upload image to R2');
        return null;
      }
    }

    // 2. Upload Video to R2 if exists
    if (videoFile) {
      videoUrl = await uploadToR2(videoFile, `feed/${user.value.id}`);
      if (!videoUrl) {
        console.error('Failed to upload video to R2');
        return null;
      }
    }

    // 3. Insert Post — FIX: add .select().single() to get the created post back
    const newPost = {
      user_id: user.value.id,
      text: text,
      image_url: imageUrl,
      video_url: videoUrl,
      city: user.value.city || 'Global',
      type: 'user_post',
      created_at: new Date().toISOString(),
      likes: 0,
      comments: 0
    };

    const { data, error } = await supabase
      .from('posts')
      .insert(newPost as any)
      .select()
      .single();

    if (error) {
       console.error('Error creating post in DB:', error);
       return null;
    }

    // Refresh feed
    await fetchPosts();
    return data;
  };

  const likePost = async (id: string) => {
    const postIndex = posts.value.findIndex(p => p.id === id);
    if (postIndex === -1) return;

    const currentLikes = posts.value[postIndex].likes;
    posts.value[postIndex].likes++;

    const { error } = await supabase
      .from('posts')
      .update({ likes: currentLikes + 1 } as any)
      .eq('id', id);
    
    if (error) {
      posts.value[postIndex].likes = currentLikes;
      console.error('Error liking post:', error);
    }
  };

  const deletePost = async (id: string) => {
    if (!user.value.id) return false;
    
    const originalPosts = [...posts.value];
    posts.value = posts.value.filter(p => p.id !== id);

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.value.id);

    if (error) {
      posts.value = originalPosts;
      console.error('Error deleting post:', error);
      return false;
    }
    return true;
  };

  // ─── Comments ────────────────────────────────────────────

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    const comments = data as any[];
    if (!comments || comments.length === 0) return [];

    // Fetch profiles for comment authors
    const userIds = [...new Set(comments.map(c => c.user_id))];
    let profilesMap = new Map();
    
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);
      
      if (profiles) {
        profilesMap = new Map(profiles.map((p: any) => [p.id, p]));
      }
    }

    return comments.map(c => {
      const profile = profilesMap.get(c.user_id);
      return {
        id: c.id,
        post_id: c.post_id,
        user_id: c.user_id,
        text: c.text,
        created_at: c.created_at,
        timeAgo: formatTimeAgo(c.created_at),
        user: {
          name: profile?.full_name || 'Usuário',
          avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user_id}`,
        }
      };
    });
  };

  const addComment = async (postId: string, text: string) => {
    if (!user.value.id || !text.trim()) return null;

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.value.id,
        text: text.trim(),
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error adding comment:', error);
      return null;
    }

    // Increment comment count on the post
    const postIndex = posts.value.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts.value[postIndex].comments++;
      await supabase
        .from('posts')
        .update({ comments: posts.value[postIndex].comments } as any)
        .eq('id', postId);
    }

    return data;
  };

  const deleteComment = async (commentId: string, postId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
      return false;
    }

    const postIndex = posts.value.findIndex(p => p.id === postId);
    if (postIndex !== -1 && posts.value[postIndex].comments > 0) {
      posts.value[postIndex].comments--;
      await supabase
        .from('posts')
        .update({ comments: posts.value[postIndex].comments } as any)
        .eq('id', postId);
    }

    return true;
  };
  // ─── Helper ─────────────────────────────────────────────

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'agora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `há ${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `há ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `há ${days}d`;
    return date.toLocaleDateString('pt-BR');
  };

  // ─── Phases & Missions Progress ──────────────────────────

  const userProgress = ref<{ phase_id: number; mission_id: number; completed_at: string }[]>([]);

  const fetchProgress = async () => {
    if (!user.value.id) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('phase_id, mission_id, completed_at')
      .eq('user_id', user.value.id)
      .order('completed_at', { ascending: true });

    if (error) {
      console.error('Error fetching progress:', error);
      return;
    }

    userProgress.value = (data as any[]) || [];
  };

  const completeMission = async (phaseId: number, missionId: number, xpReward: number) => {
    if (!user.value.id) return false;

    // Check if already completed
    const already = userProgress.value.find(
      p => p.phase_id === phaseId && p.mission_id === missionId
    );
    if (already) return true;

    const { error } = await supabase
      .from('user_progress')
      .insert({
        user_id: user.value.id,
        phase_id: phaseId,
        mission_id: missionId,
      } as any);

    if (error) {
      console.error('Error completing mission:', error);
      return false;
    }

    // Update local state
    userProgress.value.push({
      phase_id: phaseId,
      mission_id: missionId,
      completed_at: new Date().toISOString(),
    });

    // Award XP
    user.value.xp += xpReward;

    // Recalculate level = current phase (based on completed phases)
    // Find the highest phase number where all 10 missions are done
    let highestCompleted = 0;
    for (let p = 1; p <= 100; p++) {
      const count = userProgress.value.filter(up => up.phase_id === p).length;
      if (count >= 10) {
        highestCompleted = p;
      } else {
        break; // Sequential: stop at first incomplete phase
      }
    }
    const currentPhase = Math.min(highestCompleted + 1, 100);
    const phaseInfo = getPhaseInfo(currentPhase);
    user.value.level = currentPhase;
    user.value.levelName = phaseInfo.name;
    user.value.maxLevelXp = 10; // 10 missions per phase

    // Update XP and level in profiles
    await supabase
      .from('profiles')
      .update({ xp: user.value.xp, level: currentPhase } as any)
      .eq('id', user.value.id);

    return true;
  };

  const isMissionCompleted = (phaseId: number, missionId: number) => {
    return userProgress.value.some(
      p => p.phase_id === phaseId && p.mission_id === missionId
    );
  };

  const getPhaseProgress = (phaseId: number) => {
    return userProgress.value.filter(p => p.phase_id === phaseId).length;
  };

  return {
    user,
    challenges,
    posts,
    workouts,
    suggestedUsers,
    followingIds,
    userProgress,
    completeChallenge,
    saveWorkout,
    deleteWorkout,
    fetchPosts,
    createPost,
    likePost,
    deletePost,
    fetchComments,
    addComment,
    deleteComment,
    fetchUserProfile,
    updateProfile,
    uploadAvatar,
    followUser,
    unfollowUser,
    fetchSuggestedUsers,
    fetchFollowing,
    fetchWorkouts,
    fetchProgress,
    completeMission,
    isMissionCompleted,
    getPhaseProgress,
  };
};
