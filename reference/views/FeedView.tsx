import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const FeedView: React.FC = () => {
  const { posts, likePost } = useApp();
  const [activeTab, setActiveTab] = useState<'my_city' | 'global'>('my_city');

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md px-6 pt-safe-top pb-4 border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-4 pt-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-icons-round text-3xl">bolt</span>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fitera</h1>
          </div>
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-icons-round text-gray-400 text-2xl">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
        </div>

        {/* Segmented Control */}
        <div className="bg-white p-1 rounded-full shadow-sm flex relative border border-gray-100">
          <button 
            onClick={() => setActiveTab('my_city')}
            className={`flex-1 py-2 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-1 ${activeTab === 'my_city' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <span className="material-icons-round text-base">location_on</span>
            Minha Cidade
          </button>
          <button 
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-1 ${activeTab === 'global' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <span className="material-icons-round text-base">public</span>
            Global
          </button>
        </div>
      </header>

      {/* Podium / Leaderboard Teaser */}
      <div className="pt-6 pb-8 px-6 bg-gradient-to-b from-primary/5 to-transparent mb-2">
        <div className="flex justify-center items-end gap-4 text-center h-44">
           {/* Rank 2 */}
           <div className="flex flex-col items-center mb-4 w-1/3">
              <div className="relative mb-2">
                <img src="https://picsum.photos/id/64/150/150" alt="Rank 2" className="w-14 h-14 rounded-full border-4 border-white object-cover shadow-md" />
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">2</span>
                </div>
              </div>
              <p className="font-bold text-gray-800 text-sm truncate w-full">Sarah M.</p>
              <p className="text-xs text-primary font-semibold">11,200 XP</p>
           </div>
           
           {/* Rank 1 */}
           <div className="flex flex-col items-center w-1/3 z-10 scale-110 origin-bottom">
              <div className="relative mb-2">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce">
                   <span className="material-icons-round text-3xl">emoji_events</span>
                </div>
                <img src="https://picsum.photos/id/91/150/150" alt="Rank 1" className="w-16 h-16 rounded-full border-4 border-primary object-cover shadow-lg shadow-primary/20" />
                <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm">1</span>
                </div>
              </div>
              <p className="font-bold text-gray-900 mt-1">Lucas</p>
              <p className="text-sm text-primary font-bold">12,400 XP</p>
           </div>

           {/* Rank 3 */}
           <div className="flex flex-col items-center mb-4 w-1/3">
              <div className="relative mb-2">
                <img src="https://picsum.photos/id/177/150/150" alt="Rank 3" className="w-14 h-14 rounded-full border-4 border-white object-cover shadow-md" />
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">3</span>
                </div>
              </div>
              <p className="font-bold text-gray-800 text-sm truncate w-full">Mike T.</p>
              <p className="text-xs text-primary font-semibold">10,800 XP</p>
           </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="px-5 space-y-4">
        {posts.map(post => (
          <div key={post.id} className={`bg-white rounded-2xl p-4 shadow-card ${post.type === 'achievement_streak' ? 'border-l-4 border-primary' : ''}`}>
            {post.type === 'achievement_streak' && (
              <div className="flex gap-4 items-start">
                 <div className="bg-orange-100 p-2.5 rounded-full shrink-0 text-primary">
                    <span className="material-icons-round text-2xl">local_fire_department</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <p className="text-gray-800 text-sm leading-relaxed">
                          <span className="font-bold text-gray-900">{post.user.name}</span> atingiu uma ofensiva de <span className="text-primary font-bold">{post.meta?.streak} dias!</span> 🔥 Mantenha o ritmo!
                       </p>
                       <span className="text-xs text-gray-400">{post.createdAt}</span>
                    </div>
                    <div className="mt-3">
                       <button className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition">
                          <span className="material-icons-round text-sm">celebration</span>
                          Comemorar
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {post.type === 'achievement_challenge' && (
               <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-2.5 rounded-full shrink-0 text-blue-600">
                     <span className="material-icons-round text-2xl">emoji_events</span>
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <p className="text-gray-800 text-sm leading-relaxed">
                           <span className="font-bold text-gray-900">{post.user.name}</span> {post.text}
                        </p>
                        <span className="text-xs text-gray-400">{post.createdAt}</span>
                     </div>
                     <div className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">
                        +{post.meta?.xp} XP
                     </div>
                     <div className="mt-3 flex items-center gap-4">
                        <button 
                          onClick={() => likePost(post.id)}
                          className="group flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                        >
                           <span className={`material-icons-round text-lg ${post.likes > 0 ? 'text-primary' : ''}`}>favorite_border</span>
                           <span className="text-xs font-medium">{post.likes}</span>
                        </button>
                        <button className="group flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
                           <span className="material-icons-round text-lg">chat_bubble_outline</span>
                           <span className="text-xs font-medium">{post.comments}</span>
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {post.type === 'user_post' && (
              <div>
                 <div className="flex items-center gap-3 mb-3">
                    <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-gray-900">{post.user.name}</h3>
                       <p className="text-xs text-gray-400">{post.city} • {post.createdAt} atrás</p>
                    </div>
                    <button className="text-gray-300">
                       <span className="material-icons-round">more_horiz</span>
                    </button>
                 </div>
                 <p className="text-gray-700 text-sm mb-3 leading-relaxed">{post.text}</p>
                 {post.image && (
                    <div className="rounded-xl overflow-hidden mb-4 relative h-48 bg-gray-200">
                       <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                       {post.meta?.distance && (
                         <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <span className="material-icons-round text-xs">directions_run</span> {post.meta.distance}
                         </div>
                       )}
                    </div>
                 )}
                 <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex gap-6">
                       <button onClick={() => likePost(post.id)} className="group flex items-center gap-1.5 text-gray-400 hover:text-primary">
                          <span className={`material-icons-round text-xl ${post.likes > 0 ? 'text-primary' : ''}`}>
                             {post.likes > 0 ? 'favorite' : 'favorite_border'}
                          </span>
                          <span className="text-xs font-semibold">{post.likes}</span>
                       </button>
                       <button className="group flex items-center gap-1.5 text-gray-400 hover:text-gray-600">
                          <span className="material-icons-round text-xl">chat_bubble_outline</span>
                          <span className="text-xs font-medium">{post.comments}</span>
                       </button>
                    </div>
                    <button className="text-gray-400 hover:text-primary">
                       <span className="material-icons-round text-xl">share</span>
                    </button>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 transition-transform z-30">
         <span className="material-icons-round text-2xl">add</span>
      </button>
    </div>
  );
};