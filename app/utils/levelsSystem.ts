/**
 * Sistema de Níveis vinculado às Fases
 *
 * Nível = número da fase que o usuário está ou completou.
 * Completar Fase 1 (10/10 missões) = Nível 1 completo → avança para Nível/Fase 2.
 * Limite: Nível 100 (= Fase 100 completa).
 */

export interface LevelInfo {
  level: number;
  name: string;
  title: string;   // Título da fase correspondente
  icon: string;     // Ícone da fase
  gradient: string; // Gradiente da fase
}

// ─── 100 Fases com temas de fitness progressivos ─────────

export const ALL_PHASES: LevelInfo[] = [
  // Bloco 1-10: Fundamentos
  { level: 1,  name: 'Novato',           title: 'O Despertar',              icon: 'wb_sunny',         gradient: 'from-amber-500 to-orange-600' },
  { level: 2,  name: 'Novato II',        title: 'Nutrição Consciente',      icon: 'restaurant',       gradient: 'from-emerald-500 to-teal-600' },
  { level: 3,  name: 'Novato III',       title: 'Cardio Iniciante',         icon: 'favorite',         gradient: 'from-red-500 to-pink-600' },
  { level: 4,  name: 'Iniciante',        title: 'Mente e Corpo',            icon: 'self_improvement',  gradient: 'from-indigo-500 to-purple-600' },
  { level: 5,  name: 'Iniciante II',     title: 'Força com Peso do Corpo',  icon: 'fitness_center',   gradient: 'from-blue-500 to-cyan-600' },
  { level: 6,  name: 'Iniciante III',    title: 'Flexibilidade Básica',     icon: 'accessibility_new', gradient: 'from-teal-500 to-green-600' },
  { level: 7,  name: 'Aprendiz',         title: 'Sono e Recuperação',       icon: 'bedtime',          gradient: 'from-indigo-600 to-blue-700' },
  { level: 8,  name: 'Aprendiz II',      title: 'Postura e Ergonomia',      icon: 'airline_seat_recline_normal', gradient: 'from-cyan-500 to-blue-600' },
  { level: 9,  name: 'Aprendiz III',     title: 'Respiração Consciente',    icon: 'air',              gradient: 'from-sky-400 to-blue-500' },
  { level: 10, name: 'Praticante',       title: 'Rotina Saudável',          icon: 'schedule',         gradient: 'from-violet-500 to-purple-600' },

  // Bloco 11-20: Progresso
  { level: 11, name: 'Praticante II',    title: 'Corrida Leve',             icon: 'directions_run',   gradient: 'from-orange-500 to-red-500' },
  { level: 12, name: 'Praticante III',   title: 'Equilíbrio Nutricional',   icon: 'eco',              gradient: 'from-green-500 to-emerald-600' },
  { level: 13, name: 'Dedicado',         title: 'Core e Abdominais',        icon: 'sports_martial_arts', gradient: 'from-amber-600 to-orange-700' },
  { level: 14, name: 'Dedicado II',      title: 'Alongamento Avançado',     icon: 'sports_gymnastics', gradient: 'from-pink-500 to-rose-600' },
  { level: 15, name: 'Dedicado III',     title: 'Resistência Cardiovascular', icon: 'monitor_heart', gradient: 'from-red-600 to-rose-700' },
  { level: 16, name: 'Focado',           title: 'Força de Membros Inferiores', icon: 'hiking',        gradient: 'from-stone-500 to-zinc-600' },
  { level: 17, name: 'Focado II',        title: 'Hidratação e Suplementação', icon: 'water_drop',     gradient: 'from-blue-400 to-cyan-500' },
  { level: 18, name: 'Focado III',       title: 'Mobilidade Articular',     icon: 'sync_alt',         gradient: 'from-teal-600 to-cyan-700' },
  { level: 19, name: 'Determinado',      title: 'Treino Funcional',         icon: 'sports',           gradient: 'from-emerald-600 to-green-700' },
  { level: 20, name: 'Guerreiro',        title: 'Mindfulness e Meditação',  icon: 'spa',              gradient: 'from-purple-500 to-violet-600' },

  // Bloco 21-30: Intermediário
  { level: 21, name: 'Guerreiro II',     title: 'HIIT Básico',              icon: 'bolt',             gradient: 'from-yellow-500 to-amber-600' },
  { level: 22, name: 'Guerreiro III',    title: 'Macro e Micronutrientes',  icon: 'science',          gradient: 'from-lime-500 to-green-600' },
  { level: 23, name: 'Guerreiro IV',     title: 'Força de Membros Superiores', icon: 'sports_handball', gradient: 'from-blue-600 to-indigo-700' },
  { level: 24, name: 'Guerreiro V',      title: 'Saúde Digestiva',          icon: 'gastroenterology', gradient: 'from-orange-400 to-amber-500' },
  { level: 25, name: 'Atleta',           title: 'Circuitos de Treino',      icon: 'loop',             gradient: 'from-red-500 to-orange-600' },
  { level: 26, name: 'Atleta II',        title: 'Nutrição Pré e Pós-Treino', icon: 'lunch_dining',    gradient: 'from-green-600 to-teal-700' },
  { level: 27, name: 'Atleta III',       title: 'Agilidade e Coordenação',  icon: 'sports_soccer',    gradient: 'from-emerald-500 to-cyan-600' },
  { level: 28, name: 'Atleta IV',        title: 'Gerenciamento de Estresse', icon: 'psychology',       gradient: 'from-violet-600 to-purple-700' },
  { level: 29, name: 'Atleta V',         title: 'Corrida Intermediária',    icon: 'directions_run',   gradient: 'from-sky-500 to-blue-600' },
  { level: 30, name: 'Veterano',         title: 'Construção Muscular',      icon: 'fitness_center',   gradient: 'from-slate-500 to-gray-600' },

  // Bloco 31-40: Avançado
  { level: 31, name: 'Veterano II',      title: 'Periodização do Treino',   icon: 'event_repeat',     gradient: 'from-indigo-500 to-blue-600' },
  { level: 32, name: 'Veterano III',     title: 'Alimentação Anti-inflamatória', icon: 'local_fire_department', gradient: 'from-orange-600 to-red-700' },
  { level: 33, name: 'Veterano IV',      title: 'Pliometria',               icon: 'rocket_launch',    gradient: 'from-purple-600 to-indigo-700' },
  { level: 34, name: 'Veterano V',       title: 'Saúde Hormonal',           icon: 'biotech',          gradient: 'from-teal-500 to-emerald-600' },
  { level: 35, name: 'Elite',            title: 'CrossFit Básico',          icon: 'sports_gymnastics', gradient: 'from-red-600 to-rose-700' },
  { level: 36, name: 'Elite II',         title: 'Dieta Flexível',           icon: 'balance',          gradient: 'from-amber-500 to-yellow-600' },
  { level: 37, name: 'Elite III',        title: 'Potência Explosiva',       icon: 'electric_bolt',    gradient: 'from-yellow-500 to-orange-600' },
  { level: 38, name: 'Elite IV',         title: 'Sono Otimizado',           icon: 'dark_mode',        gradient: 'from-indigo-700 to-slate-800' },
  { level: 39, name: 'Elite V',          title: 'Treino de Resistência',    icon: 'timer',            gradient: 'from-cyan-600 to-blue-700' },
  { level: 40, name: 'Mestre',           title: 'Composição Corporal',      icon: 'monitoring',       gradient: 'from-emerald-600 to-green-700' },

  // Bloco 41-50: Expert
  { level: 41, name: 'Mestre II',        title: 'HIIT Avançado',            icon: 'whatshot',         gradient: 'from-red-500 to-amber-600' },
  { level: 42, name: 'Mestre III',       title: 'Ciclismo e Mobilidade',    icon: 'pedal_bike',       gradient: 'from-lime-500 to-emerald-600' },
  { level: 43, name: 'Mestre IV',        title: 'Estratégias Nutricionais', icon: 'menu_book',        gradient: 'from-blue-500 to-violet-600' },
  { level: 44, name: 'Mestre V',         title: 'Força Máxima',             icon: 'fitness_center',   gradient: 'from-gray-600 to-zinc-700' },
  { level: 45, name: 'Grão-Mestre',      title: 'Yoga e Pilates',           icon: 'self_improvement',  gradient: 'from-purple-400 to-pink-500' },
  { level: 46, name: 'Grão-Mestre II',   title: 'Biohacking Básico',        icon: 'memory',           gradient: 'from-cyan-500 to-teal-600' },
  { level: 47, name: 'Grão-Mestre III',  title: 'Natação e Aquático',       icon: 'pool',             gradient: 'from-blue-400 to-cyan-500' },
  { level: 48, name: 'Grão-Mestre IV',   title: 'Prevenção de Lesões',      icon: 'health_and_safety', gradient: 'from-green-500 to-emerald-600' },
  { level: 49, name: 'Grão-Mestre V',    title: 'Treino em Dupla',          icon: 'group',            gradient: 'from-orange-500 to-amber-600' },
  { level: 50, name: 'Campeão',          title: 'Maratona de Saúde',        icon: 'emoji_events',     gradient: 'from-yellow-400 to-amber-500' },

  // Bloco 51-60: Lenda
  { level: 51, name: 'Campeão II',       title: 'Levantamento Olímpico',    icon: 'fitness_center',   gradient: 'from-slate-600 to-gray-700' },
  { level: 52, name: 'Campeão III',      title: 'Dieta Cetogênica',         icon: 'egg_alt',          gradient: 'from-amber-600 to-orange-700' },
  { level: 53, name: 'Campeão IV',       title: 'Calistenia Avançada',      icon: 'sports_gymnastics', gradient: 'from-indigo-500 to-violet-600' },
  { level: 54, name: 'Campeão V',        title: 'Longevidade',              icon: 'elderly',          gradient: 'from-teal-600 to-green-700' },
  { level: 55, name: 'Herói',            title: 'Artes Marciais',           icon: 'sports_martial_arts', gradient: 'from-red-700 to-rose-800' },
  { level: 56, name: 'Herói II',         title: 'Jejum Intermitente',       icon: 'hourglass_empty',  gradient: 'from-purple-600 to-indigo-700' },
  { level: 57, name: 'Herói III',        title: 'Esportes ao Ar Livre',     icon: 'landscape',        gradient: 'from-green-500 to-lime-600' },
  { level: 58, name: 'Herói IV',         title: 'Saúde Mental',             icon: 'psychology_alt',   gradient: 'from-blue-600 to-purple-700' },
  { level: 59, name: 'Herói V',          title: 'Sprint e Velocidade',      icon: 'speed',            gradient: 'from-orange-600 to-red-700' },
  { level: 60, name: 'Lenda',            title: 'Powerlifting',             icon: 'fitness_center',   gradient: 'from-zinc-600 to-stone-700' },

  // Bloco 61-70: Mítico
  { level: 61, name: 'Lenda II',         title: 'Nutrigenômica',            icon: 'genetics',         gradient: 'from-emerald-600 to-teal-700' },
  { level: 62, name: 'Lenda III',        title: 'Treino de Montanha',       icon: 'terrain',          gradient: 'from-stone-600 to-gray-700' },
  { level: 63, name: 'Lenda IV',         title: 'Recovery Science',         icon: 'healing',          gradient: 'from-blue-500 to-cyan-600' },
  { level: 64, name: 'Lenda V',          title: 'Esporte Competitivo',      icon: 'military_tech',    gradient: 'from-yellow-500 to-amber-600' },
  { level: 65, name: 'Titã',             title: 'Treinamento Mental',       icon: 'psychology',       gradient: 'from-violet-600 to-purple-700' },
  { level: 66, name: 'Titã II',          title: 'Dieta Plant-Based',        icon: 'eco',              gradient: 'from-green-500 to-lime-600' },
  { level: 67, name: 'Titã III',         title: 'OCR e Obstáculos',         icon: 'castle',           gradient: 'from-amber-600 to-orange-700' },
  { level: 68, name: 'Titã IV',          title: 'Crioterapia e Calor',      icon: 'ac_unit',          gradient: 'from-sky-400 to-blue-500' },
  { level: 69, name: 'Titã V',           title: 'Ultra-Resistência',        icon: 'all_inclusive',    gradient: 'from-red-600 to-orange-700' },
  { level: 70, name: 'Semideus',         title: 'Fisiologia do Exercício',  icon: 'biotech',          gradient: 'from-indigo-600 to-blue-700' },

  // Bloco 71-80: Divino
  { level: 71, name: 'Semideus II',      title: 'Treino em Altitude',       icon: 'flight',           gradient: 'from-sky-600 to-indigo-700' },
  { level: 72, name: 'Semideus III',     title: 'Biomecânica',              icon: 'precision_manufacturing', gradient: 'from-teal-500 to-cyan-600' },
  { level: 73, name: 'Semideus IV',      title: 'Performance Cognitiva',    icon: 'neurology',        gradient: 'from-purple-500 to-violet-600' },
  { level: 74, name: 'Semideus V',       title: 'Iron Man Training',        icon: 'sports_score',     gradient: 'from-red-600 to-rose-700' },
  { level: 75, name: 'Imortal',          title: 'Hacking do Corpo',         icon: 'build',            gradient: 'from-cyan-600 to-blue-700' },
  { level: 76, name: 'Imortal II',       title: 'Nutrição de Elite',        icon: 'restaurant_menu',  gradient: 'from-emerald-600 to-green-700' },
  { level: 77, name: 'Imortal III',      title: 'Treino Isométrico',        icon: 'square',           gradient: 'from-orange-500 to-amber-600' },
  { level: 78, name: 'Imortal IV',       title: 'Saúde Circadiana',         icon: 'light_mode',       gradient: 'from-yellow-400 to-orange-500' },
  { level: 79, name: 'Imortal V',        title: 'Desafio Ultra-Maratona',   icon: 'route',            gradient: 'from-blue-700 to-indigo-800' },
  { level: 80, name: 'Divino',           title: 'Periodização Ondulante',   icon: 'waves',            gradient: 'from-violet-500 to-indigo-600' },

  // Bloco 81-90: Celestial
  { level: 81, name: 'Divino II',        title: 'Treino Excêntrico',        icon: 'trending_down',    gradient: 'from-red-500 to-pink-600' },
  { level: 82, name: 'Divino III',       title: 'Microbioma e Saúde',       icon: 'coronavirus',      gradient: 'from-green-600 to-teal-700' },
  { level: 83, name: 'Divino IV',        title: 'Treino de Grip',           icon: 'back_hand',        gradient: 'from-stone-500 to-zinc-600' },
  { level: 84, name: 'Divino V',         title: 'Programação Neurolinguística', icon: 'hub',          gradient: 'from-purple-600 to-violet-700' },
  { level: 85, name: 'Celestial',        title: 'Decathlon Training',       icon: 'workspace_premium', gradient: 'from-yellow-500 to-amber-600' },
  { level: 86, name: 'Celestial II',     title: 'Anti-Aging Avançado',      icon: 'auto_awesome',     gradient: 'from-pink-500 to-rose-600' },
  { level: 87, name: 'Celestial III',    title: 'Força Dinâmica',           icon: 'dynamic_form',     gradient: 'from-blue-600 to-cyan-700' },
  { level: 88, name: 'Celestial IV',     title: 'Ciência do Sono',          icon: 'nights_stay',      gradient: 'from-indigo-700 to-blue-800' },
  { level: 89, name: 'Celestial V',      title: 'Treino em Circuito Extremo', icon: 'whatshot',       gradient: 'from-orange-600 to-red-700' },
  { level: 90, name: 'Supremo',          title: 'Domínio Nutricional',      icon: 'emoji_food_beverage', gradient: 'from-emerald-500 to-green-600' },

  // Bloco 91-100: Transcendência
  { level: 91, name: 'Supremo II',       title: 'Biomecânica Avançada',     icon: 'precision_manufacturing', gradient: 'from-teal-600 to-cyan-700' },
  { level: 92, name: 'Supremo III',      title: 'Peak Performance',         icon: 'trending_up',      gradient: 'from-red-500 to-orange-600' },
  { level: 93, name: 'Supremo IV',       title: 'Treinamento Militar',      icon: 'military_tech',    gradient: 'from-green-700 to-emerald-800' },
  { level: 94, name: 'Supremo V',        title: 'Saúde Holística',          icon: 'spa',              gradient: 'from-purple-400 to-pink-500' },
  { level: 95, name: 'Transcendente',    title: 'Spartan Training',         icon: 'shield',           gradient: 'from-amber-700 to-orange-800' },
  { level: 96, name: 'Transcendente II', title: 'Genética e Epigenética',   icon: 'genetics',         gradient: 'from-indigo-600 to-purple-700' },
  { level: 97, name: 'Transcendente III', title: 'Treino de Astronauta',    icon: 'rocket',           gradient: 'from-sky-500 to-indigo-600' },
  { level: 98, name: 'Transcendente IV', title: 'Domínio Total do Corpo',   icon: 'accessibility_new', gradient: 'from-violet-600 to-purple-700' },
  { level: 99, name: 'Transcendente V',  title: 'O Caminho Final',          icon: 'temple_buddhist',  gradient: 'from-slate-600 to-gray-700' },
  { level: 100, name: 'Ascendido',       title: 'Ascensão Completa',        icon: 'stars',            gradient: 'from-yellow-400 to-amber-500' },
];

// ─── Funções auxiliares ───────────────────────────────────

/** Retorna info do nível/fase dado o número */
export function getPhaseInfo(phaseId: number): LevelInfo {
  return ALL_PHASES.find(p => p.level === phaseId) || ALL_PHASES[0];
}

/** Calcula o nível do usuário baseado nas fases completas */
export function getUserLevel(completedPhases: number[]): number {
  // Nível = maior fase completada (10/10 missões)
  if (completedPhases.length === 0) return 1;
  return Math.max(...completedPhases) + 1; // +1 porque está na PRÓXIMA fase
}

/** Retorna a fase OVERVIEW formatada para navegação */
export function getPhasesOverview() {
  return ALL_PHASES.map(p => ({
    id: p.level,
    title: p.title,
    icon: p.icon,
    gradient: p.gradient,
  }));
}

/** XP total máximo teórico (100 fases × 10 missões × ~50 XP médio) */
export const MAX_LEVEL = 100;
