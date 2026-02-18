<template>
  <div class="bg-gray-50 min-h-screen pb-24">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div class="px-5 pt-safe-top">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span class="material-icons-round text-xl">bolt</span>
            </div>
            <h1 class="text-xl font-black tracking-tight text-gray-900">FITERA</h1>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="toggleNotifications"
              class="relative p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-primary transition-all active:scale-95"
            >
              <span class="material-icons-round text-[22px]">notifications_none</span>
              <span v-if="hasUnread" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        <!-- Segmented Control -->
        <div class="bg-gray-100 p-1 rounded-xl flex mb-3">
          <button 
            @click="switchTab('my_city')"
            class="flex-1 py-2 rounded-lg font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5"
            :class="activeTab === 'my_city' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'"
          >
            <span class="material-icons-round text-sm" :class="activeTab === 'my_city' ? 'text-primary' : ''">location_on</span>
            Minha Cidade
          </button>
          <button 
            @click="switchTab('global')"
            class="flex-1 py-2 rounded-lg font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5"
            :class="activeTab === 'global' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'"
          >
            <span class="material-icons-round text-sm" :class="activeTab === 'global' ? 'text-primary' : ''">public</span>
            Global
          </button>
        </div>
      </div>
    </header>

    <!-- Suggested Users -->
    <div v-if="suggestedUsers.length > 0" class="px-5 pt-4 pb-1">
      <h2 class="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Pessoas para seguir</h2>
      <div class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        <div 
          v-for="sugUser in suggestedUsers" 
          :key="sugUser.id"
          class="shrink-0 bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100/80 w-[130px] flex flex-col items-center text-center gap-2"
        >
          <img :src="sugUser.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${sugUser.full_name}`" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
          <div class="w-full">
            <p class="text-[11px] font-bold text-gray-900 truncate">{{ sugUser.full_name }}</p>
            <p class="text-[9px] text-gray-400 truncate">{{ sugUser.city || 'Global' }}</p>
          </div>
          <button @click="handleFollow(sugUser.id)" class="w-full bg-primary text-white text-[10px] font-bold py-1.5 rounded-lg active:scale-95 transition-all">
            Seguir
          </button>
        </div>
      </div>
    </div>

    <!-- Feed -->
    <div class="px-4 pt-3 space-y-3">
      <!-- Skeleton -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-4 animate-pulse">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            <div class="flex-1"><div class="h-3.5 bg-gray-200 rounded w-28"></div><div class="h-2.5 bg-gray-100 rounded w-20 mt-1.5"></div></div>
          </div>
          <div class="h-3.5 bg-gray-100 rounded w-full mb-2"></div>
          <div class="h-3.5 bg-gray-100 rounded w-4/5"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="posts.length === 0" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center">
          <span class="material-icons-round text-4xl text-gray-300">dynamic_feed</span>
        </div>
        <h3 class="text-gray-700 font-bold text-base mb-1">{{ activeTab === 'my_city' ? 'Nenhum post na sua cidade' : 'Nenhum post ainda' }}</h3>
        <p class="text-gray-400 text-sm max-w-[260px] mx-auto">Seja o primeiro a compartilhar algo com a comunidade!</p>
        <button @click="isCreatingPost = true" class="mt-5 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 inline-flex items-center gap-1.5 active:scale-95">
          <span class="material-icons-round text-lg">add</span> Criar Post
        </button>
      </div>

      <!-- Post Cards -->
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden">
        <!-- Post Header -->
        <div class="flex items-center gap-3 px-4 pt-4 pb-2">
          <img :src="post.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" class="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" />
          <div class="flex-1 min-w-0">
            <h4 class="text-[13px] font-bold text-gray-900 truncate">{{ post.user?.name || 'Usuário' }}</h4>
            <div class="flex items-center gap-1 text-[11px] text-gray-400">
              <span class="material-icons-round text-[11px]">location_on</span>
              <span>{{ post.city || 'Global' }}</span>
              <span class="mx-0.5">•</span>
              <span>{{ post.timeAgo || 'agora' }}</span>
            </div>
          </div>
          <button 
            v-if="user.id === post.user_id" 
            @click="handleDelete(post.id)" 
            class="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-all"
          >
            <span class="material-icons-round text-[18px]">delete_outline</span>
          </button>
        </div>

        <!-- Post Content -->
        <div class="px-4 pb-3">
          <p class="text-[14px] text-gray-800 leading-relaxed whitespace-pre-wrap">{{ post.text }}</p>
        </div>

        <!-- Post Image -->
        <div v-if="post.image" class="relative">
          <img :src="post.image" class="w-full max-h-[400px] object-cover" loading="lazy" />
        </div>

        <!-- Post Video -->
        <div v-if="post.video" class="relative bg-black">
          <video :src="post.video" controls preload="metadata" class="w-full max-h-[400px]" playsinline></video>
        </div>

        <!-- Interaction Bar -->
        <div class="px-4 py-3 flex items-center justify-between border-t border-gray-50">
          <div class="flex items-center gap-5">
            <!-- Like -->
            <button @click="handleLike(post.id)" class="group flex items-center gap-1.5 transition-all" :class="isLiked(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'">
              <span class="material-icons-round text-xl group-active:scale-125 transition-transform">
                {{ isLiked(post.id) ? 'favorite' : 'favorite_border' }}
              </span>
              <span class="text-xs font-semibold" v-if="post.likes > 0">{{ post.likes }}</span>
            </button>

            <!-- Comment -->
            <button @click="toggleComments(post.id)" class="group flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-all">
              <span class="material-icons-round text-xl group-active:scale-110 transition-transform">
                {{ expandedComments === post.id ? 'chat_bubble' : 'chat_bubble_outline' }}
              </span>
              <span class="text-xs font-semibold" v-if="post.comments > 0">{{ post.comments }}</span>
            </button>
          </div>

          <!-- Share -->
          <button @click="handleShare(post)" class="group flex items-center gap-1.5 text-gray-400 hover:text-primary transition-all">
            <span class="material-icons-round text-xl group-active:scale-110 transition-transform">share</span>
          </button>
        </div>

        <!-- Comments Section (expandable) -->
        <div v-if="expandedComments === post.id" class="border-t border-gray-100 bg-gray-50/50">
          <!-- Loading Comments -->
          <div v-if="loadingComments" class="p-4 text-center">
            <div class="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin mx-auto"></div>
          </div>

          <!-- Comment List -->
          <div v-else class="max-h-64 overflow-y-auto">
            <div v-if="postComments.length === 0" class="p-4 text-center text-gray-400 text-xs">
              Nenhum comentário ainda. Seja o primeiro!
            </div>
            <div v-for="comment in postComments" :key="comment.id" class="flex gap-2.5 px-4 py-3 border-b border-gray-100/50 last:border-0">
              <img :src="comment.user.avatar" class="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2">
                  <span class="text-[12px] font-bold text-gray-900">{{ comment.user.name }}</span>
                  <span class="text-[10px] text-gray-400">{{ comment.timeAgo }}</span>
                </div>
                <p class="text-[12px] text-gray-700 leading-snug mt-0.5">{{ comment.text }}</p>
              </div>
              <button 
                v-if="user.id === comment.user_id" 
                @click="handleDeleteComment(comment.id, post.id)" 
                class="text-gray-300 hover:text-red-400 shrink-0 self-start mt-1"
              >
                <span class="material-icons-round text-[14px]">close</span>
              </button>
            </div>
          </div>

          <!-- Comment Input -->
          <div class="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gray-100">
            <img :src="user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" class="w-7 h-7 rounded-full object-cover shrink-0" />
            <input 
              v-model="commentText"
              @keyup.enter="submitComment(post.id)"
              type="text" 
              placeholder="Adicionar comentário..."
              class="flex-1 bg-gray-50 text-[12px] rounded-full px-3.5 py-2 border border-gray-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            <button 
              @click="submitComment(post.id)"
              :disabled="!commentText.trim() || submittingComment"
              class="p-1.5 text-primary disabled:text-gray-300 active:scale-90 transition-all"
            >
              <span class="material-icons-round text-xl">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <button 
      @click="isCreatingPost = true"
      class="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-primary to-orange-600 text-white rounded-2xl shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30"
    >
       <span class="material-icons-round text-2xl">add</span>
    </button>

    <!-- Share Toast -->
    <Transition name="toast">
      <div v-if="showShareToast" class="fixed bottom-28 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2">
        <span class="material-icons-round text-lg text-green-400">check_circle</span>
        {{ shareToastMsg }}
      </div>
    </Transition>

    <!-- Create Post Modal -->
    <Transition name="modal">
      <div v-if="isCreatingPost" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isCreatingPost = false"></div>
        <div class="bg-white w-full max-w-lg mx-4 mb-4 sm:mb-0 rounded-3xl p-5 relative z-10 shadow-2xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg text-gray-900">Novo Post</h3>
            <button @click="isCreatingPost = false" class="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
               <span class="material-icons-round text-lg">close</span>
            </button>
          </div>
          <div class="flex gap-3 mb-3">
             <img :src="user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'" class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0" />
             <textarea 
                v-model="newPostText"
                placeholder="No que você está pensando?" 
                class="w-full bg-gray-50 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[100px] border border-gray-100"
             ></textarea>
          </div>

          <!-- Preview -->
          <div v-if="newPostImagePreview" class="relative rounded-xl overflow-hidden h-36 bg-gray-100 mb-3">
             <img :src="newPostImagePreview" class="w-full h-full object-cover" />
             <button @click="clearImage" class="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"><span class="material-icons-round text-sm">close</span></button>
          </div>
          <div v-if="newPostVideoPreview" class="relative rounded-xl overflow-hidden bg-black mb-3">
             <video :src="newPostVideoPreview" controls class="w-full max-h-36 rounded-xl" playsinline></video>
             <button @click="clearVideo" class="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full"><span class="material-icons-round text-sm">close</span></button>
          </div>

          <div class="flex items-center justify-between">
             <div class="flex gap-0.5">
               <label class="flex items-center gap-1 text-gray-400 text-sm hover:text-primary cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-all">
                  <span class="material-icons-round text-xl">image</span>
                  <span class="text-xs font-medium hidden sm:inline">Foto</span>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageSelect" />
               </label>
               <label class="flex items-center gap-1 text-gray-400 text-sm hover:text-blue-500 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-all">
                  <span class="material-icons-round text-xl">videocam</span>
                  <span class="text-xs font-medium hidden sm:inline">Vídeo</span>
                  <input type="file" accept="video/*" class="hidden" @change="handleVideoSelect" />
               </label>
             </div>
             <button 
                @click="handleCreatePost" 
                :disabled="isPosting || !newPostText.trim()"
                class="bg-gradient-to-r from-primary to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center gap-1.5 disabled:opacity-40 active:scale-95 transition-all"
             >
                <span v-if="isPosting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ isPosting ? 'Publicando...' : 'Publicar' }}
             </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { posts, likePost, createPost, deletePost, fetchPosts, fetchSuggestedUsers, followUser, suggestedUsers, user, fetchComments, addComment, deleteComment } = useApp();
const activeTab = ref<'my_city' | 'global'>('my_city');
const isLoading = ref(true);
const hasUnread = ref(true);
const showNotifications = ref(false);

// Create Post
const isCreatingPost = ref(false);
const newPostText = ref('');
const newPostImage = ref<File | null>(null);
const newPostImagePreview = ref<string | null>(null);
const newPostVideo = ref<File | null>(null);
const newPostVideoPreview = ref<string | null>(null);
const isPosting = ref(false);

// Comments
const expandedComments = ref<string | null>(null);
const postComments = ref<any[]>([]);
const commentText = ref('');
const loadingComments = ref(false);
const submittingComment = ref(false);

// Likes (track locally)
const likedPosts = ref<Set<string>>(new Set());

// Share
const showShareToast = ref(false);
const shareToastMsg = ref('');

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) hasUnread.value = false;
};

const switchTab = async (tab: 'my_city' | 'global') => {
  activeTab.value = tab;
  isLoading.value = true;
  await fetchPosts(tab);
  isLoading.value = false;
};

const isLiked = (postId: string) => likedPosts.value.has(postId);

const handleLike = async (postId: string) => {
  if (likedPosts.value.has(postId)) return; // Already liked
  likedPosts.value.add(postId);
  await likePost(postId);
};

// ─── Comments ─────────────────────────────────────────────

const toggleComments = async (postId: string) => {
  if (expandedComments.value === postId) {
    expandedComments.value = null;
    postComments.value = [];
    return;
  }
  
  expandedComments.value = postId;
  loadingComments.value = true;
  postComments.value = await fetchComments(postId);
  loadingComments.value = false;
};

const submitComment = async (postId: string) => {
  if (!commentText.value.trim() || submittingComment.value) return;
  
  submittingComment.value = true;
  const result = await addComment(postId, commentText.value);
  
  if (result) {
    // Refresh comments
    postComments.value = await fetchComments(postId);
    commentText.value = '';
  }
  submittingComment.value = false;
};

const handleDeleteComment = async (commentId: string, postId: string) => {
  const success = await deleteComment(commentId, postId);
  if (success) {
    postComments.value = postComments.value.filter(c => c.id !== commentId);
  }
};

// ─── Share ────────────────────────────────────────────────

const handleShare = async (post: any) => {
  const shareText = `${post.user?.name}: "${post.text?.substring(0, 100)}${post.text?.length > 100 ? '...' : ''}"`;
  const shareUrl = `${window.location.origin}/feed?post=${post.id}`;
  
  // Use native share if available
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Fitera - Post',
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch (e) {
      // User cancelled or not supported, fallback to clipboard
    }
  }
  
  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    shareToastMsg.value = 'Link copiado!';
    showShareToast.value = true;
    setTimeout(() => { showShareToast.value = false; }, 2500);
  } catch {
    shareToastMsg.value = 'Não foi possível copiar';
    showShareToast.value = true;
    setTimeout(() => { showShareToast.value = false; }, 2500);
  }
};

// ─── Post Creation ────────────────────────────────────────

const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    newPostImage.value = input.files[0];
    clearVideo();
    const reader = new FileReader();
    reader.onload = (e) => { newPostImagePreview.value = e.target?.result as string; };
    reader.readAsDataURL(input.files[0]);
  }
};

const handleVideoSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    if (input.files[0].size > 50 * 1024 * 1024) { alert('Vídeo muito grande! Limite: 50MB.'); return; }
    newPostVideo.value = input.files[0];
    clearImage();
    newPostVideoPreview.value = URL.createObjectURL(input.files[0]);
  }
};

const clearImage = () => { newPostImage.value = null; newPostImagePreview.value = null; };
const clearVideo = () => {
  if (newPostVideoPreview.value) URL.revokeObjectURL(newPostVideoPreview.value);
  newPostVideo.value = null; newPostVideoPreview.value = null;
};

const handleCreatePost = async () => {
  if (!newPostText.value.trim()) return;
  isPosting.value = true;
  try {
    const result = await Promise.race([
      createPost(newPostText.value, newPostImage.value, newPostVideo.value),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 15000))
    ]);
    if (!result) throw new Error('Falha ao criar post');
    newPostText.value = ''; clearImage(); clearVideo(); isCreatingPost.value = false;
  } catch (e: any) {
    alert(`Erro: ${e.message || 'Erro desconhecido'}`);
  } finally { isPosting.value = false; }
};

const handleDelete = async (id: string) => {
  if (confirm('Excluir este post?')) await deletePost(id);
};

const handleFollow = async (userId: string) => { await followUser(userId); };

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchPosts(activeTab.value), fetchSuggestedUsers()]);
  isLoading.value = false;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: translateY(20px); }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>
