import type { User, Challenge, Post, Product, Team, WorkoutRoutine } from '~/types';
import { getPhaseInfo } from '~/utils/levelsSystem';

const initialLevel = getPhaseInfo(1);

export const MOCK_USER: User = {
  id: 'eab0e293-627a-4898-8676-54d6374a0e41', // Synced with auth.users for testing
  name: "Alex Treinos",
  city: "São Paulo",
  xp: 0,
  level: initialLevel.level,
  levelName: initialLevel.name,
  maxLevelXp: 10, // 10 missions per phase
  streak: 0,
  coins: 450,
  avatar: "https://picsum.photos/id/64/200/200",
  joinedDate: "Janeiro 2024",
  badges: [
    { id: '1', icon: '☀️', name: 'Madrugador', color: 'bg-yellow-100 text-yellow-700' },
    { id: '2', icon: '⚔️', name: 'Guerreiro 7 Dias', color: 'bg-red-100 text-red-700' },
  ]
};

export const MOCK_CHALLENGES: Challenge[] = [
  { 
    id: 'bp1', 
    title: 'Postura Fundamental', 
    duration: 5, 
    category: 'strength', 
    xp: 50, 
    state: 'completed', 
    position: 'center', 
    icon: 'accessibility_new',
    description: 'Aprenda a base de todos os movimentos.',
    theory: {
      title: 'A Coluna Neutra',
      content: 'Manter a coluna em posição neutra é crucial para evitar lesões. Imagine uma linha reta do topo da cabeça até o cóccix. Ative o core puxando o umbigo levemente para dentro.',
      videoUrl: 'https://example.com/video1'
    },
    exercises: [
      { id: 'bp1e1', name: 'Gato-Camelo', muscle: 'Core', type: 'flexibility', icon: 'self_improvement', sets: 2, reps: 10 }
    ]
  },
  { 
    id: 'bp2', 
    title: 'Respiração no Treino', 
    duration: 5, 
    category: 'mindfulness', 
    xp: 50, 
    state: 'current', 
    position: 'right', 
    icon: 'air',
    description: 'Respire certo para treinar melhor.',
    theory: {
      title: 'Soltando o Ar no Esforço',
      content: 'A regra geral é: expire (solte o ar) durante a fase positiva (quando você faz mais força, ex: subir no agachamento) e inspire na descida.',
      videoUrl: 'https://example.com/video2'
    }
  },
  { 
    id: 'bp3', 
    title: 'Hidratação Estratégica', 
    duration: 5, 
    category: 'mindfulness', 
    xp: 50, 
    state: 'locked', 
    position: 'right', 
    icon: 'water_drop',
    description: 'Água é o seu combustível número 1.',
    theory: {
      title: 'Beber antes da Sede',
      content: 'A sede já é um sinal de desidratação leve. Beba pequenas doses de água a cada 15-20 minutos de atividade intensa.',
    }
  },
  { 
    id: 'bp4', title: 'Bônus: Recompensa', duration: 0, category: 'mindfulness', xp: 0, state: 'locked', position: 'center', icon: 'inventory_2' 
  },
  { 
    id: 'bp5', 
    title: 'Aquecimento Ativo', 
    duration: 8, 
    category: 'cardio', 
    xp: 80, 
    state: 'locked', 
    position: 'left', 
    icon: 'fireplace',
    theory: {
      title: 'Por que não Estático?',
      content: 'Alongamentos estáticos antes do treino podem reduzir a força. Prefira movimentos dinâmicos que simulem o exercício que você vai fazer.',
    },
    exercises: [
      { id: 'bp5e1', name: 'Polichinelos', muscle: 'Full Body', type: 'cardio', icon: 'directions_run', duration: 60 },
      { id: 'bp5e2', name: 'Rotação de Braços', muscle: 'Ombros', type: 'flexibility', icon: 'self_improvement', sets: 2, reps: 15 }
    ]
  },
  { 
    id: 'bp6', 
    title: 'Amplitude de Movimento', 
    duration: 10, 
    category: 'strength', 
    xp: 100, 
    state: 'locked', 
    position: 'center', 
    icon: 'aspect_ratio',
    theory: {
      title: 'Qualidade > Peso',
      content: 'É melhor fazer 5 repetições com a amplitude completa do que 15 repetições "curtas". Isso recruta mais fibras musculares e protege as articulações.',
    }
  },
  { 
    id: 'bp7', 
    title: 'Descanso Necessário', 
    duration: 5, 
    category: 'mindfulness', 
    xp: 50, 
    state: 'locked', 
    position: 'right', 
    icon: 'bedtime',
    theory: {
      title: 'O Músculo Cresce no Sono',
      content: 'O treino agride as fibras, o descanso as reconstrói. Sem pelo menos 7-8h de sono, seus resultados serão limitados.',
    }
  },
  { 
    id: 'bp8', 
    title: 'Conexão Mente-Músculo', 
    duration: 12, 
    category: 'strength', 
    xp: 120, 
    state: 'locked', 
    position: 'center', 
    icon: 'psychology',
    theory: {
      title: 'Sinta o Músculo Trabalhar',
      content: 'Foque sua atenção visual e mental no grupo muscular alvo durante a contração. Isso aumenta a ativação eletromiográfica do músculo.',
    }
  },
  { 
    id: 'bp9', 
    title: 'Progressão de Carga', 
    duration: 15, 
    category: 'strength', 
    xp: 150, 
    state: 'locked', 
    position: 'left', 
    icon: 'trending_up',
    theory: {
      title: 'Sobrecarga Progressiva',
      content: 'Para evoluir, você precisa aumentar o estímulo. Pode ser mais peso, mais repetições, menos descanso ou melhor técnica.',
    }
  },
  { 
    id: 'bp10', 
    title: 'Consistência vs. Perfeição', 
    duration: 10, 
    category: 'mindfulness', 
    xp: 200, 
    state: 'locked', 
    position: 'center', 
    icon: 'military_tech',
    theory: {
      title: 'O Plano que Você Segue',
      content: 'Um treino medíocre feito 4x na semana vence um treino perfeito feito apenas 1x ao mês. A chave do sucesso é a regularidade.',
    }
  }
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
