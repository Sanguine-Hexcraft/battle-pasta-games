<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[50vh] flex items-end bg-surface-2 border-b-2 border-rim overflow-hidden">
      <!-- Cover art background -->
      <div v-if="game.cover" class="absolute inset-0">
        <NuxtImg :src="game.cover" class="w-full h-full object-cover opacity-40 pixel" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />

      <div class="relative max-w-6xl mx-auto px-6 py-16 w-full flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <span class="font-heading text-xs px-2 py-1 border" :class="statusStyle">
            {{ statusLabel }}
          </span>
          <span class="font-body text-xs text-muted">{{ game.genre }}</span>
          <span v-if="game.release_window" class="font-body text-xs text-muted">· {{ game.release_window }}</span>
        </div>

        <h1 class="font-heading text-3xl text-gold text-glow-gold leading-loose">
          {{ game.title }}
        </h1>

        <!-- Platform links -->
        <div class="flex gap-4 mt-2">
          <a v-if="game.platforms?.steam" :href="game.platforms.steam" target="_blank" rel="noopener"
            class="font-heading text-xs text-ink bg-gold px-5 py-3 border-chunky-gold hover:brightness-110 transition-all">
            Steam
          </a>
          <a v-if="game.platforms?.itch" :href="game.platforms.itch" target="_blank" rel="noopener"
            class="font-heading text-xs text-gold px-5 py-3 border-chunky hover:border-gold transition-all">
            itch.io
          </a>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-20">

      <!-- Trailer -->
      <section v-if="game.trailer">
        <p class="font-heading text-xs text-muted tracking-widest uppercase mb-6">Trailer</p>
        <div class="aspect-video border-chunky overflow-hidden">
          <iframe :src="trailerEmbedUrl" class="w-full h-full" allowfullscreen frameborder="0" />
        </div>
      </section>

      <!-- Description -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="md:col-span-2">
          <p class="font-heading text-xs text-muted tracking-widest uppercase mb-6">About</p>
          <div class="prose-game">
            <ContentRenderer :value="game" />
          </div>
        </div>

        <!-- Sidebar: linked devlog posts -->
        <aside v-if="devlogPosts.length">
          <p class="font-heading text-xs text-muted tracking-widest uppercase mb-6">Devlog</p>
          <ul class="flex flex-col gap-4">
            <li v-for="post in devlogPosts" :key="post._path">
              <NuxtLink :to="post._path" class="group flex flex-col gap-1">
                <span class="font-heading text-xs text-text group-hover:text-gold transition-colors leading-loose">
                  {{ post.title }}
                </span>
                <span class="font-body text-xs text-muted">{{ formatDate(post.date) }}</span>
              </NuxtLink>
            </li>
          </ul>
          <NuxtLink to="/devlog" class="font-heading text-xs text-muted hover:text-gold transition-colors mt-6 inline-block">
            All Posts →
          </NuxtLink>
        </aside>
      </section>

      <!-- Screenshots -->
      <section v-if="game.screenshots?.length">
        <p class="font-heading text-xs text-muted tracking-widest uppercase mb-6">Screenshots</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(src, i) in game.screenshots" :key="i"
            class="aspect-video border-chunky overflow-hidden bg-surface-2">
            <NuxtImg :src="src" class="w-full h-full object-cover pixel" />
          </div>
        </div>
      </section>

      <!-- Changelog -->
      <section v-if="game.changelog?.length">
        <p class="font-heading text-xs text-muted tracking-widest uppercase mb-6">Changelog</p>
        <div class="flex flex-col divide-y divide-rim">
          <div v-for="entry in game.changelog" :key="entry.version"
            class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-5">
            <div class="flex items-center gap-4 shrink-0">
              <span class="font-heading text-xs text-neon-cyan w-20">v{{ entry.version }}</span>
              <span class="font-body text-xs text-muted">{{ formatDate(entry.date) }}</span>
            </div>
            <p class="font-body text-sm text-text">{{ entry.notes }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: game } = await useAsyncData(`game-${slug}`, () =>
  queryCollection('games').path(`/games/${slug}`).first()
)

if (!game.value) {
  throw createError({ statusCode: 404, statusMessage: 'Game not found' })
}

const { data: devlogPosts } = await useAsyncData(`game-devlog-${slug}`, () =>
  queryCollection('devlog')
    .where('game', '=', slug)
    .order('date', 'DESC')
    .all()
)

const statusLabel = computed(() => {
  const map: Record<string, string> = {
    'in-dev': 'In Development',
    'early-access': 'Early Access',
    'released': 'Released',
  }
  return map[game.value?.status ?? ''] ?? game.value?.status ?? ''
})

const statusStyle = computed(() => {
  const map: Record<string, string> = {
    'in-dev': 'text-neon border-neon',
    'early-access': 'text-neon-cyan border-neon-cyan',
    'released': 'text-gold border-gold',
  }
  return map[game.value?.status ?? ''] ?? 'text-muted border-rim'
})

const trailerEmbedUrl = computed(() => {
  const url = game.value?.trailer ?? ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style>
.prose-game h2 {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.prose-game p {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.prose-game ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prose-game ul li::before {
  content: '▸ ';
  color: var(--color-gold);
}

.prose-game ul li {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text);
}
</style>
