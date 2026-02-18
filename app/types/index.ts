export interface Badge {
  id: string;
  icon: string;
  name: string;
  color: string;
}

export interface User {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  city: string;
  xp: number;
  level: number;
  levelName: string;
  maxLevelXp: number;
  streak: number;
  coins: number;
  avatar: string;
  badges: Badge[];
  joinedDate: string;
  fitnessProfile?: {
    modalities: string[];
    experience: string;
    goal: string;
  };
}

export interface Challenge {
  id: string;
  title: string;
  duration: number; // minutes
  category: 'cardio' | 'strength' | 'flexibility' | 'mindfulness';
  xp: number;
  state: 'locked' | 'current' | 'completed';
  position: 'left' | 'center' | 'right';
  icon: string;
  description?: string;
  theory?: {
    title: string;
    content: string;
    videoUrl?: string;
  };
  exercises?: Exercise[];
}

// ─── Phases & Missions ────────────────────────────────────

export type MissionType = 'teoria' | 'pratica' | 'desafio_final';

export interface Mission {
  id: number; // 1-10
  type: MissionType;
  title: string;
  description: string;
  icon: string;
  xp: number;
  /** For teoria missions: the question to answer */
  question?: string;
  /** For teoria missions: 3 quiz options */
  quizOptions?: string[];
  /** For teoria missions: index of the correct answer (0-2) */
  correctAnswer?: number;
  /** For pratica missions: detailed instructions */
  instructions?: string;
  /** For desafio_final: list of sub-tasks */
  subTasks?: string[];
}

export interface Phase {
  id: number; // 1-70
  title: string;
  subtitle: string;
  focus: string;
  icon: string;
  gradient: string; // tailwind gradient classes
  missions: Mission[];
  totalXp: number;
}

export interface UserProgress {
  phase_id: number;
  mission_id: number;
  completed_at: string;
}

export interface Post {
  id: string;
  user_id: string; // Foreign key
  user?: { // Populated via join or separate fetch
    name: string;
    avatar: string;
    isCurrentUser?: boolean;
    city?: string;
  };
  text: string;
  image?: string; // mapped from image_url
  video?: string; // mapped from video_url
  created_at: string;
  timeAgo?: string;
  likes: number;
  comments: number;
  type: 'achievement_streak' | 'achievement_challenge' | 'user_post';
  city?: string; // denormalized or from user
  meta?: {
    xp?: number;
    streak?: number;
    challengeName?: string;
    distance?: string;
    [key: string]: any;
  };
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  brand?: string;
  price: number;
  priceCoins?: number;
  image: string;
  discount?: number;
  category: string;
}

export interface StoreSection {
  title: string;
  products: Product[];
}

export interface Team {
  id: string;
  name: string;
  icon: string;
  members: number;
  weeklyGoalProgress: number; // 0 to 100
  targetXp: number;
  isPrivate?: boolean;
  colorClass: string;
  coachName?: string;
  coachMessage?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  type: 'strength' | 'cardio' | 'flexibility';
  icon: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // seconds
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  exercises: Exercise[];
  assignedBy?: 'user' | 'ai' | 'coach';
  date?: string;
  isCompleted?: boolean;
}
