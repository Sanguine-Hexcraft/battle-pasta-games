<template>
  <section class="max-w-3xl mx-auto px-6 py-24">
    <p class="font-heading text-xs text-muted tracking-widest uppercase mb-12">Devlog</p>

    <div class="flex flex-col divide-y divide-rim">
      <NuxtLink v-for="post in posts" :key="post._path" :to="post._path"
        class="group py-8 flex flex-col gap-3 hover:pl-2 transition-all">

        <div class="flex items-center gap-4">
          <span class="font-body text-xs text-muted">{{ formatDate(post.date) }}</span>
          <NuxtLink v-if="post.game" :to="`/games/${post.game}`"
            class="font-heading text-xs text-neon-cyan hover:text-glow-neon transition-all"
            @click.stop>
            {{ post.game }}
          </NuxtLink>
          <span v-for="tag in post.tags" :key="tag"
            class="font-heading text-xs text-muted border border-rim px-2 py-0.5">
            {{ tag }}
          </span>
        </div>

        <h2 class="font-heading text-sm text-text group-hover:text-gold transition-colors leading-loose">
          {{ post.title }}
        </h2>

        <p v-if="post.excerpt" class="font-body text-sm text-muted leading-relaxed">
          {{ post.excerpt }}
        </p>

        <span class="font-heading text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity self-start">
          Read More →
        </span>
      </NuxtLink>
    </div>

    <p v-if="!posts?.length" class="font-body text-muted mt-6">No posts yet. Check back soon.</p>
  </section>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('devlog', () =>
  queryCollection('devlog').order('date', 'DESC').all()
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
