import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Challenge, Post } from '../types';
import { MOCK_USER, MOCK_CHALLENGES, MOCK_POSTS } from '../data/mock';

interface AppContextType {
  user: User;
  challenges: Challenge[];
  posts: Post[];
  completeChallenge: (id: string) => void;
  likePost: (id: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const completeChallenge = (id: string) => {
    // 1. Update challenge state
    let xpGained = 0;
    const updatedChallenges = challenges.map(c => {
      if (c.id === id && c.state === 'current') {
        xpGained = c.xp;
        return { ...c, state: 'completed' as const };
      }
      return c;
    });

    // Unlock next challenge logic (simple sequential unlock for mock)
    const currentIndex = updatedChallenges.findIndex(c => c.id === id);
    if (currentIndex >= 0 && currentIndex < updatedChallenges.length - 1) {
       // If next one is locked, unlock it
       if (updatedChallenges[currentIndex + 1].state === 'locked') {
         updatedChallenges[currentIndex + 1].state = 'current';
       }
    }

    setChallenges(updatedChallenges);

    // 2. Add XP and Coins to user
    if (xpGained > 0) {
      setUser(prev => ({
        ...prev,
        xp: Math.min(prev.xp + xpGained, prev.maxLevelXp), // Cap for demo
        coins: prev.coins + Math.floor(xpGained / 2)
      }));
    }
  };

  const likePost = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <AppContext.Provider value={{ user, challenges, posts, completeChallenge, likePost, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};