import { User, Challenge, Post, StoreSection, Product, Team, WorkoutRoutine } from '../types';

export const MOCK_USER: User = {
  name: "Alex Treinos",
  city: "São Paulo",
  xp: 450,
  level: 3,
  levelName: "Iniciante Cardio",
  maxLevelXp: 800,
  streak: 12,
  coins: 450,
  avatar: "https://picsum.photos/id/64/200/200",
  joinedDate: "Janeiro 2024",
  badges: [
    { id: '1', icon: '☀️', name: 'Madrugador', color: 'bg-yellow-100 text-yellow-700' },
    { id: '2', icon: '⚔️', name: 'Guerreiro 7 Dias', color: 'bg-red-100 text-red-700' },
  ]
};

export const MOCK_CHALLENGES: Challenge[] = [
  { id: '1', title: 'Aquecimento', duration: 5, category: 'cardio', xp: 50, state: 'completed', position: 'center', icon: 'check' },
  { id: '2', title: 'Explosão Cardio', duration: 10, category: 'cardio', xp: 100, state: 'completed', position: 'right', icon: 'directions_run' },
  { id: '3', title: 'Fluxo Matinal', duration: 15, category: 'flexibility', xp: 150, state: 'current', position: 'right', icon: 'self_improvement' },
  { id: '4', title: 'Baú do Tesouro', duration: 0, category: 'mindfulness', xp: 0, state: 'locked', position: 'center', icon: 'inventory_2' }, // Bonus node
  { id: '5', title: 'Poder do Core', duration: 12, category: 'strength', xp: 120, state: 'locked', position: 'left', icon: 'fitness_center' },
  { id: '6', title: 'Dia de Perna', duration: 20, category: 'strength', xp: 200, state: 'locked', position: 'center', icon: 'lock' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: { name: 'Lucas', avatar: 'https://picsum.photos/id/91/100/100' },
    type: 'achievement_streak',
    text: 'atingiu uma ofensiva de 7 dias! 🔥 Mantenha o ritmo!',
    createdAt: '2m',
    likes: 0,
    comments: 0,
    meta: { streak: 7 }
  },
  {
    id: '2',
    user: { name: 'Maria', avatar: 'https://picsum.photos/id/129/100/100' },
    type: 'achievement_challenge',
    text: 'detonou no desafio "Queima Total".',
    createdAt: '15m',
    likes: 24,
    comments: 3,
    meta: { xp: 500 }
  },
  {
    id: '3',
    user: { name: 'Bruno Silva', avatar: 'https://picsum.photos/id/177/100/100' },
    city: 'Rio de Janeiro',
    type: 'user_post',
    text: 'Acabei de terminar minha corrida matinal. O nascer do sol estava incrível hoje! Bater meu recorde pessoal nos 5k foi ótimo 💪',
    image: 'https://picsum.photos/id/29/600/300',
    createdAt: '2h',
    likes: 12,
    comments: 2,
    meta: { distance: '5.2 km' }
  },
  {
    id: '4',
    user: { name: 'Jéssica Lima', avatar: 'https://picsum.photos/id/338/100/100' },
    city: 'São Paulo',
    type: 'user_post',
    text: 'Alguém anima uma sessão de yoga em grupo neste fim de semana no Parque Ibirapuera? Procurando mais 2 pessoas! 🧘‍♀️',
    createdAt: '5h',
    likes: 8,
    comments: 5
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // Services
  {
    id: 's1',
    title: 'Consultoria Online Pro',
    brand: 'Coach Marcos',
    price: 199.90,
    priceCoins: 4000,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    category: 'Serviços'
  },
  {
    id: 's2',
    title: 'Plano Nutricional 30 Dias',
    brand: 'Nutri Julia',
    price: 89.90,
    priceCoins: 1800,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
    category: 'Serviços'
  },
  // Supplements
  {
    id: '1',
    title: 'Whey Protein Gold',
    brand: 'Optimum Nutrition',
    price: 149.99,
    priceCoins: 3000,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
    discount: 15,
    category: 'Suplementos'
  },
  {
    id: '4',
    title: 'Creatina Pura',
    brand: 'Max Titanium',
    price: 89.90,
    priceCoins: 1800,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=600&auto=format&fit=crop',
    category: 'Suplementos'
  },
  // Clothes
  {
    id: 'c1',
    title: 'Camiseta Tech Dry',
    brand: 'Nike',
    price: 129.90,
    priceCoins: 2500,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
    category: 'Roupas'
  },
  {
    id: 'c2',
    title: 'Top Fitness Alta Sustentação',
    brand: 'Adidas',
    price: 99.90,
    priceCoins: 2000,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop',
    category: 'Roupas'
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'Madrugadores',
    icon: '🌅',
    members: 24,
    weeklyGoalProgress: 85,
    targetXp: 50000,
    colorClass: 'bg-gradient-to-br from-orange-100 to-amber-100'
  },
  {
    id: '2',
    name: 'Levantadores de Peso',
    icon: '🏋️',
    members: 12,
    weeklyGoalProgress: 45,
    targetXp: 30000,
    colorClass: 'bg-gradient-to-br from-slate-100 to-zinc-200'
  },
  {
    id: '3',
    name: 'Reis do Cardio',
    icon: '❤️‍🔥',
    members: 156,
    weeklyGoalProgress: 100,
    targetXp: 100000,
    colorClass: 'bg-gradient-to-br from-rose-100 to-pink-100'
  },
  {
    id: '4',
    name: 'Mestres Zen',
    icon: '🧘',
    members: 8,
    weeklyGoalProgress: 12,
    targetXp: 15000,
    isPrivate: true,
    colorClass: 'bg-gradient-to-br from-indigo-100 to-blue-100'
  }
];

export const MOCK_WORKOUTS: WorkoutRoutine[] = [
  {
    id: '1',
    name: 'Superiores Força',
    exercises: [
      { id: 'e1', name: 'Supino com Halteres', muscle: 'Peito', type: 'strength', icon: 'fitness_center', sets: 3, reps: 12, weight: 20 },
      { id: 'e2', name: 'Flexões', muscle: 'Peito', type: 'strength', icon: 'fitness_center', sets: 3, reps: 15 }
    ]
  },
  {
    id: '2',
    name: 'HIIT Matinal',
    exercises: [
      { id: 'e3', name: 'Joelho Alto', muscle: 'Cardio', type: 'cardio', icon: 'directions_run', duration: 45 },
      { id: 'e4', name: 'Burpees', muscle: 'Cardio', type: 'cardio', icon: 'directions_run', duration: 30 }
    ]
  }
];