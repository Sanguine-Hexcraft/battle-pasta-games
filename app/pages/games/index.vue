<template>
  <section class="max-w-6xl mx-auto px-6 py-24">
    <p class="font-heading text-xs text-gold mb-12 tracking-widest">
      <span class="text-muted">[ </span>Games<span class="text-muted"> ]</span>
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink v-for="game in games" :key="game._path" :to="game._path"
        class="group card-hover corner-brackets border-chunky p-6 flex flex-col gap-5 bg-surface">

        <!-- Cover -->
        <div class="aspect-video bg-surface-2 border-chunky overflow-hidden flex items-center justify-center">
          <NuxtImg v-if="game.cover" :src="game.cover" class="w-full h-full object-cover pixel" />
          <span v-else class="font-heading text-xs text-muted">[ Art Coming Soon ]</span>
        </div>

        <!-- Meta -->
        <div class="flex items-center gap-3">
          <span class="font-heading text-xs px-2 py-1 border" :class="statusStyle(game.status)">
            {{ statusLabel(game.status) }}
          </span>
          <span class="font-body text-xs text-muted">{{ game.genre }}</span>
        </div>

        <h2 class="font-heading text-base text-text group-hover:text-gold transition-colors leading-loose">
          {{ game.title }}
        </h2>

        <span class="font-heading text-xs text-gold group-hover:text-glow-gold transition-all self-start">
          View Game →
        </span>
      </NuxtLink>
    </div>

    <p v-if="!games?.length" class="font-body text-muted mt-6">No games yet. Check back soon.</p>
  </section>
</template>

<script setup lang="ts">
const { data: games } = await useAsyncData('games', () =>
  queryCollection('games').order('title', 'ASC').all()
)

function statusLabel(status: string) {
  const map: Record<string, string> = {
    'in-dev': 'In Development',
    'early-access': 'Early Access',
    'released': 'Released',
  }
  return map[status] ?? status
}

function statusStyle(status: string) {
  const map: Record<string, string> = {
    'in-dev': 'text-neon border-neon',
    'early-access': 'text-neon-cyan border-neon-cyan',
    'released': 'text-gold border-gold',
  }
  return map[status] ?? 'text-muted border-rim'
}
</script>
