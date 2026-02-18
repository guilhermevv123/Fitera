import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BottomNav } from './components/BottomNav';
import { ChallengesView } from './views/ChallengesView';
import { FeedView } from './views/FeedView';
import { StoreView } from './views/StoreView';
import { ProfileView } from './views/ProfileView';
import { WorkoutsView } from './views/WorkoutsView';
import { WorkoutBuilderView } from './views/WorkoutBuilderView';
import { OnboardingView } from './views/OnboardingView';
import { AIWorkoutGeneratorView } from './views/AIWorkoutGeneratorView';
import { RunningSessionView } from './views/RunningSessionView';
import { AuthView } from './views/AuthView';

const AppContent: React.FC = () => {
  const location = useLocation();
  // Hide BottomNav on specific full-screen flows
  const hideNavPaths = [
    '/auth',
    '/workouts/new', 
    '/onboarding', 
    '/workouts/ai-generator',
    '/workouts/running'
  ];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-2xl relative min-h-screen overflow-hidden">
        <Routes>
          {/* Default to Auth */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          
          <Route path="/auth" element={<AuthView />} />
          <Route path="/onboarding" element={<OnboardingView />} />
          <Route path="/challenges" element={<ChallengesView />} />
          <Route path="/feed" element={<FeedView />} />
          <Route path="/store" element={<StoreView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/workouts" element={<WorkoutsView />} />
          <Route path="/workouts/new" element={<WorkoutBuilderView />} />
          <Route path="/workouts/ai-generator" element={<AIWorkoutGeneratorView />} />
          <Route path="/workouts/running" element={<RunningSessionView />} />
        </Routes>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;