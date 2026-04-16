<template>
  <article class="max-w-3xl mx-auto px-6 py-24">

    <!-- Back -->
    <NuxtLink to="/devlog" class="font-heading text-xs text-muted hover:text-gold transition-colors">
      ← All Posts
    </NuxtLink>

    <!-- Header -->
    <header class="mt-10 mb-14 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <span class="font-body text-xs text-muted">{{ formatDate(post.date) }}</span>
        <NuxtLink v-if="post.game" :to="`/games/${post.game}`"
          class="font-heading text-xs text-neon-cyan hover:text-glow-neon transition-all">
          {{ post.game }}
        </NuxtLink>
        <span v-for="tag in post.tags" :key="tag"
          class="font-heading text-xs text-muted border border-rim px-2 py-0.5">
          {{ tag }}
        </span>
      </div>

      <h1 class="font-heading text-2xl text-gold text-glow-gold leading-loose">
        {{ post.title }}
      </h1>
    </header>

    <!-- Body -->
    <div class="prose-devlog">
      <ContentRenderer :value="post" />
    </div>

    <!-- Prev / Next -->
    <nav class="mt-20 pt-8 border-t-2 border-rim grid grid-cols-2 gap-4">
      <NuxtLink v-if="prev" :to="prev._path" class="group flex flex-col gap-1">
        <span class="font-heading text-xs text-muted group-hover:text-gold transition-colors">← Previous</span>
        <span class="font-body text-sm text-text group-hover:text-gold transition-colors">{{ prev.title }}</span>
      </NuxtLink>
      <div v-else />
      <NuxtLink v-if="next" :to="next._path" class="group flex flex-col gap-1 text-right">
        <span class="font-heading text-xs text-muted group-hover:text-gold transition-colors">Next →</span>
        <span class="font-body text-sm text-text group-hover:text-gold transition-colors">{{ next.title }}</span>
      </NuxtLink>
    </nav>

  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`devlog-${slug}`, () =>
  queryCollection('devlog').path(`/devlog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { data: siblings } = await useAsyncData(`devlog-siblings-${slug}`, () =>
  queryCollection('devlog').order('date', 'ASC').all()
)

const currentIndex = computed(() =>
  siblings.value?.findIndex(p => p._path === post.value?._path) ?? -1
)

const prev = computed(() =>
  currentIndex.value > 0 ? siblings.value![currentIndex.value - 1] : null
)

const next = computed(() =>
  currentIndex.value < (siblings.value?.length ?? 0) - 1
    ? siblings.value![currentIndex.value + 1]
    : null
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style>
.prose-devlog h2 {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.prose-devlog p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.9;
  margin-bottom: 1.25rem;
}

.prose-devlog ul, .prose-devlog ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prose-devlog li {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.8;
}

.prose-devlog a {
  color: var(--color-gold);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose-devlog a:hover {
  color: var(--color-gold-dim);
}

.prose-devlog code {
  font-family: monospace;
  font-size: 0.875rem;
  background: var(--color-surface-2);
  padding: 0.125rem 0.375rem;
  border: 1px solid var(--color-rim);
}
</style>
