<template>
  <section class="max-w-6xl mx-auto px-6 py-24">
    <h1 class="font-heading text-2xl text-gold text-glow-gold leading-loose">{{ slug }}</h1>
    <p class="font-body text-muted mt-6">Coming soon.</p>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>
