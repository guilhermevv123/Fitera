export interface Badge {
  id: string;
  icon: string;
  name: string;
  color: string;
}

export interface User {
  name: string;
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
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isCurrentUser?: boolean;
  };
  city?: string;
  type: 'achievement_streak' | 'achievement_challenge' | 'user_post';
  text: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  meta?: {
    xp?: number;
    streak?: number;
    challengeName?: string;
    distance?: string;
  };
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